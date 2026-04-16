import Link from "next/link";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { getAllProducts } from "@/lib/products/queries";

export async function CustomerFavourites() {
  const all = await getAllProducts();
  const items = all.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-gradient-section">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">
            loved by hundreds
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Customer&apos;s Favourites
          </h2>
        </ScrollReveal>

        <ProductCarousel products={items} />

        <div className="mt-10 text-center">
          <Link href="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
