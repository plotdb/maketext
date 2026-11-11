-- 使用者收藏的效果 ( backend/maketext/index.ls 的 /api/star ). effect 是效果的資料夾名稱
create table if not exists star (
  owner int not null references users(key) on delete cascade,
  effect text not null constraint star_effect_len check (char_length(effect) <= 64),
  createdtime timestamp not null default now(),
  primary key (owner, effect)
);

create index if not exists idx_star_effect on star (effect);
