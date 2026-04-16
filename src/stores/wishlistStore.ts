"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  items: string[];
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  count: () => number;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) =>
        set((state) =>
          state.items.includes(productId)
            ? { items: state.items.filter((i) => i !== productId) }
            : { items: [...state.items, productId] }
        ),
      add: (productId) =>
        set((state) =>
          state.items.includes(productId)
            ? state
            : { items: [...state.items, productId] }
        ),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i !== productId) })),
      has: (productId) => get().items.includes(productId),
      count: () => get().items.length,
    }),
    { name: "kyuto-wishlist" }
  )
);
