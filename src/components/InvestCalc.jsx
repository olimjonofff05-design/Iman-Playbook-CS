import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import "./InvestCalc.css";

const EMPTY = { term: "", months: "", profit: "" };

// "179 796" yoki "179796,5" kabi yozuvni songa aylantiradi
function toNumber(value) {
  if (value === "" || value == null) return NaN;
  const clean = String(value).replace(/\s/g, "").replace(",", ".");
  return Number(clean);
}

// 102741 -> "102 741"
function formatSum(n) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// 42.857 -> "42,86%"
function formatPercent(n) {
  return n.toFixed(2).replace(".", ",") + "%";
}

function InvestCalc() {
  const { t } = useLanguage();
  const Icon = icons.investCalc;
  const [form, setForm] = useState(EMPTY);

  function handleChange(e) {
    const { name, value } = e.target;
    // faqat raqam, bo'sh joy, vergul va nuqtaga ruxsat
    if (/^[\d\s.,]*$/.test(value)) {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  const A = toNumber(form.term); // Qo'yilgan muddat
  const B = toNumber(form.months); // Necha oy turgani
  const C = toNumber(form.profit); // Umumiy foyda

  const allFilled = form.term !== "" && form.months !== "" && form.profit !== "";

  let error = "";
  if (allFilled) {
    if (!(A > 0)) error = t("pages.investCalc.errTerm");
    else if (B < 0 || Number.isNaN(B)) error = t("pages.investCalc.errMonths");
    else if (B > A) error = t("pages.investCalc.errMonthsGreater");
    else if (C < 0 || Number.isNaN(C)) error = t("pages.investCalc.errProfit");
  }

  const ready = allFilled && !error;

  // D = C * B / A   (Excel: =C2*B2/A2)
  // E = C - D       (Excel: =C2-D2)
  const D = ready ? Math.round((C * B) / A) : null;
  const E = ready ? C - D : null;
  const pD = ready && C > 0 ? (D / C) * 100 : 0;
  const pE = ready && C > 0 ? (E / C) * 100 : 0;

  return (
    <div className="calc-page">
      <div className="page-header">
        <h1>
          <span className="page-icon">
            <Icon size={28} strokeWidth={1.75} />
          </span>
          {t("pages.investCalc.title")}
        </h1>
      </div>
      <p className="page-subtitle">{t("pages.investCalc.subtitle")}</p>

      {/* Operator kiritadigan maydonlar */}
      <div className="calc-card">
        <div className="calc-card-title">{t("pages.investCalc.inputsTitle")}</div>

        <div className="calc-inputs">
          <label>
            <span className="calc-label">1. {t("pages.investCalc.term")}</span>
            <div className="calc-input-wrap">
              <input
                type="text"
                inputMode="numeric"
                name="term"
                value={form.term}
                onChange={handleChange}
                placeholder="7"
              />
              <span className="calc-suffix">{t("pages.investCalc.monthUnit")}</span>
            </div>
          </label>

          <label>
            <span className="calc-label">2. {t("pages.investCalc.months")}</span>
            <div className="calc-input-wrap">
              <input
                type="text"
                inputMode="numeric"
                name="months"
                value={form.months}
                onChange={handleChange}
                placeholder="4"
              />
              <span className="calc-suffix">{t("pages.investCalc.monthUnit")}</span>
            </div>
          </label>

          <label>
            <span className="calc-label">3. {t("pages.investCalc.profit")}</span>
            <div className="calc-input-wrap">
              <input
                type="text"
                inputMode="decimal"
                name="profit"
                value={form.profit}
                onChange={handleChange}
                placeholder="179 796"
              />
              <span className="calc-suffix">{t("pages.investCalc.currency")}</span>
            </div>
          </label>
        </div>

        <div className="calc-actions">
          <button type="button" className="calc-clear" onClick={() => setForm(EMPTY)}>
            {t("pages.investCalc.clear")}
          </button>
        </div>

        {error && <div className="calc-alert">{error}</div>}
      </div>

      {/* Avtomatik hisoblanadigan natijalar */}
      <div className="calc-card">
        <div className="calc-card-title">{t("pages.investCalc.resultsTitle")}</div>

        <div className="calc-results">
          <div className="calc-result calc-result-give">
            <span className="calc-label">4. {t("pages.investCalc.give")}</span>
            <strong>{ready ? formatSum(D) : "—"}</strong>
            <small>{t("pages.investCalc.giveFormula")}</small>
          </div>

          <div className="calc-result calc-result-keep">
            <span className="calc-label">5. {t("pages.investCalc.keep")}</span>
            <strong>{ready ? formatSum(E) : "—"}</strong>
            <small>{t("pages.investCalc.keepFormula")}</small>
          </div>
        </div>

        <div className="calc-percent">
          <span className="calc-label">6. {t("pages.investCalc.percent")}</span>

          <div className="calc-bar" aria-hidden="true">
            <div className="calc-bar-give" style={{ width: ready ? `${pD}%` : "0%" }} />
            <div className="calc-bar-keep" style={{ width: ready ? `${pE}%` : "0%" }} />
          </div>

          <div className="calc-percent-legend">
            <div>
              <i className="dot dot-give" />
              {t("pages.investCalc.givePercent")}: <b>{ready ? formatPercent(pD) : "—"}</b>
            </div>
            <div>
              <i className="dot dot-keep" />
              {t("pages.investCalc.keepPercent")}: <b>{ready ? formatPercent(pE) : "—"}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestCalc;
