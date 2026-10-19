import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Plus, Trash2, Lock, LockOpen, Clock, FileQuestion } from "lucide-react";
import { api } from "../../attestation/api";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { icons } from "../../icons";
import LoginCard from "./LoginCard";
import UsersTab from "./UsersTab";
import ExamEditor from "./ExamEditor";
import ExamResults from "./ExamResults";
import { Alert, LevelBadge, Spinner } from "./shared";
import { errorText, fmtDate } from "../../attestation/format";
import "./Attestation.css";

const NEW_EXAM = {
  title: "",
  description: "",
  level: "junior",
  duration_min: 30,
  pass_percent: 70,
  shuffle: true,
  show_result: true,
  status: "draft",
  questions: [],
};

function StatusBadge({ status, t }) {
  return <span className={`att-badge att-exam-${status}`}>{t(`att.examStatus.${status}`)}</span>;
}

function ExamsList({ onOpen }) {
  const { t } = useLanguage();
  const [exams, setExams] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .admin("exams.list")
      .then((d) => setExams(d.exams))
      .catch((err) => setError(errorText(err, t)));
  }, [t]);

  return (
    <div>
      <div className="att-section-head">
        <p className="att-muted att-small">{t("att.admin.examsHint")}</p>
        <button className="att-btn att-btn-primary" onClick={() => onOpen("new")}>
          <Plus size={16} /> {t("att.admin.newExam")}
        </button>
      </div>
      <Alert>{error}</Alert>
      {!exams && !error && <Spinner label={t("att.common.loading")} />}
      {exams && exams.length === 0 && (
        <div className="att-card att-empty">
          <p className="att-muted">{t("att.admin.noExams")}</p>
        </div>
      )}
      <div className="att-grid">
        {(exams || []).map((e) => (
          <button key={e.id} className="att-card att-exam-card att-clickable" onClick={() => onOpen(e.id)}>
            <div className="att-exam-card-top">
              <LevelBadge level={e.level} t={t} />
              <StatusBadge status={e.status} t={t} />
            </div>
            <h3>{e.title}</h3>
            <div className="att-exam-facts">
              <span>
                <FileQuestion size={15} /> {e.questionCount} {t("att.common.questionsShort")}
              </span>
              <span>
                <Clock size={15} /> {e.durationMin} {t("att.common.minutes")}
              </span>
            </div>
            <div className="att-small att-muted">
              {t("att.results.granted")}: {e.stats.granted + e.stats.inProgress} · {t("att.status.submitted")}:{" "}
              {e.stats.submitted}
              {e.stats.needsReview > 0 && (
                <span className="att-text-danger">
                  {" "}
                  · {t("att.status.needs_review")}: {e.stats.needsReview}
                </span>
              )}
            </div>
            <div className="att-small att-muted">
              {t("att.admin.updated")}: {fmtDate(e.updatedAt)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExamDetail({ examId, onBack }) {
  const { t } = useLanguage();
  const [exam, setExam] = useState(examId === "new" ? NEW_EXAM : null);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState("questions");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (examId === "new") return;
    api
      .admin("exams.get", { id: examId })
      .then((d) => setExam(d.exam))
      .catch((err) => setError(errorText(err, t)));
  }, [examId, t]);

  // Saqlanmagan o'zgarishlar bo'lsa, sahifani yopishda ogohlantirish
  useEffect(() => {
    if (!dirty) return;
    const fn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", fn);
    return () => window.removeEventListener("beforeunload", fn);
  }, [dirty]);

  const save = useCallback(
    async (patch = {}) => {
      setSaving(true);
      setError("");
      try {
        const d = await api.admin("exams.save", { exam: { ...exam, ...patch } });
        setExam(d.exam);
        setDirty(false);
        return true;
      } catch (err) {
        setError(errorText(err, t));
        return false;
      } finally {
        setSaving(false);
      }
    },
    [exam, t]
  );

  async function setStatus(status) {
    if (status === "active" && !window.confirm(t("att.admin.confirmOpen"))) return;
    // Savollarda saqlanmagan o'zgarishlar bo'lsa, ular ham birga saqlanadi
    await save({ status });
  }

  async function remove() {
    if (!window.confirm(t("att.admin.confirmDeleteExam").replace("{name}", exam.title))) return;
    try {
      await api.admin("exams.delete", { id: exam.id });
      onBack();
    } catch (err) {
      setError(errorText(err, t));
    }
  }

  function back() {
    if (dirty && !window.confirm(t("att.admin.confirmLeave"))) return;
    onBack();
  }

  if (!exam) {
    return (
      <div>
        <button className="att-btn att-btn-ghost" onClick={onBack}>
          <ChevronLeft size={16} /> {t("att.admin.backToExams")}
        </button>
        <Alert>{error}</Alert>
        {!error && <Spinner label={t("att.common.loading")} />}
      </div>
    );
  }

  return (
    <div>
      <div className="att-detail-head">
        <button className="att-btn att-btn-ghost" onClick={back}>
          <ChevronLeft size={16} /> {t("att.admin.backToExams")}
        </button>
        {exam.id && (
          <div className="att-btn-row">
            <StatusBadge status={exam.status} t={t} />
            {exam.status !== "active" ? (
              <button className="att-btn att-btn-success" disabled={saving} onClick={() => setStatus("active")}>
                <LockOpen size={16} /> {t("att.admin.open")}
              </button>
            ) : (
              <button className="att-btn" disabled={saving} onClick={() => setStatus("closed")}>
                <Lock size={16} /> {t("att.admin.close")}
              </button>
            )}
            <button className="att-icon-btn danger" title={t("att.common.delete")} onClick={remove}>
              <Trash2 size={17} />
            </button>
          </div>
        )}
      </div>

      <h2 className="att-detail-title">{exam.title || t("att.admin.newExam")}</h2>

      {exam.id && (
        <div className="att-tabs">
          <button className={tab === "questions" ? "active" : ""} onClick={() => setTab("questions")}>
            {t("att.admin.tabQuestions")}
          </button>
          <button
            className={tab === "results" ? "active" : ""}
            onClick={() => {
              if (dirty && !window.confirm(t("att.admin.confirmLeave"))) return;
              setTab("results");
            }}
          >
            {t("att.admin.tabResults")}
          </button>
        </div>
      )}

      {tab === "questions" || !exam.id ? (
        <ExamEditor
          exam={exam}
          dirty={dirty}
          saving={saving}
          error={error}
          onChange={(e) => {
            setExam(e);
            setDirty(true);
          }}
          onSave={() => save()}
        />
      ) : (
        <ExamResults exam={exam} />
      )}
    </div>
  );
}

function AdminPanel() {
  const { user, isAdmin, checking, logout } = useAuth();
  const { t } = useLanguage();
  const [tab, setTab] = useState("exams");
  const [openExam, setOpenExam] = useState(null);
  const Icon = icons.admin;

  if (checking) return <Spinner label={t("att.common.loading")} />;
  if (!user) {
    return (
      <div className="att-page">
        <LoginCard />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="att-page">
        <div className="att-card att-empty">
          <Lock size={26} />
          <p>{t("att.admin.notAdmin")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="att-page att-page-wide">
      <div className="att-page-header">
        <div>
          <h1>
            <span className="att-page-icon">
              <Icon size={26} strokeWidth={1.75} />
            </span>
            {t("att.admin.title")}
          </h1>
          <p className="att-muted">{t("att.admin.subtitle")}</p>
        </div>
        <button className="att-btn att-btn-ghost" onClick={logout}>
          {t("att.common.logout")}
        </button>
      </div>

      {!openExam && (
        <div className="att-tabs">
          <button className={tab === "exams" ? "active" : ""} onClick={() => setTab("exams")}>
            {t("att.admin.tabExams")}
          </button>
          <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}>
            {t("att.admin.tabUsers")}
          </button>
        </div>
      )}

      {openExam ? (
        <ExamDetail examId={openExam} onBack={() => setOpenExam(null)} />
      ) : tab === "exams" ? (
        <ExamsList onOpen={setOpenExam} />
      ) : (
        <UsersTab />
      )}
    </div>
  );
}

export default AdminPanel;
