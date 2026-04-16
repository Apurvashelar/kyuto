import Link from "next/link";
import { Package, Heart, MapPin, Gift } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";

export const metadata = { title: "My Account" };

export default async function AccountOverview() {
  let ordersCount = 0;
  let addressesCount = 0;

  if (hasSupabaseKeys()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const [orders, addresses] = await Promise.all([
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("addresses")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);
      ordersCount = orders.count ?? 0;
      addressesCount = addresses.count ?? 0;
    }
  }

  const stats = [
    { label: "Orders", value: ordersCount, href: "/account/orders", icon: Package },
    { label: "Wishlist", value: "—", href: "/account/wishlist", icon: Heart },
    { label: "Addresses", value: addressesCount, href: "/account/addresses", icon: MapPin },
    { label: "Rewards", value: "Soon", href: "/account/rewards", icon: Gift },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl text-kyuto-dark">Overview</h2>
        <p className="text-sm text-kyuto-grey mt-1">
          A quick glance at your Kyuto world.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="p-4 rounded-xl bg-kyuto-pastel-cream hover:bg-kyuto-pink-50 transition-colors border border-kyuto-pink-100/60"
            >
              <Icon size={18} className="text-kyuto-purple-700 mb-2" />
              <p className="text-xs text-kyuto-grey uppercase tracking-wide">
                {s.label}
              </p>
              <p className="font-heading text-2xl text-kyuto-dark mt-0.5">
                {s.value}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-br from-kyuto-pink-50 to-kyuto-purple-50 border border-kyuto-pink-100/60">
        <p className="font-hand text-xl text-kyuto-pink-600">kyuto rewards</p>
        <h3 className="font-heading text-lg text-kyuto-dark mt-1">
          Earn coins with every order
        </h3>
        <p className="text-sm text-kyuto-grey mt-1">
          Our loyalty programme is coming soon — orders placed before launch
          will be rewarded retroactively.
        </p>
      </div>
    </div>
  );
}
