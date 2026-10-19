// Attestatsiya bo'limiga kirish.
//   POST { login, password }  -> { token, user }
//   GET  (Authorization: Bearer ...) -> { user }  — joriy sessiyani tekshirish

import { getDb } from "./_lib/db.js";
import {
  handler,
  HttpError,
  signToken,
  verifyPassword,
  safeEqualStrings,
  requireSession,
  sleep,
} from "./_lib/core.js";

export default handler(async (req, body) => {
  if (req.method === "GET") {
    const session = await requireSession(req);
    return { user: session };
  }
  if (req.method !== "POST") throw new HttpError(405, "Method not allowed");

  const login = String(body.login || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!login || !password) throw new HttpError(400, "Login va parolni kiriting.");

  // Admin — Vercel environment variable'laridagi login/parol bilan
  const adminLogin = (process.env.ADMIN_LOGIN || "").trim().toLowerCase();
  if (adminLogin && login === adminLogin) {
    if (process.env.ADMIN_PASSWORD && safeEqualStrings(password, process.env.ADMIN_PASSWORD)) {
      const user = { role: "admin", id: "admin", login: adminLogin, fullName: "Administrator" };
      return { token: signToken({ sub: "admin", role: "admin", login: adminLogin }), user };
    }
    await sleep(600);
    throw new HttpError(401, "Login yoki parol noto'g'ri.");
  }

  const db = getDb();
  const [row] = await db.select("att_users", { eq: { login } });
  if (!row || !verifyPassword(password, row.password_hash)) {
    await sleep(600);
    throw new HttpError(401, "Login yoki parol noto'g'ri.");
  }
  if (!row.active) throw new HttpError(403, "Hisobingiz o'chirilgan. Administratorga murojaat qiling.");

  const user = { role: "user", id: row.id, login: row.login, fullName: row.full_name, level: row.level };
  return { token: signToken({ sub: row.id, role: "user" }), user };
});
