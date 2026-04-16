import Link from "next/link";
import { Package } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Orders" };

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items_count: number;
};

const STATUS_VARIANTS: Record<string, "default" | "new" | "sale" | "muted" | "warning"> = {
  paid: "new",
  shipped: "default",
  delivered: "default",
  cancelled: "muted",
  failed: "sale",
  processing: "warning",
};

export default async function OrdersPage() {
  let orders: Order[] = [];
  if (hasSupabaseKeys()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("orders")
        .select("id, created_at, status, total, items_count")
        .eq("user_id", user.id)
        .not("status", "in", "(pending,failed)")
        .order("created_at", { ascending: false });
      orders = (data as Order[]) ?? [];
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-6">
        <Package className="text-kyuto-purple-300" size={48} />
        <div className="space-y-2">
          <h2 className="font-heading text-xl text-kyuto-dark">
            No orders yet
          </h2>
          <p className="text-sm text-kyuto-grey">
            When you place your first order, it'll appear here.
          </p>
        </div>
        <Link href="/shop">
          <Button>Start shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl text-kyuto-dark">My Orders</h2>
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.id}>
            <Link
              href={`/account/orders/${o.id}`}
              className="p-4 rounded-xl border border-kyuto-purple-100 bg-white flex items-center justify-between gap-4 hover:border-kyuto-purple-300 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-kyuto-dark">
                  Order #{o.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs text-kyuto-grey mt-0.5">
                  {new Date(o.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {o.items_count} item{o.items_count === 1 ? "" : "s"}
                </p>
              </div>
              <Badge variant={STATUS_VARIANTS[o.status] ?? "default"}>
                {o.status}
              </Badge>
              <p className="font-semibold text-kyuto-dark text-right">
                {formatCurrency(Number(o.total))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
