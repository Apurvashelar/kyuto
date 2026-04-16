import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Order Confirmation" };

type OrderRow = {
  id: string;
  total: number;
  items_count: number;
  shipping_addr: { name?: string } | null;
};

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  let order: OrderRow | null = null;
  if (id && hasSupabaseKeys()) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("orders")
      .select("id, total, items_count, shipping_addr")
      .eq("id", id)
      .maybeSingle();
    order = (data as OrderRow) ?? null;
  }

  const shortId = order ? order.id.slice(0, 8).toUpperCase() : null;
  const firstName = order?.shipping_addr?.name?.split(" ")[0];

  return (
    <div className="bg-gradient-section min-h-[60vh]">
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
          <CheckCircle2 size={40} />
        </div>
        <p className="font-hand text-2xl text-kyuto-pink-600 mb-1">
          thank you{firstName ? `, ${firstName}` : ", lovely"}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
          Your Order is Placed
        </h1>

        {order ? (
          <div className="mt-5 space-y-1 text-kyuto-grey">
            <p>
              Order ID{" "}
              <span className="font-mono text-kyuto-dark">#{shortId}</span>
            </p>
            <p>
              {order.items_count} item{order.items_count === 1 ? "" : "s"} ·{" "}
              <span className="text-kyuto-dark font-medium">
                {formatCurrency(Number(order.total))}
              </span>
            </p>
            <p className="text-sm">
              A confirmation email is on its way. We&apos;ll ping you again when
              your parcel ships.
            </p>
          </div>
        ) : (
          <p className="mt-4 text-kyuto-grey">
            We couldn&apos;t look up your order details, but your payment was
            successful. Check your email for the receipt.
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          {order && (
            <Link href={`/account/orders/${order.id}`}>
              <Button size="lg">View Order</Button>
            </Link>
          )}
          <Link href="/shop">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
