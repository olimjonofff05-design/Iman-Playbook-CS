import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";

import { bnplOverview } from "../data/bnplOverview";
import { investOverview } from "../data/investOverview";
import { kvadratOverview } from "../data/kvadratOverview";
import { imanumOverview } from "../data/imanumOverview";
import { aboutOverview } from "../data/aboutOverview";

import { bnplData } from "../data/bnplData";
import { investData } from "../data/investData";
import { kvadratData } from "../data/kvadratData";
import { imanumData } from "../data/imanumData";
import { aboutData } from "../data/aboutData";

import "./PlaybookSection.css";
import "./ProductTemplate.css";
import "./PlaybookTabs.css";

// MUHIM: bu yerda hech qanday matn qayta yozilmaydi — har bir mahsulotning
// overview va FAQ fayllari (bnplOverview.js, bnplData.js va h.k.) to'g'ridan-to'g'ri
// import qilinadi. Shu sababli bu tezkor shpargalka bilan mahsulot sahifasi orasida
// hech qachon tafovut (расхождение) bo'lmaydi — ikkalasi bitta manbadan o'qiydi.
const PRODUCTS = [
  { key: "bnpl", overview: bnplOverview, faq: bnplData },
  { key: "invest", overview: investOverview, faq: investData },
  { key: "kvadrat", overview: kvadratOverview, faq: kvadratData },
  { key: "imanum", overview: imanumOverview, faq: imanumData },
  { key: "about", overview: aboutOverview, faq: aboutData },
];

function PlaybookTabs() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(PRODUCTS[0].key);
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);

  const current = PRODUCTS.find((p) => p.key === active);
  const overview = current.overview;
  const conditions = overview.conditions?.[language] ?? overview.conditions;
  const howItWorks = overview.howItWorks?.[language] ?? overview.howItWorks;
  const restrictions = overview.restrictions?.[language] ?? overview.restrictions;

  const localizedFaq = current.faq.map((item) => ({
    id: item.id,
    category: item.category?.[language] ?? item.category,
    q: item.q?.[language] ?? item.q,
    a: item.a?.[language] ?? item.a,
  }));

  const filteredFaq = localizedFaq.filter((item) => {
    const q = faqQuery.toLowerCase();
    return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
  });

  function selectTab(key) {
    setActive(key);
    setFaqQuery("");
    setOpenFaqId(null);
  }

  return (
    <div className="playbook-page playbook-tabs-page">
      <div className="page-header">
        <h1>
          <span className="page-icon">
            {(() => {
              const Icon = icons.playbookTabs;
              return <Icon size={28} strokeWidth={1.75} />;
            })()}
          </span>
          {t("pages.playbookTabs.title")}
        </h1>
      </div>
      <p className="page-subtitle">{t("pages.playbookTabs.subtitle")}</p>

      <div className="playbook-tabs-bar">
        {PRODUCTS.map((p) => {
          const Icon = icons[p.key];
          return (
            <button
              key={p.key}
              className={`playbook-tab-btn ${active === p.key ? "active" : ""}`}
              onClick={() => selectTab(p.key)}
            >
              <Icon size={16} strokeWidth={1.75} />
              {t(`menu.${p.key}`)}
            </button>
          );
        })}
      </div>

      <div className="product-meta">
        {overview.lastUpdated && (
          <span className="product-updated">
            {t("common.lastUpdated")}: {overview.lastUpdated}
          </span>
        )}
      </div>

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
            value={faqQuery}
            onChange={(e) => setFaqQuery(e.target.value)}
          />
        </div>

        {filteredFaq.length === 0 ? (
          <div className="empty-state">
            <p>{t("common.emptyState")}</p>
          </div>
        ) : (
          <div className="faq-list">
            {filteredFaq.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className={`faq-card ${isOpen ? "open" : ""}`}
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                >
                  <h3>{item.q}</h3>
                  {isOpen ? <p>{item.a}</p> : <p className="faq-preview">{item.a}</p>}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default PlaybookTabs;
