import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Order details" };

type ShippingAddr = {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

type OrderRow = {
  id: string;
  created_at: string;
  status: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items_count: number;
  coupon_code: string | null;
  shipping_addr: ShippingAddr | null;
  payment_id: string | null;
};

type OrderItemRow = {
  id: string;
  product_name: string;
  image: string | null;
  quantity: number;
  price: number;
};

const STATUS_VARIANTS: Record<
  string,
  "default" | "new" | "sale" | "muted" | "warning"
> = {
  pending: "warning",
  paid: "new",
  shipped: "default",
  delivered: "default",
  cancelled: "muted",
  failed: "sale",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!hasSupabaseKeys()) notFound();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: order } = await supabase
    .from("orders")
    .select(
      "id, created_at, status, subtotal, discount, shipping, total, items_count, coupon_code, shipping_addr, payment_id"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!order) notFound();
  const o = order as OrderRow;

  const { data: itemRows } = await supabase
    .from("order_items")
    .select("id, product_name, image, quantity, price")
    .eq("order_id", o.id);
  const items = (itemRows ?? []) as OrderItemRow[];

  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm text-kyuto-grey hover:text-kyuto-purple-700"
      >
        <ArrowLeft size={14} /> All orders
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-heading text-2xl text-kyuto-dark">
            Order #{o.id.slice(0, 8).toUpperCase()}
          </h2>
          <p className="text-sm text-kyuto-grey mt-1">
            Placed on{" "}
            {new Date(o.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <Badge variant={STATUS_VARIANTS[o.status] ?? "default"}>
          {o.status}
        </Badge>
      </div>

      <section className="rounded-2xl bg-white border border-kyuto-purple-100 p-5">
        <h3 className="font-heading text-lg text-kyuto-dark mb-3">Items</h3>
        <ul className="divide-y divide-kyuto-purple-100">
          {items.map((i) => (
            <li key={i.id} className="py-3 flex items-center gap-3">
              {i.image && (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-kyuto-purple-50 shrink-0">
                  <Image
                    src={i.image}
                    alt={i.product_name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-kyuto-dark">{i.product_name}</p>
                <p className="text-xs text-kyuto-grey mt-0.5">
                  Qty {i.quantity} · {formatCurrency(Number(i.price))}
                </p>
              </div>
              <p className="text-sm text-kyuto-dark">
                {formatCurrency(Number(i.price) * i.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        <section className="rounded-2xl bg-white border border-kyuto-purple-100 p-5">
          <h3 className="font-heading text-lg text-kyuto-dark mb-3">
            Payment summary
          </h3>
          <dl className="space-y-1.5 text-sm">
            <Row label="Subtotal" value={formatCurrency(Number(o.subtotal))} />
            {Number(o.discount) > 0 && (
              <Row
                label="Discount"
                value={
                  <span className="text-emerald-700">
                    -{formatCurrency(Number(o.discount))}
                  </span>
                }
              />
            )}
            <Row
              label="Shipping & fees"
              value={
                Number(o.shipping) === 0 ? (
                  <span className="text-emerald-700">Free</span>
                ) : (
                  formatCurrency(Number(o.shipping))
                )
              }
            />
            <div className="flex justify-between pt-2 border-t border-kyuto-purple-100 mt-2">
              <dt className="font-semibold text-kyuto-dark">Total</dt>
              <dd className="font-semibold text-kyuto-dark">
                {formatCurrency(Number(o.total))}
              </dd>
            </div>
          </dl>
          {o.payment_id && (
            <p className="text-xs text-kyuto-grey mt-3">
              Payment ID{" "}
              <span className="font-mono text-kyuto-dark">{o.payment_id}</span>
            </p>
          )}
        </section>

        {o.shipping_addr && (
          <section className="rounded-2xl bg-white border border-kyuto-purple-100 p-5">
            <h3 className="font-heading text-lg text-kyuto-dark mb-3">
              Shipping to
            </h3>
            <address className="not-italic text-sm text-kyuto-dark leading-relaxed">
              {o.shipping_addr.name}
              <br />
              {o.shipping_addr.line1}
              {o.shipping_addr.line2 ? `, ${o.shipping_addr.line2}` : ""}
              <br />
              {o.shipping_addr.city}, {o.shipping_addr.state}{" "}
              {o.shipping_addr.pincode}
              <br />
              <span className="text-kyuto-grey">{o.shipping_addr.phone}</span>
            </address>
          </section>
        )}
      </div>
    </div>
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
