import { useState } from "react";
import "./Settings.css";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";

function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const [name, setName] = useState(t("app.profileName"));
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const Icon = icons.settings;

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="settings-page">
      <h1>
        <Icon size={26} strokeWidth={1.75} className="page-icon" />
        {t("settings.title")}
      </h1>
      <p className="page-subtitle">{t("settings.subtitle")}</p>

      <form className="settings-form" onSubmit={handleSave}>
        <label>
          {t("settings.name")}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          {t("settings.language")}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
          </select>
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          {t("settings.notifications")}
        </label>

        <button type="submit" className="save-btn">
          {t("settings.save")}
        </button>

        {saved && <span className="saved-msg">{t("settings.saved")}</span>}
      </form>
    </div>
  );
}

export default Settings;
