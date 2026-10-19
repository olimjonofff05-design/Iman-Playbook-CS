// Admin panel API. Barcha so'rovlar: POST { action, ... } va faqat admin tokeni bilan.

import { getDb } from "./_lib/db.js";
import { handler, HttpError, requireSession, hashPassword } from "./_lib/core.js";
import { normalizeQuestions, totalScore } from "./_lib/exam-logic.js";
import { closeExpired } from "./_lib/attempts.js";

const LEVELS = ["junior", "middle"];
const STATUSES = ["draft", "active", "closed"];
const LOGIN_RE = /^[a-z0-9._-]{3,32}$/;

const publicUser = (u) => ({
  id: u.id,
  fullName: u.full_name,
  login: u.login,
  level: u.level,
  active: u.active,
  createdAt: u.created_at,
});

function attemptSummary(a, usersById) {
  const user = usersById.get(String(a.user_id));
  const total = totalScore(a);
  return {
    id: a.id,
    examId: a.exam_id,
    userId: a.user_id,
    userName: user?.full_name ?? "—",
    userLogin: user?.login ?? "",
    userLevel: user?.level ?? "",
    status: a.status,
    grantedAt: a.granted_at,
    startedAt: a.started_at,
    deadline: a.deadline,
    submittedAt: a.submitted_at,
    late: a.late,
    needsReview: a.needs_review,
    tabSwitches: a.tab_switches,
    score: total,
    maxScore: Number(a.max_score || 0),
    percent: a.max_score ? Math.round((total / Number(a.max_score)) * 1000) / 10 : 0,
  };
}

function requireId(v, what = "id") {
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) throw new HttpError(400, `${what} noto'g'ri.`);
  return n;
}

