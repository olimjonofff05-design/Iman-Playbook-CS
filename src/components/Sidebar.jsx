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
  "qa",
  "settings",
];

function Sidebar({ page, setPage, isOpen = false, onClose }) {
  const { t } = useLanguage();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <h3>Menu</h3>
          <button
            type="button"
            className="sidebar-close"
            aria-label="Close menu"
            onClick={onClose}
          >
            ×
          </button>
        </div>

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
    </>
  );
}

export default Sidebar;
