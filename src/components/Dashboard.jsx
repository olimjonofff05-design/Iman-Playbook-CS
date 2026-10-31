import "./Dashboard.css";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { NAV_GROUPS, TINTS } from "../navigation";
import { searchIndex } from "../data/searchIndex";
import ImanMark from "./ImanMark";

// Dashboard'da "Asosiy" guruhi bo'lmaydi: Playbook (tezkor) vositalar boshiga o'tadi
const GROUPS = [
  { key: "products", items: NAV_GROUPS.find((g) => g.key === "products").items },
  { key: "tools", items: ["playbookTabs", ...NAV_GROUPS.find((g) => g.key === "tools").items] },
  { key: "growth", items: NAV_GROUPS.find((g) => g.key === "growth").items },
];

// Har bir sahifadagi savol-javoblar soni (kartadagi nishon uchun)
const QUESTION_COUNTS = searchIndex.reduce((acc, item) => {
  acc[item.page] = (acc[item.page] ?? 0) + 1;
  return acc;
}, {});

const STATS = {
  products: NAV_GROUPS.find((g) => g.key === "products").items.length,
  questions: searchIndex.length,
  tools: GROUPS[1].items.length,
};

function greetingKey() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

// Sichqoncha ortidan yuruvchi yorug'lik effekti
function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Dashboard({ setPage }) {
  const { t } = useLanguage();
  let index = 0;

  return (
    <div className="dashboard">
      <section className="dashboard-hero">
        <div className="hero-glow hero-glow-1" aria-hidden="true" />
        <div className="hero-glow hero-glow-2" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="dashboard-hero-text">
          <span className="dashboard-hero-eyebrow">
            <span className="hero-wave" aria-hidden="true">👋</span>
            {t(`dashboard.${greetingKey()}`)}
          </span>
          <h1>{t("dashboard.title")}</h1>
          <p>{t("dashboard.subtitle")}</p>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{STATS.products}</strong>
              <span>{t("dashboard.statProducts")}</span>
            </div>
            <div className="hero-stat">
              <strong>{STATS.questions}</strong>
              <span>{t("dashboard.statQuestions")}</span>
            </div>
            <div className="hero-stat">
              <strong>{STATS.tools}</strong>
              <span>{t("dashboard.statTools")}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-hero-logo-wrap" aria-hidden="true">
          <span className="hero-ring" />
          <span className="dashboard-hero-logo">
            <ImanMark size={52} />
          </span>
        </div>
      </section>

      {GROUPS.map((group) => (
        <section key={group.key} className="dash-group">
          <h2 className="dash-group-title">{t(`menuGroups.${group.key}`)}</h2>
          <div className="cards">
            {group.items.map((key) => {
              const Icon = icons[key];
              const count = QUESTION_COUNTS[key];
              const delay = index++ * 0.035;
              return (
                <button
                  key={key}
                  type="button"
                  className="card"
                  style={{ "--tint": TINTS[key], animationDelay: `${delay}s` }}
                  onMouseMove={trackSpotlight}
                  onClick={() => setPage && setPage(key)}
                >
                  <div className="card-top">
                    <div className="card-icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    {count ? (
                      <span className="card-count">
                        {count} {t("dashboard.questions")}
                      </span>
                    ) : (
                      <ArrowUpRight size={18} strokeWidth={2} className="card-arrow" />
                    )}
                  </div>
                  <h3>{t(`cards.${key}.title`)}</h3>
                  <p>{t(`cards.${key}.desc`)}</p>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Dashboard;
