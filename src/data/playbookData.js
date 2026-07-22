// Namuna kontent — buni haqiqiy IMAN ma'lumotlari bilan almashtiring.
// Har bir bo'lim: { id, q (savol/sarlavha), a (javob/tavsif) }

export const bnplData = [
  // Hamkorlik va umumiy shartlar
  {
    id: "b01",
    category: "Umumiy shartlar",
    q: "IMAN PAY nima?",
    a: `IMAN qulay bo'lib to'lash imkoniyatini taklif qiladi — xaridor tovarni darhol sotib olib, to'lovlarni bo'lib-bo'lib amalga oshiradi. To'lovlar 3 dan 12 oygacha bo'lgan muddatga teng taqsimlanadi, foizsiz va ortiqcha to'lovlarsiz, to'liq islomiy tamoyillarga mos keladi.

Rassrochka murabaha modeli asosida rasmiylashtiriladi — bu halol sotib olish-shartnomasi bo'lib, unda IMAN avval tovarni hamkoridan xarid qiladi, so'ngra mijozga oldindan ma'lum bo'lgan, belgilangan narxda sotadi. Xaridor faqat shu narxni to'laydi — yashirin komissiyalar va qo'shimcha to'lovlar yo'q.`,
  },
  {
    id: "b02",
    category: "Umumiy shartlar",
    q: "BNPL nima?",
    a: `IMAN kompaniyasining BNPL tizimi mijozlarga tovarlar uchun bir vaqtning o'zida xarid qilish, so'ng ularni 3 oydan 12 oygacha bo'lgan muddatga bo'lib to'lash imkonini beradi. Bu moliyani boshqarishning qulay usuli — bir martalik to'lovsiz xaridlarni amalga oshirish, mablag'larni qaytarish muddatlarini tanlashda moslashuvchanlikni saqlab qolgan holda.`,
  },
  {
    id: "b03",
    category: "Umumiy shartlar",
    q: "Nima uchun hamkor do'konga IMANPAY kerak?",
    a: `Mahsulotlaringiz bo'lib to'lash imkoniyatini taqdim etish orqali aylanmalaringizni oshirishingiz mumkin: yangi xaridorlarni jalb qilish, do'koningiz konversiyasini oshirish, o'rtacha chek summasini (cheklardagi mahsulotlar sonini) ko'paytirish orqali. Shuningdek, mijozlaringizda brendingizga nisbatan sadoqat shakllantirasiz.`,
  },
  {
    id: "b04",
    category: "Umumiy shartlar",
    q: "Islom moliyasiga muvofiq nasiya qanday bo'lishi kerak?",
    a: `Asosiy prinsiplar: ribo (foiz) man etiladi — yashirin yoki qo'shimcha foizlar bo'lmasligi kerak; narx aniq belgilanadi — nasiya beruvchi foiz o'rniga mahsulot narxini ko'paytirib nasiya ta'minlaydi; narx va shartlar o'zgarmas va oshkor bo'lishi kerak; ikki tomon adolatli bo'lishi, xavf va foyda adolatli taqsimlanishi kerak; kechikishlarda qo'shimcha jarima qo'llanilmaydi; nasiya beruvchining faoliyati halol bo'lishi shart.`,
  },
  {
    id: "b05",
    category: "Umumiy shartlar",
    q: "IMAN faoliyati Islom moliyasi tamoyillariga mos keladimi?",
    a: `Ha, IMAN'ning butun faoliyati islom moliyasi tamoyillari va me'yorlariga to'liq mos keladi. Foizsiz, shaffof va adolatli moliyaviy yechimlar — kompaniyaning asosiy ustuvor yo'nalishi. Har bir mahsulot ishga tushirilishidan oldin Shariat kengashi tomonidan tekshiriladi va tasdiqlanadi. Fatvo matnlari bilan https://imaninvest.com/sharia va imanpay.uz/sharia saytlarida tanishish mumkin.`,
  },
  {
    id: "b06",
    category: "Umumiy shartlar",
    q: "Kimlar Nasiyadan foydalana oladi?",
    a: `Agar siz O'zbekiston fuqarosi bo'lsangiz va 19 yoshga to'lgan bo'lsangiz, muddatli to'lovdan foydalanishingiz mumkin.`,
  },
  {
    id: "b07",
    category: "Umumiy shartlar",
    q: "IMAN Nasiyaning qanday afzalliklari bor?",
    a: `Foizlar yo'q — kechikishda qo'shimcha jarima yoki foiz hisoblanmaydi. Shaffof shartlar — barcha to'lov muddatlari, summalari va umumiy qiymat oldindan ko'rsatiladi. Islom moliyasi (murobaha) tamoyillariga muvofiqlik. Onlayn va qulay jarayon — ilova orqali tez rasmiylashtirish. Faqat real tovarlar — muddatli to'lov faqat sotuvda bo'lgan tovarlarga taqdim etiladi.`,
  },
  {
    id: "b08",
    category: "Umumiy shartlar",
    q: "IMAN'dan BNPL oddiy kredit karta yoki mikroqarzdan nimasi bilan farq qiladi?",
    a: `IMAN Pay — mahsulot uchun foizlar, jarimalar, komissiyalar va yashirin to'lovlarsiz bo'lib to'lash xizmati. Kredit kartada imtiyozli davrdan keyin (ko'pincha yuqori) foizlar hisoblanadi, mikroqarzda esa foizlar darhol boshlanadi. IMAN Pay'da kechiktirilganda ham jarima yo'q, faqat eslatma yuboriladi. Shartlar boshidanoq shaffof, rasmiylashtirish 1-2 daqiqa — to'g'ridan-to'g'ri hamkor do'konda yoki onlayn.`,
  },
  {
    id: "b09",
    category: "Umumiy shartlar",
    q: "Qanday holatlarda hamkorlik to'xtatiladi?",
    a: `Shartnoma buzilishi sifatida qaraladigan holatlar: bo'sh qadoqni kuryerga berib, mahsulotni to'g'ridan-to'g'ri mijozga o'tkazish; naqd pulni mahsulot o'rniga mijozga berish bo'yicha kelishuv; noto'g'ri ma'lumot yoki narx ko'rsatish; xayoliy yetkazib berish uchun til biriktirish; shartnomada nazarda tutilmagan tovarlarni (oltin, kumush, zargarlik) sotish; boshqa firibgar harakatlar yoki hujjatlarni soxtalashtirish.`,
  },

  // Limit olish
  {
    id: "b10",
    category: "Limit olish",
    q: "Limit qanday olinadi?",
    a: `1. IMANUM ilovasini Google Play yoki App Store orqali o'rnating. 2. Telefon raqamingizni kiritib ro'yxatdan o'ting. 3. Pasport yoki ID-karta (seriya va raqam yetarli) hamda bank kartangizni yuklang, skoring va Face-ID'dan o'ting. 4. Barcha bosqichlarni bajarganingizdan so'ng 1 000 000 so'mdan 24 000 000 so'mgacha limitga ega bo'lasiz. Limitdan IMAN hamkor do'konlarida xarid qilish uchun foydalaniladi.`,
  },
  {
    id: "b11",
    category: "Limit olish",
    q: "Tekshiruvdan (verifikatsiya) qanday o'tish kerak? Muammolar bo'lsa nima qilish kerak?",
    a: `IMANUM ilovasini oching, telefon raqamingizni kiriting, pasport/ID-kartangizni yuklang va selfi oling — internet barqaror, kamera/fayllarga ruxsat berilganiga ishonch hosil qiling. Tasdiqlanmasa: ilovani qayta ishga tushiring, suratlar aniq va kesilmaganligiga ishonch hosil qiling, 5-10 daqiqadan so'ng qayta urinib ko'ring. Hal bo'lmasa — ilova/Telegram orqali yozing yoki +998 78 113 00 30 raqamiga qo'ng'iroq qiling. Jarayon odatda 1-5 daqiqa davom etadi, natija bildirishnoma orqali keladi.`,
  },
  {
    id: "b12",
    category: "Limit olish",
    q: "Qanday hujjatlar kerak bo'ladi?",
    a: `Shaxsni tasdiqlovchi hujjat (pasport yoki ID-karta) va bank kartasi (daromad manbaini tasdiqlash uchun). Ma'lumotlar IMANUM ilovasi orqali yuklanadi, tekshiruv va baholash avtomatik amalga oshiriladi, jarayon to'liq onlayn.`,
  },
  {
    id: "b13",
    category: "Limit olish",
    q: "Qancha vaqt ichida javob olinadi?",
    a: `Arizani ko'rib chiqish odatda 30 soniyadan 2 daqiqagacha davom etadi. Ma'lumotlar yuklangandan so'ng tizim avtomatik tekshiruvni amalga oshiradi va natija darhol ilovada ko'rinadi.`,
  },
  {
    id: "b14",
    category: "Limit olish",
    q: "Limit miqdori nimaga bog'liq?",
    a: `Limit avtomatik belgilanadi va quyidagilarga bog'liq: 1) ma'lumotlar ishonchliligi va tekshiruvdan muvaffaqiyatli o'tish; 2) bank kartasidagi aylanma tahlili; 3) kredit tarixi; 4) qo'shimcha bank kartasi qo'shish; 5) xizmatdan foydalanish tarixi (o'z vaqtida to'lovlar). Summa 1 000 000 dan 24 000 000 so'mgacha bo'lishi mumkin.`,
  },
  {
    id: "b15",
    category: "Limit olish",
    q: "Limitni qanday oshirish mumkin?",
    a: `1) Vaqtida to'lang — mas'uliyatli foydalanish limitni oshirishi mumkin. 2) Qo'shimcha bank kartasini ulang — bu baholash uchun ma'lumot hajmini oshiradi. 3) Ro'yxatdan o'tgan kartadagi faollikni oshiring — tez-tez tushum va to'lovlar to'lov qobiliyatini aniqroq baholashga yordam beradi.`,
  },
  {
    id: "b16",
    category: "Limit olish",
    q: "Limitning maksimal va minimal miqdori qancha?",
    a: `Minimal limit — 1 000 000 so'm. Maksimal limit — 24 000 000 so'm. Limit tasdiqlangandan keyin o'rnatiladi va xizmatdan foydalanishdagi faollik/mas'uliyatga qarab o'zgarishi mumkin.`,
  },
  {
    id: "b17",
    category: "Limit olish",
    q: "Limit berilmagan bo'lsa nima qilish kerak?",
    a: `Sabablari: tahlil uchun yetarli ma'lumot yo'qligi (masalan, faol bank kartasi yo'q); tizim to'lov qobiliyatini hozircha tasdiqlay olmadi; arizani qayta ishlashda texnik xatolik. Nima qilish kerak: pasport ma'lumotlari to'g'riligini va bank kartasi yuklanganini tekshiring; zarur bo'lsa qo'shimcha karta qo'shib qayta baholanishini so'rang; 30 kundan keyin qayta urinib ko'rish mumkin. Savol bo'lsa +998 78 113 00 30 call-markaziga murojaat qiling.`,
  },
  {
    id: "b18",
    category: "Limit olish",
    q: "Limitni naqd pulga aylantirish mumkinmi?",
    a: `Yo'q. IMAN Pay — bu naqd pulli kredit emas, balki BNPL (Buy Now Pay Later) xizmati. Pul mijozning qo'liga tushmaydi, u to'g'ridan-to'g'ri xarid qilingan do'konga o'tkaziladi. Maqsad — tovar sotib olish, naqd pul olish emas. Naqdlashtirishga urinish firibgarlik hisoblanadi va blokirovka hamda sud oqibatlariga olib kelishi mumkin.`,
  },

  // Xaridlar va to'lov
  {
    id: "b19",
    category: "Xaridlar va to'lov",
    q: "Limit olingandan keyin qanday xarid qilish mumkin?",
    a: `Hamkor do'konlar, marketpleys yoki hamkorlarning rasmiy veb-saytlarida xarid qilish mumkin. Kassadagi sotuvchi QR-kod yaratadi, siz uni IMANUM ilovasi orqali skanerlab, xaridni ilova ichida tasdiqlaysiz. Smartfoningiz bo'lmasa, do'kon xodimi kompyuter/xizmat telefonida siz uchun jarayonni o'tkazishi mumkin — sizga faqat SMS-kodni aytish kifoya.`,
  },
  {
    id: "b20",
    category: "Xaridlar va to'lov",
    q: "IMAN hamkorlari ro'yxatini qayerda ko'rish mumkin?",
    a: `IMANUM ilovasini oching → "Do'kon" bo'limiga o'ting → pastga "Hamkorlarimiz" bo'limigacha varaqlang — u yerda barcha mavjud nuqtalarning dolzarb ro'yxati bor.`,
  },
  {
    id: "b21",
    category: "Xaridlar va to'lov",
    q: "Online xarid qilsa bo'ladimi?",
    a: `Ha. IMAN marketpleysida (bevosita IMANUM ilovasida) yoki hamkorlarning rasmiy veb-saytlarida (yetkazib berish manzili va shaxsiy ma'lumotlarni kiritgach, sayt QR-kod yaratadi, uni IMANUM orqali skanerlab xaridni yakunlaysiz).`,
  },
  {
    id: "b22",
    category: "Xaridlar va to'lov",
    q: "Nasiya bo'yicha to'lovlarni qanday amalga oshirish kerak?",
    a: `1. IMANUM ilovasida "Halol muddatli to'lov" bo'limiga kiring. 2. Joriy to'lovni tanlang — summa va sanani ko'rasiz. 3. "To'lov" tugmasini bosib, usulni tanlang (karta, invoys va h.k.). 4. To'lovni tasdiqlang — muvaffaqiyatli to'lov haqida bildirishnoma olasiz. Paynet, CLICK yoki PayMe orqali ham shartnoma raqamini ko'rsatib to'lash mumkin.`,
  },
  {
    id: "b23",
    category: "Xaridlar va to'lov",
    q: "Qanday to'lov usullari mavjud?",
    a: `IMANUM ilovasi, shuningdek Paynet, CLICK va PayMe to'lov xizmatlari orqali oylik to'lovlarni amalga oshirish mumkin.`,
  },
  {
    id: "b24",
    category: "Xaridlar va to'lov",
    q: "Vaqtidan oldin to'liq to'lash mumkinmi?",
    a: `Ha, IMANUM orqali muddatdan oldin to'liq to'lash mumkin. Biroq muddatidan oldin to'liq to'laganingiz uchun qo'shimcha chegirma yoki imtiyoz berilmaydi.`,
  },
  {
    id: "b25",
    category: "Xaridlar va to'lov",
    q: "To'lovni kechiktirsam nima bo'ladi?",
    a: `Kechiktirishda darhol penya yoki jarima undirilmaydi — avval bildirishnoma yuboriladi. Agar to'lov 3 kalendar kun kechiksa, qo'shimcha 3 kun beriladi. Shu muddatda ham to'lanmasa, kompaniya keyingi to'lovlarni talab qilish huquqiga ega. Kechikish ikki marta yoki 45 kunga yetsa, shartnoma bekor qilinib, qolgan qarzning to'liq to'lanishi talab qilinishi va masala sudga oshirilishi mumkin.`,
  },
  {
    id: "b26",
    category: "Xaridlar va to'lov",
    q: "Ortiqcha to'lov, qaytarish yoki to'lov xatosi bo'lsa nima qilish kerak?",
    a: `Ortiqcha to'lov bo'lsa, tekshiruv uchun to'lov kvitansiyasini taqdim eting — qaytarish 15 kun ichida amalga oshiriladi. Texnik xatolarda qaytarish xabarnomadan keyin 3 kungacha davom etishi mumkin. Bank orqali to'lagan bo'lsangiz, buxgalteriya tomonidan kvitansiya tasdiqlanishini kuting (3-5 kun).`,
  },

  // Sotish jarayoni
  {
    id: "b27",
    category: "Sotish jarayoni",
    q: "IMANPAY orqali bo'lib to'lashga sotish uchun kassirga nima kerak?",
    a: `Kassirda quyidagilardan biri bo'lishi kerak: IMAN Merchant ilovasi o'rnatilgan xizmat smartfoni, ilova ruxsati bor planshet, yoki IMAN veb-versiyasiga ulangan kompyuter (merchant-admin.pay.imaninvest.com). Bu qurilmalardan kassir xarid summasini shakllantiradi, QR-kod yaratadi va uni xaridorga skanerlash uchun taqdim etadi.`,
  },
  {
    id: "b28",
    category: "Sotish jarayoni",
    q: "Savdo jarayonida nimalarga e'tibor berish kerak?",
    a: `Mijoz yoshini tekshiring (19+), to'g'ri ma'lumot kiriting, mijozga bo'lib to'lash summasi, oylik to'lov va muddatni tushuntiring, SMS-kod kiritilganiga ishonch hosil qiling, IMANUM orqali xarid tasdiqlanishini kuting, hisob mijozning o'ziga tegishli ekanligiga ishonch hosil qiling. Mijoz shubhali harakat qilsa, tovarni uchinchi shaxsga rasmiylashtirishni so'rasa yoki hujjat ko'rsatishdan bosh tortsa — sotuvni amalga oshirmang va menejer yoki IMAN texnik yordamiga xabar bering.`,
  },

  // Qabz
  {
    id: "b29",
    category: "Qabz jarayoni",
    q: "Qabz jarayoni qanday kechadi va nima degani?",
    a: `Kabz — IMAN nomidan hamkor do'kondan mahsulotni xarid qilish jarayoni bo'lib, keyin mahsulot mijozga shariat tamoyillariga muvofiq bo'lib to'lash asosida topshiriladi. Bu — tovar haqiqatan IMAN mulkiga o'tganini tasdiqlovchi majburiy bosqich. Uch formatda amalga oshiriladi: 1) Kabz-menejer orqali — vakil savdo nuqtasiga borib mahsulotni kompaniya nomidan qabul qiladi; 2) Emu Express orqali — kuryer topshirish vaqtida IMAN vakili sifatida harakat qiladi; 3) My Taxi orqali — haydovchi mahsulotni IMAN nomidan qabul qilishga vakolatli bo'ladi.`,
  },

  // Shartlar va komissiyalar
  {
    id: "b30",
    category: "Shartlar va komissiyalar",
    q: "Yashirin komissiyalar bormi?",
    a: `Yo'q, hech qanday yashirin komissiya, jarima yoki penya yo'q — hammasi halol va shaffof. Yakuniy summa va oylik to'lov miqdorini darhol ko'rasiz.`,
  },
  {
    id: "b31",
    category: "Shartlar va komissiyalar",
    q: "To'lov jadvali qanday tuziladi?",
    a: `To'lov jadvali avtomatik tuziladi — siz to'lov uchun qulay kunni o'zingiz tanlaysiz va har oyda shu kuni muddatli to'lov muddati tugagunga qadar to'laysiz.`,
  },
  {
    id: "b32",
    category: "Shartlar va komissiyalar",
    q: "Agar to'lovlar vaqtida to'lanmasa, jarimalar olinadimi?",
    a: `Yo'q. IMAN islom moliyasi standartlari asosida ishlaydi, shuning uchun kechikish uchun yashirin komissiya yoki jarima undirilmaydi. Kechikish holatida xaridorga to'lovni vaqtida amalga oshirish kerakligi haqida bildirishnoma yuboriladi.`,
  },
  {
    id: "b33",
    category: "Shartlar va komissiyalar",
    q: "To'lov ro'yxatini qayerdan ko'rish mumkin?",
    a: `IMANUM ilovasida, bosh sahifadagi "Halol muddatli to'lov" bo'limida — barcha faol muddatli to'lovlar, ularning sanalari va summalari bilan birga ko'rsatiladi.`,
  },

  // Qaytarish va nizolar
  {
    id: "b34",
    category: "Qaytarish va nizolar",
    q: "Muddatli to'lovga xarid qilingan mahsulotni qanday qaytarish mumkin?",
    a: `Sifat yaxshi bo'lsa: mahsulot olingan kundan 10 kun ichida, agar u yangi, foydalanilmagan, shikastlanmagan, asl qadoq va yorliqlar bilan bo'lsa, qaytarish mumkin. Nuqson bo'lsa: avval rasmiy servis markaziga murojaat qiling — nuqson xaridor aybi bo'lmasa, mahsulotni almashtirish, bepul ta'mirlash yoki shartnomani bekor qilib pulni qaytarib olish huquqi bor.`,
  },
  {
    id: "b35",
    category: "Qaytarish va nizolar",
    q: "Tovarni qaytarish jarayoni qanday kechadi?",
    a: `Qaytarish sabablari: brak/nuqson, kutilganidan yuqori summa, yoki almashtirish istagi. Shartlar: olingan kundan 10 kun ichida; nuqson bo'lsa servis markazi dalolatnomasi kerak; almashtirishda asl qadoq va muhr buzilmagan bo'lishi shart. Jarayon: mijoz qaytarish dalolatnomasini to'ldirib hamkor do'konga topshiradi → do'kon aktni suratga olib umumiy Telegram-chatga yuboradi → Didox orqali manfiy hisob-faktura rasmiylashtiriladi → buxgalteriya tekshirib 3-5 ish kunida shartnomani bekor qiladi.`,
  },
  {
    id: "b36",
    category: "Qaytarish va nizolar",
    q: "Qaytarish uchun do'konga murojaat qilish kerakmi yoki IMAN'gami?",
    a: `Do'konga emas — IMAN call-markaziga yoki do'kondagi IMAN vakili (qabz-menejer)ga murojaat qiling. Mahsulotni to'g'ridan-to'g'ri do'kon xodimiga topshirish mumkin emas. So'rov qabul qilingach, IMAN kuryer yuboradi va mahsulotni sizdan olib ketadi.`,
  },
  {
    id: "b37",
    category: "Qaytarish va nizolar",
    q: "Xaridni qanday rad etish yoki e'tiroz bildirish mumkin?",
    a: `Xariddan keyin 10 kun ichida IMAN Qabz-menejeriga murojaat qilib qaytarish dalolatnomasini to'ldiring. O'zingiz bilan shartnoma, chek, qadoq, tovar foto/video va boshqa tasdiqlovchi materiallarni olib boring. Qaytarish, tovar ishlatilmagan va asl qadoqda bo'lsa yoki nuqson/nomuvofiqlik aniqlansa, O'zbekiston "Iste'molchilar huquqlarini himoya qilish to'g'risida"gi qonunga muvofiq amalga oshiriladi. Muammo bo'lsa: +998 78 113 00 30.`,
  },
  {
    id: "b38",
    category: "Qaytarish va nizolar",
    q: "Buyurtma bekor qilinsa, pulimni qanday qaytarib olaman?",
    a: `Bekor qilish tasdiqlangandan so'ng mablag' 10 ish kuni ichida bank kartangizga qaytariladi. Savollar bo'lsa: +998 78 113 00 30.`,
  },
  {
    id: "b39",
    category: "Qaytarish va nizolar",
    q: "Yetkazib berish xizmati pullikmi?",
    a: `O'zbekiston bo'ylab yetkazib berish bepul. Muddati: Toshkent shahri bo'yicha 1-3 ish kuni, hududlar bo'yicha 3-5 ish kuni.`,
  },
  {
    id: "b40",
    category: "Qaytarish va nizolar",
    q: "Yetkazib berishdan oldin buyurtmani bekor qilish mumkinmi?",
    a: `Ha, buyurtma hali yetkazilmagan bo'lsa, IMAN call-markazi orqali bekor qilish mumkin. Buyurtma allaqachon yetkazilgan bo'lsa, bekor qilish va qaytarish xarajatlari xaridor zimmasida bo'ladi.`,
  },
  {
    id: "b41",
    category: "Qaytarish va nizolar",
    q: "Mening nomimga boshqa bir inson nasiya rasmiylashtirgan, nima qilishim kerak?",
    a: `Darhol IMAN qo'llab-quvvatlash xizmatiga (IMANUM ilovasi yoki aloqa raqamlari orqali) murojaat qiling, firibgarlik haqida xabar bering va muddatli to'lovni o'zingiz rasmiylashtirmaganingizni tasdiqlang. Sizdan shaxsni tasdiqlovchi hujjat va ariza so'raladi. IMAN shartnomani to'xtatib tekshiruv boshlaydi; firibgarlik tasdiqlansa shartnoma bekor qilinadi.`,
  },

  // Hamkorlik (Pay)
  {
    id: "b42",
    category: "Hamkorlik (Pay)",
    q: "Iman bilan hamkorlik qilish uchun qanday mezonlar bor?",
    a: `B2B hamkori bo'lish uchun quyidagi ma'lumotlarni taqdim eting: do'kon nomi/YaTT, QQS mavjudligi, faoliyat turi, filiallar soni, aloqa uchun kontaktlar. Ma'lumotlarni +998 78 113 00 30 aloqa markaziga qoldirish mumkin.`,
  },
  {
    id: "b43",
    category: "Hamkorlik (Pay)",
    q: "Agar boshqa banklarda kreditlar mavjud bo'lsa, IMAN BNPL'dan foydalanish mumkinmi?",
    a: `Ha, mumkin. Kredit tarixingiz yaxshi va to'lov qobiliyatingiz yetarli bo'lsa, boshqa kreditlaringiz bo'lsa ham IMAN BNPL'dan foydalanishingiz mumkin. Tizim limitni tasdiqlashdan oldin moliyaviy intizomingizni baholaydi.`,
  },

  // Texnik yordam / boshqa
  {
    id: "b44",
    category: "Texnik yordam",
    q: "IMAN BNPL shariat nuqtayi nazaridan qanday ishlaydi? Bu rostdan ham halolmi?",
    a: `IMAN qulay bo'lib to'lash imkoniyatini taklif qiladi — tovarni darhol olasiz, to'lov qismlarga bo'linadi (3-12 oy), foizsiz. Rassrochka murabaha modeli asosida — IMAN avval tovarni hamkor do'kondan xarid qilib, so'ng aniq kelishilgan narxda sizga sotadi, yashirin komissiya yo'q. Har bir mahsulot ishga tushishidan oldin Shariat Kengashi tomonidan tasdiqlanadi. Fetvalar: https://imaninvest.com/sharia va https://imanpay.uz/sharia.`,
  },
  {
    id: "b45",
    category: "Texnik yordam",
    q: "Ilova osilib qoldi/ochilmayapti. Nima qilish kerak?",
    a: `1) Ilovani yopib qayta oching. 2) Telefonni qayta ishga tushiring. 3) Ilova App Store/Google Play orqali eng oxirgi versiyaga yangilanganini tekshiring. 4) Internet aloqasini tekshiring. 5) Android'da ilova keshini tozalang. Hech narsa yordam bermasa — sayt yoki Telegram-chat orqali IMAN yordamiga murojaat qiling.`,
  },
  {
    id: "b46",
    category: "Texnik yordam",
    q: "Muddatli to'lov shartnomasi yoki batafsil shartlarini qayerdan topsam bo'ladi?",
    a: `IMANUM ilovasiga kiring → "Halol muddatli to'lov" bo'limini oching — shartlar bilan shu yerda tanishasiz. Faol shartnomalarni ko'rish uchun "Faol arizalar" sahifasiga kiring.`,
  },
  {
    id: "b47",
    category: "Texnik yordam",
    q: "Telefon raqami yoki hisob ma'lumotlarini qanday o'zgartirish mumkin?",
    a: `Ma'lumotlarni qo'lda o'zgartirib bo'lmaydi — barchasi MyID xizmati orqali davlat bazalaridan avtomatik olinadi. Ism-sharif, pasport ma'lumotlari yoki manzil noto'g'ri bo'lsa, avval myid.uz'da yangilang — ular avtomatik ilovada ham yangilanadi. Telefon raqamini almashtirish uchun ilovadagi chat orqali qo'llab-quvvatlash xizmatiga murojaat qiling.`,
  },
  {
    id: "b48",
    category: "Texnik yordam",
    q: "Agar ilovani o'chirib tashlagan bo'lsam, muddatli to'lovdan foydalana olmaymanmi?",
    a: `Bo'lib to'lash imkoniyati yo'qolmaydi. App Store/Google Play orqali ilovani qayta o'rnatib, avval foydalangan telefon raqamingiz bilan kiring. Faol muddatli to'lov, to'lovlar jadvali, mavjud limit va xaridlar tarixini yana ko'rasiz — ma'lumotlar telefonda emas, tizimda saqlanadi.`,
  },
  {
    id: "b49",
    category: "Texnik yordam",
    q: "Agar pasportim bo'lmasa, faqat ID-kartam bo'lsa, muddatli to'lovni rasmiylashtirish mumkinmi?",
    a: `Ha. Xaridni rasmiylashtirish uchun mijozning qo'lida ID-karta va bank kartasi bo'lishi yetarli.`,
  },
  {
    id: "b50",
    category: "Texnik yordam",
    q: "Avtomatik to'lovni qanday o'chirish mumkin?",
    a: `Hozircha ilovada avtomatik to'lovni oddiy usulda o'chirish imkoni yo'q.`,
  },
  {
    id: "b51",
    category: "Texnik yordam",
    q: "Bir vaqtning o'zida bir nechta to'lovlarni to'lash mumkinmi?",
    a: `Ha. "Halol muddatli to'lov" → "Faol arizalar" bo'limiga o'ting, kerakli muddatli to'lov(lar)ni tanlang va "Hozir to'lash" tugmasini bosing — tizim tanlangan barcha muddatlar uchun summani bir vaqtda hisobdan yechadi.`,
  },
  {
    id: "b52",
    category: "Texnik yordam",
    q: "To'lov amalga oshgan, lekin ilovada ko'rinmayotgan bo'lsa, nima qilish kerak?",
    a: `Tekshiring: to'g'ri muddatli to'lovni ochganingizni, to'lov haqiqatan hisobdan chiqqanini (bank ilovasidan) va 5-10 daqiqa kutib ilovani yangilang — ba'zida kechikib ko'rsatiladi. Yordam bermasa: bank ilovasidan to'lov skrinshotini (sana, summa, qabul qiluvchi) oling, ilova yoki Telegram orqali IMAN yordamiga murojaat qilib telefon raqami, do'kon nomi, summa/sana va skrinni yuboring.`,
  },
  {
    id: "b53",
    category: "Texnik yordam",
    q: "Hamkorlar ro'yxatida bo'lmagan do'konda muddatli to'lovni amalga oshira olamanmi?",
    a: `Yo'q — IMAN Pay'ni IMAN hamkori bo'lmagan do'konda rasmiylashtirish imkoni yo'q.`,
  },
  {
    id: "b54",
    category: "Texnik yordam",
    q: "Muddatli to'lov muddatini (3, 6, 9, 12 oy) tanlash imkoniyati bormi?",
    a: `Ha. Do'kon menejeri QR-kodni ko'rsatgach, siz IMAN ilovasi orqali skanerlaysiz va bo'lib to'lash muddatini (3, 6, 9 yoki 12 oy — do'kon qo'llab-quvvatlasa) hamda birinchi to'lov sanasini tanlaysiz. Barcha shartlar xarid tasdiqlanmaguncha ekranda ko'rsatiladi.`,
  },
  {
    id: "b55",
    category: "Texnik yordam",
    q: "Nega menga ma'lum bir hamkordan muddatli to'lov rad etildi?",
    a: `Sabablari turlicha bo'lishi mumkin: yetarli bo'lmagan kredit reytingi, boshqa to'lovlar bo'yicha kechikishlar, mavjud limitdan oshib ketish, yoki hamkorning/IMAN'ning ichki qoidalari. Aniq sababni bilish uchun qo'llab-quvvatlash xizmatiga murojaat qiling.`,
  },
  {
    id: "b56",
    category: "Texnik yordam",
    q: "Limitni bloklash yoki vaqtincha muzlatish mumkinmi?",
    a: `Hozircha ilovada limitni qo'lda vaqtincha muzlatish yoki bloklash imkoni yo'q. Siz shunchaki limitdan foydalanmasligingiz mumkin — u xarid rasmiylashtirilmaguncha faollashmaydi. Limitdan foydalanishni butunlay cheklamoqchi bo'lsangiz, IMAN yordam xizmatiga murojaat qiling.`,
  },
  {
    id: "b57",
    category: "Texnik yordam",
    q: "Muddatli to'lov kredit tarixida ko'rsatiladimi?",
    a: `Ha, IMAN kredit tarixi byurosi bilan hamkorlik qiladi, shuning uchun muddatli to'lov kredit tarixingizda aks etadi. O'z vaqtida to'lovlar uni yaxshilaydi, kechikishlar esa yomonlashtiradi.`,
  },
];

