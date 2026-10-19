// Faqat lokal sinov uchun: Supabase o'rniga xotirada ishlaydigan oddiy baza.
// Production'da ishlatilmaydi (ATT_DB=memory qo'yilgandagina yoqiladi).

const DEFAULTS = {
  att_users: () => ({ level: "junior", active: true, created_at: new Date().toISOString() }),
  att_exams: () => ({
    description: "",
    level: "junior",
    duration_min: 30,
    pass_percent: 70,
    shuffle: true,
    show_result: true,
    status: "draft",
    questions: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }),
  att_attempts: () => ({
    status: "granted",
    granted_at: new Date().toISOString(),
    started_at: null,
    deadline: null,
    submitted_at: null,
    late: false,
    questions_snapshot: null,
    answers: null,
    auto_score: 0,
    manual_scores: {},
    max_score: 0,
    needs_review: false,
    tab_switches: 0,
  }),
};

const store = (globalThis.__attMemStore ??= { tables: {}, seq: 0 });
const table = (name) => (store.tables[name] ??= []);
const clone = (x) => JSON.parse(JSON.stringify(x));

function matches(row, { eq = {}, inList = {} } = {}) {
  for (const [k, v] of Object.entries(eq)) if (String(row[k]) !== String(v)) return false;
  for (const [k, vals] of Object.entries(inList)) {
    if (!vals.map(String).includes(String(row[k]))) return false;
  }
  return true;
}

export const memdb = {
  async select(name, { eq, inList, order } = {}) {
    let rows = table(name).filter((r) => matches(r, { eq, inList }));
    if (order) {
      const [col, dir] = order.split(".");
      rows = [...rows].sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (dir === "desc" ? -1 : 1));
    }
    return clone(rows);
  },
  async insert(name, rows) {
    const list = Array.isArray(rows) ? rows : [rows];
    const out = [];
    for (const r of list) {
      if (name === "att_users" && table(name).some((x) => x.login === r.login)) {
        const err = new Error("duplicate login");
        err.status = 409;
        err.body = '{"code":"23505"}';
        throw err;
      }
      const row = { ...(DEFAULTS[name]?.() ?? {}), ...clone(r), id: ++store.seq };
      table(name).push(row);
      out.push(clone(row));
    }
    return out;
  },
  async update(name, filters, patch) {
    const out = [];
    for (const r of table(name)) {
      if (matches(r, filters)) {
        Object.assign(r, clone(patch));
        out.push(clone(r));
      }
    }
    return out;
  },
  async remove(name, filters) {
    const t = table(name);
    store.tables[name] = t.filter((r) => !matches(r, filters));
    if (name === "att_users" || name === "att_exams") {
      const col = name === "att_users" ? "user_id" : "exam_id";
      const ids = t.filter((r) => matches(r, filters)).map((r) => String(r.id));
      store.tables.att_attempts = table("att_attempts").filter((a) => !ids.includes(String(a[col])));
    }
    return null;
  },
};
