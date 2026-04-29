import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCounts() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const [inq, res, inv] = await Promise.all([
    supabase.from("tenant_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("tenant_reservations").select("*", { count: "exact", head: true }),
    supabase.from("tenant_inventory").select("*", { count: "exact", head: true }),
  ]);
  return {
    inquiries: inq.count ?? 0,
    reservations: res.count ?? 0,
    inventory: inv.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <main className="container-narrow py-12">
      <div className="flex items-baseline justify-between mb-10">
        <div>
          <p className="eyebrow">Admin · Dashboard</p>
          <h1 className="font-display text-3xl text-white mt-2">Today, at the desk.</h1>
        </div>
        <form action="/admin/signout" method="post">
          <button className="text-white/55 hover:text-amber text-sm">Sign out</button>
        </form>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <Tile label="Inquiries" value={counts?.inquiries ?? "—"} href="/admin/inquiries" />
        <Tile label="Reservations" value={counts?.reservations ?? "—"} href="/admin/reservations" />
        <Tile label="Inventory" value={counts?.inventory ?? "—"} href="/admin/inventory" />
      </div>

      <div className="brushed-card p-8">
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-amber/80 mb-3">Notes</p>
        <ul className="space-y-2 text-white/70 text-[14px]">
          <li>• The lean admin shell currently exposes counts only. Detail views are scaffolded routes (Inquiries / Reservations / Inventory) ready to be filled out as workflows mature.</li>
          <li>• Inventory is auto-seeded from <code className="font-mono text-amber/80">content/refined-copy.json</code> at provisioning time.</li>
          <li>• Public-site form submissions (Contact, Reserve) write directly to the corresponding tables via the <code className="font-mono text-amber/80">/api/contact</code> + <code className="font-mono text-amber/80">/api/reserve</code> endpoints.</li>
        </ul>
      </div>
    </main>
  );
}

function Tile({ label, value, href }: { label: string; value: number | string; href: string }) {
  return (
    <Link href={href} className="brushed-card p-7 block">
      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-amber/80">{label}</p>
      <p className="font-display tabular-nums text-4xl text-white mt-3">{value}</p>
      <p className="text-white/45 text-sm mt-3">Open →</p>
    </Link>
  );
}
