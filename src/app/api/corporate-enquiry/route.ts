import { NextResponse } from "next/server";
import { createSupabaseAdminClient, hasServiceRoleKey } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, company, email, phone, quantity, occasion, budget, notes } =
    body as Record<string, string>;
  if (!name || !company || !email || !phone || !occasion) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 }
    );
  }

  if (!hasServiceRoleKey()) {
    console.log("[corporate-enquiry] (no DB)", body);
    return NextResponse.json({ ok: true, stored: false });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("corporate_enquiries").insert({
    name,
    company,
    email,
    phone,
    quantity: quantity || null,
    occasion,
    budget: budget || null,
    notes: notes || null,
  });
  if (error) {
    console.error("[corporate-enquiry] insert failed", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
