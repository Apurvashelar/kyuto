import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createSupabaseAdminClient,
  hasServiceRoleKey,
} from "@/lib/supabase/admin";
import { getRazorpayClient, hasRazorpayKeys } from "@/lib/razorpay";
import { getProductBySlug } from "@/lib/products/queries";

type IncomingItem = {
  productId: string;
  slug: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  giftWrap?: boolean;
};

type CheckoutPayload = {
  items: IncomingItem[];
  address: {
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  couponCode?: string | null;
  discount?: number;
  giftPackaging?: boolean;
};

const GIFT_WRAP_FEE = 49;
const GIFT_PACKAGING_FEE = 149;
const FREE_SHIPPING_THRESHOLD = 1299;
const SHIPPING_FEE = 79;

export async function POST(request: Request) {
  if (!hasRazorpayKeys()) {
    return NextResponse.json(
      { error: "Payments not configured" },
      { status: 500 }
    );
  }
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

  const body = (await request.json().catch(() => null)) as CheckoutPayload | null;
  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  const addr = body.address;
  if (
    !addr ||
    !addr.name?.trim() ||
    !/^\d{10}$/.test(addr.phone ?? "") ||
    !addr.line1?.trim() ||
    !addr.city?.trim() ||
    !addr.state?.trim() ||
    !/^\d{6}$/.test(addr.pincode ?? "")
  ) {
    return NextResponse.json(
      { error: "Please fill a complete shipping address" },
      { status: 400 }
    );
  }

  // Recompute totals server-side from DB prices — never trust client totals.
  let subtotal = 0;
  let giftWrapCount = 0;
  const verifiedItems: IncomingItem[] = [];
  for (const i of body.items) {
    const product = await getProductBySlug(i.slug);
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${i.slug}` },
        { status: 400 }
      );
    }
    const qty = Math.max(1, Math.floor(i.quantity));
    subtotal += product.price * qty;
    if (i.giftWrap) giftWrapCount += 1;
    verifiedItems.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: qty,
      giftWrap: !!i.giftWrap,
    });
  }

  const giftWrapFee = giftWrapCount * GIFT_WRAP_FEE;
  const packagingFee = body.giftPackaging ? GIFT_PACKAGING_FEE : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const discount = Math.max(0, Math.min(subtotal, Number(body.discount) || 0));
  const total = Math.max(
    1,
    subtotal + giftWrapFee + packagingFee + shipping - discount
  );

  const itemsCount = verifiedItems.reduce((s, i) => s + i.quantity, 0);

  // 1. Create Razorpay order
  const razorpay = getRazorpayClient();
  let rzpOrder;
  try {
    rzpOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `kyuto_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: { userId: user.id },
    });
  } catch (e) {
    const err = e as Error;
    console.error("[checkout] razorpay create order failed:", err);
    return NextResponse.json(
      { error: "Could not start payment. Try again." },
      { status: 502 }
    );
  }

  // 2. Persist pending order (service role bypasses RLS so we can include user_id)
  const admin = createSupabaseAdminClient();
  const { data: orderRow, error: insertErr } = await admin
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      subtotal,
      discount,
      shipping: shipping + giftWrapFee + packagingFee,
      total,
      items_count: itemsCount,
      coupon_code: body.couponCode ?? null,
      shipping_addr: addr,
      razorpay_order_id: rzpOrder.id,
    })
    .select("id")
    .single();

  if (insertErr || !orderRow) {
    console.error("[checkout] order insert failed:", insertErr);
    return NextResponse.json(
      { error: "Could not create order. Try again." },
      { status: 500 }
    );
  }

  const itemRows = verifiedItems.map((i) => ({
    order_id: orderRow.id,
    product_id: i.productId,
    product_name: i.name,
    image: i.image ?? null,
    quantity: i.quantity,
    price: i.price,
  }));
  const { error: itemsErr } = await admin.from("order_items").insert(itemRows);
  if (itemsErr) {
    console.error("[checkout] order_items insert failed:", itemsErr);
  }

  return NextResponse.json({
    orderId: orderRow.id,
    razorpayOrderId: rzpOrder.id,
    amount: Math.round(total * 100),
    currency: "INR",
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    buyerName: addr.name,
    buyerEmail: user.email,
    buyerPhone: addr.phone,
  });
}
