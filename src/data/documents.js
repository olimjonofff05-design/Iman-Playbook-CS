// Rasmiy hujjatlar (PDF) ro'yxati — Offer sahifasida "Onlayn" va "Oflayn"
// guruhlariga bo'lib ko'rsatiladi (group maydoni orqali).
//
// Yangi fayl qo'shish uchun:
// 1. PDF faylni `public/documents/` papkasiga joylang.
// 2. Quyidagi ro'yxatga yozuv qo'shing, `file` maydoniga fayl nomini ko'rsating.
// 3. `group` maydonini "online" yoki "offline" qiling (kelajakda "1-11" yoki
//    "12+" muddat guruhlarini ham shu tarzda ajratish mumkin).

export const documents = [
  // ---- Onlayn (1-11 oylik muddat) ----
  {
    id: "prelim-online",
    group: "online",
    title: {
      uz: "Dastlabki kelishuv (1-11, onlayn)",
      ru: "Предварительное соглашение (1-11, онлайн)",
    },
    description: {
      uz: "Mahsulot xarid qilish bo'yicha dastlabki kelishuv — IMANUM platformasida mahsulotga buyurtma berish tartibi.",
      ru: "Предварительное соглашение по приобретению продукции — порядок оформления заказа на платформе IMANUM.",
    },
    file: "/documents/dastlabki-kelishuv-1-11-onlayn.pdf",
  },
  {
    id: "registration-online",
    group: "online",
    title: {
      uz: "Ro'yxatdan o'tish bo'yicha oferta (1-11, onlayn)",
      ru: "Оферта о регистрации (1-11, онлайн)",
    },
    description: {
      uz: "IMANUM platformasida ro'yxatdan o'tish va to'lov qobiliyatini aniqlash (skoring) bo'yicha oferta.",
      ru: "Оферта о регистрации и оценке платёжеспособности (скоринге) на платформе IMANUM.",
    },
    file: "/documents/royxatdan-utish-1-11-onlayn.pdf",
  },
  {
    id: "sale-online",
    group: "online",
    title: {
      uz: "Oldi-sotdi shartnomasi (1-11, onlayn)",
      ru: "Договор купли-продажи (1-11, онлайн)",
    },
    description: {
      uz: "Oldi-sotdi shartnomasini tuzish bo'yicha oferta — onlayn savdo tartibi, to'lov va yetkazib berish shartlari.",
      ru: "Оферта на заключение договора купли-продажи — порядок онлайн-продажи, условия оплаты и доставки.",
    },
    file: "/documents/oldi-sotdi-1-11-onlayn.pdf",
  },

  // ---- Oflayn (1-11 oylik muddat) ----
  {
    id: "prelim-offline",
    group: "offline",
    title: {
      uz: "Dastlabki kelishuv (1-11, oflayn)",
      ru: "Предварительное соглашение (1-11, офлайн)",
    },
    description: {
      uz: "Mahsulot xarid qilish bo'yicha dastlabki kelishuv — hamkor-do'konda mahsulotga buyurtma berish tartibi.",
      ru: "Предварительное соглашение по приобретению продукции — порядок оформления заказа в магазине-партнёре.",
    },
    file: "/documents/dastlabki-kelishuv-1-11-oflayn.pdf",
  },
  {
    id: "registration-offline",
    group: "offline",
    title: {
      uz: "Ro'yxatdan o'tish bo'yicha oferta (1-11, oflayn)",
      ru: "Оферта о регистрации (1-11, офлайн)",
    },
    description: {
      uz: "IMANUM platformasida ro'yxatdan o'tish va to'lov qobiliyatini aniqlash (skoring) bo'yicha oferta.",
      ru: "Оферта о регистрации и оценке платёжеспособности (скоринге) на платформе IMANUM.",
    },
    file: "/documents/royxatdan-utish-1-11-oflayn.pdf",
  },
  {
    id: "sale-offline",
    group: "offline",
    title: {
      uz: "Oldi-sotdi shartnomasi (1-11, oflayn)",
      ru: "Договор купли-продажи (1-11, офлайн)",
    },
    description: {
      uz: "Oldi-sotdi shartnomasini tuzish bo'yicha oferta — hamkor-do'konda savdo tartibi, to'lov va topshirish shartlari.",
      ru: "Оферта на заключение договора купли-продажи — порядок продажи в магазине-партнёре, условия оплаты и передачи товара.",
    },
    file: "/documents/oldi-sotdi-1-11-oflayn.pdf",
  },
];
