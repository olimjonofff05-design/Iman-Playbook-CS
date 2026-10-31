import { useMemo, useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import "./Header.css";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { TINTS } from "../navigation";
import WhatsNew from "./WhatsNew";
import ThemeToggle from "./ThemeToggle";
import ImanMark from "./ImanMark";

function Header({ onMenuClick, setPage }) {
  const { t, language } = useLanguage();
  const name = t("app.profileName");
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "A";

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(null);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  // Qidiruv ma'lumotlari faqat qidiruvdan foydalanilganda yuklanadi
  function loadIndex() {
    if (searchIndex) return;
    import("../data/searchIndex").then((m) => setSearchIndex(m.searchIndex));
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    // "/" tugmasi qidiruvga fokus beradi, Esc yopadi
    function handleKey(e) {
      const tag = e.target.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && !e.target.isContentEditable) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2 || !searchIndex) return [];
    return searchIndex
      .filter((item) => {
        const question = (item.q?.[language] ?? item.q ?? "").toLowerCase();
        const answer = (item.a?.[language] ?? item.a ?? "").toLowerCase();
        return question.includes(q) || answer.includes(q);
      })
      .slice(0, 8);
  }, [query, language, searchIndex]);

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

        <div className="logo" onClick={() => goTo("dashboard")}>
          <span className="logo-mark brand-badge">
            <ImanMark size={24} title="IMANUM" />
          </span>
          <div className="logo-text">
            <h2>{t("app.name")}</h2>
            <span>{t("app.subtitle")}</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box-wrap" ref={boxRef}>
          <Search size={16} strokeWidth={2} className="search-icon" />
          <input
            ref={inputRef}
            className="search"
            type="search"
            aria-label={t("app.searchPlaceholder")}
            placeholder={t("app.searchPlaceholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              loadIndex();
              setOpen(true);
            }}
          />
          {!query && <kbd className="search-kbd">/</kbd>}

          {open && searchIndex && query.trim().length >= 2 && (
            <div className="search-dropdown">
              {results.length === 0 ? (
                <div className="search-empty">{t("common.emptyState")}</div>
              ) : (
                results.map((item) => {
                  const Icon = icons[item.page];
                  return (
                    <button
                      key={`${item.page}-${item.id}`}
                      type="button"
                      className="search-result"
                      style={{ "--tint": TINTS[item.page] }}
                      onClick={() => goTo(item.page)}
                    >
                      <span className="search-result-icon">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <span className="search-result-body">
                        <span className="search-result-page">{t(`menu.${item.page}`)}</span>
                        <span className="search-result-q">{item.q?.[language] ?? item.q}</span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        <ThemeToggle />

        <WhatsNew />

        <div className="profile" title={name}>
          <div className="avatar">{initial}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
