-- Supabase SQL Editor'da ishga tushiring (mavjud loyihangizga qo'shiladi, yangi loyiha kerak emas).

create table if not exists qa_feedback (
  id bigint generated always as identity primary key,
  full_name text not null,
  department text,
  position text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_qa_feedback_created_at on qa_feedback (created_at desc);
