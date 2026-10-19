// Sana, vaqt va xato matnlarini formatlash

export function fmtDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function fmtDuration(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const p = (n) => String(n).padStart(2, "0");
  return h ? `${h}:${p(m)}:${p(s)}` : `${p(m)}:${p(s)}`;
}

// Server xatosini foydalanuvchiga ko'rsatish uchun matnga aylantiradi
export function errorText(err, t) {
  if (!err) return "";
  if (err.message === "network") return t("att.common.networkError");
  if (err.message === "error") return t("att.common.unknownError");
  return err.message;
}
