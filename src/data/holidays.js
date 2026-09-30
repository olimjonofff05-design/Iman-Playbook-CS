// Ish kuni kalkulyatori uchun bayram va dam olish kunlari.
//
// HAR YILI YANGILASH TARTIBI (farmon odatda dekabr oxirida chiqadi):
//   1. Yangi yil farmonidagi barcha kunlarni OFFICIAL_DAYS ro'yxatiga qo'shing.
//   2. Yil raqamini VERIFIED_YEARS ro'yxatiga qo'shing.
//   3. Hayit sanalari Musulmonlar idorasi e'lon qilgach ham kiritiladi.
//
// type:  "holiday" – rasmiy bayram (to'q qizil)
//        "extra"   – qo'shimcha dam olish kuni (och qizil)
//        "moved"   – ko'chirilgan dam olish kuni (och qizil)
//        "work"    – dam olish kuni o'rniga ish kuni (yashil)
// week:  qaysi ish haftasiga tegishli: [5], [6] yoki [5, 6]
//
// Manba (2026): Prezidentning 24.12.2025 yildagi PF-257-son farmoni,
// Ramazon hayiti — 20.03.2026, Qurbon hayiti — 27.05.2026.

export const OFFICIAL_DAYS = [
  { date: "2025-12-31", type: "extra", week: [5, 6], uz: "Qo'shimcha dam olish kuni (Yangi yil arafasi)", ru: "Дополнительный выходной (канун Нового года)" },

  { date: "2026-01-01", type: "holiday", week: [5, 6], uz: "Yangi yil", ru: "Новый год" },
  { date: "2026-01-02", type: "extra", week: [5, 6], uz: "Qo'shimcha dam olish kuni", ru: "Дополнительный выходной" },
  { date: "2026-01-03", type: "extra", week: [6], uz: "Qo'shimcha dam olish kuni (6 kunlik hafta uchun)", ru: "Дополнительный выходной (для 6-дневки)" },
  { date: "2026-03-08", type: "holiday", week: [5, 6], uz: "Xotin-qizlar kuni", ru: "Международный женский день" },
  { date: "2026-03-09", type: "moved", week: [5, 6], uz: "Ko'chirilgan dam olish kuni (8-mart yakshanbaga tushgani uchun)", ru: "Перенесённый выходной (8 марта выпало на воскресенье)" },
  { date: "2026-03-20", type: "holiday", week: [5, 6], uz: "Ramazon hayiti", ru: "Рамазан хайит" },
  { date: "2026-03-21", type: "holiday", week: [5, 6], uz: "Navro'z bayrami", ru: "Навруз" },
  { date: "2026-03-23", type: "moved", week: [5], uz: "Ko'chirilgan dam olish kuni (Navro'z shanbaga tushgani uchun)", ru: "Перенесённый выходной (Навруз выпал на субботу)" },
  { date: "2026-05-09", type: "holiday", week: [5, 6], uz: "Xotira va qadrlash kuni", ru: "День памяти и почестей" },
  { date: "2026-05-11", type: "moved", week: [5], uz: "Ko'chirilgan dam olish kuni (9-may shanbaga tushgani uchun)", ru: "Перенесённый выходной (9 мая выпало на субботу)" },
  { date: "2026-05-27", type: "holiday", week: [5, 6], uz: "Qurbon hayiti", ru: "Курбан хайит" },
  { date: "2026-05-28", type: "extra", week: [5, 6], uz: "Qo'shimcha dam olish kuni (Qurbon hayiti)", ru: "Дополнительный выходной (Курбан хайит)" },
  { date: "2026-05-29", type: "extra", week: [5, 6], uz: "Qo'shimcha dam olish kuni (Qurbon hayiti)", ru: "Дополнительный выходной (Курбан хайит)" },
  { date: "2026-05-30", type: "extra", week: [6], uz: "Qo'shimcha dam olish kuni (6 kunlik hafta uchun)", ru: "Дополнительный выходной (для 6-дневки)" },
  { date: "2026-08-31", type: "extra", week: [5, 6], uz: "Qo'shimcha dam olish kuni (Mustaqillik arafasi)", ru: "Дополнительный выходной (канун Дня независимости)" },
  { date: "2026-09-01", type: "holiday", week: [5, 6], uz: "Mustaqillik kuni", ru: "День независимости" },
  { date: "2026-10-01", type: "holiday", week: [5, 6], uz: "O'qituvchi va murabbiylar kuni", ru: "День учителей и наставников" },
  { date: "2026-12-08", type: "holiday", week: [5, 6], uz: "Konstitutsiya kuni", ru: "День Конституции" },
  { date: "2026-12-12", type: "work", week: [5], uz: "Ish kuni (dam olish 31-dekabrga ko'chirilgan)", ru: "Рабочий день (выходной перенесён на 31 декабря)" },
  { date: "2026-12-31", type: "moved", week: [5], uz: "Dam olish kuni (12-dekabr shanbadan ko'chirilgan)", ru: "Выходной (перенесён с субботы 12 декабря)" },
  { date: "2026-12-31", type: "extra", week: [6], uz: "Qo'shimcha dam olish kuni (Yangi yil arafasi)", ru: "Дополнительный выходной (канун Нового года)" },
];

// Farmoni to'liq kiritilgan yillar. Qolgan yillar uchun hisob taxminiy.
export const VERIFIED_YEARS = [2026];

// Har yili bir xil sanadagi bayramlar (Mehnat kodeksi)
export const FIXED_HOLIDAYS = [
  { md: "01-01", uz: "Yangi yil", ru: "Новый год" },
  { md: "03-08", uz: "Xotin-qizlar kuni", ru: "Международный женский день" },
  { md: "03-21", uz: "Navro'z bayrami", ru: "Навруз" },
  { md: "05-09", uz: "Xotira va qadrlash kuni", ru: "День памяти и почестей" },
  { md: "09-01", uz: "Mustaqillik kuni", ru: "День независимости" },
  { md: "10-01", uz: "O'qituvchi va murabbiylar kuni", ru: "День учителей и наставников" },
  { md: "12-08", uz: "Konstitutsiya kuni", ru: "День Конституции" },
];

// Farmoni kiritilmagan yillar uchun hayit sanalari (oy kalendariga bog'liq, taxminiy)
export const ESTIMATED_HAYIT = [
  { date: "2025-03-30", uz: "Ramazon hayiti", ru: "Рамазан хайит" },
  { date: "2025-06-06", uz: "Qurbon hayiti", ru: "Курбан хайит" },
  { date: "2027-03-10", uz: "Ramazon hayiti", ru: "Рамазан хайит" },
  { date: "2027-05-16", uz: "Qurbon hayiti", ru: "Курбан хайит" },
];
