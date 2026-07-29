import "./Header.css";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/iman-logo.png";

function Header({ onMenuClick }) {
  const { t } = useLanguage();
  const name = t("app.profileName");
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "A";

  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="menu-btn"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="logo">
          <img src={logo} alt="IMAN" className="logo-mark" />
          <div className="logo-text">
            <h2>{t("app.name")}</h2>
            <span>{t("app.subtitle")}</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <input
          className="search"
          type="text"
          placeholder={t("app.searchPlaceholder")}
        />

        <div className="profile">
          <div className="avatar">{initial}</div>
          <p>{name}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
