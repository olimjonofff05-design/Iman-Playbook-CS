import "./PageLoader.css";

// Sahifa yuklanayotganda ko'rinadigan skelet (bo'sh ekran o'rniga)
function PageLoader() {
  return (
    <div className="page-loader" aria-busy="true" aria-live="polite">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="page-loader-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    </div>
  );
}

export default PageLoader;
