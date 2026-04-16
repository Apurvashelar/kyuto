import { NextResponse } from "next/server";
import { createSupabaseAdminClient, hasServiceRoleKey } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, product_id, type } = body as Record<string, string>;
  if (!email || !product_id) {
    return NextResponse.json(
      { error: "Email and product are required" },
      { status: 400 }
    );
  }

  if (!hasServiceRoleKey()) {
    console.log("[notify-me] (no DB)", { email, product_id, type });
    return NextResponse.json({ ok: true, stored: false });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("notify_requests").insert({
    email,
    product_id,
    type: type === "sale" ? "sale" : "restock",
  });
  if (error && error.code !== "23505") {
    console.error("[notify-me] insert failed", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
