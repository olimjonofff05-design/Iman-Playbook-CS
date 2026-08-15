import { useMemo, useState, useRef, useEffect } from "react";
import "./Header.css";
import { useLanguage } from "../context/LanguageContext";
import { searchIndex } from "../data/searchIndex";
import logo from "../assets/iman-logo.png";

function Header({ onMenuClick, setPage }) {
  const { t, language } = useLanguage();
  const name = t("app.profileName");
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "A";

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return searchIndex
      .filter((item) => {
        const question = (item.q?.[language] ?? item.q ?? "").toLowerCase();
        const answer = (item.a?.[language] ?? item.a ?? "").toLowerCase();
        return question.includes(q) || answer.includes(q);
      })
      .slice(0, 8);
  }, [query, language]);

  function goTo(page) {
    setPage?.(page);
    setQuery("");
    setOpen(false);
  }

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
        <div className="search-box-wrap" ref={boxRef}>
          <input
            className="search"
            type="text"
            placeholder={t("app.searchPlaceholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />

          {open && query.trim().length >= 2 && (
            <div className="search-dropdown">
              {results.length === 0 ? (
                <div className="search-empty">{t("common.emptyState")}</div>
              ) : (
                results.map((item) => (
                  <button
                    key={`${item.page}-${item.id}`}
                    className="search-result"
                    onClick={() => goTo(item.page)}
                  >
                    <span className="search-result-page">{t(`menu.${item.page}`)}</span>
                    <span className="search-result-q">{item.q?.[language] ?? item.q}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="profile" title={name}>
          <div className="avatar">{initial}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
