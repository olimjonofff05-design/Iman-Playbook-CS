// Playbookdagi yangilanishlar tarixi. Yangi o'zgarish qilinganda shu ro'yxatga
// ENG YUQORIGA yangi obyekt qo'shing — "i" belgisidagi bildirishnoma va
// pastdagi "Yangiliklar" ro'yxati avtomatik shundan o'qiydi.
export const changelog = [
  {
    id: "2026-09-30",
    date: "30.09.2026",
    uz: {
      title: "Ikki yangi kalkulyator + raqam almashtirish tartibi",
      items: [
        "Ish kuni kalkulyatori: bayramlarni hisobga olib ish va kalendar kunlarini hisoblaydi (2026-yil farmoni asosida)",
        "Invest kalkulyator: muddatidan oldin chiqishda beriladigan va ushlab qolinadigan summa",
        "IMANUM: telefon raqamini almashtirganda eski hisobni yangi raqamga ko'chirish tartibi",
        "BNPL va Invest: raqam almashtirish bo'yicha javoblar yangilandi",
      ],
    },
    ru: {
      title: "Два новых калькулятора + порядок смены номера",
      items: [
        "Калькулятор рабочих дней: считает рабочие и календарные дни с учётом праздников (по указу на 2026 год)",
        "Invest калькулятор: сумма к выплате и удержанию при досрочном выходе",
        "IMANUM: порядок переноса старого аккаунта на новый номер телефона",
        "BNPL и Invest: обновлены ответы о смене номера",
      ],
    },
  },
  {
    id: "2026-09-18",
    date: "18.09.2026",
    uz: {
      title: "Vizual yangilanish + BNPL yangiliklari",
      items: [
        "Butun sayt bo'ylab silliq animatsiyalar va zamonaviy ko'rinish",
        "BNPL: tovar qaytarish (vozvrat) — OFFLINE va ONLINE tartibi qo'shildi",
        "BNPL: unduruv bo'limi uchun kechikish bosqichlari (1-30, 30-60, 60-90, 90+ kun)",
        "Identifikatsiya bo'limi endi to'liq, alohida sahifa",
      ],
    },
    ru: {
      title: "Визуальное обновление + новости BNPL",
      items: [
        "Плавные анимации и современный вид по всему сайту",
        "BNPL: добавлен порядок возврата товара — OFFLINE и ONLINE",
        "BNPL: этапы просрочки для отдела взыскания (1-30, 30-60, 60-90, 90+ дней)",
        "Раздел «Идентификация» теперь отдельная полноценная страница",
      ],
    },
  },
  {
    id: "2026-08-15",
    date: "15.08.2026",
    uz: {
      title: "Playbook qayta qurildi",
      items: [
        "Har bir mahsulot uchun yagona 5-bloklik shablon (Umumiy tavsif, Shartlar, Jarayon, Cheklovlar, FAQ)",
        "Gorizontal Playbook (tezkor shpargalka) qo'shildi",
        "QA fikrlari bo'limi — Telegram push bilan",
        "Butun portal bo'ylab ishlaydigan qidiruv",
      ],
    },
    ru: {
      title: "Playbook пересобран",
      items: [
        "Единый шаблон из 5 блоков для каждого продукта",
        "Добавлена горизонтальная шпаргалка Playbook",
        "Раздел «Отзывы QA» с push-уведомлением в Telegram",
        "Рабочий поиск по всему порталу",
      ],
    },
  },
];
