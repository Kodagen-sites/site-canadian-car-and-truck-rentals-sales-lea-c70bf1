import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function saveSettings(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await supabase
    .from("tenant_sites")
    .update({
      name: String(formData.get("name") ?? ""),
      brand: {
        tagline: String(formData.get("tagline") ?? ""),
        phone:   String(formData.get("phone")   ?? ""),
        email:   String(formData.get("email")   ?? ""),
        address: String(formData.get("address") ?? ""),
        hours:   String(formData.get("hours")   ?? ""),
      },
    })
    .eq("id", process.env.SITE_ID!);
}

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  background: "#0a0a0a", border: "1px solid #222", borderRadius: 8,
  color: "#fff", fontSize: 14,
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, color: "#888", marginBottom: 6,
  textTransform: "uppercase", letterSpacing: 0.5,
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: site } = await supabase
    .from("tenant_sites")
    .select("*")
    .eq("id", process.env.SITE_ID!)
    .maybeSingle();
  const brand = (site?.brand ?? {}) as Record<string, string>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Settings</h1>
      <form action={saveSettings} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Business Name</label>
          <input name="name" defaultValue={site?.name ?? ""} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Tagline</label>
          <input name="tagline" defaultValue={brand.tagline ?? ""} style={fieldStyle} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>Phone</label>
            <input name="phone" defaultValue={brand.phone ?? ""} style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" defaultValue={brand.email ?? ""} style={fieldStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Address</label>
          <input name="address" defaultValue={brand.address ?? ""} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Hours</label>
          <textarea name="hours" rows={3} defaultValue={brand.hours ?? ""} style={{ ...fieldStyle, resize: "vertical" }} />
        </div>
        <button type="submit" style={{
          padding: "12px 24px", background: "#3b82f6", color: "#fff",
          border: 0, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start",
        }}>Save Settings</button>
      </form>
    </div>
  );
}
