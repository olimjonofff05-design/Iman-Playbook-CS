// Rasmiy hujjatlar (PDF) ro'yxati — Offer sahifasida guruhlarga bo'lib
// ko'rsatiladi (group maydoni orqali, tartib OfferPage.jsx dagi
// GROUP_ORDER bo'yicha belgilanadi).
//
// Mavjud guruhlar:
//   online         — Onlayn oldi-sotdi shartnomasi (1-11 oy)
//   offline        — Oflayn oldi-sotdi shartnomasi (1-11 oy)
//   invest         — Investorlar uchun oferta (kommandit shirkatga hissa)
//   lease-online   — Onlayn Ijara (moliyaviy ijara) shartnomasi (12+ oy)
//   lease-offline  — Oflayn Ijara (moliyaviy ijara) shartnomasi (12+ oy)
//   addendum       — Qo'shimcha kelishuvlar (masalan, qurilmani bloklash)
//
// Yangi fayl qo'shish uchun:
// 1. PDF faylni `public/documents/` papkasiga joylang.
// 2. Quyidagi ro'yxatga yozuv qo'shing, `file` maydoniga fayl nomini ko'rsating
//    (fayl hali tayyor bo'lmasa `file: null` qo'ying — kartochka "Fayl
//    kutilmoqda" belgisi bilan ko'rinadi).
// 3. Yangi guruh qo'shsangiz, uni OfferPage.jsx dagi GROUP_ORDER ro'yxatiga
//    va src/i18n/ui.js dagi offer.groups (uz/ru) ichiga ham qo'shing.

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

  // ---- Investorlar uchun oferta ----
  {
    id: "invest-offer",
    group: "invest",
    title: {
      uz: "Kommandit shirkatiga hissa qo'shish to'g'risida oferta",
      ru: "Оферта о внесении вклада в коммандитное товарищество",
    },
    description: {
      uz: "Investorning Kommandit shirkatiga kommanditchi sifatida kirishi, unda ishtirok etishi va undan chiqishi bilan bog'liq shartlar.",
      ru: "Условия вступления Инвестора в Коммандитное товарищество в качестве коммандитиста, его участия и выхода из него.",
    },
    file: "/documents/investorlar-uchun-oferta.pdf",
  },

  // ---- Onlayn Ijara shartnomasi (12+ oy) ----
  {
    id: "registration-lease-online",
    group: "lease-online",
    title: {
      uz: "Platformada ro'yxatdan o'tish bo'yicha oferta",
      ru: "Оферта о регистрации на платформе",
    },
    description: {
      uz: "IMANUM platformasida ro'yxatdan o'tish va to'lov qobiliyatini aniqlash (skoring) bo'yicha oferta.",
      ru: "Оферта о регистрации и оценке платёжеспособности (скоринге) на платформе IMANUM.",
    },
    file: "/documents/royxatdan-utish-12.pdf",
  },
  {
    id: "prelim-lease-online",
    group: "lease-online",
    title: {
      uz: "Buyurtma berish bo'yicha dastlabki kelishuv",
      ru: "Предварительное соглашение оформления заказа",
    },
    description: {
      uz: "Molumaviy ijara uchun mahsulotga buyurtma berish bo'yicha ikki tomonlama dastlabki kelishuv (va'dalashuv).",
      ru: "Двустороннее предварительное соглашение оформления заказа на продукцию для финансовой аренды.",
    },
    file: "/documents/dastlabki-kelishuv-12.pdf",
  },
  {
    id: "sale-lease-online",
    group: "lease-online",
    title: {
      uz: "Moliyaviy ijara shartnomasi (ONLAYN)",
      ru: "Договор финансовой аренды (ОНЛАЙН)",
    },
    description: {
      uz: "Moliyaviy ijara shaklida tuzilgan shartnoma bo'yicha oferta — onlayn savdo tartibi, to'lov va topshirish shartlari. Fayl hozircha yuklanmagan.",
      ru: "Оферта по договору финансовой аренды — порядок онлайн-продажи, условия оплаты и передачи. Файл пока не загружен.",
    },
    file: null,
  },

  // ---- Oflayn Ijara shartnomasi (12+ oy) ----
  {
    id: "registration-lease-offline",
    group: "lease-offline",
    title: {
      uz: "Platformada ro'yxatdan o'tish bo'yicha oferta",
      ru: "Оферта о регистрации на платформе",
    },
    description: {
      uz: "IMANUM platformasida ro'yxatdan o'tish va to'lov qobiliyatini aniqlash (skoring) bo'yicha oferta.",
      ru: "Оферта о регистрации и оценке платёжеспособности (скоринге) на платформе IMANUM.",
    },
    file: "/documents/royxatdan-utish-12.pdf",
  },
  {
    id: "prelim-lease-offline",
    group: "lease-offline",
    title: {
      uz: "Buyurtma berish bo'yicha dastlabki kelishuv",
      ru: "Предварительное соглашение оформления заказа",
    },
    description: {
      uz: "Molumaviy ijara uchun mahsulotga buyurtma berish bo'yicha ikki tomonlama dastlabki kelishuv (va'dalashuv).",
      ru: "Двустороннее предварительное соглашение оформления заказа на продукцию для финансовой аренды.",
    },
    file: "/documents/dastlabki-kelishuv-12.pdf",
  },
  {
    id: "sale-lease-offline",
    group: "lease-offline",
    title: {
      uz: "Moliyaviy ijara shartnomasi (OFLAYN)",
      ru: "Договор финансовой аренды (ОФЛАЙН)",
    },
    description: {
      uz: "Moliyaviy ijara shaklida tuzilgan shartnoma bo'yicha oferta — hamkor-do'konda savdo tartibi, to'lov va topshirish shartlari.",
      ru: "Оферта по договору финансовой аренды — порядок продажи в магазине-партнёре, условия оплаты и передачи товара.",
    },
    file: "/documents/moliyaviy-ijara-12-oflayn.pdf",
  },

  // ---- Qo'shimcha kelishuvlar ----
  {
    id: "addendum-device-block",
    group: "addendum",
    title: {
      uz: "Mobil qurilmalarni bloklash bo'yicha kelishuv",
      ru: "Соглашение о блокировке мобильных устройств",
    },
    description: {
      uz: "Qo'shimcha kelishuv №1 — muddatli to'lov asosida sotilgan mobil qurilmani to'lov shartlari buzilganda bloklash tartibi (topshirish-qabul qilish dalolatnomasiga ilova).",
      ru: "Дополнительное соглашение №1 — порядок блокировки мобильного устройства, проданного в рассрочку, при нарушении условий оплаты (приложение к акту приёма-передачи).",
    },
    file: "/documents/qoshimcha-kelishuv-qurilma-bloklash.pdf",
  },
];
