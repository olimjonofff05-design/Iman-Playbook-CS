import { useEffect, useState } from "react";
import { Plus, KeyRound, Trash2 } from "lucide-react";
import { api } from "../../attestation/api";
import { useLanguage } from "../../context/LanguageContext";
import { Alert, Modal, Spinner } from "./shared";
import { errorText, fmtDate } from "../../attestation/format";

const EMPTY = { fullName: "", login: "", password: "", level: "junior" };

function randomPassword() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  const buf = new Uint32Array(8);
  crypto.getRandomValues(buf);
  for (const n of buf) out += chars[n % chars.length];
  return out;
}

function UsersTab() {
  const { t } = useLanguage();
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [formError, setFormError] = useState("");
  const [created, setCreated] = useState(null); // yangi xodim login/paroli — bir marta ko'rsatiladi
  const [pwdUser, setPwdUser] = useState(null);
  const [newPwd, setNewPwd] = useState("");
  const [filter, setFilter] = useState("all");

  const [reloadKey, setReloadKey] = useState(0);
  const load = () => setReloadKey((k) => k + 1);

  useEffect(() => {
    api
      .admin("users.list")
      .then((d) => setUsers(d.users))
      .catch((err) => setError(errorText(err, t)));
  }, [reloadKey, t]);

  async function createUser(e) {
    e.preventDefault();
    setFormError("");
    try {
      await api.admin("users.create", form);
      setCreated({ fullName: form.fullName, login: form.login.trim().toLowerCase(), password: form.password });
      setForm(EMPTY);
      setCreating(false);
      load();
    } catch (err) {
      setFormError(errorText(err, t));
    }
  }

  async function update(id, patch) {
    setError("");
    try {
      await api.admin("users.update", { id, ...patch });
      load();
    } catch (err) {
      setError(errorText(err, t));
    }
  }

  async function remove(u) {
    if (!window.confirm(t("att.users.confirmDelete").replace("{name}", u.fullName))) return;
    try {
      await api.admin("users.delete", { id: u.id });
      load();
    } catch (err) {
      setError(errorText(err, t));
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setFormError("");
    try {
      await api.admin("users.update", { id: pwdUser.id, password: newPwd });
      setCreated({ fullName: pwdUser.fullName, login: pwdUser.login, password: newPwd });
      setPwdUser(null);
    } catch (err) {
      setFormError(errorText(err, t));
    }
  }

  const shown = (users || []).filter((u) => filter === "all" || u.level === filter);

  return (
    <div>
      <div className="att-section-head">
        <div className="att-segment">
          {["all", "junior", "middle"].map((k) => (
            <button key={k} className={filter === k ? "active" : ""} onClick={() => setFilter(k)}>
              {k === "all" ? t("att.common.all") : t(`att.levels.${k}`)}
              {users && ` (${k === "all" ? users.length : users.filter((u) => u.level === k).length})`}
            </button>
          ))}
        </div>
        <button
          className="att-btn att-btn-primary"
          onClick={() => {
            setForm({ ...EMPTY, password: randomPassword() });
            setFormError("");
            setCreating(true);
          }}
        >
          <Plus size={16} /> {t("att.users.add")}
        </button>
      </div>

      <Alert>{error}</Alert>
      {!users && !error && <Spinner label={t("att.common.loading")} />}

      {users && users.length === 0 && (
        <div className="att-card att-empty">
          <p className="att-muted">{t("att.users.empty")}</p>
        </div>
      )}

      {shown.length > 0 && (
        <div className="att-table-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th>{t("att.users.fullName")}</th>
                <th>{t("att.users.login")}</th>
                <th>{t("att.users.level")}</th>
                <th>{t("att.users.status")}</th>
                <th>{t("att.users.created")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shown.map((u) => (
                <tr key={u.id} className={u.active ? "" : "att-row-muted"}>
                  <td>{u.fullName}</td>
                  <td className="att-mono">{u.login}</td>
                  <td>
                    <select value={u.level} onChange={(e) => update(u.id, { level: e.target.value })}>
                      <option value="junior">{t("att.levels.junior")}</option>
                      <option value="middle">{t("att.levels.middle")}</option>
                    </select>
                  </td>
                  <td>
                    <label className="att-switch">
                      <input
                        type="checkbox"
                        checked={u.active}
                        onChange={(e) => update(u.id, { active: e.target.checked })}
                      />
                      <span>{u.active ? t("att.users.active") : t("att.users.inactive")}</span>
                    </label>
                  </td>
                  <td className="att-small att-muted">{fmtDate(u.createdAt)}</td>
                  <td className="att-row-actions">
                    <button
                      className="att-icon-btn"
                      title={t("att.users.resetPassword")}
                      onClick={() => {
                        setPwdUser(u);
                        setNewPwd(randomPassword());
                        setFormError("");
                      }}
                    >
                      <KeyRound size={16} />
                    </button>
                    <button className="att-icon-btn danger" title={t("att.common.delete")} onClick={() => remove(u)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {creating && (
        <Modal title={t("att.users.add")} onClose={() => setCreating(false)}>
          <form className="att-form" onSubmit={createUser}>
            <label className="att-field">
              <span>{t("att.users.fullName")}</span>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            </label>
            <div className="att-form-row">
              <label className="att-field">
                <span>{t("att.users.login")}</span>
                <input
                  value={form.login}
                  placeholder="ali.valiyev"
                  onChange={(e) => setForm({ ...form, login: e.target.value })}
                  required
                />
              </label>
              <label className="att-field">
                <span>{t("att.users.password")}</span>
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </label>
            </div>
            <label className="att-field">
              <span>{t("att.users.level")}</span>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                <option value="junior">{t("att.levels.junior")}</option>
                <option value="middle">{t("att.levels.middle")}</option>
              </select>
            </label>
            <p className="att-small att-muted">{t("att.users.loginHint")}</p>
            <Alert>{formError}</Alert>
            <div className="att-modal-actions">
              <button type="button" className="att-btn" onClick={() => setCreating(false)}>
                {t("att.common.cancel")}
              </button>
              <button className="att-btn att-btn-primary">{t("att.common.save")}</button>
            </div>
          </form>
        </Modal>
      )}

      {pwdUser && (
        <Modal title={`${t("att.users.resetPassword")}: ${pwdUser.fullName}`} onClose={() => setPwdUser(null)}>
          <form className="att-form" onSubmit={savePassword}>
            <label className="att-field">
              <span>{t("att.users.newPassword")}</span>
              <input value={newPwd} onChange={(e) => setNewPwd(e.target.value)} required />
            </label>
            <Alert>{formError}</Alert>
            <div className="att-modal-actions">
              <button type="button" className="att-btn" onClick={() => setPwdUser(null)}>
                {t("att.common.cancel")}
              </button>
              <button className="att-btn att-btn-primary">{t("att.common.save")}</button>
            </div>
          </form>
        </Modal>
      )}

      {created && (
        <Modal title={t("att.users.credentialsTitle")} onClose={() => setCreated(null)}>
          <p className="att-muted">{t("att.users.credentialsNote")}</p>
          <div className="att-credentials">
            <div>
              <span>{t("att.users.fullName")}</span>
              <strong>{created.fullName}</strong>
            </div>
            <div>
              <span>{t("att.users.login")}</span>
              <strong className="att-mono">{created.login}</strong>
            </div>
            <div>
              <span>{t("att.users.password")}</span>
              <strong className="att-mono">{created.password}</strong>
            </div>
          </div>
          <div className="att-modal-actions">
            <button
              className="att-btn"
              onClick={() =>
                navigator.clipboard?.writeText(
                  `${t("att.users.login")}: ${created.login}\n${t("att.users.password")}: ${created.password}`
                )
              }
            >
              {t("att.common.copy")}
            </button>
            <button className="att-btn att-btn-primary" onClick={() => setCreated(null)}>
              {t("att.common.done")}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UsersTab;