export const investData = [
  // Investitsiya asoslari
  {
    id: "i01",
    category: "Investitsiya asoslari",
    q: "Investitsiya nima?",
    a: `Investitsiya — turli aktivlar, biznes yoki loyihalarga pul kiritib, foyda olish yoki kapitalni oshirish jarayoni. Masalan, ko'chmas mulk xarid qilib ijaraga berish yoki kompaniya aksiyalarini sotib olish. IMAN'dagi investitsiya imkoniyatlari Islom moliyasi tamoyillariga muvofiq taqdim etiladi — barcha yechimlar ribo, chayqovchilik, g'arar va boshqa shubhali omillardan holi.`,
  },
  {
    id: "i02",
    category: "Investitsiya asoslari",
    q: "Investitsiya qanday foyda keltiradi?",
    a: `Erkin mablag'ni passiv (daromad keltirmaydigan) narsalar o'rniga aktiv (daromad keltiruvchi) xaridlarga yo'naltirganda, pul foyda keltira boshlaydi va kapital oshadi. Masalan, kvartira sotib olib ijaraga berish yoki oltin/valyuta xarid qilib saqlash — bunda aktiv narxi o'sadi yoki muntazam daromad keltiradi.`,
  },
  {
    id: "i03",
    category: "Investitsiya asoslari",
    q: "Reinvestitsiya nima?",
    a: `Reinvestitsiya — oldingi investitsiyadan olingan foydani asosiy summaga qo'shishdir. Masalan, 10 000 000 so'm investitsiyangizdan birinchi oyda 200 000 so'm foyda olsangiz va uni reinvestitsiya qilsangiz, keyingi oy investitsiya tanasi 10 200 000 so'mni tashkil qiladi. Bu kapitalni oshirishning eng samarali usuli — vaqt o'tgani sayin o'sish tezligi ham ortadi (qorbo'ron effekti).`,
  },
  {
    id: "i04",
    category: "Investitsiya asoslari",
    q: "Investitsiyaning bank omonatlaridan farqi bormi?",
    a: `Bank omonatida mijoz oldindan belgilangan, kafolatlangan daromad oladi, barcha risk bankka tegishli. Investitsiyada esa pul real iqtisodiy faoliyatga yo'naltiriladi va investor loyihaning haqiqiy natijasiga — foydaga ham, zararga ham sherik bo'ladi. IMAN aynan shu modelda ishlaydi: kafolatlangan foizli daromad taklif qilinmaydi, mablag'lar real loyihalarda ishlaydi, investorlar teng sherik sifatida ishtirok etadi.`,
  },
  {
    id: "i05",
    category: "Investitsiya asoslari",
    q: "Moliyaviy piramida nima va IMAN undan farqlanadimi?",
    a: `Moliyaviy piramida — firibgarlik sxemasi bo'lib, unda ilgari kirganlarning daromadi keyin qo'shilganlarning puli hisobidan to'lanadi; real mahsulot/xizmat yo'q, maqsad — yangi odam jalb qilish. Piramidani farqlash uchun asosiy mezon — foyda qanday shakllanishi. IMAN'da investitsiya tovar/xizmatlarning nasiya savdosiga yoki tijoriy ko'chmas mulk xaridiga yo'naltiriladi, investor foydasi keyingi investorlar sonidan emas, balki savdo hajmi yoki ijara haqidan shakllanadi.`,
  },

  // Shariat va huquqiy asos
  {
    id: "i06",
    category: "Shariat va huquqiy asos",
    q: "IMAN'ga investitsiya kiritish Islom moliyasiga muvofiqmi?",
    a: `Ha, to'liq muvofiq. IMAN investitsiyalarni sherikchilik asosida amalga oshiradi — investorlar real iqtisodiy loyihalarga sarmoya kiritib, loyiha natijasiga qarab daromad oladi. Mablag'lar haqiqiy faoliyatga (nasiya savdo yoki tijoriy ko'chmas mulk) yo'naltiriladi, daromad kafolatlanmaydi balki loyiha muvaffaqiyatiga bog'liq, risk va foyda sheriklar o'rtasida adolatli taqsimlanadi.`,
  },
  {
    id: "i07",
    category: "Shariat va huquqiy asos",
    q: "Islom moliyasi tamoyillariga muvofiqlik qanday tasdiqlangan?",
    a: `IMAN muntazam auditdan o'tadi. 2021-yilda O'zbekiston Respublikasi Musulmonlar idorasidan faoliyat bo'yicha ijobiy xulosa olingan. 2022-2023-yillarda Islom moliyasi bo'yicha 20 yildan ortiq tajribaga ega Doktor Ziyad Muhammad (INCEIF universiteti, Malayziya) tomonidan fatvolar berilgan. 2024-yilda esa Usmani's audit kompaniyasi (asoschisi — Shayx Muhammad Taqiy Usmoniyning o'g'li Mufti Hasan Usmoniy) tomonidan AAOIFI standartlariga moslik sertifikati taqdim etilgan. Fatvolar imaninvest.com saytida joylashgan.`,
  },
  {
    id: "i08",
    category: "Shariat va huquqiy asos",
    q: "IMAN'ga kiritiladigan investitsiyaning qonuniy asosi bormi?",
    a: `IMAN O'zbekiston Respublikasi "Xo'jalik shirkatlari to'g'risida"gi Qonunga muvofiq Kommandit shirkat shaklida ishlaydi (STIR 307128450, orginfo.uz'da ma'lumot mavjud). Islom moliyasi nuqtai nazaridan bu — muzoraba (sherikchilik): muzorib (biznesni boshqaruvchi asosiy sherik) va rabb al-mol (sarmoyador kommanditchilar). Har bir sherik Adliya vazirligi Davlat xizmatlari agentligida ta'sischi sifatida ro'yxatdan o'tkaziladi va IMANUM ilovasida investorlik sertifikati beriladi. Kompaniya dividend soliqlarini sherik nomidan to'laydi — bularning barchasi O'zbekiston qonunchiligiga to'liq muvofiqlikni tasdiqlaydi.`,
  },

  // Strategiyalar
  {
    id: "i09",
    category: "Strategiyalar",
    q: "Investitsiyalar qayerga yo'naltiriladi?",
    a: `Ikki asosiy yo'nalish bor:

Savdo aylanmasiga investitsiya — IMAN jalb qilingan pullar evaziga hamkorlaridan maishiy texnika va elektronika xarid qiladi, ustama qo'yib mijozlarga 3, 6, 9, 12 oyga nasiyaga sotadi. Sof foyda har oy sheriklar va IMAN o'rtasida kelishilgan nisbatda taqsimlanadi.

Tijoriy ko'chmas mulkka investitsiya — jalb qilingan pullar evaziga tijoriy ko'chmas mulk xarid qilinadi, bitkazilgach Korzinka, Makro, Safia kabi yirik bizneslarga ijaraga beriladi. Investorlar ijara haqi va obyekt narxi oshishi hisobiga kapitalini oshiradi.

Faoliyat Muzoraba shartnomasi asosida yuritiladi — bir tomon pul, ikkinchisi bilim/mehnat bilan sherik bo'ladi. Bugungi kunda 1 000 000 so'mdan sarmoya kiritib yiliga 27% gacha foyda olish mumkin.`,
  },
  {
    id: "i10",
    category: "Strategiyalar",
    q: "Strategiya nima — qanday turlari bor?",
    a: `Savdo aylanmasiga investitsiya: mablag' maishiy texnika/elektronika nasiya savdosiga yo'naltiriladi. Valyuta: o'zbek so'mi. Daromadlilik: yiliga ~27% gacha. Risk darajasi: past.

Tijoriy ko'chmas mulkka investitsiya: mablag' tijoriy ko'chmas mulk xaridiga yo'naltirilib, keyin yirik bizneslarga ijaraga beriladi. Valyuta: o'zbek so'mi. Daromadlilik: AQSh dollari ekvivalentida yiliga ~18% gacha. Risk darajasi: past.`,
  },

  // Kiritish shartlari
  {
    id: "i11",
    category: "Kiritish shartlari",
    q: "Investitsiya qilishda shartnoma tuziladimi?",
    a: `Ha, kompaniya va investor o'rtasida sherikchilik shartnomasi onlayn formatda tuziladi. Investitsiya kiritishdan oldin investor bu shartnomani diqqat bilan o'qib chiqishi talab qilinadi.`,
  },
  {
    id: "i12",
    category: "Kiritish shartlari",
    q: "IMANUM ilovasi orqali kimlar investitsiya kirita oladi?",
    a: `Foydalanuvchi O'zbekiston fuqarosi bo'lishi, 18 yoshga to'lgan va huquqiy layoqatga ega bo'lishi lozim. Shuningdek, O'zbekistonda vaqtinchalik ro'yxatdan o'tgan xorijiy fuqarolar va boshqa davlatlarda yashovchi O'zbekiston fuqarolari ham bu imkoniyatdan foydalana oladi.`,
  },
  {
    id: "i13",
    category: "Kiritish shartlari",
    q: "Qanday to'lov usullari mavjud?",
    a: `1) Bank kartalari orqali IMANUM ilovasining o'zida — komissiyasiz. 2) O'zbekiston va chet el banklarida bank rekvizitlari bo'yicha naqd pul o'tkazish. 3) To'lov tizimlari (Payme, Click) orqali bank rekvizitlari bo'yicha to'lov.`,
  },
  {
    id: "i14",
    category: "Kiritish shartlari",
    q: "Investitsiya kiritishda komissiya olinadimi?",
    a: `Komissiya to'lov usuli va valyutaga bog'liq. O'zbek so'mida IMANUM ilovasi orqali yoki Ipoteka Bank filiallarida kiritilsa — komissiya yo'q. Komissiya olinishi mumkin bo'lgan hollar: bank orqali AQSh dollarida kiritilganda; VISA/MasterCard orqali kiritilganda; Ipoteka Bankdan boshqa bank filialida kiritilganda; to'lov tizimlari rekvizitlari orqali kiritilganda. Har bir holatda komissiya miqdori har xil.`,
  },
  {
    id: "i15",
    category: "Kiritish shartlari",
    q: "IMANUM ilovasi orqali investitsiya qanday kiritiladi?",
    a: `Uzcard yoki Humo kartangiz bo'lsa, ilovaga ulab komissiyasiz kiritishingiz mumkin: 1) Ilovada "Investitsiya" bo'limiga o'ting. 2) "To'ldirish" tugmasini bosing. 3) Miqdorni kiriting, hisobni tanlang yoki yangisini yarating. 4) Shartlar bilan tanishing. 5) Kartani tanlang yoki yangisini qo'shing. 6) "Investitsiya kiritish"ni bosing. Muhim: ilovadagi hisob raqami va kartaga ulangan SMS-xabarnoma raqami bir xil bo'lishi kerak, aks holda kartadan foydalanib bo'lmaydi.`,
  },
  {
    id: "i16",
    category: "Kiritish shartlari",
    q: "Bank orqali investitsiya qanday kiritiladi?",
    a: `Plastik kartangiz bo'lmasa yoki naqd orqali kiritmoqchi bo'lsangiz, istalgan bank filialiga murojaat qiling va quyidagi rekvizitlarni ko'rsating:

Qabul qiluvchi: KT «IMAN HALAL INVESTMENTS KOMMANDITNOE TOVARISHESTVO»
Bank: ATIB «Ipoteka bank» Yakkasaroy filiali, Toshkent sh., Usmon Nosir k., 61-uy
MFO: 01017
To'lov maqsadi: "Ustav fondini shakllantirish" + F.I.Sh (pasportdagidek) va telefon raqam yoki JShShIR

Hisob raqamlari:
So'm (UZS): 2020 8000 2051 8157 4001
AQSh dollari (USD): 2020 8840 9051 8157 4003
Yevro (EUR): 2020 8978 9051 8157 4001

Diqqat: bank orqali kiritishda qo'shimcha bank komissiyasi olinishi mumkin. Komissiyasiz variant uchun IMANUM ilovasida plastik karta orqali kiriting.`,
  },
  {
    id: "i17",
    category: "Kiritish shartlari",
    q: "Eng kam va eng ko'p investitsiya miqdori qancha?",
    a: `Savdo aylanmasiga investitsiyada: 7 va 13 oylik tarifda — 500 000 so'mdan; 27 oylik tarifda — 5 000 000 so'mdan; 40 oylik tarifda — 10 000 000 so'mdan boshlanadi. Maksimal miqdor cheklanmagan. Tijoriy ko'chmas mulkka investitsiyada eng kam/eng ko'p miqdor obyektga qarab farqlanadi, chunki xaridlar kvadrat metr shaklida bo'ladi va narx har bir obyektda har xil.`,
  },
  {
    id: "i18",
    category: "Kiritish shartlari",
    q: "Xorijiy valyutada investitsiya kiritsa bo'ladimi?",
    a: `Investitsiyalar so'm va AQSh dollarida qabul qilinadi. O'zbekistonda turib dollarda kiritish uchun Ipoteka bankning Yakkasaroy filialiga murojaat qiling. Chet elda bo'lsangiz — IMANUM ilovasida Visa/Mastercard orqali yoki istalgan bankdan kompaniya hisobiga pul o'tkazish orqali kiritishingiz mumkin. Xorijiy valyutadagi mablag' O'zbekiston qonunchiligiga muvofiq investitsiya kunidagi Markaziy Bank kursi bo'yicha so'mga konvertatsiya qilinadi, foyda ham so'mda hisoblanib kartaga tushiriladi.`,
  },
  {
    id: "i19",
    category: "Kiritish shartlari",
    q: "Yuridik shaxs (kompaniya) nomidan investitsiya kiritish mumkinmi?",
    a: `Ha, mumkin. Ammo tartib jismoniy shaxsdan farq qiladi — investitsiya Ommaviy oferta orqali emas, balki kompaniyalar o'rtasida shartnoma imzolash orqali qabul qilinadi. Batafsil ma'lumot uchun +998 78 113 00 30 raqamiga qo'ng'iroq qiling yoki ilovadagi Yordam bo'limida so'rov qoldiring.`,
  },
];

