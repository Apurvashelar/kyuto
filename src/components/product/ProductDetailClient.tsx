"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StockIndicator } from "@/components/product/StockIndicator";
import { SizeCard } from "@/components/product/SizeCard";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const wishlist = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const inWishlist = wishlist.has(product.id);
  const outOfStock = product.stock === 0;

  const discountPct =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : null;

  function handleAdd(buyNow = false) {
    if (outOfStock) return;
    addItem(product, { quantity, giftWrap });
    toast.success("Added to cart", { description: product.name });
    if (buyNow) router.push("/checkout");
  }

  function handleNotify() {
    toast.success("We'll let you know", {
      description: `You'll be notified when ${product.name} is back in stock.`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        {product.isNewLaunch && (
          <Badge variant="new" className="mb-2">
            New Launch
          </Badge>
        )}
        <h1 className="font-body text-xl font-medium tracking-wide text-kyuto-dark leading-tight">
          {product.name}
        </h1>
        <p className="mt-2 font-hand text-xl text-kyuto-purple-600">
          {product.tagline}
        </p>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-kyuto-dark">
          {formatCurrency(product.price)}
        </span>
        {product.comparePrice && product.comparePrice > product.price && (
          <>
            <span className="text-lg line-through text-kyuto-grey">
              {formatCurrency(product.comparePrice)}
            </span>
            <Badge variant="sale">-{discountPct}% off</Badge>
          </>
        )}
      </div>

      <StockIndicator stock={product.stock} />

      {(() => {
        const sidebarAttrs = (["fragrance", "colour", "mood", "material"] as const)
          .map((k) => [k, product.attributes[k]] as const)
          .filter(([, v]) => Boolean(v));
        if (sidebarAttrs.length === 0) return null;
        return (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {sidebarAttrs.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between border-b border-kyuto-purple-100 py-2"
              >
                <dt className="text-kyuto-grey capitalize">{k}</dt>
                <dd className="text-kyuto-dark font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        );
      })()}

      {!outOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-kyuto-dark">Quantity</span>
          <div className="inline-flex items-center rounded-full border border-kyuto-purple-200 bg-white">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="p-2 hover:bg-kyuto-purple-50 rounded-l-full"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 text-sm font-medium min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              aria-label="Increase quantity"
              className="p-2 hover:bg-kyuto-purple-50 rounded-r-full"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}

      {product.giftWrapAvailable && !outOfStock && (
        <label className="flex items-center justify-between gap-4 p-3 rounded-xl border border-kyuto-purple-100 bg-gradient-card cursor-pointer">
          <div>
            <p className="text-sm font-medium text-kyuto-dark">
              Add Gift Wrap
            </p>
            <p className="text-xs text-kyuto-grey">
              Satin ribbon + handwritten card · +₹49
            </p>
          </div>
          <span
            className={cn(
              "relative inline-flex h-6 w-11 rounded-full transition-colors",
              giftWrap ? "bg-kyuto-purple-600" : "bg-kyuto-purple-200"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                giftWrap ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </span>
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="sr-only"
          />
        </label>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {outOfStock ? (
          <Button size="lg" onClick={handleNotify} className="flex-1">
            Notify Me When Available
          </Button>
        ) : (
          <>
            <Button size="lg" onClick={() => handleAdd(false)} className="flex-1">
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAdd(true)}
              className="flex-1"
            >
              Buy Now
            </Button>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            wishlist.toggle(product.id);
            toast(inWishlist ? "Removed from wishlist" : "Saved to wishlist 💖");
          }}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-full border transition-colors",
            inWishlist
              ? "bg-kyuto-pink-500 text-white border-kyuto-pink-500"
              : "bg-white border-kyuto-purple-200 text-kyuto-grey hover:text-kyuto-pink-500"
          )}
        >
          <Heart size={20} className={inWishlist ? "fill-current" : ""} />
        </button>
      </div>

      <SizeCard size={product.attributes.size} />
    </div>
  );
}
