import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function createVehicle(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const slug = (String(formData.get("name") ?? "vehicle"))
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    + "-" + Date.now().toString(36);

  await supabase.from("tenant_products").insert({
    site_id: process.env.SITE_ID,
    slug,
    name: String(formData.get("name") ?? "Untitled"),
    description: String(formData.get("description") ?? ""),
    vehicle_year: formData.get("year") ? parseInt(String(formData.get("year")), 10) : null,
    vehicle_make: String(formData.get("make") ?? "") || null,
    vehicle_model: String(formData.get("model") ?? "") || null,
    vehicle_mileage: formData.get("mileage") ? parseInt(String(formData.get("mileage")), 10) : null,
    price_cents: formData.get("price") ? Math.round(parseFloat(String(formData.get("price"))) * 100) : 0,
    currency: "CAD",
    status: "available",
  });
  redirect("/admin/inventory");
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

export default async function NewVehiclePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Add Vehicle</h1>
      <form action={createVehicle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Listing Name</label>
          <input name="name" required style={fieldStyle} placeholder="e.g. 2024 Ford F-150 XLT" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <div>
            <label style={labelStyle}>Year</label>
            <input name="year" type="number" min="1980" max="2030" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Make</label>
            <input name="make" style={fieldStyle} placeholder="Ford" />
          </div>
          <div>
            <label style={labelStyle}>Model</label>
            <input name="model" style={fieldStyle} placeholder="F-150" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <div>
            <label style={labelStyle}>Mileage (km)</label>
            <input name="mileage" type="number" min="0" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Price (CAD)</label>
            <input name="price" type="number" min="0" step="0.01" style={fieldStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea name="description" rows={4} style={{ ...fieldStyle, resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button type="submit" style={{
            padding: "12px 24px", background: "#3b82f6", color: "#fff",
            border: 0, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Add Vehicle</button>
          <a href="/admin/inventory" style={{
            padding: "12px 24px", background: "transparent", color: "#888",
            border: "1px solid #333", borderRadius: 8, fontSize: 14, textDecoration: "none",
          }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}
