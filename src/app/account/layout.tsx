import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, MapPin, Heart, Gift } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/account/LogoutButton";

const NAV = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/rewards", label: "Rewards", icon: Gift },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userName = "friend";
  let userEmail: string | undefined;

  if (hasSupabaseKeys()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?next=/account");
    userEmail = user.email;
    userName =
      (user.user_metadata?.full_name as string | undefined) ??
      user.email?.split("@")[0] ??
      "friend";
  }

  return (
    <div className="bg-gradient-section min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <p className="font-hand text-xl text-kyuto-pink-600">
            hi {userName}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            My Account
          </h1>
          {userEmail && (
            <p className="text-sm text-kyuto-grey mt-1">{userEmail}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-white rounded-2xl border border-kyuto-pink-100/60 p-3 h-fit">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-kyuto-dark hover:bg-kyuto-pink-50 whitespace-nowrap transition-colors"
                  >
                    <Icon size={16} className="text-kyuto-purple-700" />
                    {item.label}
                  </Link>
                );
              })}
              <LogoutButton />
            </nav>
          </aside>

          <div className="bg-white rounded-2xl border border-kyuto-pink-100/60 p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
