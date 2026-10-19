import { useEffect } from "react";
import { X } from "lucide-react";

export function LevelBadge({ level, t }) {
  return <span className={`att-badge att-badge-${level}`}>{t(`att.levels.${level}`)}</span>;
}

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="att-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={`att-modal ${wide ? "att-modal-wide" : ""}`} role="dialog" aria-modal="true">
        <div className="att-modal-head">
          <h3>{title}</h3>
          {onClose && (
            <button type="button" className="att-icon-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          )}
        </div>
        <div className="att-modal-body">{children}</div>
      </div>
    </div>
  );
}

export function Alert({ kind = "error", children }) {
  if (!children) return null;
  return <div className={`att-alert att-alert-${kind}`}>{children}</div>;
}

export function Spinner({ label }) {
  return (
    <div className="att-loading">
      <span className="att-spinner" />
      {label}
    </div>
  );
}
