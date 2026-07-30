// Interfeys (statik) matnlari — sahifa emas, tugma/sarlavha/label kabi doimiy elementlar

export const ui = {
  uz: {
    app: {
      name: "IMAN Playbook",
      subtitle: "Customer Support Portal",
      searchPlaceholder: "Portal bo'ylab qidirish...",
      profileName: "Azizullo Olimjonov",
      owner: "Owner: Azizullo Olimjonov",
    },
    menu: {
      dashboard: "Dashboard",
      about: "IMAN haqida",
      imanum: "IMANUM ilovasi",
      bnpl: "BNPL",
      invest: "Invest",
      kvadrat: "KVADRAT",
      scripts: "Skriptlar",
      offer: "Offer",
      settings: "Sozlamalar",
    },
    dashboard: {
      title: "IMAN Playbookka xush kelibsiz",
      subtitle: "Mijozlarni qo'llab-quvvatlash bilim bazasi",
    },
    cards: {
      about: { title: "IMAN haqida", desc: "Kompaniya haqida ma'lumot" },
      imanum: { title: "IMANUM ilovasi", desc: "Ilova bo'yicha qo'llanma" },
      bnpl: { title: "BNPL", desc: "FAQ, jarayon, qoidalar" },
      invest: { title: "Invest", desc: "Investitsiya bo'yicha ma'lumot" },
      kvadrat: { title: "KVADRAT", desc: "Ko'chmas mulkka investitsiya" },
      scripts: { title: "Skriptlar", desc: "Operator uchun tayyor matnlar" },
      offer: { title: "Offer", desc: "Rasmiy hujjatlar" },
    },
    common: {
      searchPlaceholder: "Qidirish...",
      all: "Barchasi",
      emptyState: "Hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring.",
    },
    pages: {
      about: { icon: "🕌", title: "IMAN haqida", subtitle: "Kompaniya, uning missiyasi va faoliyati haqida." },
      imanum: { icon: "📱", title: "IMANUM ilovasi", subtitle: "Ilova imkoniyatlari, ro'yxatdan o'tish va xavfsizlik bo'yicha ma'lumotlar." },
      bnpl: { icon: "🛒", title: "BNPL Playbook", subtitle: "Bo'lib to'lash xizmati bo'yicha jarayonlar, savol-javoblar va operator qo'llanmasi." },
      invest: { icon: "💰", title: "Invest Playbook", subtitle: "Investitsiya mahsuloti bo'yicha savol-javoblar va tushuntirishlar." },
      kvadrat: { icon: "🏢", title: "KVADRAT", subtitle: "Ko'chmas mulkka investitsiya mahsuloti bo'yicha ma'lumotlar." },
      scripts: { icon: "📞", title: "Operator skriptlari", subtitle: "Qo'ng'iroq va yozishmalar uchun tayyor matnlar." },
    },
    offer: {
      title: "Ommaviy oferta va hujjatlar",
      subtitle: "IMAN xizmatlaridan foydalanish shartlarini belgilovchi rasmiy hujjatlar.",
      emptyState: "Hozircha hujjat yuklanmagan. Oferta faylini public/documents/ papkasiga joylab, src/data/documents.js faylida ro'yxatga qo'shing.",
      view: "Ko'rish",
      download: "Yuklab olish",
      pending: "Fayl kutilmoqda",
      intro: {
        heading: "Ommaviy oferta",
        lead: "\"IMAN\" ilovasi foydalanuvchilarga quyidagi imkoniyatlarni taqdim etadi:",
        bullets: [
          "Tovarlarni 1 oydan 11 oygacha nasiya savdoga \"Oldi-sotdi shartnomasini tuzish bo'yicha oferta\" (ONLAYN & OFLAYN) asosida sotib olish;",
          "\"Moliyaviy ijara shaklida tuzilgan shartnoma bo'yicha oferta\"ni tuzish orqali tovarlarni 12 oy yoki undan ko'proq muddatga ijara to'lovlarini to'lash sharti bilan moliyaviy ijaraga olish;",
        ],
        afterBullets:
          "\"IMAN\" platformasida har qanday bitim tuzish uchun foydalanuvchi ushbu sahifada joylashgan \"IMAN\" foydalanuvchilari uchun taqdim etilgan ommaviy taklif shartlari bilan tanishishi va roziligini tasdiqlashi kerak.",
        smsNote:
          "Foydalanuvchining \"IMAN\" Ommaviy Takliflari shartlari bilan tanishishi va roziligini tasdiqlash SMS tarzida olingan kodni \"IMAN\" platformasiga kiritish orqali amalga oshiriladi.",
        variantsLead:
          "Foydalanuvchi tanlagan shartlarga qarab, u bilan tuzilgan bitimga quyidagi \"IMAN\" shartnomalaridan birining shartlari qo'llaniladi:",
        variants: [
          "Agar foydalanuvchi tovarlarni 1 oydan 11 oygacha onlayn tarzda nasiyaga sotib olishni xohlasa, 2025 yil 3-fevraldagi 4-sonli \"Oldi-sotdi shartnomasini tuzish bo'yicha Oferta\" (onlayn savdo) shartlari qo'llaniladi.",
          "Agar foydalanuvchi tovarlarni 1 oydan 11 oygacha oflayn tarzda nasiyaga sotib olishni xohlasa, 2025 yil 3-fevraldagi 4-sonli \"Oldi-sotdi shartnomasini tuzish bo'yicha Oferta\" (oflayn savdo) shartlari qo'llaniladi.",
          "Agar foydalanuvchi tovarlarni 12 oy yoki undan ko'proq muddatga oflayn tarzda olishni xohlasa, 2025 yil 3-fevraldagi 3-sonli \"Moliyaviy Ijara shaklida tuzilgan shartnoma bo'yicha oferta\" (oflayn) shartlari qo'llaniladi.",
          "Agar foydalanuvchi tovarlarni 12 oy yoki undan ko'proq muddatga onlayn tarzda olishni xohlasa, 2025 yil 3-fevraldagi 3-sonli \"Moliyaviy Ijara shaklida tuzilgan shartnoma bo'yicha oferta\" (onlayn) shartlari qo'llaniladi.",
        ],
        filesNote: "Taklif bilan tanishish uchun siz quyidagi fayllardan biriga o'tishingiz kerak.",
      },
      groups: {
        online: "Onlayn oldi-sotdi shartnomasi (1-11 oylik muddat)",
        offline: "Oflayn oldi-sotdi shartnomasi (1-11 oylik muddat)",
        invest: "Investorlar uchun oferta",
        "lease-online": "Onlayn Ijara shartnomasi (12+ oy)",
        "lease-offline": "Oflayn Ijara shartnomasi (12+ oy)",
        addendum: "Qo'shimcha kelishuvlar",
      },
    },
    settings: {
      title: "Sozlamalar",
      subtitle: "Shaxsiy profil va portal sozlamalari.",
      name: "Ism",
      language: "Til",
      notifications: "Bildirishnomalarni yoqish",
      save: "Saqlash",
      saved: "Saqlandi",
    },
  },

  ru: {
    app: {
      name: "IMAN Playbook",
      subtitle: "Customer Support Portal",
      searchPlaceholder: "Поиск по порталу...",
      profileName: "Azizullo Olimjonov",
      owner: "Владелец: Azizullo Olimjonov",
    },
    menu: {
      dashboard: "Главная",
      about: "Об IMAN",
      imanum: "Приложение IMANUM",
      bnpl: "BNPL",
      invest: "Инвестиции",
      kvadrat: "KVADRAT",
      scripts: "Скрипты",
      offer: "Оферта",
      settings: "Настройки",
    },
    dashboard: {
      title: "Добро пожаловать в IMAN Playbook",
      subtitle: "База знаний службы поддержки клиентов",
    },
    cards: {
      about: { title: "Об IMAN", desc: "Информация о компании" },
      imanum: { title: "Приложение IMANUM", desc: "Руководство по приложению" },
      bnpl: { title: "BNPL", desc: "FAQ, процесс, правила" },
      invest: { title: "Инвестиции", desc: "Информация об инвестициях" },
      kvadrat: { title: "KVADRAT", desc: "Инвестиции в недвижимость" },
      scripts: { title: "Скрипты", desc: "Готовые тексты для оператора" },
      offer: { title: "Оферта", desc: "Официальные документы" },
    },
    common: {
      searchPlaceholder: "Поиск...",
      all: "Все",
      emptyState: "Ничего не найдено. Попробуйте другой запрос.",
    },
    pages: {
      about: { icon: "🕌", title: "Об IMAN", subtitle: "О компании, её миссии и деятельности." },
      imanum: { icon: "📱", title: "Приложение IMANUM", subtitle: "Возможности приложения, регистрация и безопасность." },
      bnpl: { icon: "🛒", title: "BNPL Playbook", subtitle: "Процессы, вопросы и ответы по рассрочке для оператора." },
      invest: { icon: "💰", title: "Invest Playbook", subtitle: "Вопросы и разъяснения по инвестиционному продукту." },
      kvadrat: { icon: "🏢", title: "KVADRAT", subtitle: "Информация о продукте инвестиций в недвижимость." },
      scripts: { icon: "📞", title: "Скрипты оператора", subtitle: "Готовые тексты для звонков и переписки." },
    },
    offer: {
      title: "Публичная оферта и документы",
      subtitle: "Официальные документы, регламентирующие условия пользования услугами IMAN.",
      emptyState: "Пока документ не загружен. Поместите файл оферты в public/documents/ и добавьте в список в src/data/documents.js.",
      view: "Просмотреть",
      download: "Скачать",
      pending: "Файл ожидается",
      intro: {
        heading: "Публичная оферта",
        lead: "Приложение «IMAN» предоставляет пользователям следующие возможности:",
        bullets: [
          "Приобретать товары в рассрочку сроком от 1 до 11 месяцев на основании «Оферты на заключение договора купли-продажи» (ОНЛАЙН и ОФЛАЙН);",
          "Оформив «Оферту по договору финансовой аренды», брать товары в финансовую аренду сроком на 12 месяцев и более с условием уплаты арендных платежей;",
        ],
        afterBullets:
          "Для заключения любой сделки на платформе «IMAN» пользователь должен ознакомиться с условиями публичной оферты, размещённой на данной странице для пользователей «IMAN», и подтвердить своё согласие.",
        smsNote:
          "Подтверждение пользователем ознакомления с условиями Публичных оферт «IMAN» и согласия с ними осуществляется путём ввода кода, полученного по SMS, на платформу «IMAN».",
        variantsLead:
          "В зависимости от выбранных пользователем условий, к заключённой с ним сделке применяются условия одного из следующих договоров «IMAN»:",
        variants: [
          "Если пользователь желает приобрести товары в рассрочку онлайн на срок от 1 до 11 месяцев, применяются условия «Оферты на заключение договора купли-продажи» № 4 от 3 февраля 2025 года (онлайн-продажа).",
          "Если пользователь желает приобрести товары в рассрочку офлайн на срок от 1 до 11 месяцев, применяются условия «Оферты на заключение договора купли-продажи» № 4 от 3 февраля 2025 года (офлайн-продажа).",
          "Если пользователь желает получить товары офлайн в финансовую аренду сроком на 12 месяцев и более, применяются условия «Оферты по договору финансовой аренды» № 3 от 3 февраля 2025 года (офлайн).",
          "Если пользователь желает получить товары онлайн в финансовую аренду сроком на 12 месяцев и более, применяются условия «Оферты по договору финансовой аренды» № 3 от 3 февраля 2025 года (онлайн).",
        ],
        filesNote: "Для ознакомления с офертой перейдите к одному из следующих файлов.",
      },
      groups: {
        online: "Договор купли-продажи онлайн (срок 1-11 месяцев)",
        offline: "Договор купли-продажи офлайн (срок 1-11 месяцев)",
        invest: "Оферта для инвесторов",
        "lease-online": "Договор аренды онлайн (12+ месяцев)",
        "lease-offline": "Договор аренды офлайн (12+ месяцев)",
        addendum: "Дополнительные соглашения",
      },
    },
    settings: {
      title: "Настройки",
      subtitle: "Личный профиль и настройки портала.",
      name: "Имя",
      language: "Язык",
      notifications: "Включить уведомления",
      save: "Сохранить",
      saved: "Сохранено",
    },
  },
};
