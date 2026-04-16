import type { Product } from "@/types/product";

export function ProductSpecs({ product }: { product: Product }) {
  if (!product.description) return null;

  return (
    <section className="mt-16 border-t border-kyuto-purple-100 pt-10">
      <h2 className="font-heading text-2xl text-kyuto-dark">Description</h2>
      <p className="mt-3 text-kyuto-grey leading-relaxed whitespace-pre-line">
        {product.description}
      </p>
    </section>
  );
}
