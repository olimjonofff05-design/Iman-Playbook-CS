import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { changelog } from "../data/changelog";
import "./WhatsNew.css";

const SEEN_KEY = "iman-playbook-last-seen-changelog";

function WhatsNew() {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hasUnseen, setHasUnseen] = useState(() => {
    const lastSeen = localStorage.getItem(SEEN_KEY);
    const latestId = changelog[0]?.id;
    return Boolean(latestId) && lastSeen !== latestId;
  });
  const boxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleOpen() {
    setOpen((prev) => {
      const next = !prev;
      if (next && changelog[0]) {
        localStorage.setItem(SEEN_KEY, changelog[0].id);
        setHasUnseen(false);
      }
      return next;
    });
  }

  return (
    <div className="whats-new" ref={boxRef}>
      <button
        type="button"
        className="whats-new-btn"
        onClick={toggleOpen}
        aria-label={t("app.whatsNew")}
        title={t("app.whatsNew")}
      >
        <Info size={20} strokeWidth={1.9} />
        {hasUnseen && <span className="whats-new-dot" />}
      </button>

      {open && (
        <div className="whats-new-panel">
          <div className="whats-new-header">{t("app.whatsNew")}</div>
          <div className="whats-new-list">
            {changelog.map((entry) => {
              const localized = entry[language] ?? entry.uz;
              return (
                <div key={entry.id} className="whats-new-entry">
                  <div className="whats-new-date">{entry.date}</div>
                  <div className="whats-new-title">{localized.title}</div>
                  <ul>
                    {localized.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatsNew;
