import { useEffect, useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { api } from "../../attestation/api";
import { useLanguage } from "../../context/LanguageContext";
import { Alert, Modal, Spinner } from "./shared";
import { errorText, fmtDate } from "../../attestation/format";

function AttemptView({ attemptId, passPercent, onClose, onGraded }) {
  const { t } = useLanguage();
  const [a, setA] = useState(null);
  const [scores, setScores] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .admin("attempts.get", { id: attemptId })
      .then(({ attempt }) => {
        setA(attempt);
        setScores(attempt.manualScores || {});
      })
      .catch((err) => setError(errorText(err, t)));
  }, [attemptId, t]);

  async function saveGrades() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const d = await api.admin("attempts.grade", { id: attemptId, manualScores: scores });
      setA((prev) => ({ ...prev, score: d.score, needsReview: d.needsReview, manualScores: d.manualScores }));
      setSaved(true);
      onGraded?.();
    } catch (err) {
      setError(errorText(err, t));
    } finally {
      setSaving(false);
    }
  }

  const hasOpen = a?.questions.some((q) => q.type === "open");
  const liveScore = a
    ? a.autoScore + Object.values(scores).reduce((s, v) => s + (v === "" ? 0 : Number(v) || 0), 0)
    : 0;
  const livePercent = a?.maxScore ? Math.round((liveScore / a.maxScore) * 1000) / 10 : 0;

  return (
    <Modal title={a ? `${a.userName} — ${t("att.results.answers")}` : t("att.common.loading")} onClose={onClose} wide>
      {!a && !error && <Spinner label={t("att.common.loading")} />}
      <Alert>{error}</Alert>
      {a && (
        <>
          <div className="att-attempt-summary">
            <div>
              <span>{t("att.results.score")}</span>
              <strong>
                {liveScore} / {a.maxScore} ({livePercent}%)
              </strong>
            </div>
            <div>
              <span>{t("att.result.passMark")}</span>
              <strong>{passPercent}%</strong>
            </div>
            <div>
              <span>{t("att.results.submittedAt")}</span>
              <strong>{fmtDate(a.submittedAt)}</strong>
            </div>
            <div>
              <span>{t("att.results.tabSwitches")}</span>
              <strong className={a.tabSwitches > 0 ? "att-text-danger" : ""}>{a.tabSwitches}</strong>
            </div>
          </div>
          {a.status !== "submitted" && <Alert kind="info">{t("att.results.notSubmittedYet")}</Alert>}

          <div className="att-review-list">
            {a.questions.map((q, i) => {
              const ans = a.answers[q.id];
              if (q.type === "open") {
                return (
                  <div key={q.id} className="att-review-item">
                    <div className="att-review-head">
                      <strong>
                        {i + 1}. {t("att.qtypes.open")}
                      </strong>
                      <span className="att-muted">
                        {q.points} {t("att.common.points")}
                      </span>
                    </div>
                    {q.context && <div className="att-case">{q.context}</div>}
                    <div className="att-question-text">{q.text}</div>
                    <div className="att-open-answer">{ans || <em className="att-muted">{t("att.results.noAnswer")}</em>}</div>
                    {q.explanation && (
                      <div className="att-explain">
                        <span>{t("att.editor.expectedAnswer")}:</span> {q.explanation}
                      </div>
                    )}
                    {a.status === "submitted" && (
                      <label className="att-inline-field">
                        {t("att.results.giveScore")} (0–{q.points})
                        <input
                          type="number"
                          min="0"
                          max={q.points}
                          step="0.5"
                          value={scores[q.id] ?? ""}
                          onChange={(e) => {
                            setSaved(false);
                            const raw = e.target.value;
                            const n = Math.min(q.points, Math.max(0, Number(raw)));
                            setScores({ ...scores, [q.id]: raw === "" || Number.isNaN(n) ? "" : n });
                          }}
                        />
                      </label>
                    )}
                  </div>
                );
              }
              const chosen = Array.isArray(ans) ? ans : [];
              const right = chosen.length === q.correct.length && chosen.every((x, k) => x === q.correct[k]);
              return (
                <div key={q.id} className="att-review-item">
                  <div className="att-review-head">
                    <strong>
                      {i + 1}. {t(`att.qtypes.${q.type}`)}
                    </strong>
                    <span className={right ? "att-text-success" : "att-text-danger"}>
                      {right ? <CircleCheck size={16} /> : <CircleX size={16} />} {right ? q.points : 0} / {q.points}
                    </span>
                  </div>
                  {q.context && <div className="att-case">{q.context}</div>}
                  <div className="att-question-text">{q.text}</div>
                  <ul className="att-review-options">
                    {q.options.map((opt, k) => {
                      const isCorrect = q.correct.includes(k);
                      const isChosen = chosen.includes(k);
                      return (
                        <li
                          key={k}
                          className={`${isCorrect ? "correct" : ""} ${isChosen && !isCorrect ? "wrong" : ""}`}
                        >
                          <span className="att-review-mark">{isChosen ? "●" : "○"}</span>
                          {opt}
                          {isCorrect && <em> — {t("att.results.correctOption")}</em>}
                        </li>
                      );
                    })}
                  </ul>
                  {!chosen.length && <div className="att-muted att-small">{t("att.results.noAnswer")}</div>}
                  {q.explanation && (
                    <div className="att-explain">
                      <span>{t("att.editor.explanation")}:</span> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {hasOpen && a.status === "submitted" && (
            <div className="att-modal-actions">
              {saved && <span className="att-text-success att-small">{t("att.common.saved")}</span>}
              <button className="att-btn att-btn-primary" disabled={saving} onClick={saveGrades}>
                {saving ? t("att.common.loading") : t("att.results.saveScores")}
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

export default AttemptView;
