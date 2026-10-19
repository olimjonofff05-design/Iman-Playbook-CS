// Supabase (PostgREST) bilan ishlash uchun kichik yordamchi.
// "_" bilan boshlangan papka Vercel'da alohida endpoint bo'lmaydi — faqat import qilinadi.
//
// Lokal sinov uchun ATT_DB=memory qo'yilsa, ma'lumotlar xotirada saqlanadi (memdb.js).

import { memdb } from "./memdb.js";

function restUrl(table, query) {
  const base = (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const qs = new URLSearchParams();
  for (const [k, v] of query) qs.append(k, v);
  return `${base}/rest/v1/${table}?${qs.toString()}`;
}

function filtersToQuery({ eq = {}, inList = {} } = {}) {
  const q = [];
  for (const [col, val] of Object.entries(eq)) q.push([col, `eq.${val}`]);
  for (const [col, vals] of Object.entries(inList)) {
    q.push([col, `in.(${vals.map((v) => String(v)).join(",")})`]);
  }
  return q;
}

// Supabase xatosini admin tushunadigan matnga aylantiradi (kalit/sir qiymatlari ko'rsatilmaydi)
function explain(status, text) {
  if (status === 401 || status === 403) {
    return "Supabase kaliti qabul qilinmadi: Vercel'dagi SUPABASE_SERVICE_KEY qiymatini tekshiring (Legacy API keys → service_role).";
  }
  if (/PGRST205|42P01|does not exist|Could not find the table/i.test(text)) {
    return "Supabase'da attestatsiya jadvallari topilmadi: sql/attestation.sql shu SUPABASE_URL ko'rsatgan loyihada ishga tushirilmagan.";
  }
  if (status === 404) {
    return "Supabase manzili noto'g'ri: Vercel'dagi SUPABASE_URL qiymatini tekshiring (https://xxxx.supabase.co).";
  }
  return `Supabase xatosi (${status}). Iltimos, keyinroq qayta urinib ko'ring.`;
}

async function call(method, table, query, body, prefer) {
  const key = (process.env.SUPABASE_SERVICE_KEY || "").trim();
  const headers = {
    "Content-Type": "application/json",
    apikey: key,
    ...(prefer ? { Prefer: prefer } : {}),
  };
  // Eski (JWT) service_role kaliti Authorization'da ham yuboriladi; yangi "sb_secret_..." kaliti faqat apikey'da
  if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`;

  let res;
  try {
    res = await fetch(restUrl(table, query), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (e) {
    const err = new Error(`Supabase ${method} ${table} unreachable: ${e.message}`);
    err.status = 502;
    err.publicMessage = "Supabase'ga ulanib bo'lmadi: Vercel'dagi SUPABASE_URL qiymatini tekshiring (https://xxxx.supabase.co).";
    throw err;
  }
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`Supabase ${method} ${table} failed: ${res.status} ${text}`);
    // Brauzerga 401 qaytarilmaydi — aks holda foydalanuvchi tizimdan chiqarib yuboriladi
    err.status = res.status === 409 ? 409 : 502;
    err.body = text;
    err.publicMessage = explain(res.status, text);
    throw err;
  }
  return text ? JSON.parse(text) : null;
}

const supabase = {
  async select(table, { eq, inList, order, columns = "*" } = {}) {
    const q = [["select", columns], ...filtersToQuery({ eq, inList })];
    if (order) q.push(["order", order]);
    return call("GET", table, q);
  },
  async insert(table, rows) {
    return call("POST", table, [], rows, "return=representation");
  },
  async update(table, { eq, inList }, patch) {
    return call("PATCH", table, filtersToQuery({ eq, inList }), patch, "return=representation");
  },
  async remove(table, { eq, inList }) {
    return call("DELETE", table, filtersToQuery({ eq, inList }), undefined, "return=minimal");
  },
};

export function getDb() {
  if (process.env.ATT_DB === "memory") return memdb;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    const err = new Error("SUPABASE_URL yoki SUPABASE_SERVICE_KEY sozlanmagan");
    err.publicMessage = "Server sozlanmagan: Supabase kalitlari yo'q.";
    throw err;
  }
  return supabase;
}
