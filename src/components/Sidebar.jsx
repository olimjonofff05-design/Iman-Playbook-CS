import "./Sidebar.css";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { icons } from "../icons";
import { NAV_GROUPS } from "../navigation";
import ImanMark from "./ImanMark";

function Sidebar({ page, setPage, isOpen = false, onClose }) {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  // Admin panel faqat admin sifatida kirilganda ko'rinadi
  const groups = NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((key) => key !== "admin" || isAdmin),
  }));

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      <nav className={`sidebar ${isOpen ? "open" : ""}`} aria-label="Menu">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <span className="brand-badge sidebar-brand-badge">
              <ImanMark size={18} />
            </span>
            <span>{t("app.name")}</span>
          </div>
          <button
            type="button"
            className="sidebar-close"
            aria-label="Close menu"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {groups.map((group) => (
          <div key={group.key} className="sidebar-group">
            <h3>{t(`menuGroups.${group.key}`)}</h3>
            <ul>
              {group.items.map((key) => {
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
                    <Icon size={18} strokeWidth={1.8} className="menu-icon" />
                    <span>{t(`menu.${key}`)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="sidebar-footer">{t("app.owner")}</div>
      </nav>
    </>
  );
}

export default Sidebar;
