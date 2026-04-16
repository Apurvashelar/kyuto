"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CouponInput } from "./CouponInput";

const FREE_SHIPPING_THRESHOLD = 1299;

export function CartSummary({ showCoupon = true }: { showCoupon?: boolean }) {
  const {
    getSubtotal,
    getGiftWrapFee,
    getPackagingFee,
    getTotal,
    discount,
    giftPackaging,
    setGiftPackaging,
  } = useCartStore();

  const subtotal = getSubtotal();
  const giftWrapFee = getGiftWrapFee();
  const packagingFee = getPackagingFee();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 79;
  const total = getTotal() + shipping;

  return (
    <div className="rounded-2xl bg-white border border-kyuto-purple-100 p-5 space-y-4 sticky top-24">
      <h3 className="font-heading text-xl text-kyuto-dark">Order Summary</h3>

      <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gradient-card border border-kyuto-purple-100 cursor-pointer">
        <div>
          <p className="text-sm font-medium text-kyuto-dark">
            Premium Gift Packaging
          </p>
          <p className="text-xs text-kyuto-grey">
            Pink silk, gold seal · +₹149
          </p>
        </div>
        <input
          type="checkbox"
          checked={giftPackaging}
          onChange={(e) => setGiftPackaging(e.target.checked)}
          className="w-4 h-4 accent-kyuto-purple-600"
        />
      </label>

      {showCoupon && <CouponInput />}

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-kyuto-grey">Subtotal</dt>
          <dd className="text-kyuto-dark">{formatCurrency(subtotal)}</dd>
        </div>
        {giftWrapFee > 0 && (
          <div className="flex justify-between">
            <dt className="text-kyuto-grey">Gift wrap</dt>
            <dd className="text-kyuto-dark">{formatCurrency(giftWrapFee)}</dd>
          </div>
        )}
        {packagingFee > 0 && (
          <div className="flex justify-between">
            <dt className="text-kyuto-grey">Premium packaging</dt>
            <dd className="text-kyuto-dark">{formatCurrency(packagingFee)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-kyuto-grey">Shipping</dt>
          <dd className="text-kyuto-dark">
            {shipping === 0 ? (
              <span className="text-emerald-700">Free</span>
            ) : (
              formatCurrency(shipping)
            )}
          </dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-kyuto-grey">Discount</dt>
            <dd className="text-emerald-700">
              -{formatCurrency(discount)}
            </dd>
          </div>
        )}
      </dl>

      <div className="pt-3 border-t border-kyuto-purple-100 flex items-baseline justify-between">
        <span className="font-heading text-base text-kyuto-dark">Total</span>
        <span className="font-heading text-xl text-kyuto-dark">
          {formatCurrency(total)}
        </span>
      </div>

      {subtotal > 0 && shipping > 0 && (
        <p className="text-xs text-kyuto-purple-700 font-hand text-lg">
          add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free
          shipping
        </p>
      )}

      <Link href="/checkout" className="block">
        <Button size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
      <Link
        href="/shop"
        className="block text-center text-sm text-kyuto-purple-700 hover:text-kyuto-pink-600"
      >
        Continue shopping
      </Link>
    </div>
  );
}
