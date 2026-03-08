-- ==========================================
--  Goods Cheaper – initial schema
-- ==========================================

-- Profiles (one row per auth user)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  language    varchar(10)  not null default 'en',
  currency    varchar(10)  not null default 'THB',
  unit_system varchar(10)  not null default 'metric',
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now()
);

-- Comparisons history
create table if not exists public.comparisons (
  id           uuid         primary key default gen_random_uuid(),
  user_id      uuid         not null references auth.users(id) on delete cascade,
  product_a    jsonb        not null default '{}',
  product_b    jsonb        not null default '{}',
  winner       varchar(5),                     -- 'A' | 'B' | 'tie'
  unit_price_a double precision not null default 0,
  unit_price_b double precision not null default 0,
  base_unit    varchar(20)  not null default '',
  created_at   timestamptz  not null default now()
);

create index if not exists comparisons_user_created
  on public.comparisons (user_id, created_at desc);

-- Row-Level Security
alter table public.profiles    enable row level security;
alter table public.comparisons enable row level security;

-- Profiles policies
create policy "profiles: own select"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles: own insert"
  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles: own update"
  on public.profiles for update using (auth.uid() = id);

-- Comparisons policies
create policy "comparisons: own select"
  on public.comparisons for select using (auth.uid() = user_id);
create policy "comparisons: own insert"
  on public.comparisons for insert with check (auth.uid() = user_id);
create policy "comparisons: own delete"
  on public.comparisons for delete using (auth.uid() = user_id);

-- Auto-create profile on first sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
