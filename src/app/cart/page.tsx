"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-gradient-section min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">your little basket</p>
          <h1 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Shopping Cart
          </h1>
        </div>

        {!mounted ? null : items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-kyuto-purple-100 flex items-center justify-center text-kyuto-purple-600">
              <ShoppingBag size={32} />
            </div>
            <h2 className="font-heading text-2xl text-kyuto-dark">
              Your cart is empty
            </h2>
            <p className="mt-2 font-hand text-xl text-kyuto-purple-600">
              let&apos;s fill it with something lovely
            </p>
            <Link href="/shop" className="inline-block mt-6">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
}
