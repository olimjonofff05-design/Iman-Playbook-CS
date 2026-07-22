import "./OfferPage.css";
import { documents } from "../data/documents";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";

function OfferPage() {
  const { language, t } = useLanguage();
  const Icon = icons.offer;

  return (
    <div className="offer-page">
      <div className="page-header">
        <h1>
          <Icon size={28} strokeWidth={1.75} className="page-icon" />
          {t("offer.title")}
        </h1>
      </div>

      <p className="page-subtitle">{t("offer.subtitle")}</p>

      {documents.length === 0 ? (
        <div className="empty-state">
          <p>{t("offer.emptyState")}</p>
        </div>
      ) : (
        <div className="documents-list">
          {documents.map((doc) => (
            <div className="document-card" key={doc.id}>
              <div className="document-icon">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <div className="document-info">
                <h3>{doc.title?.[language] ?? doc.title}</h3>
                {doc.description && (
                  <p>{doc.description?.[language] ?? doc.description}</p>
                )}
              </div>
              <div className="document-actions">
                <a href={doc.file} target="_blank" rel="noopener noreferrer">
                  {t("offer.view")}
                </a>
                <a href={doc.file} download>
                  {t("offer.download")}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OfferPage;
