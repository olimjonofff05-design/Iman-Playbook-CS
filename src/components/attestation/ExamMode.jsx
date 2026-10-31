import { useEffect } from "react";
import { Lock, ShieldAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { clearLock, setLock, TAB_ID } from "../../attestation/examLock";
import ExamRunner from "./ExamRunner";
import LoginCard from "./LoginCard";
import { Spinner } from "./shared";
import ImanMark from "../ImanMark";
import "./Attestation.css";

// Imtihon rejimi: playbookning menyusi, qidiruvi va sahifalari umuman ko'rsatilmaydi.
// Faqat imtihon oynasi qoladi. Qulf olinmaguncha (topshirish yoki vaqt tugashi) shunday turadi.
function ExamMode({ lock }) {
  const { user, checking, isAdmin } = useAuth();
  const { t } = useLanguage();

  // Imtihon topshirilgan-u, sahifa keyin yangilangan bo'lsa — qulf endi kerak emas
  useEffect(() => {
    if (lock.submitted) clearLock();
    // faqat oyna ochilganda tekshiriladi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boshqa xodim yoki admin kirgan bo'lsa, bu qulf unga tegishli emas
  useEffect(() => {
    if (user && lock.userId && String(user.id) !== String(lock.userId)) clearLock();
  }, [user, lock.userId]);

  // Qulfni hozirgi oynaga biriktirish (birinchi ochilgan oyna egasi bo'ladi)
  useEffect(() => {
    if (!lock.owner) setLock({ attemptId: lock.attemptId, owner: TAB_ID });
  }, [lock.owner, lock.attemptId]);

  let body;
  if (checking) {
    body = <Spinner label={t("att.common.loading")} />;
  } else if (!user) {
    body = (
      <>
        <div className="att-exam-mode-note">{t("att.examMode.loginToContinue")}</div>
        <LoginCard />
      </>
    );
  } else if (isAdmin) {
    body = (
      <div className="att-card att-empty">
        <ShieldAlert size={26} />
        <div>
          <strong>{t("att.examMode.adminTitle")}</strong>
          <p className="att-muted">{t("att.examMode.adminText")}</p>
          <button className="att-btn att-btn-primary" onClick={clearLock}>
            {t("att.examMode.adminUnlock")}
          </button>
        </div>
      </div>
    );
  } else if (lock.owner && lock.owner !== TAB_ID) {
    body = (
      <div className="att-card att-empty">
        <Lock size={26} />
        <div>
          <strong>{t("att.examMode.otherTabTitle")}</strong>
          <p className="att-muted">{t("att.examMode.otherTabText")}</p>
          <button
            className="att-btn att-btn-primary"
            onClick={() => setLock({ attemptId: lock.attemptId, owner: TAB_ID })}
          >
            {t("att.examMode.continueHere")}
          </button>
        </div>
      </div>
    );
  } else {
    body = <ExamRunner key={lock.attemptId} attemptId={lock.attemptId} onExit={clearLock} />;
  }

  return (
    <div className="att-exam-mode">
      <header className="att-exam-mode-head">
        <div className="att-exam-mode-brand">
          <span className="brand-badge att-exam-mode-logo">
            <ImanMark size={22} title="IMANUM" />
          </span>
          <div>
            <strong>{t("att.examMode.title")}</strong>
            <span>{t("att.examMode.subtitle")}</span>
          </div>
        </div>
        <div className="att-exam-mode-lock">
          <Lock size={15} /> {t("att.examMode.locked")}
        </div>
      </header>
      <main className="att-exam-mode-body">{body}</main>
    </div>
  );
}

export default ExamMode;
