# Provision-Later: Supabase + Admin User

## Why this file exists

The Step 4.5 provisioning script ran but hit the Supabase free-tier limit:

> The following organization members have reached their maximum limits for the
> number of active free projects within organizations where they are an
> administrator or owner: kodavox1@gmail.com (2 project limit).

Existing org projects (as of the run):
- `nirvczowopqqzbhnfqap` — kodagen-master
- `jjzqiptutpdpjgmwjosj` — kodagen-springhill-hotel

Pausing or deleting either was outside the scope of this run's authorisation.
The site is shipped with **deferred Supabase provisioning** — when a project
slot is available (paid plan upgrade or one of the existing projects paused),
run the steps below. Until then, the site runs in static-config mode.

## Run when ready

Prerequisites:
- `SUPABASE_MANAGEMENT_PAT` exported in your shell
- Org has at least one free project slot (or is on a paid plan)

```bash
cd /Users/jokeware/Projects/sitegenerator-sites/canadian-car-and-truck-rentals-sales-lea-c70bf1
node _gen/provision-supabase.mjs
```

The script will:
1. Create a fresh project named `kodagen-canadian-car-and-truck-rentals-sales-lea-c70bf1`
2. Poll until `ACTIVE_HEALTHY` (~60-90 seconds)
3. Apply `provision/admin-schema.sql` (6 tables + RLS)
4. Seed `provision/seed-data.sql` (sites row + 8 inventory rows)
5. Create the owner auth user (`canadiancarandtruck@gmail.com`)
6. Write `.env.production`, `.env.local`, `ADMIN_CREDENTIALS.txt` to the site root

After the script returns:

```bash
# Verify the env files are in place
ls -la .env.production .env.local ADMIN_CREDENTIALS.txt

# Restart dev server so it picks up the new env
npm run dev

# Visit /admin/login — sign in with the credentials in ADMIN_CREDENTIALS.txt
open http://localhost:3000/admin/login
```

## Manual fallback (if you don't want to run the script)

1. Open https://supabase.com/dashboard, create a new project in any region (us-west-1 closest to Langley, BC).
2. From the project's SQL Editor, paste and run `provision/admin-schema.sql`.
3. From the SQL Editor, paste and run `provision/seed-data.sql`.
4. From Project Settings → API: copy the project URL, anon key, service-role key.
5. Edit `.env.production` and `.env.local` (templates provided). Replace placeholder values.
6. From Authentication → Users, click "Invite user" → enter `canadiancarandtruck@gmail.com`.
7. Set a password for the user, then run this SQL to grant admin role:
   ```sql
   insert into public.admin_users (user_id, email, full_name, role)
   select id, email, 'Canadian Car & Truck — Owner', 'owner'
   from auth.users where email = 'canadiancarandtruck@gmail.com';
   ```
8. Visit `/admin/login` and sign in.

## What ships without provisioning

The public site is fully functional. Routes that read from Supabase (`/sales`,
`/admin/*`, contact form submissions) gracefully fall back to:
- Inventory rendered from `content/refined-copy.json` (static)
- `/admin/*` routes return 404 / show "Admin not yet provisioned" notice
- Contact + reservation forms log submissions to console + return success

When provisioning runs later, no code changes are needed — the same routes
will start reading/writing live data once the env vars resolve.
