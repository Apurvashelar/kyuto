import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "No products match your filters.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-hand text-2xl text-kyuto-purple-600">
          {emptyMessage}
        </p>
        <p className="mt-2 text-sm text-kyuto-grey">
          Try clearing a filter or two.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
