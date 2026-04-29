import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["vehicle_class", "driver_name", "driver_email", "driver_phone"];
  for (const f of required) {
    if (!body[f]) {
      return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 });
    }
  }

  if (!isSupabaseConfigured()) {
    console.log("[reserve] (deferred-provisioning) submission:", {
      vehicle_class: body.vehicle_class,
      driver_email: body.driver_email,
    });
    return NextResponse.json({ ok: true, deferred: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tenant_reservations").insert({
    site_id: process.env.SITE_ID!,
    vehicle_class: body.vehicle_class,
    pickup_date: body.pickup_date || null,
    return_date: body.return_date || null,
    pickup_location: body.pickup_location || null,
    driver_name: body.driver_name,
    driver_email: body.driver_email,
    driver_phone: body.driver_phone,
    notes: body.notes || null,
    status: "pending",
  });

  if (error) {
    console.error("[reserve] insert error:", error.message);
    return NextResponse.json({ error: "Storage failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
