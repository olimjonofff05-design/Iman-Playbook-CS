import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";

import { bnplOverview } from "../data/bnplOverview";
import { investOverview } from "../data/investOverview";
import { kvadratOverview } from "../data/kvadratOverview";
import { imanumOverview } from "../data/imanumOverview";
import { aboutOverview } from "../data/aboutOverview";

import "./PlaybookSection.css";
import "./ProductTemplate.css";
import "./PlaybookTabs.css";

// MUHIM: bu yerda hech qanday matn qayta yozilmaydi — har bir mahsulotning
// overview fayli (bnplOverview.js va h.k.) to'g'ridan-to'g'ri import qilinadi.
// Shu sababli bu tezkor shpargalka bilan mahsulot sahifasi orasida hech qachon
// tafovut (расхождение) bo'lmaydi — ikkalasi bitta manbadan o'qiydi.
const PRODUCTS = [
  { key: "bnpl", overview: bnplOverview },
  { key: "invest", overview: investOverview },
  { key: "kvadrat", overview: kvadratOverview },
  { key: "imanum", overview: imanumOverview },
  { key: "about", overview: aboutOverview },
];

function PlaybookTabs() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(PRODUCTS[0].key);

  const current = PRODUCTS.find((p) => p.key === active);
  const overview = current.overview;
  const conditions = overview.conditions?.[language] ?? overview.conditions;
  const howItWorks = overview.howItWorks?.[language] ?? overview.howItWorks;
  const restrictions = overview.restrictions?.[language] ?? overview.restrictions;

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
              onClick={() => setActive(p.key)}
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
    </div>
  );
}

export default PlaybookTabs;
