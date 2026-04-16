import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createSupabaseAdminClient,
  hasServiceRoleKey,
} from "@/lib/supabase/admin";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { sendOrderEmails } from "@/lib/email/resend";

type VerifyPayload = {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export async function POST(request: Request) {
  if (!hasServiceRoleKey()) {
    return NextResponse.json(
      { error: "Service role key not configured" },
      { status: 500 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as VerifyPayload | null;
  if (
    !body?.orderId ||
    !body.razorpayOrderId ||
    !body.razorpayPaymentId ||
    !body.razorpaySignature
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const valid = verifyRazorpaySignature({
    orderId: body.razorpayOrderId,
    paymentId: body.razorpayPaymentId,
    signature: body.razorpaySignature,
  });

  const admin = createSupabaseAdminClient();

  if (!valid) {
    await admin
      .from("orders")
      .update({ status: "failed", payment_id: body.razorpayPaymentId })
      .eq("id", body.orderId)
      .eq("user_id", user.id);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 400 }
    );
  }

  const { data: orderRow, error: updateErr } = await admin
    .from("orders")
    .update({ status: "paid", payment_id: body.razorpayPaymentId })
    .eq("id", body.orderId)
    .eq("user_id", user.id)
    .eq("razorpay_order_id", body.razorpayOrderId)
    .select(
      "id, subtotal, discount, shipping, total, shipping_addr, items_count"
    )
    .single();

  if (updateErr || !orderRow) {
    console.error("[checkout/verify] order update failed:", updateErr);
    return NextResponse.json(
      { error: "Could not mark order paid" },
      { status: 500 }
    );
  }

  const { data: items } = await admin
    .from("order_items")
    .select("product_name, quantity, price, image")
    .eq("order_id", orderRow.id);

  try {
    await sendOrderEmails({
      orderId: orderRow.id,
      buyerEmail: user.email ?? "",
      items: (items ?? []).map((i) => ({
        name: i.product_name,
        quantity: i.quantity,
        price: Number(i.price),
        image: i.image ?? undefined,
      })),
      subtotal: Number(orderRow.subtotal),
      discount: Number(orderRow.discount),
      shipping: Number(orderRow.shipping),
      total: Number(orderRow.total),
      address: orderRow.shipping_addr,
      paymentId: body.razorpayPaymentId,
    });
  } catch (e) {
    console.error("[checkout/verify] sendOrderEmails threw:", e);
  }

  return NextResponse.json({ ok: true, orderId: orderRow.id });
}
