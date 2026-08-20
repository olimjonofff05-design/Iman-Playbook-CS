// Mijozni identifikatsiya qilish va uchinchi shaxslarga ma'lumot berish —
// mahsulot sahifasi shabloni uchun qisqa umumiy ma'lumot bloklari.
// Bu fayl mavjud identData.js (FAQ) ni almashtirmaydi — u FAQ bo'lib qoladi,
// bu yerdagi bloklar esa sahifaning yuqorisida (1-4 bo'lim) ko'rsatiladi.

export const identOverview = {
  // Sahifada "Oxirgi yangilangan: ..." shaklida ko'rsatiladi
  lastUpdated: "2026-08-20",

  // Agar shartlar o'zgargan yoki aksiya bo'lsa, shu yerga matn yozing — sahifada
  // ajratilgan rangli bannerda ko'rsatiladi. Kerak bo'lmasa `null` qoldiring.
  banner: null,

  generalDescription: {
    uz: `Har qanday shartnoma, hisob yoki shaxsiy ma'lumotga tegishli axborot berishdan oldin operator suhbatdoshni identifikatsiya qilishi shart. Bu qoida barcha Customer Service, Investorlarni qo'llab-quvvatlash xizmati va "Rassrochka" bo'limi operatorlari uchun majburiydir — identifikatsiyasiz hech qanday shaxsiy yoki shartnomaviy ma'lumot berilmaydi.`,
    ru: `Прежде чем предоставить любую информацию, связанную с договором, счётом или персональными данными, оператор обязан провести идентификацию собеседника. Это правило обязательно для всех операторов Customer Service, Службы поддержки инвесторов и отдела «Рассрочка» — без идентификации никакая личная или договорная информация не предоставляется.`,
  },

  conditions: {
    uz: [
      "Musbat identifikatsiya uchun mijoz kamida 2 (ikki) parametrni to'g'ri aytishi kerak, ulardan biri — shartnoma/hisob raqami yoki pasport ma'lumotlari bo'lishi shart",
      "F.I.Sh — to'liq, shartnomadagidek",
      "Tug'ilgan sana — kun, oy, yil",
      "Pasport ma'lumotlari — seriya va raqam, yoki JShShIR",
      "Shartnoma / shaxsiy hisob raqami — tizimdagi to'liq raqam",
      "Kontakt telefon raqami — shartnomaga bog'langan raqamga mos bo'lishi kerak",
    ],
    ru: [
      "Для положительной идентификации клиент должен верно назвать минимум 2 (два) параметра, один из которых — номер договора/счёта или паспортные данные",
      "ФИО — полностью, как в договоре",
      "Дата рождения — число, месяц, год",
      "Паспортные данные — серия и номер, либо ПИНФЛ",
      "Номер договора / лицевого счёта — полный номер, как зафиксирован в системе",
      "Контактный номер телефона — должен совпадать с номером, привязанным к договору",
    ],
  },

  howItWorks: {
    uz: [
      "Jadvaldagi parametrlardan kamida 2 tasi bo'yicha nazorat savoli beriladi.",
      "Barcha aytilgan ma'lumotlar tizimdagisiga mos kelsa — identifikatsiya o'tgan hisoblanadi, so'ralgan ma'lumot beriladi.",
      "Kamida bitta parametr mos kelmasa — to'g'ri javobni aytib bermasdan, qo'shimcha (uchinchi) nazorat savoli beriladi.",
      "Qo'shimcha savoldan keyin ham ma'lumotlar mos kelmasa — identifikatsiya o'tmagan hisoblanadi: shartnoma borligi na tasdiqlanadi, na rad etiladi, mijozga hujjat bilan ofisga shaxsan murojaat qilish taklif etiladi.",
      "Har qanday muvaffaqiyatsiz identifikatsiya urinishi CRM/tiketga izoh sifatida — qaysi parametrlar mos kelmagani ko'rsatilib — qayd etiladi.",
    ],
    ru: [
      "Задаются контрольные вопросы минимум по 2 параметрам из таблицы.",
      "Если все названные данные совпадают с данными в системе — идентификация пройдена, запрошенная информация предоставляется.",
      "Если хотя бы один параметр не совпадает — задаётся дополнительный (третий) контрольный вопрос, без подсказки правильного варианта.",
      "Если после дополнительного вопроса данные всё ещё не совпадают — идентификация считается непройденной: наличие договора не подтверждается и не опровергается, клиенту предлагается обратиться лично в офис с документом.",
      "Любая неудачная попытка идентификации фиксируется в комментарии к обращению (CRM/тикет) с указанием, какие параметры не совпали.",
    ],
  },

  restrictions: {
    uz: [
      "Uchinchi shaxsga (qarindosh, mijoz uchun to'lov qiluvchi, notarial ishonchnomasiz vakil va h.k.) standart identifikatsiya qo'llanilmaydi — bunday holatda shartnoma tafsilotlari umuman berilmaydi",
      "Shartnoma statusi, qarzdorlik/qoldiq summasi, tranzaksiyalar tarixi hech qachon uchinchi shaxsga aytilmaydi",
      "Konkret shaxsda shartnoma borligi yoki yo'qligi tasdiqlanmaydi va rad etilmaydi",
      "Faqat notarial ishonchnoma tizimda tasdiqlangan taqdirda, ishonchnomada ko'rsatilgan doirada ma'lumot berish mumkin — vakilning o'ziga nisbatan alohida identifikatsiya talab qilinadi",
      "Umumiy to'lov rekvizitlari (karta raqami, QR-kod, to'lov maqsadi) va ommaviy tariflar — istisno, ular identifikatsiyasiz ham beriladi",
    ],
    ru: [
      "К третьему лицу (родственник, плательщик за клиента, представитель без нотариальной доверенности и т.д.) стандартная идентификация не применяется — в этом случае детали договора не раскрываются вообще",
      "Статус договора, сумма задолженности/остатка, история транзакций никогда не сообщаются третьему лицу",
      "Наличие или отсутствие договора у конкретного лица не подтверждается и не опровергается",
      "Только если нотариальная доверенность подтверждена в системе, можно предоставить информацию в пределах, указанных в доверенности — при этом сам представитель проходит отдельную идентификацию",
      "Исключение — общие реквизиты для оплаты (номер карты, QR-код, назначение платежа) и публичные тарифы: они предоставляются и без идентификации",
    ],
  },
};
