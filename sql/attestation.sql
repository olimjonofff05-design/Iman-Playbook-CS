-- Attestatsiya bo'limi uchun jadvallar.
-- Supabase SQL Editor'da bir marta ishga tushiring (mavjud loyihaga qo'shiladi).
-- Barcha murojaatlar faqat server (Vercel /api) orqali, service_role kaliti bilan bo'ladi.
-- RLS yoqilgan va siyosat (policy) yo'q — demak brauzerdan anon kalit bilan
-- bu jadvallarni o'qib yoki o'zgartirib bo'lmaydi.

-- 1) Xodimlar (operatorlar)
create table if not exists att_users (
  id bigint generated always as identity primary key,
  full_name text not null,
  login text not null unique,
  password_hash text not null,
  level text not null default 'junior' check (level in ('junior', 'middle')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2) Imtihonlar (savollar JSON ko'rinishida imtihon ichida saqlanadi)
create table if not exists att_exams (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  level text not null default 'junior' check (level in ('junior', 'middle')),
  duration_min integer not null default 30 check (duration_min between 1 and 600),
  pass_percent integer not null default 70 check (pass_percent between 0 and 100),
  shuffle boolean not null default true,
  show_result boolean not null default true,
  status text not null default 'draft' check (status in ('draft', 'active', 'closed')),
  questions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) Ruxsat va urinishlar: admin ruxsat berganda "granted" holatda yoziladi,
--    xodim boshlaganda "in_progress", topshirganda "submitted" bo'ladi.
--    Savollar boshlangan paytda nusxalanadi (questions_snapshot), shuning uchun
--    keyin savollarni tahrirlash eski natijalarni buzmaydi.
create table if not exists att_attempts (
  id bigint generated always as identity primary key,
  exam_id bigint not null references att_exams(id) on delete cascade,
  user_id bigint not null references att_users(id) on delete cascade,
  status text not null default 'granted' check (status in ('granted', 'in_progress', 'submitted')),
  granted_at timestamptz not null default now(),
  started_at timestamptz,
  deadline timestamptz,
  submitted_at timestamptz,
  late boolean not null default false,
  questions_snapshot jsonb,
  answers jsonb,
  auto_score numeric not null default 0,
  manual_scores jsonb not null default '{}'::jsonb,
  max_score numeric not null default 0,
  needs_review boolean not null default false,
  tab_switches integer not null default 0
);

create index if not exists idx_att_attempts_exam on att_attempts (exam_id);
create index if not exists idx_att_attempts_user on att_attempts (user_id);

alter table att_users enable row level security;
alter table att_exams enable row level security;
alter table att_attempts enable row level security;
