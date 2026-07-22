import "./Sidebar.css";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";

const MENU_KEYS = [
  "dashboard",
  "about",
  "imanum",
  "bnpl",
  "invest",
  "kvadrat",
  "scripts",
  "offer",
  "settings",
];

function Sidebar({ page, setPage }) {
  const { t } = useLanguage();

  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <ul>
        {MENU_KEYS.map((key) => {
          const Icon = icons[key];
          return (
            <li
              key={key}
              className={page === key ? "active" : ""}
              onClick={() => setPage(key)}
            >
              <Icon size={18} strokeWidth={1.75} className="menu-icon" />
              <span>{t(`menu.${key}`)}</span>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">{t("app.owner")}</div>
    </div>
  );
}

export default Sidebar;
