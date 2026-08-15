// Operator skriptlari — ikki tilli (UZ / RU)
// Manba matndagi imloviy/grammatik xatolar tuzatilgan (masalan 5-band: "sizni albatta xabardor qilaman")

export const scriptsData = [
  {
    id: "s01", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "1. Salomlashish", ru: "1. Приветствие" },
    a: {
      uz: `Assalomu alaykum! IMAN mijozlarni qo'llab-quvvatlash xizmatiga xush kelibsiz. Ismim Aziz, qanday yordam bera olaman?`,
      ru: `Здравствуйте! Вы позвонили в службу поддержки клиентов IMAN. Меня зовут Азиз, чем могу помочь?`,
    },
  },
  {
    id: "s02", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "2. Empatiya (muammoli murojaat)", ru: "2. Эмпатия (проблемное обращение)" },
    a: {
      uz: `Tushunaman, bu sizni bezovta qilgan bo'lishi kerak. Keling, birga hal qilamiz — hozir batafsil ko'rib chiqaman.`,
      ru: `Понимаю, это могло вас расстроить. Давайте разберёмся вместе — сейчас всё внимательно проверю.`,
    },
  },
  {
    id: "s03", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "3. Ma'lumot so'rovi", ru: "3. Информационный запрос" },
    a: {
      uz: `Albatta, yordam beraman. Sizni to'lovlar grafigi, tranzaksiyalar yoki IMAN xizmatlari qiziqtiryaptimi? Investitsiyalar bo'yicha esa faqat umumiy ma'lumot bera olaman.`,
      ru: `Конечно, помогу. Вас интересует график платежей, транзакции или услуги IMAN? По инвестициям я могу дать только общую консультацию.`,
    },
  },
  {
    id: "s04", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "4. SLA berish", ru: "4. Информирование о SLA" },
    a: {
      uz: `Bunday murojaatlar odatda N kun ichida ko'rib chiqiladi. Sizniki muhim bo'lgani uchun uni ustuvor sifatida belgilab, imkon qadar tezroq hal qilishga harakat qilaman.`,
      ru: `Такие обращения обычно рассматриваются в течение N дней. Ваш вопрос важен, поэтому отмечу его как приоритетный и постараюсь решить как можно быстрее.`,
    },
  },
  {
    id: "s05", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "5. Eskalatsiya (operator o'zi hal qiladi)", ru: "5. Эскалация (решает сам)" },
    a: {
      uz: `Muammoni to'liq tushundim, hoziroq o'zim hal qilishga harakat qilaman.`,
      ru: `Я полностью понял вашу проблему, постараюсь решить её самостоятельно прямо сейчас.`,
    },
  },
  {
    id: "s06", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "6. Eskalatsiya (boshqa bo'limga)", ru: "6. Эскалация (в другой отдел)" },
    a: {
      uz: `Bu savol tegishli mutaxassisning tekshiruvini talab qiladi. Men uni hozir tegishli bo'limga yo'naltiraman va natija bilan sizni albatta xabardor qilaman.`,
      ru: `Этот вопрос требует проверки профильного специалиста. Я направлю его в нужный отдел и обязательно уведомлю вас о результате.`,
    },
  },
  {
    id: "s07", category: { uz: "Umumiy skriptlar", ru: "Общие скрипты" },
    q: { uz: "7. Yakunlash", ru: "7. Завершение звонка" },
    a: {
      uz: `IMAN'ga murojaat qilganingiz uchun rahmat. Masalangiz nazoratda, tez orada hal bo'ladi. Xizmatimiz sifatini baholab qo'yishingizni so'rayman — bu bizga yaxshilanishda yordam beradi.`,
      ru: `Спасибо, что обратились в IMAN. Ваш вопрос на контроле и скоро будет решён. Буду признателен, если оцените качество обслуживания — это помогает нам становиться лучше.`,
    },
  },

  {
    id: "s08", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Rassrochka rasmiylashtirish", ru: "Оформление рассрочки" },
    a: {
      uz: `Ilovada ro'yxatdan o'tib, shaxsingizni tasdiqlaganingizdan so'ng, kerakli mahsulotni tanlab, muddatli to'lov shartlari bilan tanishasiz.`,
      ru: `После регистрации в приложении и подтверждения личности вы выбираете товар и знакомитесь с условиями рассрочки.`,
    },
  },
  {
    id: "s09", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Ariza rad etilgan holat", ru: "Отказ в заявке" },
    a: {
      uz: `Arizangizni tizim avtomatik tarzda ko'rib chiqqan. Afsuski, aniq sababini bildira olmayman, biroq bir muddatdan so'ng qayta murojaat qilishingiz mumkin.`,
      ru: `Ваша заявка была рассмотрена автоматической системой. К сожалению, точную причину озвучить не могу, но вы можете подать заявку повторно позже.`,
    },
  },
  {
    id: "s10", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Limit ko'rinmayapti", ru: "Не отображается лимит" },
    a: {
      uz: `Buning uchun ilovani yangilab, qayta kirib ko'rishingizni so'rayman. Agar muammo davom etsa, men buni texnik bo'limga yo'naltiraman.`,
      ru: `Прошу обновить приложение и зайти заново. Если проблема сохранится, я направлю это в техническую поддержку.`,
    },
  },
  {
    id: "s11", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Ariza bekor qilish", ru: "Отмена заявки" },
    a: {
      uz: `Arizani bekor qilaman. Aniqlik uchun shartnoma raqamingizni va bekor qilish sababini ayta olasizmi?`,
      ru: `Отменю заявку. Для уточнения, назовите, пожалуйста, номер договора и причину отмены.`,
    },
  },
  {
    id: "s12", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Shaxsni tasdiqlash", ru: "Верификация личности" },
    a: {
      uz: `To'lov bo'yicha ma'lumot berishdan oldin mijozning PINFL raqamini TO'LIQ holda (14 ta raqam) so'rayman va tizimdagi ma'lumot bilan solishtiraman. Agar to'liq va aniq mos kelmasa, ma'lumot berish TAQIQLANADI.`,
      ru: `Перед предоставлением данных по платежам запрашиваю у клиента ПОЛНЫЙ ПИНФЛ (14 цифр) и сверяю с данными в системе. Если ПИНФЛ не совпадает полностью — предоставление информации СТРОГО ЗАПРЕЩЕНО.`,
    },
  },
  {
    id: "s13", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "To'lov qanday amalga oshiriladi", ru: "Как оплатить" },
    a: {
      uz: `To'lovni IMAN ilovasi orqali, shuningdek Click, Payme, Paynet yoki Xazna orqali ham amalga oshirishingiz mumkin — qaysi biri sizga qulayroq?`,
      ru: `Оплату можно произвести через приложение IMAN, а также через Click, Payme, Paynet или Xazna — какой вариант вам удобнее?`,
    },
  },
  {
    id: "s14", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Muddati o'tgan to'lov", ru: "Просрочка" },
    a: {
      uz: `Hozirgi holatga ko'ra, qarzdorlik summangiz va necha kun kechikkani quyidagicha... Keling, buni qanday yopish qulayroq bo'lishini birga ko'rib chiqamiz.`,
      ru: `На данный момент сумма задолженности и количество дней просрочки следующие... Давайте вместе посмотрим, как удобнее её погасить.`,
    },
  },
  {
    id: "s15", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Muddatidan oldin yopish", ru: "Досрочное погашение" },
    a: {
      uz: `Albatta, qoldiq summani hozir aniqlashtiraman va shartnomani to'liq yopish jarayonini tushuntirib beraman.`,
      ru: `Конечно, сейчас уточню оставшуюся сумму и разъясню процесс полного досрочного погашения.`,
    },
  },
  {
    id: "s16", category: { uz: "Rassrochka bo'yicha", ru: "По рассрочке" },
    q: { uz: "Raqam almashtirish", ru: "Смена номера телефона" },
    a: {
      uz: `Raqamingizni almashtirish uchun ilovadan log out tugmasi orqali profildan chiqing va yangi raqamingizni kiritgan holda My ID tizimidan shaxsingizni tasdiqlang, so'ng tasdiqlash kodi orqali raqamingiz avtomatik tarzda ilovada o'zgaradi.`,
      ru: `Чтобы сменить номер, выйдите из профиля в приложении через кнопку log out, введите новый номер и подтвердите личность через систему My ID — после этого номер автоматически изменится в приложении по коду подтверждения.`,
    },
  },

  {
    id: "s18", category: { uz: "Investitsiyalar bo'yicha", ru: "По инвестициям" },
    q: { uz: "Mablag' yechib olish", ru: "Вывод средств" },
    a: {
      uz: `Yechib olish muddati va umumiy jarayoni bo'yicha ma'lumot beraman, aniq hisob-kitob kerak bo'lsa moliya bo'limiga yo'naltiraman.`,
      ru: `Расскажу об общих сроках и процессе вывода средств, для точного расчёта направлю в финансовый отдел.`,
    },
  },

  {
    id: "s20", category: { uz: "Qoidalar va standartlar", ru: "Правила и стандарты" },
    q: { uz: "Asosiy tamoyil", ru: "Основной принцип" },
    a: {
      uz: `Har qanday qo'ng'iroqda avval mijozni oxirigacha tinglayman — u boshqa mavzuga o'tib ketishi mumkin. To'g'ri tushunish muammoning yarmidan ko'prog'ini hal qiladi.`,
      ru: `В любом звонке сначала полностью выслушиваю клиента — он может перейти к другой теме. Правильное понимание решает уже больше половины проблемы.`,
    },
  },
  {
    id: "s21", category: { uz: "Qoidalar va standartlar", ru: "Правила и стандарты" },
    q: { uz: "Amaliy misol: investor → rassrochka", ru: "Пример: инвестор → рассрочка" },
    a: {
      uz: `Mijoz suhbatni investitsiya haqidagi savol bilan boshlashi mumkin, ammo aslida uni muddatli to'lov orqali mahsulot xarid qilish qiziqtirayotgan bo'ladi. Murojaatni oxirigacha tinglamasangiz, uning haqiqiy ehtiyojini payqamay qolishingiz mumkin.`,
      ru: `Клиент может начать разговор с вопроса об инвестициях, но на деле его интересует покупка товара в рассрочку. Не дослушав до конца, легко упустить его настоящую потребность.`,
    },
  },
  {
    id: "s22", category: { uz: "Qoidalar va standartlar", ru: "Правила и стандарты" },
    q: { uz: "Baholash mezonlari", ru: "Критерии оценки" },
    a: {
      uz: `Har bir bosqich — salomlashish, tinglash, ma'lumot berish, yechim va yakunlash — alohida baholanadi.`,
      ru: `Каждый этап — приветствие, слушание, информирование, решение и завершение — оценивается отдельно.`,
    },
  },
  {
    id: "s23", category: { uz: "Qoidalar va standartlar", ru: "Правила и стандарты" },
    q: { uz: "Tipik xatolar", ru: "Типичные ошибки" },
    a: {
      uz: `Mijozni oxirigacha tinglamasdan javob berish, taqiqlangan iboralarni ishlatish, SLA muddatini aytmasdan qoldirish.`,
      ru: `Ответ без выслушивания клиента до конца, использование запрещённых фраз, отсутствие озвучивания SLA.`,
    },
  },
];
