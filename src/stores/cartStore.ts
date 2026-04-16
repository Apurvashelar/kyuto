"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types/product";

type CartState = {
  items: CartItem[];
  coupon: string | null;
  discount: number;
  giftPackaging: boolean;

  addItem: (
    product: Product,
    opts?: { quantity?: number; variant?: string; giftWrap?: boolean }
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setGiftWrap: (id: string, giftWrap: boolean) => void;
  setGiftPackaging: (on: boolean) => void;
  applyCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
  clear: () => void;

  getSubtotal: () => number;
  getGiftWrapFee: () => number;
  getPackagingFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
};

const GIFT_WRAP_FEE = 49;
const GIFT_PACKAGING_FEE = 149;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      discount: 0,
      giftPackaging: false,

      addItem: (product, opts) => {
        const variant = opts?.variant ?? "";
        const quantity = opts?.quantity ?? 1;
        const giftWrap = opts?.giftWrap ?? false;
        const lineId = `${product.id}::${variant}::${giftWrap ? "gw" : "0"}`;

        set((state) => {
          const existing = state.items.find((i) => i.id === lineId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === lineId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          const newItem: CartItem = {
            id: lineId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            price: product.price,
            quantity,
            variant: variant || undefined,
            giftWrap,
          };
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      setGiftWrap: (id, giftWrap) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, giftWrap } : i)),
        })),

      setGiftPackaging: (on) => set({ giftPackaging: on }),

      applyCoupon: (code, discount) =>
        set({ coupon: code.toUpperCase(), discount }),

      clearCoupon: () => set({ coupon: null, discount: 0 }),

      clear: () =>
        set({ items: [], coupon: null, discount: 0, giftPackaging: false }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getGiftWrapFee: () =>
        get().items.filter((i) => i.giftWrap).length * GIFT_WRAP_FEE,

      getPackagingFee: () => (get().giftPackaging ? GIFT_PACKAGING_FEE : 0),

      getTotal: () => {
        const s = get();
        const subtotal = s.getSubtotal();
        const extras = s.getGiftWrapFee() + s.getPackagingFee();
        return Math.max(0, subtotal + extras - s.discount);
      },

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "kyuto-cart",
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        discount: state.discount,
        giftPackaging: state.giftPackaging,
      }),
    }
  )
);
