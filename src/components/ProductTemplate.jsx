import { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./PlaybookSection.css";
import "./ProductTemplate.css";

// Yagona mahsulot sahifasi shabloni: 1) Umumiy tavsif 2) Shartlar
// 3) Qanday ishlaydi 4) Cheklovlar va istisnolar 5) FAQ
//
// overview: { lastUpdated, banner: {uz,ru}|null, generalDescription: {uz,ru},
//             conditions: {uz:[],ru:[]}, howItWorks: {uz:[],ru:[]}, restrictions: {uz:[],ru:[]} }
// faqItems: mavjud PlaybookSection formatidagi massiv — [{ id, category, q, a }]
function ProductTemplate({ icon, title, subtitle, overview, faqItems }) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const localizedFaq = useMemo(
    () =>
      faqItems.map((item) => ({
        id: item.id,
        category: item.category?.[language] ?? item.category,
        q: item.q?.[language] ?? item.q,
        a: item.a?.[language] ?? item.a,
      })),
    [faqItems, language]
  );

  const categories = useMemo(() => {
    const set = new Set(localizedFaq.map((i) => i.category).filter(Boolean));
    return Array.from(set);
  }, [localizedFaq]);

  const filtered = localizedFaq.filter((item) => {
    const q = query.toLowerCase();
    const matchesQuery =
      item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const banner = overview.banner?.[language] ?? overview.banner;
  const generalDescription =
    overview.generalDescription?.[language] ?? overview.generalDescription;
  const conditions = overview.conditions?.[language] ?? overview.conditions;
  const howItWorks = overview.howItWorks?.[language] ?? overview.howItWorks;
  const restrictions = overview.restrictions?.[language] ?? overview.restrictions;

  return (
    <div className="playbook-page product-page">
      <div className="page-header">
        <h1>
          {icon && <span className="page-icon">{icon}</span>}
          {title}
        </h1>
      </div>

      {subtitle && <p className="page-subtitle">{subtitle}</p>}

      <div className="product-meta">
        {overview.lastUpdated && (
          <span className="product-updated">
            {t("common.lastUpdated")}: {overview.lastUpdated}
          </span>
        )}
      </div>

      {banner && <div className="product-banner">{banner}</div>}

      {generalDescription && (
        <section className="product-block">
          <h2>{t("common.blockGeneral")}</h2>
          <p>{generalDescription}</p>
        </section>
      )}

      {conditions?.length > 0 && (
        <section className="product-block">
          <h2>{t("common.blockConditions")}</h2>
          <ul className="product-list">
            {conditions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {howItWorks?.length > 0 && (
        <section className="product-block">
          <h2>{t("common.blockHowItWorks")}</h2>
          <ol className="product-steps">
            {howItWorks.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </section>
      )}

      {restrictions?.length > 0 && (
        <section className="product-block product-block-restrictions">
          <h2>{t("common.blockRestrictions")}</h2>
          <ul className="product-list">
            {restrictions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="product-block product-block-faq">
        <div className="product-faq-header">
          <h2>{t("common.blockFaq")}</h2>
          <input
            className="search-box"
            type="text"
            placeholder={t("common.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {categories.length > 0 && (
          <div className="category-tabs">
            <button
              className={activeCategory === "all" ? "active" : ""}
              onClick={() => setActiveCategory("all")}
            >
              {t("common.all")} ({localizedFaq.length})
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
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`faq-card ${isOpen ? "open" : ""}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
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
      </section>
    </div>
  );
}

export default ProductTemplate;
