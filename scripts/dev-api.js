// Lokal sinov uchun /api serveri (Vercel o'rniga). Ishga tushirish:
//   npm run dev:api      (bir terminalda)
//   npm run dev:local    (ikkinchi terminalda — Vite /api so'rovlarini shu serverga yo'naltiradi)
//
// Standart holatda ma'lumotlar xotirada saqlanadi (ATT_DB=memory) va
// admin: login "admin", parol "admin123". Production'ga ta'sir qilmaydi.

import http from "node:http";

process.env.ATT_DB ??= "memory";
process.env.AUTH_SECRET ??= "local-dev-secret-change-me-please";
process.env.ADMIN_LOGIN ??= "admin";
process.env.ADMIN_PASSWORD ??= "admin123";

const routes = {
  "/api/auth": (await import("../api/auth.js")).default,
  "/api/admin": (await import("../api/admin.js")).default,
  "/api/exam": (await import("../api/exam.js")).default,
};

const PORT = Number(process.env.API_PORT || 3001);

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const fn = routes[url.pathname];
    if (!fn) {
      res.writeHead(404).end("not found");
      return;
    }
    let raw = "";
    for await (const chunk of req) raw += chunk;
    try {
      req.body = raw ? JSON.parse(raw) : {};
    } catch {
      req.body = {};
    }
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (obj) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(obj));
    };
    await fn(req, res);
  })
  .listen(PORT, () => console.log(`dev API: http://localhost:${PORT} (ATT_DB=${process.env.ATT_DB})`));
