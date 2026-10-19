// Attestatsiya API bilan ishlash. Token brauzerda saqlanadi va har so'rovga qo'shiladi.

const TOKEN_KEY = "iman-att-token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // localStorage yo'q — sessiya sahifa yangilanguncha saqlanadi
  }
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

let onUnauthorized = null;
export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

async function request(path, { method = "POST", body } = {}) {
  const token = getToken();
  let res;
  try {
    res = await fetch(`/api/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: method === "GET" ? undefined : JSON.stringify(body || {}),
    });
  } catch {
    throw new ApiError(0, "network");
  }
  let data = {};
  try {
    data = await res.json();
  } catch {
    // javob JSON emas
  }
  if (!res.ok || !data.ok) {
    if (res.status === 401 && path !== "auth") onUnauthorized?.();
    throw new ApiError(res.status, data.error || "error");
  }
  return data;
}

export const api = {
  login: (login, password) => request("auth", { body: { login, password } }),
  me: () => request("auth", { method: "GET" }),
  admin: (action, payload = {}) => request("admin", { body: { action, ...payload } }),
  exam: (action, payload = {}) => request("exam", { body: { action, ...payload } }),
};
