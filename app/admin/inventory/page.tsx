import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: rows } = await supabase
    .from("tenant_products")
    .select("*")
    .eq("site_id", process.env.SITE_ID!)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Inventory</h1>
        <Link href="/admin/inventory/new" style={{
          padding: "10px 16px", background: "#3b82f6", color: "#fff",
          borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500,
        }}>+ Add Vehicle</Link>
      </div>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
        {(rows ?? []).length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "#666" }}>
            No vehicles yet. Click <strong>Add Vehicle</strong> to list your first one.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0a0a0a", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Vehicle</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Year</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Mileage</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Price</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}></th>
              </tr>
            </thead>
            <tbody>
              {rows!.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                    {r.vehicle_year ? `${r.vehicle_year} ` : ""}{r.vehicle_make ?? ""} {r.vehicle_model ?? r.name}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#bbb" }}>{r.vehicle_year ?? "—"}</td>
                  <td style={{ padding: "12px 16px", color: "#bbb" }}>{r.vehicle_mileage ? r.vehicle_mileage.toLocaleString() + " km" : "—"}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600 }}>
                    {r.price_cents ? "$" + (r.price_cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: 0.5,
                      background: r.status === "available" ? "#10b98133" : "#33333333",
                      color: r.status === "available" ? "#10b981" : "#888",
                    }}>{r.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <Link href={`/admin/inventory/${r.id}`} style={{ color: "#60a5fa", fontSize: 13 }}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
