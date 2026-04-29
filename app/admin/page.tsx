import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const siteId = process.env.SITE_ID!;
  const [{ count: inq }, { count: res }, { count: prod }, { count: ord }] = await Promise.all([
    supabase.from("tenant_inquiries").select("*", { count: "exact", head: true }).eq("site_id", siteId),
    supabase.from("tenant_reservations").select("*", { count: "exact", head: true }).eq("site_id", siteId),
    supabase.from("tenant_products").select("*", { count: "exact", head: true }).eq("site_id", siteId),
    supabase.from("tenant_orders").select("*", { count: "exact", head: true }).eq("site_id", siteId),
  ]);

  const cards = [
    { label: "Inquiries",   value: inq ?? 0,  href: "/admin/inquiries",    color: "#3b82f6" },
    { label: "Reservations",value: res ?? 0,  href: "/admin/reservations", color: "#a855f7" },
    { label: "Inventory",   value: prod ?? 0, href: "/admin/inventory",    color: "#10b981" },
    { label: "Orders",      value: ord ?? 0,  href: "/admin/orders",       color: "#f59e0b" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>Welcome back, {user.email}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {cards.map((c) => (
          <Link key={c.label} href={c.href} style={{
            background: "#111", border: "1px solid #222", borderRadius: 12,
            padding: "20px 24px", textDecoration: "none", color: "inherit",
            display: "block",
          }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#666", marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: c.color }}>{c.value.toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
