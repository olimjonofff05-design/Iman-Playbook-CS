import { useCallback, useEffect, useState } from "react";
import { Download, Eye, RotateCcw, Trash2, UserPlus } from "lucide-react";
import { api } from "../../attestation/api";
import { useLanguage } from "../../context/LanguageContext";
import AttemptView from "./AttemptView";
import { Alert, LevelBadge, Modal, Spinner } from "./shared";
import { errorText, fmtDate } from "../../attestation/format";

function GrantModal({ exam, attempts, onClose, onDone }) {
  const { t } = useLanguage();
  const [users, setUsers] = useState(null);
  const [level, setLevel] = useState(exam.level);
  const [selected, setSelected] = useState(new Set());
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .admin("users.list")
      .then((d) => setUsers(d.users.filter((u) => u.active)))
      .catch((err) => setError(errorText(err, t)));
  }, [t]);

  // Hozir ochiq ruxsati bor xodimlar — ularga qayta ruxsat kerak emas
  const openIds = new Set(attempts.filter((a) => a.status !== "submitted").map((a) => a.userId));
  const doneIds = new Set(attempts.filter((a) => a.status === "submitted").map((a) => a.userId));
  const list = (users || []).filter((u) => level === "all" || u.level === level);
  const selectable = list.filter((u) => !openIds.has(u.id));

  function toggle(id) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  async function grant() {
    setBusy(true);
    setError("");
    try {
      const d = await api.admin("access.grant", { examId: exam.id, userIds: [...selected] });
      onDone(d.created);
    } catch (err) {
      setError(errorText(err, t));
      setBusy(false);
    }
  }

  return (
    <Modal title={t("att.results.grantTitle")} onClose={onClose} wide>
      <p className="att-muted att-small">{t("att.results.grantHint")}</p>
      <div className="att-section-head">
        <div className="att-segment">
          {["all", "junior", "middle"].map((k) => (
            <button key={k} className={level === k ? "active" : ""} onClick={() => setLevel(k)}>
              {k === "all" ? t("att.common.all") : t(`att.levels.${k}`)}
            </button>
          ))}
        </div>
        <button
          className="att-btn att-btn-ghost att-btn-sm"
          onClick={() =>
            setSelected(
              selectable.every((u) => selected.has(u.id)) ? new Set() : new Set(selectable.map((u) => u.id))
            )
          }
        >
          {t("att.results.selectAll")}
        </button>
      </div>
      {!users && !error && <Spinner label={t("att.common.loading")} />}
      {users && list.length === 0 && <p className="att-muted">{t("att.results.noUsers")}</p>}
      <div className="att-pick-list">
        {list.map((u) => {
          const open = openIds.has(u.id);
          return (
            <label key={u.id} className={`att-pick ${open ? "disabled" : ""}`}>
              <input
                type="checkbox"
                disabled={open}
                checked={open || selected.has(u.id)}
                onChange={() => toggle(u.id)}
              />
              <span className="att-pick-name">{u.fullName}</span>
              <LevelBadge level={u.level} t={t} />
              {open && <span className="att-small att-muted">{t("att.results.alreadyGranted")}</span>}
              {!open && doneIds.has(u.id) && <span className="att-small att-muted">{t("att.results.retake")}</span>}
            </label>
          );
        })}
      </div>
      <Alert>{error}</Alert>
      <div className="att-modal-actions">
        <button className="att-btn" onClick={onClose}>
          {t("att.common.cancel")}
        </button>
        <button className="att-btn att-btn-primary" disabled={!selected.size || busy} onClick={grant}>
          {t("att.results.grantBtn")} ({selected.size})
        </button>
      </div>
    </Modal>
  );
}

function statusLabel(a, t) {
  if (a.status === "submitted") return a.needsReview ? t("att.status.needs_review") : t("att.status.submitted");
  return t(`att.status.${a.status}`);
}

