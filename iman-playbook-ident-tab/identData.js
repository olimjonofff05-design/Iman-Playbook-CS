// Mijozni identifikatsiya qilish va uchinchi shaxslarga ma'lumot berish — FAQ (UZ / RU)

export const identData = [
  {
    id: "id01",
    category: { uz: "Identifikatsiya", ru: "Идентификация" },
    q: {
      uz: "Identifikatsiya so'rash uchun qanday skript ishlatiladi?",
      ru: "Какой скрипт используется для запроса идентификации?",
    },
    a: {
      uz: `«Uzhurmatli(a) [ism], bu ma'lumotni tekshirib, sizga taqdim etishim uchun, shaxsingizni tasdiqlash bo'yicha bir necha savol berishim kerak. Iltimos, to'liq ismingizni, tug'ilgan sanangizni va shartnoma raqamini (yoki pasport seriya-raqamini) ayting».`,
      ru: `«Уважаемый(ая) [имя], чтобы я могла проверить эту информацию и предоставить её вам, мне нужно задать несколько вопросов для подтверждения вашей личности. Пожалуйста, назовите ваше полное имя, дату рождения и номер договора (либо серию и номер паспорта)».`,
    },
  },
  {
    id: "id02",
    category: { uz: "Identifikatsiya", ru: "Идентификация" },
    q: {
      uz: "Mijoz pasport seriyasini yoki boshqa parametrni aytishdan bosh tortsa nima qilish kerak?",
      ru: "Что делать, если клиент отказывается назвать серию паспорта или другой параметр?",
    },
    a: {
      uz: `Avval sababini xotirjam tushuntiring: «Biz sizga ma'lumotni bermoqchimiz, lekin jarayon bo'yicha shaxsingizga ishonch hosil qilishimiz kerak — bu sizning xavfsizligingiz uchun qilinadi». Agar mijoz baribir bitta parametrni (masalan, pasportni) aytishdan bosh tortsa — boshqa kombinatsiya orqali identifikatsiya taklif qiling (masalan, F.I.Sh + tug'ilgan sana + shartnoma raqami). Agar mijoz identifikatsiyadan umuman bosh tortsa — ma'lumot berilmaydi, hujjat bilan ofisga shaxsan murojaat qilish taklif etiladi.`,
      ru: `Сначала спокойно объясните причину: «Мы хотим дать вам информацию, но по процессу мы должны удостовериться в вашей личности — это делается для вашей же безопасности». Если клиент всё равно отказывается назвать один параметр (например, паспорт) — предложите подтвердить личность через другую комбинацию (например, ФИО + дата рождения + номер договора). Если клиент отказывается от идентификации в принципе — информация не предоставляется, предложите обратиться в офис лично с документом.`,
    },
  },
  {
    id: "id03",
    category: { uz: "Identifikatsiya", ru: "Идентификация" },
    q: {
      uz: "Identifikatsiyadan keyin ma'lumotlar mos kelmasa nima qilinadi?",
      ru: "Что делать, если после идентификации данные не совпадают?",
    },
    a: {
      uz: `Kamida bitta parametr mos kelmasa — to'g'ri javobni aytib bermasdan qo'shimcha (uchinchi) nazorat savoli beriladi. Shundan keyin ham mos kelmasa — identifikatsiya o'tmagan hisoblanadi: operator shartnoma borligini na tasdiqlaydi, na rad etadi, mijozga hujjat bilan ofisga shaxsan murojaat qilish taklif etiladi. Har bir muvaffaqiyatsiz urinish CRM/tiketga qaysi parametrlar mos kelmagani ko'rsatilib qayd etiladi.`,
      ru: `Если хотя бы один параметр не совпадает — задаётся дополнительный (третий) контрольный вопрос, без подсказки правильного ответа. Если и после этого данные не совпадают — идентификация считается непройденной: оператор не подтверждает и не опровергает наличие договора, клиенту предлагается обратиться лично в офис с документом. Каждая неудачная попытка фиксируется в CRM/тикете с указанием, какие параметры не совпали.`,
    },
  },
  {
    id: "id04",
    category: { uz: "Uchinchi shaxslar", ru: "Третьи лица" },
    q: {
      uz: "Uchinchi shaxsga identifikatsiyasiz qanday ma'lumot berish mumkin?",
      ru: "Какую информацию можно сообщить третьему лицу без идентификации?",
    },
    a: {
      uz: `Faqat umumiy va ommaviy ma'lumotlar: to'lov uchun umumiy rekvizitlar (kompaniya kartasi raqami, QR-kod, to'lov maqsadi), ommaviy tariflar va mahsulot shartlari, ofislar manzili, murojaat qilish tartibi (qanday hujjat kerak, qayerga borish kerak), profil bo'limining kontaktlari, mahsulot/xizmatning umuman mavjudligi (konkret mijozga bog'lanmagan holda).`,
      ru: `Только общие и публичные сведения: общие реквизиты для оплаты (номер карты компании, QR-код, назначение платежа), публичные тарифы и условия продукта, адреса офисов, общий порядок обращения (какие документы нужны, куда идти), контакты профильного отдела, факт существования продукта/услуги в целом (не привязано к конкретному клиенту).`,
    },
  },
  {
    id: "id05",
    category: { uz: "Uchinchi shaxslar", ru: "Третьи лица" },
    q: {
      uz: "Uchinchi shaxsga nimalarni aytib bo'lmaydi?",
      ru: "Что нельзя сообщать третьему лицу?",
    },
    a: {
      uz: `Shartnoma statusi (faol / muddati o'tgan / yopilgan), qarzdorlik yoki qoldiq summasi, mijozning istalgan shaxsiy ma'lumotlari (pasport, telefon, manzil), hisob bo'yicha tranzaksiyalar va operatsiyalar tarixi, konkret shaxsda shartnoma borligi yoki yo'qligini tasdiqlash yoki rad etish.`,
      ru: `Статус договора (активен / просрочен / закрыт), сумму задолженности или остатка, любые персональные данные клиента (паспорт, телефон, адрес), историю транзакций и операций по счёту, подтверждение или отрицание наличия договора у конкретного лица.`,
    },
  },
  {
    id: "id06",
    category: { uz: "Uchinchi shaxslar", ru: "Третьи лица" },
    q: {
      uz: "Qarindosh shartnoma raqamini (mijozdan olib) aytsa nima qilish kerak?",
      ru: "Что делать, если родственник называет номер договора, полученный от клиента?",
    },
    a: {
      uz: `Operator faqat umumiy to'lov rekvizitlarini (kompaniya kartasi raqami, QR-kod, to'lov maqsadi) aytishga haqli. Qarzdorlik summasi, qoldiq va shartnoma statusi hech qanday holatda oshkor qilinmaydi — shartnoma raqamini bilishning o'zi identifikatsiya hisoblanmaydi.`,
      ru: `Оператор вправе назвать только публичные реквизиты для оплаты (номер карты компании, QR-код, назначение платежа). Сумма задолженности, остаток и статус договора ни при каких условиях не раскрываются — само по себе знание номера договора не является идентификацией.`,
    },
  },
  {
    id: "id07",
    category: { uz: "Uchinchi shaxslar", ru: "Третьи лица" },
    q: {
      uz: "Uchinchi shaxs to'lov summasini yoki qoldiqni aniqlashtirishni so'rasa, javob skripti qanday?",
      ru: "Какой скрипт отказа, если третье лицо просит уточнить сумму к оплате или остаток?",
    },
    a: {
      uz: `«Afsuski, bu ma'lumotni uchinchi shaxslarga taqdim eta olmayman — bu qonun bilan himoyalangan shaxsiy ma'lumot. Iltimos, [mijoz ismi]ni shaxsan murojaat qilishga so'rang — telefon orqali, ilova yoki ofis orqali, biz albatta yordam beramiz». Agar suhbatdosh qarindoshligiga ishora qilib turib olsa: «Yordam berish istagingizni tushunaman, lekin ma'lumotni oshkor qilish faqat shartnoma egasiga yoki shartnomaga biriktirilgan notarial ishonchnomali vakilga mumkin».`,
      ru: `«К сожалению, я не могу предоставить эту информацию третьим лицам — это персональные данные, защищённые законодательством о конфиденциальности. Пожалуйста, попросите [имя клиента] обратиться лично — по телефону, через приложение или в офисе, — и мы с радостью поможем». Если собеседник настаивает или ссылается на родство: «Я понимаю ваше желание помочь, но раскрытие данных возможно только владельцу договора или представителю с нотариальной доверенностью, приложенной к договору».`,
    },
  },
  {
    id: "id08",
    category: { uz: "Uchinchi shaxslar", ru: "Третьи лица" },
    q: {
      uz: "Notarial ishonchnoma bilan murojaat qilgan vakilni qanday tekshirish kerak?",
      ru: "Как проверить представителя, обратившегося по нотариальной доверенности?",
    },
    a: {
      uz: `1) Ishonchnoma raqami va sanasini, doverital (mijoz) va poverenniy (vakil)ning F.I.Sh'ini, ishonchnomada ko'rsatilgan vakolatlar ro'yxatini so'rang. 2) Bu ma'lumotlarni tizimdagi shartnomaga biriktirilgan ishonchnoma bilan solishtiring — agar tizimda ishonchnoma bo'lmasa, telefon orqali hech qanday ma'lumot berilmaydi. 3) Ishonchnoma topilib, ma'lumotlar mos kelsa — endi vakilga standart identifikatsiya qo'llaniladi, lekin uning o'z F.I.Sh, tug'ilgan sana va pasport ma'lumotlari bo'yicha. 4) Beriladigan ma'lumot hajmi ishonchnomada ko'rsatilgan vakolatlardan oshib ketmasligi kerak; ishonchnoma haqiqiyligiga shubha bo'lsa — rad etib, vakilga original hujjat bilan ofisga shaxsan murojaat qilishni taklif qiling.`,
      ru: `1) Запросите номер и дату доверенности, ФИО доверителя (клиента) и поверенного (представителя), перечень полномочий, указанных в доверенности. 2) Сверьте эти данные с доверенностью, приложенной к договору в системе — если доверенности в системе нет, информация по телефону не предоставляется ни при каких условиях. 3) Если доверенность найдена и данные совпадают — далее к представителю применяется стандартная идентификация, но уже от его собственного имени (ФИО, дата рождения, паспортные данные представителя). 4) Объём предоставляемой информации не должен превышать полномочия, указанные в доверенности; при сомнении в подлинности — откажите и предложите представителю обратиться лично в офис с оригиналом документа.`,
    },
  },
  {
    id: "id09",
    category: { uz: "Umumiy qoida", ru: "Общее правило" },
    q: {
      uz: "Umumiy konsultatsiya va shaxsiy ma'lumotlarga kirish qanday farqlanadi?",
      ru: "Как разграничить общую консультацию и доступ к личным данным?",
    },
    a: {
      uz: `Asosiy mezon: agar javob berish uchun operatorga mijoz kartochkasini ochish yoki konkret shartnoma/hisobga bog'liq ma'lumotni oshkor qilish kerak bo'lsa — identifikatsiya doim shart. Agar javob istalgan murojaat qiluvchi uchun bir xil bo'lsa (suhbatdosh shaxsiga bog'liq bo'lmasa) — identifikatsiya kerak emas. Tez tekshirish uchun savol bering: «Agar bu boshqa odam bo'lsa, javobim o'zgararmidi?» Ha bo'lsa — bu shaxsiy ma'lumot, identifikatsiya shart. Yo'q bo'lsa — bu umumiy konsultatsiya.`,
      ru: `Ключевой критерий: идентификация нужна всегда, когда для ответа оператору требуется открыть карточку клиента или раскрыть информацию, привязанную к конкретному договору/счёту. Если ответ одинаков для любого обратившегося (не зависит от личности собеседника) — идентификация не требуется. Быстрая проверка: «Изменится ли мой ответ, если это будет другой человек?» Если да — это доступ к личным данным, идентификация обязательна. Если нет — это общая консультация.`,
    },
  },
  {
    id: "id10",
    category: { uz: "Shikoyatlar", ru: "Жалобы" },
    q: {
      uz: "Operatorga mijozdan shikoyat kelsa nima qilish kerak?",
      ru: "Что делать, если поступила жалоба клиента на оператора?",
    },
    a: {
      uz: `Har qanday shikoyat, u qanchalik jiddiy tuyulishidan qat'i nazar, albatta QA (sifat nazorati bo'limi)ga yetkazilishi shart — shikoyat asosli yoki asossiz ekanini faqat QA hal qiladi. Shikoyatni qabul qilgan operator: 1) kerakli ma'lumotni to'playdi — shikoyat qilingan operatorning F.I.Sh/ID'si, murojaat sanasi va vaqti, shikoyat mohiyati, mijozning kontakt ma'lumotlari; 2) bu ma'lumotni o'z tim lidiga yo'naltiradi — o'zi baholab yoki yopib qo'ymaydi; 3) tim lid tiket to'ldirib, shikoyatni QA'ga eskalatsiya qilishi shart.`,
      ru: `Каждая жалоба клиента на оператора, независимо от того, насколько серьёзной она кажется, обязательно должна быть доведена до QA (отдела контроля качества) — обоснована жалоба или нет, решает только QA. Оператор, принявший жалобу: 1) собирает необходимую информацию — ФИО/ID оператора, на которого поступила жалоба, дату и время обращения, суть жалобы, контакты клиента; 2) направляет её своему тимлиду — сам не оценивает и не закрывает жалобу; 3) тимлид обязан заполнить тикет и эскалировать жалобу на QA.`,
    },
  },
  {
    id: "id11",
    category: { uz: "Shikoyatlar", ru: "Жалобы" },
    q: {
      uz: "Shikoyat QA'ga eskalatsiya qilinmasa nima bo'ladi?",
      ru: "Что будет, если жалоба не была эскалирована на QA?",
    },
    a: {
      uz: `Agar shikoyat QA'ga eskalatsiya qilinmasa va tekshiruv natijasida operator xatosi tasdiqlansa — javobgarlik operatorning o'zida bo'ladi. Agar operator barcha kerakli ma'lumotni tim lidiga bergan bo'lsa-yu, tim lid keyin uni eskalatsiya qilmagan bo'lsa — javobgarlik va mijozga javob berish tim lid zimmasida bo'ladi. Boshqacha aytganda: shikoyatni oxirgi marta o'zida ushlab qolib, zanjir bo'yicha uzatmagan xodim javobgar bo'ladi.`,
      ru: `Если жалоба НЕ была эскалирована на QA, и по факту проверки выявлено, что ошибка действительно была допущена оператором — ответственность несёт оператор. Если оператор передал всю необходимую информацию тимлиду, а тимлид далее не эскалировал её на QA — ответственность за ответ клиенту и последствия ложится на тимлида. Иными словами: ответственность несёт тот, кто последним держал жалобу у себя и не передал её дальше по цепочке.`,
    },
  },
];
