import { useState } from "react";
import "./OfferPage.css";
import { documents } from "../data/documents";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { ChevronDown } from "lucide-react";

const GROUP_ORDER = ["online", "offline", "invest", "lease-online", "lease-offline", "addendum"];

function DocumentCard({ doc, language, t, Icon }) {
  const hasFile = Boolean(doc.file);
  return (
    <div className="document-card">
      <div className="document-icon">
        <Icon size={24} strokeWidth={1.75} />
      </div>
      <div className="document-info">
        <h3>{doc.title?.[language] ?? doc.title}</h3>
        {doc.description && (
          <p>{doc.description?.[language] ?? doc.description}</p>
        )}
      </div>
      <div className="document-actions">
        {hasFile ? (
          <>
            <a href={doc.file} target="_blank" rel="noopener noreferrer">
              {t("offer.view")}
            </a>
            <a href={doc.file} download>
              {t("offer.download")}
            </a>
          </>
        ) : (
          <span className="document-pending">{t("offer.pending")}</span>
        )}
      </div>
    </div>
  );
}

function OfferPage() {
  const { language, t } = useLanguage();
  const Icon = icons.offer;
  const intro = t("offer.intro");
  const groupLabels = t("offer.groups");

  // Onlayn guruh sahifa ochilganda ochiq turadi, qolganlari yopiq.
  const [openGroup, setOpenGroup] = useState("online");

  const groups = GROUP_ORDER.map((key) => ({
    key,
    label: groupLabels?.[key] ?? key,
    docs: documents.filter((doc) => doc.group === key),
  })).filter((g) => g.docs.length > 0);

  return (
    <div className="offer-page">
      <div className="page-header">
        <h1>
          <Icon size={28} strokeWidth={1.75} className="page-icon" />
          {t("offer.title")}
        </h1>
      </div>

      <p className="page-subtitle">{t("offer.subtitle")}</p>

      {intro && (
        <div className="offer-intro">
          <h2>{intro.heading}</h2>
          <p>{intro.lead}</p>

          {Array.isArray(intro.bullets) && (
            <ul className="offer-intro-list">
              {intro.bullets.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}

          <p>{intro.afterBullets}</p>
          <p>{intro.smsNote}</p>
          <p>{intro.variantsLead}</p>

          {Array.isArray(intro.variants) && (
            <ol className="offer-intro-variants">
              {intro.variants.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ol>
          )}

          <p className="offer-intro-files-note">{intro.filesNote}</p>
        </div>
      )}

      {documents.length === 0 ? (
        <div className="empty-state">
          <p>{t("offer.emptyState")}</p>
        </div>
      ) : (
        <div className="offer-groups">
          {groups.map((group) => {
            const isOpen = openGroup === group.key;
            return (
              <div
                className={`offer-group ${isOpen ? "open" : ""}`}
                key={group.key}
              >
                <button
                  type="button"
                  className="offer-group-header"
                  onClick={() => setOpenGroup(isOpen ? null : group.key)}
                  aria-expanded={isOpen}
                >
                  <span>{group.label}</span>
                  <ChevronDown size={20} strokeWidth={2} className="offer-group-chevron" />
                </button>

                {isOpen && (
                  <div className="documents-list">
                    {group.docs.map((doc) => (
                      <DocumentCard
                        key={doc.id}
                        doc={doc}
                        language={language}
                        t={t}
                        Icon={Icon}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OfferPage;
