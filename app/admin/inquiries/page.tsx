import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function InquiriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: rows } = await supabase
    .from("tenant_inquiries")
    .select("*")
    .eq("site_id", process.env.SITE_ID!)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Inquiries</h1>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
        {(rows ?? []).length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "#666" }}>No inquiries yet — when visitors fill out the contact form, they'll show up here.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0a0a0a", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>When</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Topic</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Email</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Phone</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Message</th>
              </tr>
            </thead>
            <tbody>
              {rows!.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#888" }}>{new Date(r.created_at).toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>{r.name}</td>
                  <td style={{ padding: "12px 16px" }}>{r.topic}</td>
                  <td style={{ padding: "12px 16px" }}><a href={`mailto:${r.email}`} style={{ color: "#60a5fa" }}>{r.email}</a></td>
                  <td style={{ padding: "12px 16px", color: "#bbb" }}>{r.phone ?? "—"}</td>
                  <td style={{ padding: "12px 16px", color: "#bbb", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.message ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
