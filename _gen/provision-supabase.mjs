// Provision a per-tenant Supabase project via Management API.
// - Creates a new project in the configured org
// - Polls for ACTIVE_HEALTHY
// - Fetches project API keys (anon + service_role)
// - Applies a minimal admin schema (sites, inquiries, reservations, audit_log)
// - Creates the owner auth user with a generated password
// - Writes .env.production, .env.local, ADMIN_CREDENTIALS.txt next to the site
//
// Notes on scope: the SiteGenerator factory expects per-engine schemas
// (booking/catalog/crm/tickets) that are NOT present in this repo —
// only baseline migrations 0005, 0006, 0007 exist. We apply a minimal
// engine-agnostic admin schema sufficient to power the lean /admin
// dashboard scaffolded in Step 5.

import { writeFile, mkdir } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { dirname, join } from "node:path";

const PAT = process.env.SUPABASE_MANAGEMENT_PAT;
const ORG = process.env.SUPABASE_ORG_ID || "tcyvwuafayzxmyfrbhun";
const SLUG = "canadian-car-and-truck-rentals-sales-lea-c70bf1";
const OWNER_EMAIL = "canadiancarandtruck@gmail.com";
const REGION = process.env.SUPABASE_REGION || "us-west-1"; // closest to Langley, BC
const SITE_DIR = "/Users/jokeware/Projects/sitegenerator-sites/" + SLUG;

