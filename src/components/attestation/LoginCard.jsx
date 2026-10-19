import { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { Alert } from "./shared";
import { errorText } from "../../attestation/format";

function LoginCard() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({ login: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(form.login.trim(), form.password);
    } catch (err) {
      setError(errorText(err, t));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="att-locked">
      <div className="att-lock-icon">
        <Lock size={30} strokeWidth={1.75} />
      </div>
      <h2>{t("att.login.title")}</h2>
      <p className="att-muted">{t("att.login.subtitle")}</p>

      <form className="att-card att-login-form" onSubmit={submit}>
        <label className="att-field">
          <span>{t("att.login.login")}</span>
          <input
            autoComplete="username"
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
            required
          />
        </label>
        <label className="att-field">
          <span>{t("att.login.password")}</span>
          <input
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <Alert>{error}</Alert>
        <button className="att-btn att-btn-primary" disabled={busy}>
          {busy ? t("att.common.loading") : t("att.login.submit")}
        </button>
      </form>
    </div>
  );
}

export default LoginCard;
