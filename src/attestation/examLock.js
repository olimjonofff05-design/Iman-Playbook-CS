// Imtihon rejimi qulfi.
// Xodim imtihonni boshlagach, brauzerda "qulf" saqlanadi. Qulf bor ekan, playbookning
// hech bir sahifasi ko'rsatilmaydi — shu brauzerdagi barcha oynalarda (tablarda) ham.
// Qulf faqat imtihon topshirilgach yoki vaqti tugagach olinadi.

import { useEffect, useState } from "react";

const KEY = "iman-exam-lock";
const EVENT = "iman-exam-lock-change";
// Vaqti tugaganidan keyin ham qulf biroz turadi — avtomatik topshirish ulgurishi uchun
const GRACE_MS = 5 * 60 * 1000;
// Imtihon hali boshlanmagan (deadline yo'q) qulf uchun maksimal umr
const PENDING_TTL_MS = 15 * 60 * 1000;

let memoryLock = null;

// Har bir oynaning (tabning) o'z identifikatori — sahifa yangilansa ham saqlanadi
export const TAB_ID = (() => {
  try {
    let id = sessionStorage.getItem("iman-tab-id");
    if (!id) {
      id = Math.random().toString(36).slice(2);
      sessionStorage.setItem("iman-tab-id", id);
    }
    return id;
  } catch {
    return Math.random().toString(36).slice(2);
  }
})();

function isAlive(lock) {
  if (!lock || !lock.attemptId) return false;
  const now = Date.now();
  if (lock.deadline) return new Date(lock.deadline).getTime() + GRACE_MS > now;
  return (lock.createdAt || 0) + PENDING_TTL_MS > now;
}

export function getLock() {
  try {
    const lock = JSON.parse(localStorage.getItem(KEY) || "null");
    return isAlive(lock) ? lock : null;
  } catch {
    return null;
  }
}

function notify() {
  window.dispatchEvent(new Event(EVENT));
}

export function setLock(patch) {
  const prev = getLock();
  const next = {
    createdAt: Date.now(),
    ...(prev && prev.attemptId === patch.attemptId ? prev : {}),
    ...patch,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // localStorage yo'q — qulf faqat shu oynada xotirada ishlaydi
    memoryLock = next;
  }
  notify();
}

export function clearLock() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    memoryLock = null;
  }
  notify();
}

export function useExamLock() {
  const [lock, setState] = useState(() => getLock() || memoryLock);

  useEffect(() => {
    const update = () => setState(getLock() || (isAlive(memoryLock) ? memoryLock : null));
    window.addEventListener(EVENT, update);
    window.addEventListener("storage", update); // boshqa oynalardagi o'zgarishlar
    const timer = setInterval(update, 15000); // muddati o'tgan qulfni olib tashlash
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener("storage", update);
      clearInterval(timer);
    };
  }, []);

  return lock;
}