export const merchantData = [
  {
    id: "m1",
    q: "Yangi hamkor (merchant) qanday ulanadi?",
    a: "Ariza IMAN Business portali orqali topshiriladi, hujjatlar (litsenziya, bank rekvizitlari) tekshiruvdan o'tadi, so'ng shartnoma imzolanadi va integratsiya (API yoki kassa terminali) sozlanadi.",
  },
  {
    id: "m2",
    q: "Hamkorga to'lovlar qachon o'tkaziladi?",
    a: "Standart hisob-kitob davri — har hafta yoki har oy (shartnomada belgilanadi). Komissiya avtomatik ushlab qolinadi.",
  },
  {
    id: "m3",
    q: "Hamkor tizimga kira olmayapti",
    a: "Login/parolni tekshiring, keshni tozalashni tavsiya qiling. Agar davom etsa — texnik yordam (T2) ga eskalatsiya qiling.",
  },
];

export const faqData = [
  {
    id: "f1",
    q: "Ilovaga kira olmayapman",
    a: "Internet aloqasini, ilova versiyasini tekshiring. Parolni tiklashni taklif qiling. Muammo davom etsa — qurilma modeli va xato skrinshotini so'rang.",
  },
  {
    id: "f2",
    q: "SMS-kod kelmayapti",
    a: "Raqam to'g'ri kiritilganini, tarmoq signalini tekshiring. 2 daqiqadan keyin qayta yuborishni so'rang. Davom etsa, operator ma'lumotlar bazasidan raqamni tekshiradi.",
  },
  {
    id: "f3",
    q: "Hisobni qanday o'chirish mumkin?",
    a: "Faol shartnomalar yo'qligiga ishonch hosil qiling, so'ng mijozdan yozma tasdiq (ilova ichidan) oling va hisobni o'chirish bo'limiga yo'naltiring.",
  },
];

