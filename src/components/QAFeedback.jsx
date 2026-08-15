import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import "./QAFeedback.css";

const EMPTY_FORM = { fullName: "", department: "", position: "", message: "" };

function QAFeedback() {
  const { t } = useLanguage();
  const Icon = icons.qa;
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/qa-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="qa-page">
      <div className="page-header">
        <h1>
          <span className="page-icon">
            <Icon size={28} strokeWidth={1.75} />
          </span>
          {t("pages.qa.title")}
        </h1>
      </div>
      <p className="page-subtitle">{t("pages.qa.subtitle")}</p>

      <form className="qa-form" onSubmit={handleSubmit}>
        <div className="qa-form-row">
          <label>
            {t("pages.qa.fullName")} *
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder={t("pages.qa.fullNamePlaceholder")}
              required
            />
          </label>
        </div>

        <div className="qa-form-row qa-form-row-split">
          <label>
            {t("pages.qa.department")}
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder={t("pages.qa.departmentPlaceholder")}
            />
          </label>

          <label>
            {t("pages.qa.position")}
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder={t("pages.qa.positionPlaceholder")}
            />
          </label>
        </div>

        <div className="qa-form-row">
          <label>
            {t("pages.qa.message")} *
            <textarea
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder={t("pages.qa.messagePlaceholder")}
              required
            />
          </label>
        </div>

        <button type="submit" className="qa-submit" disabled={status === "sending"}>
          {status === "sending" ? t("pages.qa.sending") : t("pages.qa.submit")}
        </button>

        {status === "success" && (
          <div className="qa-alert qa-alert-success">{t("pages.qa.successMsg")}</div>
        )}
        {status === "error" && (
          <div className="qa-alert qa-alert-error">{t("pages.qa.errorMsg")}</div>
        )}
      </form>
    </div>
  );
}

export default QAFeedback;
