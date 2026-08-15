# Mahsulot shartlari o'zgarganda: versiyalash tartibi

Talab (13.08.2026 uchrashuvi asosida): shartlar o'zgarganda **eski sahifa o'chirilmaydi** —
unga "amal qilish tugash sanasi" qo'yiladi, yangi shartlar esa **alohida, sanasi ko'rsatilgan
yangi punkt** sifatida qo'shiladi. Shu tarzda tarix saqlanadi va xodim qaysi shartlar joriy
ekanini aniq ko'radi.

## Qadamlar

Masalan, BNPL'ning minimal limiti 2027-yil 1-yanvardan 2 000 000 so'mga o'zgarganini
misol qilib olaylik:

### 1. Eski versiyani "arxivlang"

`src/data/bnplOverview.js` faylini nusxalab, `src/data/bnplOverview_2025.js` deb saqlang
(yoki mos nom bering). Ichida:

```js
export const bnplOverview_2025 = {
  lastUpdated: "2026-08-13",
  validFrom: "2025-02-03",
  validTo: "2026-12-31",      // <-- shu qatorni qo'shing
  banner: null,
  // ... qolgan mazmun o'zgarishsiz qoladi
};
```

`validTo` maydoni sahifada avtomatik ravishda kulrang "bu — eskirgan versiya" bannerini
chiqaradi.

### 2. Yangi versiyani yarating

Asosiy `src/data/bnplOverview.js` faylidagi o'zgargan raqamlarni yangilang va yangi
`validFrom` qo'shing:

```js
export const bnplOverview = {
  lastUpdated: "2027-01-01",
  validFrom: "2027-01-01",
  validTo: null,               // joriy versiya — bo'sh
  banner: { uz: "...", ru: "..." }, // xohlasangiz, o'zgarish haqida qisqa e'lon
  // ... yangilangan shartlar
};
```

### 3. Sidebar'da ikkala versiya alohida ko'rinishi kerak bo'lsa

Agar ikkala versiya (eski va yangi) **bir vaqtning o'zida** saytda ko'rinishi kerak bo'lsa
(masalan, o'tish davrida), yangi komponent yarating (`BNPL2025.jsx`), uni `App.jsx`da yangi
`case` sifatida va `Sidebar.jsx`da yangi `MENU_KEYS` elementi sifatida (nomida sana bilan,
masalan "BNPL — 2025-2026 shartlari") qo'shing. `ProductTemplate`ning o'zi bunga tayyor —
faqat unga eski `overview` obyektini uzatish kifoya.

Agar eski versiya endi hech kimga kerak bo'lmasa (faqat tarix uchun saqlanayotgan bo'lsa),
uni sidebar'ga chiqarmasdan, shunchaki `src/data/` papkasida faylda saqlab qo'ysa ham bo'ladi.

## Qisqacha qoida

- **Raqamlar/shartlar o'zgarsa** → eski faylni nusxalab arxivlang (`validTo` bilan), asosiy
  faylni yangilang (`validFrom` bilan).
- **Eski versiya hali kerak bo'lsa** (mijozlar hali eski shartlar bo'yicha xizmat ko'rmoqda) →
  sidebar'da alohida, sanasi ko'rsatilgan punkt sifatida qoldiring.
- **Eski versiya endi kerak bo'lmasa** → faylni arxiv sifatida saqlang, sidebar'ga chiqarmang.