export const scriptsData = [
  {
    id: "s1",
    q: "Qo'ng'iroqni boshlash skripti",
    a: "\"Assalomu alaykum, IMAN qo'llab-quvvatlash xizmati, mening ismim [ism]. Sizga qanday yordam bera olaman?\" — ohang doim do'stona va sokin bo'lishi kerak.",
  },
  {
    id: "s2",
    q: "Norozi mijoz bilan suhbat",
    a: "Avval tinglang, kesmang. \"Tushunaman, bu noqulaylik uchun uzr so'rayman\" deb boshlang, so'ng aniq muammoni tasdiqlab, yechim taklif qiling.",
  },
  {
    id: "s3",
    q: "Qo'ng'iroqni yakunlash skripti",
    a: "\"Boshqa savolingiz bormi? Yordam bera olganimdan xursandman. Yaxshi kun tilayman!\" — yakunda muammo hal bo'lganini tasdiqlang.",
  },
];

export const offerData = [
  {
    id: "o1",
    q: "Ommaviy oferta nima?",
    a: "IMAN xizmatlaridan foydalanish shartlarini belgilovchi rasmiy hujjat. Mijoz ro'yxatdan o'tganda shu shartlarga rozilik bildiradi.",
  },
  {
    id: "o2",
    q: "Oferta qayerdan topiladi?",
    a: "Rasmiy hujjat IMAN veb-saytining \"Hujjatlar\" bo'limida va ilova ichida \"Sozlamalar → Yuridik hujjatlar\" qismida joylashgan.",
  },
];
