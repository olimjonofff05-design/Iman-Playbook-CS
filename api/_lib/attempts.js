// Urinishlar bilan bog'liq umumiy amallar.

import { autoGrade, sanitizeAnswers } from "./exam-logic.js";

// Vaqt tugaganidan keyin javoblarni yuborish uchun beriladigan qo'shimcha muhlat
// (internet sekin bo'lsa ham javob yo'qolmasligi uchun).
export const GRACE_MS = 60 * 1000;

// Topshiriladi: javoblar baholanadi va urinish yopiladi.
export async function finalizeAttempt(db, attempt, rawAnswers, { late = false, tabSwitches } = {}) {
  const snapshot = attempt.questions_snapshot || [];
  const answers = sanitizeAnswers(snapshot, rawAnswers ?? attempt.answers);
  const { score, needsReview } = autoGrade(snapshot, answers);
  const patch = {
    status: "submitted",
    submitted_at: new Date().toISOString(),
    answers,
    auto_score: score,
    needs_review: needsReview,
    late,
  };
  if (Number.isInteger(tabSwitches)) patch.tab_switches = Math.max(attempt.tab_switches || 0, tabSwitches);
  const [row] = await db.update("att_attempts", { eq: { id: attempt.id, status: "in_progress" } }, patch);
  return row || null;
}

// Vaqti o'tib ketgan, lekin topshirilmagan urinishlarni saqlangan javoblar bilan yopadi.
export async function closeExpired(db, attempts) {
  const now = Date.now();
  const out = [];
  for (const a of attempts) {
    if (a.status === "in_progress" && a.deadline && new Date(a.deadline).getTime() + GRACE_MS < now) {
      const row = await finalizeAttempt(db, a, a.answers, { late: false });
      out.push(row || a);
    } else {
      out.push(a);
    }
  }
  return out;
}
