import "./Dashboard.css";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import logo from "../assets/iman-logo.png";

const CARD_KEYS = ["playbookTabs", "about", "imanum", "bnpl", "invest", "investCalc", "workDays", "kvadrat", "scripts", "offer", "ident", "attestation", "qa"];

function Dashboard({ setPage }) {
  const { t } = useLanguage();

  return (
    <div className="dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-hero-text">
          <span className="dashboard-hero-eyebrow">{t("app.subtitle")}</span>
          <h1>{t("dashboard.title")}</h1>
          <p>{t("dashboard.subtitle")}</p>
        </div>
        <img src={logo} alt="" className="dashboard-hero-logo" aria-hidden="true" />
      </section>

      <div className="cards">
        {CARD_KEYS.map((key) => {
          const Icon = icons[key];
          return (
            <button
              key={key}
              type="button"
              className="card"
              onClick={() => setPage && setPage(key)}
            >
              <div className="card-top">
                <div className="card-icon">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <ArrowUpRight size={18} strokeWidth={2} className="card-arrow" />
              </div>
              <h3>{t(`cards.${key}.title`)}</h3>
              <p>{t(`cards.${key}.desc`)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
