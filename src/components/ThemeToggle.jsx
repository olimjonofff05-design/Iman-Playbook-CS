import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./ThemeToggle.css";

const STORAGE_KEY = "iman-playbook-theme";

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// Kun / tun rejimini almashtiradi. Boshlang'ich qiymatni index.html dagi skript o'rnatadi
function ThemeToggle() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState(currentTheme);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme-switching", "");
    root.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage mavjud emas — tanlov faqat shu sessiya uchun
    }
    window.setTimeout(() => root.removeAttribute("data-theme-switching"), 500);
  }

  const label = theme === "dark" ? t("app.themeLight") : t("app.themeDark");

  return (
    <button
      type="button"
      className={`theme-toggle ${theme}`}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <Sun className="theme-icon theme-icon-sun" size={18} strokeWidth={2} />
      <Moon className="theme-icon theme-icon-moon" size={18} strokeWidth={2} />
    </button>
  );
}

export default ThemeToggle;
