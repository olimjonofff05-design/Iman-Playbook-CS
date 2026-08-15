// QA fikr-mulohazasini qabul qiladi:
// 1) Telegramga darhol push xabar yuboradi
// 2) Supabase'ga zaxira sifatida saqlaydi (tarixni yo'qotmaslik uchun)
//
// Kerakli environment variable'lar (Vercel -> Settings -> Environment Variables):
//   TELEGRAM_BOT_TOKEN   - @BotFather'dan olingan bot tokeni
//   TELEGRAM_CHAT_ID     - push xabar boradigan chat ID (o'zingiz yoki jamoa guruhi)
//   SUPABASE_URL         - Supabase loyiha URL'i (masalan https://xxxx.supabase.co)
//   SUPABASE_SERVICE_KEY - Supabase service_role kaliti

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const { fullName, department, position, message } = req.body || {};

    if (!fullName?.trim() || !message?.trim()) {
      res.status(400).json({ ok: false, error: "Ism va izoh maydonlari majburiy" });
      return;
    }

    const payload = {
      full_name: fullName.trim(),
      department: (department || "").trim(),
      position: (position || "").trim(),
      message: message.trim(),
    };

    // 1) Supabase'ga saqlash (zaxira sifatida — Telegram push muvaffaqiyatsiz bo'lsa ham yo'qolmaydi)
    let savedToDb = false;
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      try {
        const dbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/qa_feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        });
        savedToDb = dbRes.ok;
        if (!dbRes.ok) {
          console.error("Supabase insert failed:", await dbRes.text());
        }
      } catch (e) {
        console.error("Supabase insert error:", e);
      }
    }

    // 2) Telegramga push xabar
    let pushedToTelegram = false;
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const text =
        `🆕 <b>Yangi QA fikri</b>\n\n` +
        `👤 <b>Ism familiya:</b> ${escapeHtml(payload.full_name)}\n` +
        (payload.department ? `🏢 <b>Bo'lim:</b> ${escapeHtml(payload.department)}\n` : "") +
        (payload.position ? `💼 <b>Lavozim:</b> ${escapeHtml(payload.position)}\n` : "") +
        `\n📝 <b>Izoh:</b>\n${escapeHtml(payload.message)}`;

      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text,
              parse_mode: "HTML",
            }),
          }
        );
        const tgData = await tgRes.json();
        pushedToTelegram = Boolean(tgData.ok);
        if (!tgData.ok) {
          console.error("Telegram push failed:", tgData);
        }
      } catch (e) {
        console.error("Telegram push error:", e);
      }
    }

    if (!savedToDb && !pushedToTelegram) {
      res.status(500).json({ ok: false, error: "Xabarni yuborib bo'lmadi. Keyinroq urinib ko'ring." });
      return;
    }

    res.status(200).json({ ok: true, savedToDb, pushedToTelegram });
  } catch (err) {
    console.error("qa-feedback handler error:", err);
    res.status(500).json({ ok: false, error: "Kutilmagan xatolik yuz berdi." });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