const actions = {
  // ---------------- Xodimlar ----------------
  async "users.list"(db) {
    const users = await db.select("att_users", { order: "full_name.asc" });
    return { users: users.map(publicUser) };
  },

  async "users.create"(db, b) {
    const fullName = String(b.fullName || "").trim();
    const login = String(b.login || "").trim().toLowerCase();
    const password = String(b.password || "");
    const level = LEVELS.includes(b.level) ? b.level : "junior";
    if (!fullName) throw new HttpError(400, "Ism familiyani kiriting.");
    if (!LOGIN_RE.test(login)) {
      throw new HttpError(400, "Login 3–32 belgi: lotin harflari, raqam, nuqta, chiziqcha.");
    }
    if ((process.env.ADMIN_LOGIN || "").toLowerCase() === login) {
      throw new HttpError(400, "Bu login band.");
    }
    if (password.length < 6) throw new HttpError(400, "Parol kamida 6 belgi bo'lishi kerak.");
    try {
      const [u] = await db.insert("att_users", {
        full_name: fullName,
        login,
        password_hash: hashPassword(password),
        level,
      });
      return { user: publicUser(u) };
    } catch (e) {
      if (String(e.body || "").includes("23505")) throw new HttpError(409, "Bu login allaqachon mavjud.");
      throw e;
    }
  },

  async "users.update"(db, b) {
    const id = requireId(b.id);
    const patch = {};
    if (b.fullName !== undefined) {
      const v = String(b.fullName).trim();
      if (!v) throw new HttpError(400, "Ism familiya bo'sh bo'lmasin.");
      patch.full_name = v;
    }
    if (b.level !== undefined) {
      if (!LEVELS.includes(b.level)) throw new HttpError(400, "Daraja noto'g'ri.");
      patch.level = b.level;
    }
    if (b.active !== undefined) patch.active = Boolean(b.active);
    if (b.password) {
      if (String(b.password).length < 6) throw new HttpError(400, "Parol kamida 6 belgi bo'lishi kerak.");
      patch.password_hash = hashPassword(String(b.password));
    }
    const [u] = await db.update("att_users", { eq: { id } }, patch);
    if (!u) throw new HttpError(404, "Xodim topilmadi.");
    return { user: publicUser(u) };
  },

  async "users.delete"(db, b) {
    await db.remove("att_users", { eq: { id: requireId(b.id) } });
    return {};
  },

  // ---------------- Imtihonlar ----------------
  async "exams.list"(db) {
    const [exams, attempts] = await Promise.all([
      db.select("att_exams", { order: "created_at.desc" }),
      db.select("att_attempts", { columns: "id,exam_id,status,needs_review" }),
    ]);
    return {
      exams: exams.map((e) => {
        const mine = attempts.filter((a) => String(a.exam_id) === String(e.id));
        return {
          id: e.id,
          title: e.title,
          description: e.description,
          level: e.level,
          status: e.status,
          durationMin: e.duration_min,
          passPercent: e.pass_percent,
          questionCount: (e.questions || []).length,
          updatedAt: e.updated_at,
          stats: {
            granted: mine.filter((a) => a.status === "granted").length,
            inProgress: mine.filter((a) => a.status === "in_progress").length,
            submitted: mine.filter((a) => a.status === "submitted").length,
            needsReview: mine.filter((a) => a.needs_review).length,
          },
        };
      }),
    };
  },

  async "exams.get"(db, b) {
    const [e] = await db.select("att_exams", { eq: { id: requireId(b.id) } });
    if (!e) throw new HttpError(404, "Imtihon topilmadi.");
    return { exam: e };
  },

  async "exams.save"(db, b) {
    const e = b.exam || {};
    const title = String(e.title || "").trim();
    if (!title) throw new HttpError(400, "Imtihon nomini kiriting.");
    const row = {
      title,
      description: String(e.description || "").trim(),
      level: LEVELS.includes(e.level) ? e.level : "junior",
      duration_min: Math.min(600, Math.max(1, Math.round(Number(e.duration_min) || 30))),
      pass_percent: Math.min(100, Math.max(0, Math.round(Number(e.pass_percent) || 0))),
      shuffle: e.shuffle !== false,
      show_result: e.show_result !== false,
      status: STATUSES.includes(e.status) ? e.status : "draft",
      questions: normalizeQuestions(e.questions || []),
      updated_at: new Date().toISOString(),
    };
    if (row.status === "active" && row.questions.length === 0) {
      throw new HttpError(400, "Savolsiz imtihonni ochib bo'lmaydi.");
    }
    if (e.id) {
      const [saved] = await db.update("att_exams", { eq: { id: requireId(e.id) } }, row);
      if (!saved) throw new HttpError(404, "Imtihon topilmadi.");
      return { exam: saved };
    }
    const [saved] = await db.insert("att_exams", row);
    return { exam: saved };
  },

  async "exams.setStatus"(db, b) {
    const id = requireId(b.id);
    if (!STATUSES.includes(b.status)) throw new HttpError(400, "Holat noto'g'ri.");
    const [e] = await db.select("att_exams", { eq: { id } });
    if (!e) throw new HttpError(404, "Imtihon topilmadi.");
    if (b.status === "active" && !(e.questions || []).length) {
      throw new HttpError(400, "Savolsiz imtihonni ochib bo'lmaydi.");
    }
    const [saved] = await db.update(
      "att_exams",
      { eq: { id } },
      { status: b.status, updated_at: new Date().toISOString() }
    );
    return { exam: saved };
  },

  async "exams.delete"(db, b) {
    await db.remove("att_exams", { eq: { id: requireId(b.id) } });
    return {};
  },

  // ---------------- Ruxsatlar va natijalar ----------------
  async "access.grant"(db, b) {
    const examId = requireId(b.examId, "Imtihon");
    const userIds = [...new Set((b.userIds || []).map(Number))].filter((x) => Number.isInteger(x) && x > 0);
    if (!userIds.length) throw new HttpError(400, "Kamida bitta xodimni tanlang.");
    const [exam] = await db.select("att_exams", { eq: { id: examId } });
    if (!exam) throw new HttpError(404, "Imtihon topilmadi.");

    const existing = await db.select("att_attempts", { eq: { exam_id: examId }, inList: { user_id: userIds } });
    const open = new Set(
      existing.filter((a) => a.status !== "submitted").map((a) => String(a.user_id))
    );
    const toCreate = userIds.filter((id) => !open.has(String(id)));
    if (toCreate.length) {
      await db.insert(
        "att_attempts",
        toCreate.map((user_id) => ({ exam_id: examId, user_id, status: "granted" }))
      );
    }
    return { created: toCreate.length, skipped: userIds.length - toCreate.length };
  },

  async "attempts.list"(db, b) {
    const examId = requireId(b.examId, "Imtihon");
    const [attempts, users] = await Promise.all([
      db.select("att_attempts", { eq: { exam_id: examId }, order: "granted_at.desc" }),
      db.select("att_users", { columns: "id,full_name,login,level" }),
    ]);
    const closed = await closeExpired(db, attempts);
    const byId = new Map(users.map((u) => [String(u.id), u]));
    return { attempts: closed.map((a) => attemptSummary(a, byId)) };
  },

  async "attempts.get"(db, b) {
    const [a] = await db.select("att_attempts", { eq: { id: requireId(b.id) } });
    if (!a) throw new HttpError(404, "Urinish topilmadi.");
    const users = await db.select("att_users", { eq: { id: a.user_id }, columns: "id,full_name,login,level" });
    const byId = new Map(users.map((u) => [String(u.id), u]));
    return {
      attempt: {
        ...attemptSummary(a, byId),
        questions: a.questions_snapshot || [],
        answers: a.answers || {},
        manualScores: a.manual_scores || {},
        autoScore: Number(a.auto_score || 0),
      },
    };
  },

  async "attempts.grade"(db, b) {
    const id = requireId(b.id);
    const [a] = await db.select("att_attempts", { eq: { id } });
    if (!a) throw new HttpError(404, "Urinish topilmadi.");
    if (a.status !== "submitted") throw new HttpError(400, "Faqat topshirilgan ishni baholash mumkin.");
    const snapshot = a.questions_snapshot || [];
    const answers = a.answers || {};
    const manual = {};
    for (const q of snapshot.filter((q) => q.type === "open")) {
      const v = b.manualScores?.[q.id];
      if (v === undefined || v === null || v === "") continue;
      const n = Number(v);
      if (!Number.isFinite(n) || n < 0 || n > q.points) {
        throw new HttpError(400, `Ball 0 dan ${q.points} gacha bo'lishi kerak.`);
      }
      manual[q.id] = n;
    }
    const needsReview = snapshot.some((q) => q.type === "open" && answers[q.id] && manual[q.id] === undefined);
    const [saved] = await db.update("att_attempts", { eq: { id } }, { manual_scores: manual, needs_review: needsReview });
    return { manualScores: saved.manual_scores, needsReview, score: totalScore(saved) };
  },

  // Ruxsatni bekor qilish yoki natijani o'chirish (qayta topshirtirish uchun)
  async "attempts.delete"(db, b) {
    await db.remove("att_attempts", { eq: { id: requireId(b.id) } });
    return {};
  },
};

export default handler(async (req, body) => {
  if (req.method !== "POST") throw new HttpError(405, "Method not allowed");
  await requireSession(req, "admin");
  const fn = actions[body.action];
  if (!fn) throw new HttpError(400, "Noma'lum amal.");
  return fn(getDb(), body);
});
