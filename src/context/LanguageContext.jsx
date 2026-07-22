import { createContext, useContext, useState, useEffect } from "react";
import { ui } from "../i18n/ui";

const LanguageContext = createContext(null);

const STORAGE_KEY = "iman-playbook-language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "ru" || saved === "uz" ? saved : "uz";
    } catch {
      return "uz";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // localStorage unavailable — ignore, language just won't persist
    }
  }, [language]);

  function t(path) {
    const keys = path.split(".");
    let node = ui[language];
    for (const key of keys) {
      node = node?.[key];
    }
    return node ?? path;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
