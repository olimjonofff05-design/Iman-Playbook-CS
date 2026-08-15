// BNPL (IMAN Pay) — mahsulot sahifasi shabloni uchun qisqa umumiy ma'lumot bloklari.
// Bu fayl mavjud bnplData.js (FAQ) ni almashtirmaydi — u FAQ bo'lib qoladi,
// bu yerdagi bloklar esa sahifaning yuqorisida (1-4 bo'lim) ko'rsatiladi.

export const bnplOverview = {
  // Sahifada "Oxirgi yangilangan: ..." shaklida ko'rsatiladi
  lastUpdated: "2026-08-13",

  // Agar shartlar o'zgargan yoki aksiya bo'lsa, shu yerga matn yozing — sahifada
  // ajratilgan rangli bannerda ko'rsatiladi. Kerak bo'lmasa `null` qoldiring.
  banner: null,

  generalDescription: {
    uz: `IMAN Pay (BNPL) — mijozga tovarni darhol qo'lga kiritib, uning narxini foizsiz, 3 dan 12 oygacha bo'lgan muddatga bo'lib to'lash imkonini beruvchi xizmat. Xizmat murabaha (halol sotib olish-sotish) modeli asosida ishlaydi: IMAN tovarni hamkor do'kondan avval o'zi sotib oladi, so'ng mijozga oldindan belgilangan, o'zgarmas narxda sotadi. Yashirin komissiya, foiz yoki kechikish jarimasi yo'q — mahsulot ishga tushirilishidan oldin Shariat kengashi tomonidan tasdiqlangan.`,
    ru: `IMAN Pay (BNPL) — сервис, позволяющий клиенту получить товар сразу, а оплатить его стоимость без процентов в рассрочку на срок от 3 до 12 месяцев. Сервис работает по модели мурабаха (халяльная купля-продажа): IMAN сначала сам выкупает товар у партнёра, а затем продаёт его клиенту по заранее известной, фиксированной цене. Никаких скрытых комиссий, процентов или штрафов за просрочку — продукт одобрен Шариатским советом перед запуском.`,
  },

  conditions: {
    uz: [
      "Muddat: 3, 6, 9 yoki 12 oy (hamkor do'konga bog'liq)",
      "Limit: 1 000 000 so'mdan 50 000 000 so'mgacha, avtomatik skoring asosida belgilanadi",
      "Mijozga talab: O'zbekiston fuqarosi, 19 yosh va undan katta",
      "Kerakli hujjatlar: pasport yoki ID-karta + bank kartasi",
      "To'lov usullari: IMANUM ilovasi, Paynet, CLICK, PayMe",
      "Foiz, komissiya va yashirin to'lovlar yo'q — narx boshidanoq shaffof",
    ],
    ru: [
      "Срок: 3, 6, 9 или 12 месяцев (зависит от магазина-партнёра)",
      "Лимит: от 1 000 000 до 50 000 000 сум, определяется автоматически на основе скоринга",
      "Требования к клиенту: гражданин Узбекистана, возраст от 19 лет",
      "Необходимые документы: паспорт или ID-карта + банковская карта",
      "Способы оплаты: приложение IMANUM, Paynet, CLICK, PayMe",
      "Нет процентов, комиссий и скрытых платежей — цена прозрачна с самого начала",
    ],
  },

  howItWorks: {
    uz: [
      "Mijoz IMANUM ilovasini o'rnatadi, ro'yxatdan o'tadi, pasport/ID-karta va bank kartasini yuklaydi, Face-ID orqali tekshiruvdan o'tadi (odatda 1-5 daqiqa).",
      "Tizim avtomatik skoring o'tkazib, 1 000 000 dan 50 000 000 so'mgacha limit beradi.",
      "Do'konda kassir IMAN Merchant ilovasi yoki veb-versiyasi (merchant-admin.pay.imaninvest.com) orqali xarid summasini kiritib, QR-kod yaratadi.",
      "Mijoz QR-kodni IMANUM orqali skanerlaydi, to'lov muddatini (3-12 oy) va birinchi to'lov sanasini tanlaydi, SMS-kod bilan tasdiqlaydi.",
      "IMAN tovarni hamkor do'kondan rasman qabul qiladi (Kabz jarayoni), shundan so'ng xarid to'liq tasdiqlanadi.",
      "Mijoz har oy tanlangan sanada IMANUM, Paynet, CLICK yoki PayMe orqali oylik to'lovini amalga oshiradi.",
    ],
    ru: [
      "Клиент устанавливает приложение IMANUM, регистрируется, загружает паспорт/ID-карту и банковскую карту, проходит проверку через Face-ID (обычно 1-5 минут).",
      "Система автоматически проводит скоринг и предоставляет лимит от 1 000 000 до 50 000 000 сум.",
      "В магазине кассир через приложение IMAN Merchant или веб-версию (merchant-admin.pay.imaninvest.com) вводит сумму покупки и формирует QR-код.",
      "Клиент сканирует QR-код через IMANUM, выбирает срок рассрочки (3-12 месяцев) и дату первого платежа, подтверждает СМС-кодом.",
      "IMAN официально выкупает товар у магазина-партнёра (процесс Кабз), после чего покупка полностью подтверждается.",
      "Клиент ежемесячно, в выбранную дату, вносит платёж через IMANUM, Paynet, CLICK или PayMe.",
    ],
  },

  restrictions: {
    uz: [
      "Limitni naqd pulga aylantirib bo'lmaydi — faqat tovar xaridi uchun ishlatiladi, aks holda firibgarlik hisoblanadi",
      "Xizmat faqat IMAN hamkori bo'lgan do'konlarda ishlaydi",
      "Shartnomada nazarda tutilmagan tovarlar (oltin, kumush, zargarlik buyumlari) sotilmaydi",
      "To'lov 3 kalendar kundan kechiksa, mijozga qo'shimcha 3 kun beriladi; kechikish 2 martaga yoki 45 kunga yetsa, shartnoma bekor qilinib, qolgan qarzning to'liq to'lanishi talab qilinishi va masala sudga oshirilishi mumkin",
      "Muddatidan oldin to'liq to'langanda qo'shimcha chegirma yoki imtiyoz berilmaydi",
      "Firibgarlik holatlarida (bo'sh qadoq berish, naqd pulga almashtirish, soxta hujjat va h.k.) hamkorlik to'xtatiladi",
    ],
    ru: [
      "Лимит нельзя обналичить — он используется только для покупки товара, попытка обналичивания считается мошенничеством",
      "Сервис работает только в магазинах-партнёрах IMAN",
      "Товары, не предусмотренные договором (золото, серебро, ювелирные изделия), не продаются",
      "При просрочке платежа более 3 календарных дней клиенту даётся ещё 3 дня; при просрочке дважды или до 45 дней договор может быть расторгнут с требованием полного погашения долга и передачей дела в суд",
      "При досрочном полном погашении дополнительная скидка или льгота не предоставляется",
      "При выявлении мошеннических действий (передача пустой упаковки, замена на наличные, поддельные документы и т.д.) сотрудничество прекращается",
    ],
  },
};
