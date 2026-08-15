import "./Dashboard.css";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";

const CARD_KEYS = ["about", "imanum", "bnpl", "invest", "kvadrat", "scripts", "offer", "playbookTabs", "qa"];

function Dashboard({ setPage }) {
  const { t } = useLanguage();

  return (
    <div className="dashboard">
      <h1>{t("dashboard.title")}</h1>

      <p>{t("dashboard.subtitle")}</p>

      <div className="cards">
        {CARD_KEYS.map((key) => {
          const Icon = icons[key];
          return (
            <div
              key={key}
              className="card"
              onClick={() => setPage && setPage(key)}
            >
              <div className="card-icon">
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <h3>{t(`cards.${key}.title`)}</h3>
              <p>{t(`cards.${key}.desc`)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
