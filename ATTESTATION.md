# Attestatsiya bo'limi va admin panel

Playbookdagi boshqa sahifalar avvalgidek hammaga ochiq. Faqat **Attestatsiya** bo'limi yopiq:
unga admin yaratgan login/parol bilan kiriladi va xodim faqat admin ruxsat bergan imtihonni ko'radi.

## Bir martalik sozlash

### 1. Supabase'da jadvallar
Supabase → SQL Editor → `sql/attestation.sql` faylining mazmunini joylab, **Run** bosing.
(QA bo'limi ishlatayotgan o'sha loyiha — yangi loyiha kerak emas.)

### 2. Vercel'da environment variable'lar
Vercel → Project → Settings → Environment Variables:

| Nomi | Qiymati |
|---|---|
| `ADMIN_LOGIN` | admin logini, masalan `azizullo` |
| `ADMIN_PASSWORD` | kuchli parol (faqat sizga ma'lum) |
| `AUTH_SECRET` | uzun tasodifiy satr, kamida 32 belgi (masalan, parol generatoridan 48 belgi) |
| `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | QA bo'limi uchun allaqachon qo'shilgan — tegmang |

Qo'shgandan keyin **Redeploy** qiling. `AUTH_SECRET` almashtirilsa, hamma qaytadan kirishi kerak bo'ladi.

## Kundalik ish

1. **Attestatsiya** → admin login/paroli bilan kiring → menyuda **Admin panel** paydo bo'ladi.
2. **Xodimlar** → "Xodim qo'shish": ism, login, daraja (Junior/Middle). Parol avtomatik yaratiladi;
   oynada chiqqan login/parolni xodimga yuboring (parol keyin ko'rsatilmaydi, kerak bo'lsa yangisini o'rnatasiz).
3. **Imtihonlar** → "Yangi imtihon": nom, daraja, vaqt, o'tish bali, savollar → **Saqlash**.
4. **Imtihonni ochish** → **Ruxsat va natijalar** → **Ruxsat berish** → xodimlarni tanlang.
   Xodim imtihonni faqat bir marta topshiradi. Qayta topshirtirish uchun yana ruxsat bering.
5. Natijalar shu yerda: ball, foiz, boshqa oynaga o'tishlar soni. Ochiq savollarga 👁 orqali ball qo'yasiz. CSV yuklab olish mumkin.
6. Imtihon tugagach — **Imtihonni yopish**.

Keyingi attestatsiyada savollarni tahrirlang yoki yangi imtihon yarating. Eski natijalar buzilmaydi:
har bir xodim boshlagan paytdagi savollar nusxasi alohida saqlanadi.

## Savollarni JSON'dan yuklash

Muharrirda **JSON'dan yuklash** tugmasi bor. Format:

```json
[
  {
    "type": "single",
    "context": "Mijoz qo'ng'iroq qilib, shartnoma bo'yicha qoldiq summani so'rayapti.",
    "text": "Birinchi navbatda nima qilasiz?",
    "options": ["Summani aytaman", "Identifikatsiyadan o'tkazaman", "Ticket ochaman"],
    "correct": [1],
    "points": 1,
    "explanation": "Playbook → Identifikatsiya"
  },
  {
    "type": "multi",
    "text": "Qaysilari to'g'ri?",
    "options": ["A", "B", "C"],
    "correct": [0, 2],
    "points": 2
  },
  {
    "type": "open",
    "text": "Mijoz to'lovi ikki marta yechilgan. Harakatlaringizni ketma-ket yozing.",
    "points": 3,
    "explanation": "Kutilgan javob: ..."
  }
]
```

- `type`: `single` (bitta javob), `multi` (bir nechta javob), `open` (ochiq javob — admin baholaydi)
- `correct`: to'g'ri variantlarning tartib raqami, **0 dan** boshlanadi
- `explanation`: faqat adminga ko'rinadi

## Xavfsizlik qanday ta'minlangan

- Barcha tekshiruvlar serverda (`api/`): ruxsatsiz xodim imtihon savollarini ham ola olmaydi.
- To'g'ri javoblar xodim brauzeriga hech qachon yuborilmaydi; baholash serverda.
- Vaqt server soati bo'yicha; vaqt tugasa, saqlangan javoblar avtomatik topshiriladi.
- Jadvallarda RLS yoqilgan — Supabase'ga faqat server (service key) orqali murojaat qilinadi.
- O'chirilgan xodim darhol kira olmay qoladi.

## Lokal sinov

```bash
npm run dev:api     # 1-terminal: xotiradagi baza bilan API (admin / admin123)
npm run dev:local   # 2-terminal: sayt, /api so'rovlari lokal serverga boradi
```
