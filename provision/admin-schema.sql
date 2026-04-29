-- ============================================================
-- Canadian Car and Truck — admin baseline schema
-- Apply once the Supabase project is provisioned.
-- ============================================================

create extension if not exists pgcrypto;

-- 1) sites: brand identity + published config (single-tenant: 1 row)
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand jsonb not null default '{}'::jsonb,
  published_config jsonb not null default '{}'::jsonb,
  draft_config jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) admin_users: who can log into /admin
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'owner' check (role in ('owner','admin','manager','staff')),
  created_at timestamptz not null default now()
);

-- 3) inquiries: contact-form submissions
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','closed','spam')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 4) reservations: structured rental reservation requests
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  vehicle_class text not null,
  pickup_date date,
  return_date date,
  pickup_location text,
  driver_name text not null,
  driver_email text not null,
  driver_phone text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz not null default now()
);

-- 5) inventory: pre-owned vehicle listings managed by owner
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  year integer not null,
  make text not null,
  model text not null,
  category text,
  mileage_km integer,
  mileage_mi integer,
  price_cad numeric(12,2),
  status text not null default 'available' check (status in ('available','pending','sold','off-market')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6) audit_log: all admin actions
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_table text,
  target_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS
-- ============================================================
alter table public.sites enable row level security;
alter table public.admin_users enable row level security;
alter table public.inquiries enable row level security;
alter table public.reservations enable row level security;
alter table public.inventory enable row level security;
alter table public.audit_log enable row level security;

-- Public read of sites + inventory
drop policy if exists sites_public_read on public.sites;
create policy sites_public_read on public.sites for select using (true);

drop policy if exists inventory_public_read on public.inventory;
create policy inventory_public_read on public.inventory for select using (status = 'available');

-- Public anonymous insert on inquiries + reservations
drop policy if exists inquiries_public_insert on public.inquiries;
create policy inquiries_public_insert on public.inquiries for insert with check (true);

drop policy if exists reservations_public_insert on public.reservations;
create policy reservations_public_insert on public.reservations for insert with check (true);

-- Authenticated admins read+write
drop policy if exists sites_admin_all on public.sites;
create policy sites_admin_all on public.sites for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists inquiries_admin_all on public.inquiries;
create policy inquiries_admin_all on public.inquiries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists reservations_admin_all on public.reservations;
create policy reservations_admin_all on public.reservations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists inventory_admin_all on public.inventory;
create policy inventory_admin_all on public.inventory for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists admin_users_admin_all on public.admin_users;
create policy admin_users_admin_all on public.admin_users for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists audit_log_admin_read on public.audit_log;
create policy audit_log_admin_read on public.audit_log for select using (auth.role() = 'authenticated');
