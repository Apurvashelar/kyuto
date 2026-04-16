"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { CouponInput } from "@/components/cart/CouponInput";
import { useCartStore } from "@/stores/cartStore";
import { cn, formatCurrency } from "@/lib/utils";

type Address = {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY: Address = {
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpaySuccess) => void;
  modal: { ondismiss: () => void };
};

type RazorpayCtor = new (options: RazorpayOptions) => { open: () => void };

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

export function CheckoutClient({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const {
    items,
    coupon,
    discount,
    giftPackaging,
    getSubtotal,
    getGiftWrapFee,
    getPackagingFee,
    clear,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState<Address>(EMPTY);
  const [scriptReady, setScriptReady] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = getSubtotal();
  const giftWrap = getGiftWrapFee();
  const packaging = getPackagingFee();
  const shipping = subtotal >= 1299 ? 0 : 79;
  const total = Math.max(1, subtotal + giftWrap + packaging + shipping - discount);

  const addressValid =
    !!address.name.trim() &&
    /^\d{10}$/.test(address.phone) &&
    !!address.line1.trim() &&
    !!address.city.trim() &&
    !!address.state.trim() &&
    /^\d{6}$/.test(address.pincode);

  const canPay = mounted && items.length > 0 && addressValid && !processing;

  function update<K extends keyof Address>(key: K, value: Address[K]) {
    setAddress((a) => ({ ...a, [key]: value }));
  }

  async function payNow() {
    if (!canPay) return;
    if (!window.Razorpay) {
      toast.error("Payment module is still loading — try again in a moment.");
      return;
    }
    setProcessing(true);

    const createRes = await fetch("/api/checkout/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.productId,
          slug: i.slug,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          giftWrap: i.giftWrap,
        })),
        address,
        couponCode: coupon,
        discount,
        giftPackaging,
      }),
    });

    if (!createRes.ok) {
      const j = await createRes.json().catch(() => ({}));
      toast.error("Could not start payment", {
        description: j.error ?? "Please try again.",
      });
      setProcessing(false);
      return;
    }

    const data = (await createRes.json()) as {
      orderId: string;
      razorpayOrderId: string;
      amount: number;
      currency: string;
      keyId: string;
      buyerName: string;
      buyerEmail: string;
      buyerPhone: string;
    };

    const rzp = new window.Razorpay({
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: "Kyuto",
      description: "Order payment",
      order_id: data.razorpayOrderId,
      prefill: {
        name: data.buyerName,
        email: data.buyerEmail || userEmail,
        contact: data.buyerPhone,
      },
      theme: { color: "#9333EA" },
      modal: {
        ondismiss: () => {
          setProcessing(false);
          toast("Payment cancelled", {
            description: "You can try again anytime.",
          });
        },
      },
      handler: async (response) => {
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: data.orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        if (!verifyRes.ok) {
          const j = await verifyRes.json().catch(() => ({}));
          toast.error("Payment verification failed", {
            description: j.error ?? "Please contact support.",
          });
          setProcessing(false);
          return;
        }
        clear();
        toast.success("Payment successful!");
        router.push(`/order-confirmation?id=${data.orderId}`);
      },
    });

    rzp.open();
  }

  if (mounted && items.length === 0) {
    return (
      <div className="bg-gradient-section min-h-[60vh]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="font-heading text-3xl text-kyuto-dark">
            Your cart is empty
          </h1>
          <p className="mt-2 font-hand text-xl text-kyuto-purple-600">
            you&apos;ll need a little something first
          </p>
          <Link href="/shop" className="inline-block mt-6">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-section">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">almost yours</p>
          <h1 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white border border-kyuto-purple-100 p-6">
              <h2 className="font-heading text-xl text-kyuto-dark mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Full name"
                  value={address.name}
                  onChange={(v) => update("name", v)}
                  className="col-span-2 sm:col-span-1"
                />
                <Field
                  label="Phone"
                  value={address.phone}
                  onChange={(v) =>
                    update("phone", v.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit number"
                  className="col-span-2 sm:col-span-1"
                />
                <Field
                  label="Address line 1"
                  value={address.line1}
                  onChange={(v) => update("line1", v)}
                  className="col-span-2"
                />
                <Field
                  label="Address line 2"
                  value={address.line2}
                  onChange={(v) => update("line2", v)}
                  optional
                  className="col-span-2"
                />
                <Field
                  label="City"
                  value={address.city}
                  onChange={(v) => update("city", v)}
                />
                <Field
                  label="State"
                  value={address.state}
                  onChange={(v) => update("state", v)}
                />
                <Field
                  label="Pincode"
                  value={address.pincode}
                  onChange={(v) =>
                    update("pincode", v.replace(/\D/g, "").slice(0, 6))
                  }
                  className="col-span-2 sm:col-span-1"
                />
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-kyuto-purple-100 p-6">
              <h2 className="font-heading text-xl text-kyuto-dark mb-4">
                Coupon
              </h2>
              <CouponInput />
            </section>

            <p className="text-xs text-kyuto-grey">
              Payments are processed securely by Razorpay. You&apos;ll receive an
              order confirmation at <span className="text-kyuto-dark">{userEmail}</span>.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-white border border-kyuto-purple-100 p-5 space-y-4 sticky top-24">
              <h3 className="font-heading text-xl text-kyuto-dark">
                Order Summary
              </h3>
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3 text-sm">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-kyuto-purple-50 shrink-0">
                      <Image
                        src={i.image}
                        alt={i.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-kyuto-dark truncate">{i.name}</p>
                      <p className="text-xs text-kyuto-grey">
                        Qty {i.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-kyuto-dark">
                      {formatCurrency(i.price * i.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-1.5 text-sm pt-3 border-t border-kyuto-purple-100">
                <Row label="Subtotal" value={formatCurrency(subtotal)} />
                {giftWrap > 0 && (
                  <Row label="Gift wrap" value={formatCurrency(giftWrap)} />
                )}
                {packaging > 0 && (
                  <Row
                    label="Premium packaging"
                    value={formatCurrency(packaging)}
                  />
                )}
                <Row
                  label="Shipping"
                  value={
                    shipping === 0 ? (
                      <span className="text-emerald-700">Free</span>
                    ) : (
                      formatCurrency(shipping)
                    )
                  }
                />
                {discount > 0 && (
                  <Row
                    label="Discount"
                    value={
                      <span className="text-emerald-700">
                        -{formatCurrency(discount)}
                      </span>
                    }
                  />
                )}
              </dl>

              <div className="pt-3 border-t border-kyuto-purple-100 flex items-baseline justify-between">
                <span className="font-heading text-base text-kyuto-dark">
                  Total
                </span>
                <span className="font-heading text-xl text-kyuto-dark">
                  {formatCurrency(total)}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={!canPay || !scriptReady}
                onClick={payNow}
              >
                {processing
                  ? "Processing…"
                  : scriptReady
                  ? `Pay ${formatCurrency(total)}`
                  : "Loading payment…"}
              </Button>
              {!addressValid && (
                <p className="text-xs text-kyuto-grey text-center">
                  Fill in your address to continue
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  optional,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  optional?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="text-kyuto-grey text-xs font-medium">
        {label}
        {optional && <span className="text-kyuto-grey/60"> (optional)</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-kyuto-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400 text-sm"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <dt className="text-kyuto-grey">{label}</dt>
      <dd className="text-kyuto-dark">{value}</dd>
    </div>
  );
}
