import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { getAllProducts } from "@/lib/products/queries";

export const metadata = {
  title: "Shop",
  description: "Browse Kyuto's handcrafted candles, ceramics, and gift hampers.",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <Suspense fallback={null}>
      <ShopClient title="Shop All" subtitle="curated for you" products={products} />
    </Suspense>
  );
}
