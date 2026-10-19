import { CircleCheck, CircleX, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function ResultCard({ result, title, compact = false }) {
  const { t } = useLanguage();

  if (!result || result.hidden) {
    return (
      <div className={`att-card att-result ${compact ? "compact" : ""}`}>
        {title && <div className="att-result-title">{title}</div>}
        <div className="att-result-status neutral">
          <CircleCheck size={22} /> {t("att.result.submitted")}
        </div>
        <p className="att-muted">{t("att.result.hiddenNote")}</p>
      </div>
    );
  }

  const state = result.needsReview ? "review" : result.passed ? "pass" : "fail";
  const Icon = state === "pass" ? CircleCheck : state === "fail" ? CircleX : Clock;

  return (
    <div className={`att-card att-result ${compact ? "compact" : ""}`}>
      {title && <div className="att-result-title">{title}</div>}
      <div className={`att-result-status ${state}`}>
        <Icon size={22} /> {t(`att.result.${state}`)}
      </div>
      <div className="att-result-score">
        <strong>{result.percent}%</strong>
        <span className="att-muted">
          {result.score} / {result.maxScore} {t("att.common.points")} · {t("att.result.passMark")}{" "}
          {result.passPercent}%
        </span>
      </div>
      {result.needsReview && <p className="att-muted">{t("att.result.reviewNote")}</p>}
    </div>
  );
}

export default ResultCard;