if (!PAT) {
  console.error("SUPABASE_MANAGEMENT_PAT not set");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const API = "https://api.supabase.com";

function gen(len) {
  return randomBytes(len).toString("base64").replace(/[+/=]/g, "").slice(0, len);
}

async function api(path, init = {}) {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${PAT}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${typeof body === "string" ? body : JSON.stringify(body)}`);
  }
  return body;
}

async function findExistingProject() {
  // Idempotency: if we already provisioned a project named for this slug, reuse it.
  const projects = await api("/v1/projects");
  return projects.find((p) => p.name === `kodagen-${SLUG}`.slice(0, 64));
}

async function createProject() {
  const dbPass = gen(28);
  const projectName = `kodagen-${SLUG}`.slice(0, 64);
  console.log(`Creating Supabase project "${projectName}" in org ${ORG} (region ${REGION})...`);
  const project = await api("/v1/projects", {
    method: "POST",
    body: JSON.stringify({
      organization_id: ORG,
      name: projectName,
      region: REGION,
      db_pass: dbPass,
      plan: "free",
    }),
  });
  return { project, dbPass };
}

async function pollHealthy(ref) {
  console.log(`Waiting for project ${ref} to become ACTIVE_HEALTHY...`);
  for (let i = 0; i < 60; i++) {
    const project = await api(`/v1/projects/${ref}`);
    console.log(`  poll ${i + 1}: status=${project.status}`);
    if (project.status === "ACTIVE_HEALTHY") return project;
    await sleep(8000);
  }
  throw new Error("Timed out waiting for ACTIVE_HEALTHY");
}

async function fetchApiKeys(ref) {
  const keys = await api(`/v1/projects/${ref}/api-keys`);
  const anon = keys.find((k) => k.name === "anon")?.api_key;
  const service = keys.find((k) => k.name === "service_role")?.api_key;
  if (!anon || !service) throw new Error(`Could not retrieve API keys for ${ref}`);
  return { anon, service };
}

async function runSql(ref, sql) {
  return api(`/v1/projects/${ref}/database/query`, {
    method: "POST",
    body: JSON.stringify({ query: sql }),
  });
}

const ADMIN_SCHEMA = `
-- ============================================================
-- Lean tenant admin baseline schema for Canadian Car & Truck.
-- Engine-agnostic: covers content management, lead capture, and
-- reservation tracking for the auto-rental + sales business.
-- ============================================================

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

-- 3) inquiries: contact-form + reservation-request submissions
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
-- RLS: turn it on, allow service_role full access (server-side
-- admin code uses service role; public endpoints insert via
-- explicit policies below).
-- ============================================================
alter table public.sites enable row level security;
alter table public.admin_users enable row level security;
alter table public.inquiries enable row level security;
alter table public.reservations enable row level security;
alter table public.inventory enable row level security;
alter table public.audit_log enable row level security;

-- Public read of sites + inventory (so SSG/ISR can fetch without auth)
drop policy if exists sites_public_read on public.sites;
create policy sites_public_read on public.sites for select using (true);

drop policy if exists inventory_public_read on public.inventory;
create policy inventory_public_read on public.inventory for select using (status = 'available');

-- Public anonymous insert on inquiries + reservations (form submissions)
drop policy if exists inquiries_public_insert on public.inquiries;
create policy inquiries_public_insert on public.inquiries for insert with check (true);

drop policy if exists reservations_public_insert on public.reservations;
create policy reservations_public_insert on public.reservations for insert with check (true);

-- Authenticated admins can read + write everything in their tables
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
`;

async function applySchema(ref) {
  console.log("Applying admin schema...");
  await runSql(ref, ADMIN_SCHEMA);
  console.log("✓ Schema applied");
}

async function seedConfig(ref) {
  // Seed the sites row from refined-copy + manifest
  console.log("Seeding sites row...");
  const seedSql = `
    insert into public.sites (slug, name, brand, published_config)
    values (
      '${SLUG}',
      'Canadian Car and Truck Rentals, Sales & Leasing',
      jsonb_build_object(
        'wordmark', 'CC&T',
        'tagline', 'Rent smart. Rent Canadian.',
        'accent_color', '#ffaa40',
        'palette_name', 'graphite-amber'
      ),
      jsonb_build_object(
        'voice_family', 'V6',
        'archetype', 'G',
        'style', 'S5',
        'managed_via', 'sitegenerator-pipeline'
      )
    )
    on conflict (slug) do update
      set brand = excluded.brand,
          published_config = excluded.published_config,
          updated_at = now()
    returning id;
  `;
  await runSql(ref, seedSql);

  // Seed inventory rows
  const inv = [
    {slug:"2025-chevrolet-silverado-3500", year:2025, make:"Chevrolet", model:"Silverado 3500", category:"Truck", mileage_km:19900, price:68900},
    {slug:"2024-ram-promaster", year:2024, make:"RAM", model:"ProMaster", category:"Cargo Van", mileage_km:30500, price:53900},
    {slug:"2024-ford-transit-cargo-van", year:2024, make:"Ford", model:"Transit Cargo Van", category:"Cargo Van", mileage_km:20950, price:49990},
    {slug:"2023-ford-f-150", year:2023, make:"Ford", model:"F-150", category:"Truck", mileage_km:43900, price:47500},
    {slug:"2023-chevrolet-traverse", year:2023, make:"Chevrolet", model:"Traverse", category:"SUV", mileage_km:31200, price:35500},
    {slug:"2023-chevrolet-express-cutaway", year:2023, make:"Chevrolet", model:"Express Commercial Cutaway", category:"Commercial", mileage_km:51000, price:69990},
    {slug:"2022-ford-f-350", year:2022, make:"Ford", model:"Super Duty F-350 SRW", category:"Truck", mileage_km:102400, price:79990},
    {slug:"1971-gmc-suburban", year:1971, make:"GMC", model:"Suburban", category:"Collector", mileage_mi:75600, price:49999},
  ];
  const values = inv.map((v) => {
    const km = v.mileage_km ?? "null";
    const mi = v.mileage_mi ?? "null";
    return `('${v.slug}', ${v.year}, '${v.make.replace(/'/g, "''")}', '${v.model.replace(/'/g, "''")}', '${v.category}', ${km}, ${mi}, ${v.price})`;
  }).join(",\n  ");

  const invSql = `
    insert into public.inventory (slug, year, make, model, category, mileage_km, mileage_mi, price_cad)
    values
      ${values}
    on conflict (slug) do update
      set year = excluded.year,
          make = excluded.make,
          model = excluded.model,
          category = excluded.category,
          mileage_km = excluded.mileage_km,
          mileage_mi = excluded.mileage_mi,
          price_cad = excluded.price_cad,
          updated_at = now();
  `;
  await runSql(ref, invSql);
  console.log(`✓ Seeded sites + ${inv.length} inventory rows`);
}

async function createOwner(ref, anonKey, serviceKey, supabaseUrl) {
  console.log(`Creating owner auth user ${OWNER_EMAIL}...`);
  const password = "CCnT-" + gen(20) + "-A1!";

  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: OWNER_EMAIL,
      password,
      email_confirm: true,
      user_metadata: { role: "owner", full_name: "Canadian Car & Truck — Owner" },
    }),
  });

  const txt = await res.text();
  let user;
  if (res.ok) {
    user = JSON.parse(txt);
    console.log(`✓ Owner created: id=${user.id}`);
  } else if (res.status === 422 || /already.*registered|exists/i.test(txt)) {
    // User exists — fetch and reset password
    console.log(`  User already exists, resetting password...`);
    const list = await fetch(`${supabaseUrl}/auth/v1/admin/users?email=${encodeURIComponent(OWNER_EMAIL)}`, {
      headers: { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey },
    });
    const listData = await list.json();
    user = listData.users?.[0] ?? listData[0];
    if (!user?.id) throw new Error(`Could not find existing user ${OWNER_EMAIL}`);
    const upd = await fetch(`${supabaseUrl}/auth/v1/admin/users/${user.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey, "Content-Type": "application/json" },
      body: JSON.stringify({ password, email_confirm: true }),
    });
    if (!upd.ok) throw new Error(`Reset password failed: ${await upd.text()}`);
    console.log(`✓ Password reset for existing user`);
  } else {
    throw new Error(`Create user failed: ${res.status} ${txt}`);
  }

  // Insert into admin_users table
  const insertSql = `
    insert into public.admin_users (user_id, email, full_name, role)
    values ('${user.id}', '${OWNER_EMAIL}', 'Canadian Car & Truck — Owner', 'owner')
    on conflict (user_id) do update set email = excluded.email, role = 'owner';
  `;
  await runSql(ref, insertSql);

  return { userId: user.id, password };
}

