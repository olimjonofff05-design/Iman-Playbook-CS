// Supabase (PostgREST) bilan ishlash uchun kichik yordamchi.
// "_" bilan boshlangan papka Vercel'da alohida endpoint bo'lmaydi — faqat import qilinadi.
//
// Lokal sinov uchun ATT_DB=memory qo'yilsa, ma'lumotlar xotirada saqlanadi (memdb.js).

import { memdb } from "./memdb.js";

function restUrl(table, query) {
  const base = process.env.SUPABASE_URL;
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

async function call(method, table, query, body, prefer) {
  const key = process.env.SUPABASE_SERVICE_KEY;
  const res = await fetch(restUrl(table, query), {
    method,
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`Supabase ${method} ${table} failed: ${res.status} ${text}`);
    err.status = res.status;
    err.body = text;
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
