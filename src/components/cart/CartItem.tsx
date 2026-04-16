"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types/product";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem, setGiftWrap } = useCartStore();

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white border border-kyuto-purple-100">
      <Link
        href={`/shop/${item.slug}`}
        className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-kyuto-purple-50"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/shop/${item.slug}`}
              className="font-heading text-base sm:text-lg text-kyuto-dark hover:text-kyuto-purple-700 transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            {item.variant && (
              <p className="text-xs text-kyuto-grey mt-0.5">{item.variant}</p>
            )}
            {item.giftWrap && (
              <p className="text-xs text-kyuto-pink-600 mt-0.5">
                + Gift wrap · ₹49
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label="Remove"
            className="p-1.5 text-kyuto-grey hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="inline-flex items-center rounded-full border border-kyuto-purple-200">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease"
              className="p-1.5 hover:bg-kyuto-purple-50 rounded-l-full"
            >
              <Minus size={12} />
            </button>
            <span className="px-3 text-sm font-medium min-w-[1.75rem] text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase"
              className="p-1.5 hover:bg-kyuto-purple-50 rounded-r-full"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm sm:text-base font-semibold text-kyuto-dark">
              {formatCurrency(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-kyuto-grey">
                {formatCurrency(item.price)} each
              </p>
            )}
          </div>
        </div>

        {!item.giftWrap && (
          <button
            type="button"
            onClick={() => setGiftWrap(item.id, true)}
            className="mt-2 text-xs text-kyuto-purple-600 hover:text-kyuto-pink-600 underline self-start"
          >
            + Add gift wrap
          </button>
        )}
      </div>
    </div>
  );
}
