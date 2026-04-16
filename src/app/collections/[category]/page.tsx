import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShopClient } from "@/components/shop/ShopClient";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { getProductsByCategory } from "@/lib/products/queries";
import { CATEGORY_LABELS } from "@/types/product";
import type { Category } from "@/types/product";

type Params = { category: string };

const VALID: Category[] = [
  "candles",
  "mugs",
  "cup-saucer",
  "tea-pots",
  "bowls",
  "gift-hampers",
];

const COMING_SOON: Category[] = ["candles", "bowls"];

const TAGLINES: Record<Category, string> = {
  candles: "hand-poured moods",
  mugs: "morning rituals",
  "cup-saucer": "afternoon grace",
  "tea-pots": "slow brews",
  bowls: "serve with soul",
  "gift-hampers": "thoughtfully curated",
};

export function generateStaticParams() {
  return VALID.map((c) => ({ category: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  if (!VALID.includes(category as Category)) return { title: "Collection" };
  const name = CATEGORY_LABELS[category as Category];
  return {
    title: name,
    description: `Shop the ${name} collection by Kyuto.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  if (!VALID.includes(category as Category)) notFound();
  const cat = category as Category;

  if (COMING_SOON.includes(cat)) {
    return (
      <ComingSoon
        title={CATEGORY_LABELS[cat]}
        subtitle="Something beautiful is on its way. Stay tuned!"
        milestone="launching soon ✨"
      />
    );
  }

  const products = await getProductsByCategory(cat);

  return (
    <Suspense fallback={null}>
      <ShopClient
        defaultCategory={cat}
        title={CATEGORY_LABELS[cat]}
        subtitle={TAGLINES[cat]}
        products={products}
      />
    </Suspense>
  );
}