function ExamResults({ exam }) {
  const { t } = useLanguage();
  const [attempts, setAttempts] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [granting, setGranting] = useState(false);
  const [viewing, setViewing] = useState(null);

  const load = useCallback(() => {
    api
      .admin("attempts.list", { examId: exam.id })
      .then((d) => setAttempts(d.attempts))
      .catch((err) => setError(errorText(err, t)));
  }, [exam.id, t]);

  useEffect(load, [load]);

  async function remove(a) {
    const msg = a.status === "submitted" ? t("att.results.confirmDeleteResult") : t("att.results.confirmRevoke");
    if (!window.confirm(msg.replace("{name}", a.userName))) return;
    try {
      await api.admin("attempts.delete", { id: a.id });
      load();
    } catch (err) {
      setError(errorText(err, t));
    }
  }

  function exportCsv() {
    const head = [
      t("att.users.fullName"),
      t("att.users.login"),
      t("att.users.level"),
      t("att.users.status"),
      t("att.results.score"),
      t("att.results.max"),
      "%",
      t("att.results.verdict"),
      t("att.results.startedAt"),
      t("att.results.submittedAt"),
      t("att.results.tabSwitches"),
    ];
    const rows = attempts.map((a) => [
      a.userName,
      a.userLogin,
      a.userLevel,
      statusLabel(a, t),
      a.status === "submitted" ? a.score : "",
      a.status === "submitted" ? a.maxScore : "",
      a.status === "submitted" ? a.percent : "",
      a.status !== "submitted" || a.needsReview ? "" : a.percent >= exam.pass_percent ? t("att.result.pass") : t("att.result.fail"),
      fmtDate(a.startedAt),
      fmtDate(a.submittedAt),
      a.tabSwitches,
    ]);
    const csv = [head, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(";"))
      .join("\r\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${exam.title}-natijalar.csv`.replace(/[\\/:*?"<>|]/g, "_");
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const submitted = (attempts || []).filter((a) => a.status === "submitted");
  const graded = submitted.filter((a) => !a.needsReview);
  const passed = graded.filter((a) => a.percent >= exam.pass_percent).length;
  const avg = graded.length ? Math.round((graded.reduce((s, a) => s + a.percent, 0) / graded.length) * 10) / 10 : 0;

  return (
    <div>
      {exam.status !== "active" && <Alert kind="info">{t("att.results.examNotActive")}</Alert>}

      <div className="att-stats">
        <div className="att-stat">
          <span>{t("att.results.granted")}</span>
          <strong>{attempts ? attempts.length : "—"}</strong>
        </div>
        <div className="att-stat">
          <span>{t("att.status.submitted")}</span>
          <strong>{submitted.length}</strong>
        </div>
        <div className="att-stat">
          <span>{t("att.result.pass")}</span>
          <strong>
            {passed} / {graded.length}
          </strong>
        </div>
        <div className="att-stat">
          <span>{t("att.results.avg")}</span>
          <strong>{avg}%</strong>
        </div>
      </div>

      <div className="att-section-head">
        <button className="att-btn att-btn-primary" onClick={() => setGranting(true)}>
          <UserPlus size={16} /> {t("att.results.grantBtn")}
        </button>
        <div className="att-btn-row">
          <button className="att-btn att-btn-ghost" onClick={load}>
            <RotateCcw size={15} /> {t("att.common.refresh")}
          </button>
          <button className="att-btn att-btn-ghost" disabled={!attempts?.length} onClick={exportCsv}>
            <Download size={15} /> CSV
          </button>
        </div>
      </div>

      <Alert kind="success">{notice}</Alert>
      <Alert>{error}</Alert>
      {!attempts && !error && <Spinner label={t("att.common.loading")} />}
      {attempts && attempts.length === 0 && (
        <div className="att-card att-empty">
          <p className="att-muted">{t("att.results.empty")}</p>
        </div>
      )}

      {attempts && attempts.length > 0 && (
        <div className="att-table-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th>{t("att.users.fullName")}</th>
                <th>{t("att.users.status")}</th>
                <th>{t("att.results.score")}</th>
                <th>{t("att.results.grantedAt")}</th>
                <th>{t("att.results.submittedAt")}</th>
                <th>{t("att.results.tabSwitchesShort")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => {
                const verdict =
                  a.status === "submitted" && !a.needsReview
                    ? a.percent >= exam.pass_percent
                      ? "pass"
                      : "fail"
                    : null;
                return (
                  <tr key={a.id}>
                    <td>
                      {a.userName}
                      <div className="att-small att-muted">{a.userLogin}</div>
                    </td>
                    <td>
                      <span className={`att-badge att-status-${a.needsReview ? "review" : a.status}`}>
                        {statusLabel(a, t)}
                      </span>
                      {a.late && <div className="att-small att-text-danger">{t("att.results.late")}</div>}
                    </td>
                    <td>
                      {a.status === "submitted" ? (
                        <>
                          <strong className={verdict ? `att-text-${verdict === "pass" ? "success" : "danger"}` : ""}>
                            {a.percent}%
                          </strong>
                          <div className="att-small att-muted">
                            {a.score} / {a.maxScore}
                          </div>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="att-small">{fmtDate(a.grantedAt)}</td>
                    <td className="att-small">{fmtDate(a.submittedAt)}</td>
                    <td className={a.tabSwitches > 0 ? "att-text-danger" : "att-muted"}>{a.tabSwitches}</td>
                    <td className="att-row-actions">
                      {a.status !== "granted" && (
                        <button className="att-icon-btn" title={t("att.results.answers")} onClick={() => setViewing(a.id)}>
                          <Eye size={16} />
                        </button>
                      )}
                      <button
                        className="att-icon-btn danger"
                        title={a.status === "submitted" ? t("att.results.deleteResult") : t("att.results.revoke")}
                        onClick={() => remove(a)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {granting && (
        <GrantModal
          exam={exam}
          attempts={attempts || []}
          onClose={() => setGranting(false)}
          onDone={(n) => {
            setGranting(false);
            setNotice(t("att.results.grantedNotice").replace("{n}", n));
            load();
          }}
        />
      )}

      {viewing && (
        <AttemptView
          attemptId={viewing}
          passPercent={exam.pass_percent}
          onClose={() => setViewing(null)}
          onGraded={load}
        />
      )}
    </div>
  );
}

export default ExamResults;
