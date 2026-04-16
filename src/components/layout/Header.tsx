"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useUIStore } from "@/stores/uiStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type IconActionProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  count?: number;
  children: React.ReactNode;
};

function IconAction({ href, onClick, label, count, children }: IconActionProps) {
  const Inner = (
    <span className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-kyuto-purple-50 transition-colors text-kyuto-dark">
      {children}
      {typeof count === "number" && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-kyuto-pink-500 text-[10px] font-semibold text-white flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </span>
  );
  if (href) {
    return (
      <Link href={href} aria-label={label}>
        {Inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label}>
      {Inner}
    </button>
  );
}

export function Header() {
  const { setMobileNav, setSearchOpen } = useUIStore();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full",
        "backdrop-blur-md bg-kyuto-pink-50/90 border-b border-kyuto-pink-100"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
            className="p-2 rounded-full hover:bg-kyuto-purple-50 text-kyuto-dark"
          >
            <Menu size={22} />
          </button>
        </div>

        <Link href="/" aria-label={SITE.name} className="flex items-center">
          <Image
            src="/kyuto-logo.png"
            alt={SITE.name}
            width={160}
            height={160}
            priority
            className="h-12 sm:h-14 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-kyuto-dark hover:text-kyuto-purple-700 transition-colors"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div
                  className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                >
                  <div className="min-w-[200px] rounded-xl border border-kyuto-pink-100 bg-white shadow-lg shadow-kyuto-purple-200/30 py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-kyuto-dark hover:bg-kyuto-pink-50 hover:text-kyuto-pink-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-kyuto-dark hover:text-kyuto-purple-700 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <IconAction
            label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} />
          </IconAction>
          <IconAction
            href="/account/wishlist"
            label="Wishlist"
            count={mounted ? wishlistCount : undefined}
          >
            <Heart size={20} />
          </IconAction>
          <IconAction
            href="/cart"
            label="Cart"
            count={mounted ? cartCount : undefined}
          >
            <ShoppingBag size={20} />
          </IconAction>
          <IconAction href="/account" label="Account">
            <User size={20} />
          </IconAction>
        </div>
      </div>
    </header>
  );
}
