import { useEffect, useState } from "react";
import { Lock, LogOut, RotateCcw, UserCog, Clock, FileQuestion } from "lucide-react";
import { api } from "../../attestation/api";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { icons } from "../../icons";
import LoginCard from "./LoginCard";
import { setLock } from "../../attestation/examLock";
import ResultCard from "./ResultCard";
import { Alert, LevelBadge, Spinner } from "./shared";
import { errorText, fmtDate } from "../../attestation/format";
import "./Attestation.css";

function PageHeader({ children }) {
  const { t } = useLanguage();
  const Icon = icons.attestation;
  return (
    <div className="att-page-header">
      <div>
        <h1>
          <span className="att-page-icon">
            <Icon size={26} strokeWidth={1.75} />
          </span>
          {t("att.page.title")}
        </h1>
        <p className="att-muted">{t("att.page.subtitle")}</p>
      </div>
      {children}
    </div>
  );
}

function SessionChip() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  return (
    <div className="att-session">
      <div>
        <div className="att-session-name">{user.fullName}</div>
        <div className="att-muted att-small">
          {user.role === "admin" ? t("att.common.admin") : <LevelBadge level={user.level} t={t} />}
        </div>
      </div>
      <button className="att-icon-btn" title={t("att.common.logout")} onClick={logout}>
        <LogOut size={18} />
      </button>
    </div>
  );
}

function EmployeeHome() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [reloadKey, setReloadKey] = useState(0);
  const load = () => setReloadKey((k) => k + 1);

  useEffect(() => {
    api
      .exam("list")
      .then((d) => {
        setData(d);
        setError("");
      })
      .catch((err) => setError(errorText(err, t)));
  }, [reloadKey, t]);

  return (
    <>
      <PageHeader>
        <SessionChip />
      </PageHeader>
      <Alert>{error}</Alert>
      {!data && !error && <Spinner label={t("att.common.loading")} />}

      {data && (
        <>
          <div className="att-section-head">
            <h2>{t("att.page.available")}</h2>
            <button className="att-btn att-btn-ghost" onClick={load}>
              <RotateCcw size={15} /> {t("att.common.refresh")}
            </button>
          </div>

          {data.available.length === 0 ? (
            <div className="att-card att-empty">
              <Lock size={26} strokeWidth={1.75} />
              <div>
                <strong>{t("att.page.noAccessTitle")}</strong>
                <p className="att-muted">{t("att.page.noAccessText")}</p>
              </div>
            </div>
          ) : (
            <div className="att-grid">
              {data.available.map((e) => (
                <div key={e.attemptId} className="att-card att-exam-card">
                  <div className="att-exam-card-top">
                    <LevelBadge level={e.level} t={t} />
                    {e.status === "in_progress" && (
                      <span className="att-badge att-badge-warn">{t("att.status.in_progress")}</span>
                    )}
                  </div>
                  <h3>{e.title}</h3>
                  {e.description && <p className="att-muted att-pre">{e.description}</p>}
                  <div className="att-exam-facts">
                    <span>
                      <FileQuestion size={15} /> {e.questionCount} {t("att.common.questionsShort")}
                    </span>
                    <span>
                      <Clock size={15} /> {e.durationMin} {t("att.common.minutes")}
                    </span>
                  </div>
                  {e.status === "granted" && <p className="att-small att-muted">{t("att.page.startWarning")}</p>}
                  <button className="att-btn att-btn-primary" onClick={() => setLock({ attemptId: e.attemptId, deadline: e.deadline, userId: user.id })}>
                    {e.status === "in_progress" ? t("att.page.continue") : t("att.page.start")}
                  </button>
                </div>
              ))}
            </div>
          )}

          {data.history.length > 0 && (
            <>
              <div className="att-section-head">
                <h2>{t("att.page.history")}</h2>
              </div>
              <div className="att-grid">
                {data.history.map((h) => (
                  <div key={h.attemptId}>
                    <ResultCard result={h.result} title={h.title} compact />
                    <div className="att-small att-muted att-history-date">{fmtDate(h.submittedAt)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

function AttestationPage({ setPage }) {
  const { user, checking, isAdmin } = useAuth();
  const { t } = useLanguage();

  if (checking) return <Spinner label={t("att.common.loading")} />;

  if (!user) {
    return (
      <div className="att-page">
        <PageHeader />
        <LoginCard />
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="att-page">
        <PageHeader>
          <SessionChip />
        </PageHeader>
        <div className="att-card att-empty">
          <UserCog size={26} strokeWidth={1.75} />
          <div>
            <strong>{t("att.page.adminTitle")}</strong>
            <p className="att-muted">{t("att.page.adminText")}</p>
            <button className="att-btn att-btn-primary" onClick={() => setPage?.("admin")}>
              {t("att.page.openAdmin")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="att-page">
      <EmployeeHome />
    </div>
  );
}

export default AttestationPage;
