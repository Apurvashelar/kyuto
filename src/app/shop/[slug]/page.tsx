import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ReviewList } from "@/components/product/ReviewList";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products/queries";
import { CATEGORY_LABELS } from "@/types/product";

type Params = { slug: string };

export async function generateStaticParams() {
  const all = await getAllProducts();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <div className="bg-gradient-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-kyuto-grey mb-6"
        >
          <Link href="/" className="hover:text-kyuto-purple-700">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-kyuto-purple-700">
            Shop
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-kyuto-purple-700"
          >
            {CATEGORY_LABELS[product.category]}
          </Link>
          <ChevronRight size={12} />
          <span className="text-kyuto-dark truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <ProductGallery images={product.images} alt={product.name} />
          <ProductDetailClient product={product} />
        </div>

        <ProductSpecs product={product} />

        <div className="mt-16">
          <ReviewList reviews={product.reviews} />
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl sm:text-3xl text-kyuto-dark text-center mb-2">
              You May Also Like
            </h2>
            <p className="font-hand text-xl text-kyuto-pink-600 text-center mb-8">
              little matches
            </p>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  );
}
