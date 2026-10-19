// Xodim (operator) uchun imtihon API. POST { action, ... } va xodim tokeni bilan.
//   list   — menga ochilgan imtihonlar va natijalarim
//   start  — imtihonni boshlash (yoki davom ettirish)
//   save   — javoblarni oraliq saqlash (internet uzilsa ham yo'qolmasligi uchun)
//   submit — topshirish

import { getDb } from "./_lib/db.js";
import { handler, HttpError, requireSession } from "./_lib/core.js";
import {
  buildSnapshot,
  publicQuestions,
  maxScore,
  sanitizeAnswers,
  totalScore,
} from "./_lib/exam-logic.js";
import { closeExpired, finalizeAttempt, GRACE_MS } from "./_lib/attempts.js";

function resultView(attempt, exam) {
  if (!exam?.show_result) return { hidden: true };
  const score = totalScore(attempt);
  const max = Number(attempt.max_score || 0);
  const percent = max ? Math.round((score / max) * 1000) / 10 : 0;
  return {
    hidden: false,
    score,
    maxScore: max,
    percent,
    needsReview: attempt.needs_review,
    passed: attempt.needs_review ? null : percent >= exam.pass_percent,
    passPercent: exam.pass_percent,
  };
}

async function loadOwnAttempt(db, session, attemptId) {
  const id = Number(attemptId);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, "Urinish noto'g'ri.");
  const [a] = await db.select("att_attempts", { eq: { id, user_id: session.id } });
  if (!a) throw new HttpError(404, "Bu imtihonga sizda ruxsat yo'q.");
  const [exam] = await db.select("att_exams", { eq: { id: a.exam_id } });
  if (!exam) throw new HttpError(404, "Imtihon topilmadi.");
  return { attempt: a, exam };
}

const actions = {
  async list(db, session) {
    const mine = await closeExpired(
      db,
      await db.select("att_attempts", { eq: { user_id: session.id }, order: "granted_at.desc" })
    );
    const examIds = [...new Set(mine.map((a) => a.exam_id))];
    const exams = examIds.length ? await db.select("att_exams", { inList: { id: examIds } }) : [];
    const byId = new Map(exams.map((e) => [String(e.id), e]));

    const available = [];
    const history = [];
    for (const a of mine) {
      const e = byId.get(String(a.exam_id));
      if (!e) continue;
      const base = {
        attemptId: a.id,
        title: e.title,
        description: e.description,
        level: e.level,
        durationMin: e.duration_min,
        questionCount: (a.questions_snapshot || e.questions || []).length,
      };
      if (a.status === "submitted") {
        history.push({ ...base, submittedAt: a.submitted_at, result: resultView(a, e) });
      } else if (e.status === "active") {
        available.push({ ...base, status: a.status, deadline: a.deadline });
      }
    }
    return { available, history };
  },

  async start(db, session, b) {
    let { attempt, exam } = await loadOwnAttempt(db, session, b.attemptId);
    if (attempt.status === "submitted") throw new HttpError(400, "Bu imtihon allaqachon topshirilgan.");
    if (exam.status !== "active") throw new HttpError(403, "Imtihon hozir yopiq.");

    if (attempt.status === "granted") {
      const snapshot = buildSnapshot(exam.questions || [], exam.shuffle);
      if (!snapshot.length) throw new HttpError(400, "Imtihonda savollar yo'q.");
      const now = Date.now();
      const [row] = await db.update(
        "att_attempts",
        { eq: { id: attempt.id, status: "granted" } },
        {
          status: "in_progress",
          started_at: new Date(now).toISOString(),
          deadline: new Date(now + exam.duration_min * 60 * 1000).toISOString(),
          questions_snapshot: snapshot,
          max_score: maxScore(snapshot),
          answers: {},
        }
      );
      // Ikki oynadan bir vaqtda bosilgan bo'lsa — mavjud urinishni qayta o'qiymiz
      attempt = row || (await loadOwnAttempt(db, session, b.attemptId)).attempt;
    }

    if (attempt.status === "in_progress" && new Date(attempt.deadline).getTime() + GRACE_MS < Date.now()) {
      await finalizeAttempt(db, attempt, attempt.answers);
      throw new HttpError(400, "Imtihon vaqti tugagan. Javoblaringiz avtomatik topshirildi.");
    }

    return {
      attempt: {
        id: attempt.id,
        title: exam.title,
        description: exam.description,
        deadline: attempt.deadline,
        serverNow: new Date().toISOString(),
        questions: publicQuestions(attempt.questions_snapshot || []),
        answers: attempt.answers || {},
      },
    };
  },

  async save(db, session, b) {
    const { attempt } = await loadOwnAttempt(db, session, b.attemptId);
    if (attempt.status !== "in_progress") throw new HttpError(400, "Imtihon faol emas.");
    if (new Date(attempt.deadline).getTime() + GRACE_MS < Date.now()) {
      throw new HttpError(400, "Imtihon vaqti tugagan.");
    }
    const patch = { answers: sanitizeAnswers(attempt.questions_snapshot || [], b.answers) };
    if (Number.isInteger(b.tabSwitches)) patch.tab_switches = Math.max(attempt.tab_switches || 0, b.tabSwitches);
    await db.update("att_attempts", { eq: { id: attempt.id, status: "in_progress" } }, patch);
    return { savedAt: new Date().toISOString() };
  },

  async submit(db, session, b) {
    const { attempt, exam } = await loadOwnAttempt(db, session, b.attemptId);
    if (attempt.status === "submitted") return { result: resultView(attempt, exam) };
    if (attempt.status !== "in_progress") throw new HttpError(400, "Imtihon boshlanmagan.");

    const late = new Date(attempt.deadline).getTime() + GRACE_MS < Date.now();
    // Muhlat o'tib ketgan bo'lsa, faqat oxirgi saqlangan javoblar hisobga olinadi
    const row = await finalizeAttempt(db, attempt, late ? attempt.answers : b.answers, {
      late,
      tabSwitches: Number.isInteger(b.tabSwitches) ? b.tabSwitches : undefined,
    });
    const final = row || (await loadOwnAttempt(db, session, b.attemptId)).attempt;
    return { result: resultView(final, exam), late };
  },
};

export default handler(async (req, body) => {
  if (req.method !== "POST") throw new HttpError(405, "Method not allowed");
  const session = await requireSession(req, "user");
  const fn = actions[body.action];
  if (!fn) throw new HttpError(400, "Noma'lum amal.");
  return fn(getDb(), session, body);
});
