// Savollarni tekshirish, imtihon nusxasini (snapshot) yaratish va baholash.
//
// Savol formati:
// {
//   id: "q1",
//   type: "single" | "multi" | "open",   // bitta javob | bir nechta javob | ochiq javob
//   context: "Mijoz shunday deydi: ...",   // ixtiyoriy: keys/vaziyat matni
//   text: "Qanday harakat qilasiz?",
//   options: ["A", "B", "C"],              // single/multi uchun
//   correct: [1],                           // to'g'ri variant(lar) indeksi (0 dan)
//   points: 1,
//   explanation: "Oferta 5.2-band ..."     // faqat adminga ko'rinadi
// }

import crypto from "node:crypto";
import { HttpError } from "./core.js";

const TYPES = ["single", "multi", "open"];

export function normalizeQuestions(raw) {
  if (!Array.isArray(raw)) throw new HttpError(400, "Savollar ro'yxat (massiv) bo'lishi kerak.");
  const seen = new Set();
  return raw.map((q, i) => {
    const n = i + 1;
    const type = TYPES.includes(q?.type) ? q.type : "single";
    const text = String(q?.text ?? "").trim();
    if (!text) throw new HttpError(400, `${n}-savol matni bo'sh.`);
    let id = String(q?.id ?? "").trim() || `q${crypto.randomBytes(4).toString("hex")}`;
    if (seen.has(id)) id = `${id}-${n}`;
    seen.add(id);
    const points = Number(q?.points ?? 1);
    if (!Number.isFinite(points) || points <= 0 || points > 100) {
      throw new HttpError(400, `${n}-savol balli 0 dan katta va 100 dan kichik bo'lishi kerak.`);
    }
    const out = {
      id,
      type,
      context: String(q?.context ?? "").trim(),
      text,
      points,
      explanation: String(q?.explanation ?? "").trim(),
      options: [],
      correct: [],
    };
    if (type !== "open") {
      const options = (Array.isArray(q?.options) ? q.options : []).map((o) => String(o ?? "").trim());
      if (options.length < 2) throw new HttpError(400, `${n}-savolda kamida 2 ta variant bo'lishi kerak.`);
      if (options.some((o) => !o)) throw new HttpError(400, `${n}-savolda bo'sh variant bor.`);
      const correct = [...new Set((Array.isArray(q?.correct) ? q.correct : [q?.correct]).map(Number))]
        .filter((x) => Number.isInteger(x) && x >= 0 && x < options.length)
        .sort((a, b) => a - b);
      if (correct.length === 0) throw new HttpError(400, `${n}-savolda to'g'ri javob belgilanmagan.`);
      if (type === "single" && correct.length !== 1) {
        throw new HttpError(400, `${n}-savol "bitta javob" turida — faqat bitta to'g'ri javob bo'lishi kerak.`);
      }
      out.options = options;
      out.correct = correct;
    }
    return out;
  });
}

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Xodim boshlagan paytdagi savollar nusxasi (aralashtirilgan bo'lishi mumkin)
export function buildSnapshot(questions, shuffle) {
  const qs = shuffle ? shuffled(questions) : questions;
  return qs.map((q) => {
    if (q.type === "open") return { ...q };
    const order = shuffle ? shuffled(q.options.map((_, i) => i)) : q.options.map((_, i) => i);
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct: order.map((orig, newIdx) => (q.correct.includes(orig) ? newIdx : -1)).filter((x) => x >= 0),
    };
  });
}

// Xodimga yuboriladigan ko'rinish: to'g'ri javob va izohsiz
export function publicQuestions(snapshot) {
  return snapshot.map((q) => {
    const rest = { ...q };
    delete rest.correct;
    delete rest.explanation;
    return rest;
  });
}

export function maxScore(snapshot) {
  return snapshot.reduce((s, q) => s + q.points, 0);
}

export function sanitizeAnswers(snapshot, raw) {
  const out = {};
  const src = raw && typeof raw === "object" ? raw : {};
  for (const q of snapshot) {
    const v = src[q.id];
    if (v === undefined || v === null) continue;
    if (q.type === "open") {
      const text = String(v).slice(0, 5000).trim();
      if (text) out[q.id] = text;
    } else {
      const list = [...new Set((Array.isArray(v) ? v : [v]).map(Number))]
        .filter((x) => Number.isInteger(x) && x >= 0 && x < q.options.length)
        .sort((a, b) => a - b);
      if (q.type === "single") list.splice(1);
      if (list.length) out[q.id] = list;
    }
  }
  return out;
}

export function autoGrade(snapshot, answers) {
  let score = 0;
  let needsReview = false;
  for (const q of snapshot) {
    if (q.type === "open") {
      if (answers[q.id]) needsReview = true;
      continue;
    }
    const a = answers[q.id] || [];
    if (a.length === q.correct.length && a.every((x, i) => x === q.correct[i])) score += q.points;
  }
  return { score, needsReview };
}

export function totalScore(attempt) {
  const manual = Object.values(attempt.manual_scores || {}).reduce((s, v) => s + (Number(v) || 0), 0);
  return Number(attempt.auto_score || 0) + manual;
}
