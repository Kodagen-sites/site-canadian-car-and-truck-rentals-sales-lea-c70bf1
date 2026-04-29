import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: rows } = await supabase
    .from("tenant_orders")
    .select("*")
    .eq("site_id", process.env.SITE_ID!)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Orders</h1>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
        {(rows ?? []).length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "#666" }}>No orders yet.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0a0a0a", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Order #</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Customer</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Total</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {rows!.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.order_number}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div>{r.customer_name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{r.customer_email}</div>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600 }}>
                    ${(r.total_cents / 100).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{r.status}</td>
                  <td style={{ padding: "12px 16px", color: "#888", fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
