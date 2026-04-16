"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/lib/utils";

type SimpleCoupon = {
  code: string;
  description: string;
  minOrder?: number;
  calc: (subtotal: number) => number;
};

const COUPONS: SimpleCoupon[] = [
  {
    code: "WELCOME10",
    description: "10% off your first order",
    calc: (s) => Math.round(s * 0.1),
  },
  {
    code: "KYUTO20",
    description: "20% off on orders above ₹2999",
    minOrder: 2999,
    calc: (s) => Math.round(s * 0.2),
  },
];

export function CouponInput({ showSuggestions = true }: { showSuggestions?: boolean }) {
  const { coupon, discount, applyCoupon, clearCoupon, getSubtotal } =
    useCartStore();
  const [input, setInput] = useState("");

  function apply(codeRaw: string) {
    const code = codeRaw.trim().toUpperCase();
    if (!code) return;
    const found = COUPONS.find((c) => c.code === code);
    const subtotal = getSubtotal();

    if (!found) {
      toast.error("Invalid coupon code");
      return;
    }
    if (found.minOrder && subtotal < found.minOrder) {
      toast.error(`Add more items`, {
        description: `${code} needs a minimum order of ${formatCurrency(found.minOrder)}.`,
      });
      return;
    }
    const d = found.calc(subtotal);
    applyCoupon(code, d);
    setInput("");
    toast.success(`${code} applied!`, {
      description: `You saved ${formatCurrency(d)}.`,
    });
  }

  return (
    <div className="space-y-3">
      {coupon ? (
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <div>
            <p className="text-sm font-semibold text-emerald-800">
              {coupon} applied
            </p>
            <p className="text-xs text-emerald-700">
              You saved {formatCurrency(discount)}
            </p>
          </div>
          <button
            type="button"
            onClick={clearCoupon}
            aria-label="Remove coupon"
            className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apply(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 px-4 py-2.5 rounded-xl border border-kyuto-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400 text-sm uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-kyuto-purple-600 text-white text-sm font-medium hover:bg-kyuto-purple-700 transition-colors"
          >
            Apply
          </button>
        </form>
      )}

      {showSuggestions && !coupon && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-kyuto-grey">Try:</span>
          {COUPONS.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => apply(c.code)}
              className="text-xs px-2.5 py-1 rounded-full bg-kyuto-pink-50 text-kyuto-pink-700 border border-kyuto-pink-200 hover:bg-kyuto-pink-100 transition-colors"
              title={c.description}
            >
              {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
