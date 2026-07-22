import { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./PlaybookSection.css";

// items: [{ id, category: {uz, ru}, q: {uz, ru}, a: {uz, ru} }]
// alwaysOpen: agar true bo'lsa, kartalar yopilmaydi (masalan skriptlar uchun)
function PlaybookSection({ icon, title, subtitle, items, alwaysOpen = false }) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const localized = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        category: item.category?.[language] ?? item.category,
        q: item.q?.[language] ?? item.q,
        a: item.a?.[language] ?? item.a,
      })),
    [items, language]
  );

  const categories = useMemo(() => {
    const set = new Set(localized.map((i) => i.category).filter(Boolean));
    return Array.from(set);
  }, [localized]);

  const filtered = localized.filter((item) => {
    const q = query.toLowerCase();
    const matchesQuery =
      item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="playbook-page">
      <div className="page-header">
        <h1>
          {icon && <span className="page-icon">{icon}</span>}
          {title}
        </h1>

        <input
          className="search-box"
          type="text"
          placeholder={t("common.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {subtitle && <p className="page-subtitle">{subtitle}</p>}

      {categories.length > 0 && (
        <div className="category-tabs">
          <button
            className={activeCategory === "all" ? "active" : ""}
            onClick={() => setActiveCategory("all")}
          >
            {t("common.all")} ({localized.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>{t("common.emptyState")}</p>
        </div>
      ) : (
        <div className="faq-list">
          {filtered.map((item) => {
            const isOpen = alwaysOpen || openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-card ${isOpen ? "open" : ""} ${
                  alwaysOpen ? "static" : ""
                }`}
                onClick={() => !alwaysOpen && setOpenId(isOpen ? null : item.id)}
              >
                <h3>{item.q}</h3>
                {isOpen ? (
                  <p>{item.a}</p>
                ) : (
                  <p className="faq-preview">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PlaybookSection;
