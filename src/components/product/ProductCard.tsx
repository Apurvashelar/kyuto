"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const wishlist = useWishlistStore();
  const inWishlist = wishlist.items.includes(product.id);
  const outOfStock = product.stock === 0;
  const secondaryImage = product.images[1];

  const reviewCount = product.reviews?.length ?? 0;
  const avgRating =
    reviewCount > 0
      ? product.reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

  const discountPct =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : null;

  function onAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(product);
    toast.success(`Added to cart`, {
      description: product.name,
    });
  }

  function onHeart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const wasIn = wishlist.has(product.id);
    wishlist.toggle(product.id);
    toast(wasIn ? "Removed from wishlist" : "Saved to wishlist 💖", {
      description: product.name,
    });
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative"
    >
      <Link
        href={`/shop/${product.slug}`}
        className="block rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 border border-kyuto-purple-100/40"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-kyuto-purple-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={cn(
              "object-cover transition-opacity duration-700",
              secondaryImage && "group-hover:opacity-0"
            )}
          />
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discountPct && <Badge variant="sale">-{discountPct}%</Badge>}
            {product.isNewLaunch && <Badge variant="new">New</Badge>}
            {outOfStock && <Badge variant="muted">Out of Stock</Badge>}
          </div>

          <button
            type="button"
            onClick={onHeart}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all",
              inWishlist
                ? "bg-kyuto-pink-500 text-white shadow-lg shadow-kyuto-pink-300/50"
                : "bg-white/80 text-kyuto-grey hover:text-kyuto-pink-500 hover:bg-white"
            )}
          >
            <Heart
              size={16}
              className={inWishlist ? "fill-current" : ""}
            />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-body text-xs sm:text-[13px] font-medium tracking-wide text-kyuto-dark leading-tight line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-kyuto-dark">
                {formatCurrency(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-[11px] line-through text-kyuto-grey">
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>

            {reviewCount > 0 && (
              <div
                className="flex items-center gap-0.5 text-kyuto-grey shrink-0"
                aria-label={`${avgRating.toFixed(1)} out of 5, ${reviewCount} reviews`}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={12}
                    className={cn(
                      n <= Math.round(avgRating)
                        ? "fill-kyuto-pink-500 text-kyuto-pink-500"
                        : "text-kyuto-purple-200"
                    )}
                  />
                ))}
                <span className="ml-1 text-[11px] text-kyuto-grey">
                  ({reviewCount})
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onAdd}
            disabled={outOfStock}
            className={cn(
              "w-full py-2 rounded-md text-sm font-medium transition-all",
              outOfStock
                ? "bg-kyuto-grey/10 text-kyuto-grey cursor-not-allowed"
                : "bg-kyuto-purple-50 text-kyuto-purple-800 hover:bg-kyuto-purple-200 hover:text-kyuto-purple-900"
            )}
          >
            {outOfStock ? "Notify Me" : "Add to Cart"}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
