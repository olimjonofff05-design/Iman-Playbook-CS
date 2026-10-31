import "./Sidebar.css";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { icons } from "../icons";

const MENU_KEYS = [
  "dashboard",
  "playbookTabs",
  "about",
  "imanum",
  "bnpl",
  "invest",
  "investCalc",
  "workDays",
  "kvadrat",
  "ident",
  "scripts",
  "offer",
  "attestation",
  "admin",
  "qa",
  "settings",
];

function Sidebar({ page, setPage, isOpen = false, onClose }) {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  // Admin panel faqat admin sifatida kirilganda ko'rinadi
  const keys = MENU_KEYS.filter((key) => key !== "admin" || isAdmin);

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      <nav className={`sidebar ${isOpen ? "open" : ""}`} aria-label="Menu">
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
          {keys.map((key) => {
            const Icon = icons[key];
            return (
              <li
                key={key}
                className={page === key ? "active" : ""}
                role="button"
                tabIndex={0}
                aria-current={page === key ? "page" : undefined}
                onClick={() => setPage(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPage(key);
                  }
                }}
              >
                <Icon size={18} strokeWidth={1.75} className="menu-icon" />
                <span>{t(`menu.${key}`)}</span>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">{t("app.owner")}</div>
      </nav>
    </>
  );
}

export default Sidebar;