async function writeEnvFiles(ref, supabaseUrl, anonKey, serviceKey, ownerPassword) {
  await mkdir(SITE_DIR, { recursive: true });

  const envProd = [
    "# ─── Auto-generated by Step 4.5 (Supabase provisioning) ───",
    `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`,
    `NEXT_PUBLIC_SITE_URL=https://canadiancarandtruck.com`,
    "",
  ].join("\n");
  await writeFile(join(SITE_DIR, ".env.production"), envProd);

  const envLocal = [
    "# ─── Auto-generated by Step 4.5 (server-side, do NOT commit) ───",
    `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`,
    `NEXT_PUBLIC_SITE_URL=http://localhost:3000`,
    `SUPABASE_SERVICE_ROLE_KEY=${serviceKey}`,
    `SUPABASE_PROJECT_REF=${ref}`,
    "",
    "# Owner-supplied at /admin/integrations after launch:",
    "# RESEND_API_KEY=",
    "# STRIPE_SECRET_KEY=",
    "# STRIPE_WEBHOOK_SECRET=",
    "",
  ].join("\n");
  await writeFile(join(SITE_DIR, ".env.local"), envLocal);

  const creds = [
    "================================================================",
    "  ADMIN CREDENTIALS — Canadian Car and Truck",
    "================================================================",
    "",
    `  Login URL:  https://canadiancarandtruck.com/admin/login`,
    `              (or http://localhost:3000/admin/login during dev)`,
    "",
    `  Email:      ${OWNER_EMAIL}`,
    `  Password:   ${ownerPassword}`,
    "",
    `  Project:    ${ref}`,
    `  URL:        ${supabaseUrl}`,
    "",
    "  IMPORTANT: rotate this password after first login.",
    "  IMPORTANT: this file is git-ignored — do not commit.",
    "",
    "================================================================",
    "",
  ].join("\n");
  await writeFile(join(SITE_DIR, "ADMIN_CREDENTIALS.txt"), creds);

  console.log("✓ Wrote .env.production, .env.local, ADMIN_CREDENTIALS.txt");
}

async function main() {
  const existing = await findExistingProject();
  let project, dbPass = null;
  if (existing) {
    console.log(`Found existing project ${existing.id} — reusing`);
    project = existing;
  } else {
    const created = await createProject();
    project = created.project;
    dbPass = created.dbPass;
  }

  const ref = project.id;
  await pollHealthy(ref);

  const { anon, service } = await fetchApiKeys(ref);
  const supabaseUrl = `https://${ref}.supabase.co`;

  await applySchema(ref);
  await seedConfig(ref);
  const { password: ownerPassword } = await createOwner(ref, anon, service, supabaseUrl);

  await writeEnvFiles(ref, supabaseUrl, anon, service, ownerPassword);

  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✓ Tenant provisioned`);
  console.log(`  Project ref:   ${ref}`);
  console.log(`  Supabase URL:  ${supabaseUrl}`);
  console.log(`  Owner email:   ${OWNER_EMAIL}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch((err) => {
  console.error("Provisioning failed:", err);
  process.exit(1);
});
