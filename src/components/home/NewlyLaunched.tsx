import { ProductCarousel } from "@/components/product/ProductCarousel";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getAllProducts } from "@/lib/products/queries";

export async function NewlyLaunched() {
  const all = await getAllProducts();
  const items = all.filter((p) => p.isNewLaunch).slice(0, 8);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">fresh off the shelf</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Newly Launched
          </h2>
        </ScrollReveal>

        <ProductCarousel products={items} />
      </div>
    </section>
  );
}
