// Supabase server client with graceful degradation when env vars are
// placeholders (deferred provisioning — see provision/PROVISION-LATER.md).

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("placeholder") || key.includes("placeholder")) return false;
  if (!url.startsWith("https://") || !/\.supabase\.co\/?$/.test(url)) return false;
  return true;
}

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.invalid",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key",
    {
      db: { schema: "kodagen" },
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            /* noop in static contexts */
          }
        },
      },
    }
  );
}
