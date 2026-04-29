import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, topic, message } = body;
  if (!name || !email || !topic || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Honeypot pattern: if a "_hp" field is present, silently 200.
  if (body._hp) return NextResponse.json({ ok: true });

  if (!isSupabaseConfigured()) {
    // Graceful degradation: log + accept while provisioning is deferred.
    console.log("[contact] (deferred-provisioning) submission:", { name, email, topic });
    return NextResponse.json({ ok: true, deferred: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    phone: phone ?? null,
    topic,
    message,
    metadata: { source: "contact-form", ua: req.headers.get("user-agent") ?? null },
  });

  if (error) {
    console.error("[contact] insert error:", error.message);
    return NextResponse.json({ error: "Storage failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
