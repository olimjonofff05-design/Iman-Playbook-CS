import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CircleCheck } from "lucide-react";
import { api } from "../../attestation/api";
import { useLanguage } from "../../context/LanguageContext";
import { Alert, Modal, Spinner } from "./shared";
import { errorText, fmtDuration } from "../../attestation/format";
import ResultCard from "./ResultCard";

const draftKey = (id) => `iman-att-draft-${id}`;

function readDraft(id) {
  try {
    return JSON.parse(localStorage.getItem(draftKey(id)) || "null");
  } catch {
    return null;
  }
}
function writeDraft(id, answers) {
  try {
    localStorage.setItem(draftKey(id), JSON.stringify(answers));
  } catch {
    // saqlab bo'lmadi — server nusxasi baribir bor
  }
}
function clearDraft(id) {
  try {
    localStorage.removeItem(draftKey(id));
  } catch {
    // e'tiborsiz
  }
}

function isAnswered(q, v) {
  if (q.type === "open") return Boolean(String(v || "").trim());
  return Array.isArray(v) && v.length > 0;
}

function ExamRunner({ attemptId, onExit }) {
  const { t } = useLanguage();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error

  const answersRef = useRef(answers);
  const tabSwitchesRef = useRef(0);
  const saveTimer = useRef(null);
  const submittedRef = useRef(false);

  // ---- Boshlash / davom ettirish ----
  useEffect(() => {
    let alive = true;
    api
      .exam("start", { attemptId })
      .then(({ attempt }) => {
        if (!alive) return;
        // server va brauzer soati farqi — taymer server vaqti bo'yicha yuradi
        const offset = new Date(attempt.serverNow).getTime() - Date.now();
        const draft = readDraft(attemptId);
        const initial = { ...(attempt.answers || {}), ...(draft || {}) };
        answersRef.current = initial;
        setAnswers(initial);
        setExam({ ...attempt, offset });
      })
      .catch((err) => alive && setError(errorText(err, t)));
    return () => {
      alive = false;
    };
  }, [attemptId, t]);

  // ---- Taymer ----
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  const remaining = exam ? new Date(exam.deadline).getTime() - (now + exam.offset) : 0;

  // ---- Boshqa oynaga o'tishlarni sanash ----
  useEffect(() => {
    function onVisibility() {
      if (document.visibilityState === "hidden" && !submittedRef.current) tabSwitchesRef.current += 1;
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // ---- Sahifani tasodifan yopishdan ogohlantirish ----
  useEffect(() => {
    if (!exam || result) return;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [exam, result]);

  // ---- Oraliq saqlash (serverga) ----
  const flushSave = useCallback(async () => {
    clearTimeout(saveTimer.current);
    if (submittedRef.current) return;
    setSaveState("saving");
    try {
      await api.exam("save", {
        attemptId,
        answers: answersRef.current,
        tabSwitches: tabSwitchesRef.current,
      });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }, [attemptId]);

  function setAnswer(qid, value) {
    const next = { ...answersRef.current, [qid]: value };
    answersRef.current = next;
    setAnswers(next);
    writeDraft(attemptId, next);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, 1500);
  }

  // ---- Topshirish ----
  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    clearTimeout(saveTimer.current);
    setSubmitting(true);
    setConfirmOpen(false);
    try {
      const d = await api.exam("submit", {
        attemptId,
        answers: answersRef.current,
        tabSwitches: tabSwitchesRef.current,
      });
      clearDraft(attemptId);
      setResult(d.result);
    } catch (err) {
      submittedRef.current = false;
      setError(errorText(err, t));
    } finally {
      setSubmitting(false);
    }
  }, [attemptId, t]);

  // Vaqt tugaganda avtomatik topshirish
  useEffect(() => {
    if (exam && !result && remaining <= 0 && !submittedRef.current) submit();
  }, [exam, result, remaining, submit]);

  const questions = useMemo(() => exam?.questions ?? [], [exam]);
  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length;

  if (result) {
    return (
      <div className="att-runner">
        <ResultCard result={result} title={exam?.title} />
        <button className="att-btn att-btn-primary" onClick={onExit}>
          {t("att.runner.backToList")}
        </button>
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div className="att-runner">
        <Alert>{error}</Alert>
        <button className="att-btn" onClick={onExit}>
          {t("att.runner.backToList")}
        </button>
      </div>
    );
  }

  if (!exam) return <Spinner label={t("att.common.loading")} />;

  const q = questions[index];
  const value = answers[q.id];
  const lowTime = remaining < 60 * 1000;

  return (
    <div className="att-runner">
      <div className="att-runner-bar">
        <div>
          <div className="att-runner-title">{exam.title}</div>
          <div className="att-muted att-small">
            {t("att.runner.answered")}: {answeredCount} / {questions.length}
            {" · "}
            {saveState === "saving" && t("att.runner.saving")}
            {saveState === "saved" && t("att.runner.saved")}
            {saveState === "error" && <span className="att-text-danger">{t("att.runner.saveError")}</span>}
          </div>
        </div>
        <div className={`att-timer ${lowTime ? "att-timer-low" : ""}`}>
          <Clock size={18} />
          {fmtDuration(remaining)}
        </div>
      </div>

      <div className="att-qnav">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            type="button"
            className={`att-qnav-item ${i === index ? "current" : ""} ${isAnswered(qq, answers[qq.id]) ? "done" : ""}`}
            onClick={() => setIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="att-card att-question">
        <div className="att-question-meta">
          <span>
            {t("att.runner.question")} {index + 1} / {questions.length}
          </span>
          <span>
            {t(`att.qtypes.${q.type}`)} · {q.points} {t("att.common.points")}
          </span>
        </div>

        {q.context && <div className="att-case">{q.context}</div>}
        <div className="att-question-text">{q.text}</div>

        {q.type === "open" ? (
          <textarea
            className="att-textarea"
            rows={7}
            value={value || ""}
            placeholder={t("att.runner.openPlaceholder")}
            onChange={(e) => setAnswer(q.id, e.target.value)}
            onBlur={flushSave}
          />
        ) : (
          <div className="att-options">
            {q.options.map((opt, i) => {
              const checked = Array.isArray(value) && value.includes(i);
              return (
                <label key={i} className={`att-option ${checked ? "checked" : ""}`}>
                  <input
                    type={q.type === "multi" ? "checkbox" : "radio"}
                    name={q.id}
                    checked={checked}
                    onChange={() => {
                      if (q.type === "multi") {
                        const cur = Array.isArray(value) ? value : [];
                        setAnswer(q.id, checked ? cur.filter((x) => x !== i) : [...cur, i].sort((a, b) => a - b));
                      } else {
                        setAnswer(q.id, [i]);
                      }
                    }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
            {q.type === "multi" && <div className="att-muted att-small">{t("att.runner.multiHint")}</div>}
          </div>
        )}
      </div>

      <Alert>{error}</Alert>

      <div className="att-runner-actions">
        <button className="att-btn" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          <ChevronLeft size={16} /> {t("att.runner.prev")}
        </button>
        {index < questions.length - 1 ? (
          <button className="att-btn" onClick={() => setIndex(index + 1)}>
            {t("att.runner.next")} <ChevronRight size={16} />
          </button>
        ) : (
          <span />
        )}
        <button className="att-btn att-btn-primary" disabled={submitting} onClick={() => setConfirmOpen(true)}>
          <CircleCheck size={16} /> {submitting ? t("att.common.loading") : t("att.runner.finish")}
        </button>
      </div>

      {confirmOpen && (
        <Modal title={t("att.runner.confirmTitle")} onClose={() => setConfirmOpen(false)}>
          <p>
            {answeredCount < questions.length
              ? t("att.runner.confirmUnanswered").replace("{n}", questions.length - answeredCount)
              : t("att.runner.confirmAll")}
          </p>
          <p className="att-muted">{t("att.runner.confirmNote")}</p>
          <div className="att-modal-actions">
            <button className="att-btn" onClick={() => setConfirmOpen(false)}>
              {t("att.common.cancel")}
            </button>
            <button className="att-btn att-btn-primary" onClick={submit}>
              {t("att.runner.finish")}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExamRunner;
