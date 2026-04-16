import { NextResponse } from "next/server";
import { createSupabaseAdminClient, hasServiceRoleKey } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body as Record<string, string>;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  if (!hasServiceRoleKey()) {
    console.log("[contact] (no DB)", { name, email, phone, subject, message });
    return NextResponse.json({ ok: true, stored: false });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone: phone || null,
    subject: subject || "General",
    message,
  });
  if (error) {
    console.error("[contact] insert failed", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
