import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ReservationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: rows } = await supabase
    .from("tenant_reservations")
    .select("*")
    .eq("site_id", process.env.SITE_ID!)
    .order("created_at", { ascending: false })
    .limit(100);

  const STATUS_COLORS: Record<string, string> = {
    pending:   "#f59e0b",
    confirmed: "#10b981",
    cancelled: "#6b7280",
    completed: "#3b82f6",
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Reservations</h1>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
        {(rows ?? []).length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "#666" }}>No reservations yet.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0a0a0a", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>When</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Driver</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Vehicle Class</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Pickup → Return</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Contact</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows!.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888" }}>{new Date(r.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>{r.driver_name}</td>
                  <td style={{ padding: "12px 16px" }}>{r.vehicle_class}</td>
                  <td style={{ padding: "12px 16px", color: "#bbb" }}>{r.pickup_date ?? "?"} → {r.return_date ?? "?"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div><a href={`mailto:${r.driver_email}`} style={{ color: "#60a5fa" }}>{r.driver_email}</a></div>
                    <div style={{ fontSize: 12, color: "#888" }}>{r.driver_phone}</div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 99,
                      background: (STATUS_COLORS[r.status] ?? "#333") + "33",
                      color: STATUS_COLORS[r.status] ?? "#888",
                      fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
                    }}>{r.status}</span>
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
