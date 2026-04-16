"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function WishlistClient({ allProducts }: { allProducts: Product[] }) {
  const { items, remove } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const products = allProducts.filter((p) => items.includes(p.id));

  if (products.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <Heart className="mx-auto text-kyuto-pink-300" size={48} />
        <div>
          <h3 className="font-heading text-xl text-kyuto-dark">
            Nothing saved yet
          </h3>
          <p className="text-sm text-kyuto-grey mt-1">
            Tap the heart on any product to save it for later.
          </p>
        </div>
        <Link href="/shop">
          <Button>Browse shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {products.map((p) => (
        <li
          key={p.id}
          className="p-3 rounded-xl border border-kyuto-purple-100 bg-white flex gap-3"
        >
          <Link
            href={`/shop/${p.slug}`}
            className="shrink-0 relative w-24 h-24 rounded-lg overflow-hidden bg-kyuto-purple-50"
          >
            <Image
              src={p.images[0]}
              alt={p.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <div>
              <Link
                href={`/shop/${p.slug}`}
                className="font-medium text-kyuto-dark text-sm line-clamp-1 hover:underline"
              >
                {p.name}
              </Link>
              <p className="text-sm font-semibold text-kyuto-dark mt-0.5">
                {formatCurrency(p.price)}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (p.stock === 0) {
                    toast.error("Out of stock");
                    return;
                  }
                  addItem(p);
                  toast.success("Added to cart", { description: p.name });
                }}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-kyuto-purple-50 text-kyuto-purple-800 hover:bg-kyuto-purple-200"
              >
                <ShoppingBag size={13} />
                {p.stock === 0 ? "Out of stock" : "Add to cart"}
              </button>
              <button
                type="button"
                onClick={() => {
                  remove(p.id);
                  toast("Removed from wishlist");
                }}
                className="p-1.5 rounded-full text-kyuto-grey hover:bg-red-50 hover:text-red-600"
                title="Remove"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
