import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const NAV = [
  { href: "/admin",              label: "Dashboard",   icon: "📊" },
  { href: "/admin/inquiries",    label: "Inquiries",   icon: "✉️" },
  { href: "/admin/reservations", label: "Reservations",icon: "📅" },
  { href: "/admin/inventory",    label: "Inventory",   icon: "🚗" },
  { href: "/admin/orders",       label: "Orders",      icon: "🧾" },
  { href: "/admin/settings",     label: "Settings",    icon: "⚙️" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Login page handles its own UI; pass through.
  if (!user) return <>{children}</>;

  const { data: site } = await supabase
    .from("tenant_sites")
    .select("name,slug")
    .eq("id", process.env.SITE_ID!)
    .maybeSingle();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", color: "#e5e5e5", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <aside style={{ width: 240, background: "#111", borderRight: "1px solid #222", padding: "24px 16px", flexShrink: 0 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#666", marginBottom: 4 }}>Site Admin</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{site?.name ?? "Site"}</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 8,
              color: "#bbb", textDecoration: "none", fontSize: 14,
            }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <form action="/admin/signout" method="POST" style={{ marginTop: 32 }}>
          <button type="submit" style={{
            width: "100%", padding: "10px 12px",
            background: "transparent", color: "#888",
            border: "1px solid #333", borderRadius: 8,
            fontSize: 13, cursor: "pointer",
          }}>
            Sign out
          </button>
        </form>
      </aside>
      <main style={{ flex: 1, padding: "32px 40px", overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
