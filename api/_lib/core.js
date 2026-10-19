// Umumiy yordamchilar: parol xeshi, sessiya tokeni, so'rov/javob o'ramlari.
//
// Kerakli environment variable'lar (Vercel -> Settings -> Environment Variables):
//   AUTH_SECRET     - tokenlarni imzolash uchun uzun tasodifiy satr (kamida 32 belgi)
//   ADMIN_LOGIN     - admin logini (masalan: azizullo)
//   ADMIN_PASSWORD  - admin paroli
//   SUPABASE_URL, SUPABASE_SERVICE_KEY - mavjud QA bo'limidagi kabi

import crypto from "node:crypto";
import { getDb } from "./db.js";

const TOKEN_TTL_HOURS = 12;

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ---------- Parollar ----------

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
  const [scheme, salt, hash] = String(stored || "").split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === test.length && crypto.timingSafeEqual(expected, test);
}

export function safeEqualStrings(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// ---------- Tokenlar ----------

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new HttpError(500, "Server sozlanmagan: AUTH_SECRET yo'q yoki juda qisqa.");
  }
  return s;
}

const b64url = (buf) => Buffer.from(buf).toString("base64url");

export function signToken(payload) {
  const body = b64url(JSON.stringify({ ...payload, exp: Date.now() + TOKEN_TTL_HOURS * 3600 * 1000 }));
  const sig = b64url(crypto.createHmac("sha256", secret()).update(body).digest());
  return `${body}.${sig}`;
}

function readToken(token) {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) return null;
  const expected = b64url(crypto.createHmac("sha256", secret()).update(body).digest());
  if (!safeEqualStrings(sig, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Sessiyani aniqlaydi. Oddiy xodim uchun har safar bazadan tekshiriladi —
// admin uni o'chirib qo'ysa, darhol kira olmay qoladi.
export async function getSession(req) {
  const header = req.headers?.authorization || req.headers?.Authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = readToken(token);
  if (!payload) return null;

  if (payload.role === "admin") {
    if (!process.env.ADMIN_LOGIN || payload.login !== process.env.ADMIN_LOGIN) return null;
    return { role: "admin", id: "admin", login: payload.login, fullName: "Administrator" };
  }

  const db = getDb();
  const [user] = await db.select("att_users", { eq: { id: payload.sub } });
  if (!user || !user.active) return null;
  return { role: "user", id: user.id, login: user.login, fullName: user.full_name, level: user.level };
}

export async function requireSession(req, role) {
  const session = await getSession(req);
  if (!session) throw new HttpError(401, "Tizimga qayta kiring.");
  if (role && session.role !== role) throw new HttpError(403, "Bu amal uchun ruxsat yo'q.");
  return session;
}

// ---------- So'rov o'rami ----------

export function handler(fn) {
  return async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const result = await fn(req, body);
      res.status(200).json({ ok: true, ...result });
    } catch (err) {
      const status = err.status && err.status < 600 ? err.status : 500;
      if (status >= 500) console.error(err);
      const message =
        err instanceof HttpError ? err.message : err.publicMessage || "Kutilmagan xatolik yuz berdi.";
      res.status(status >= 400 ? status : 500).json({ ok: false, error: message });
    }
  };
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
