import "server-only";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Category, Collection, Product, Review } from "@/types/product";
// Note: Review type is used in the ProductRow type below.
import { hasSupabaseKeys } from "@/lib/supabase/client";
import {
  PRODUCTS as MOCK_PRODUCTS,
  getProductBySlug as mockGetBySlug,
  getRelatedProducts as mockGetRelated,
  getProductsByCategory as mockByCategory,
  getProductsByCollection as mockByCollection,
  uniqueAttribute as mockUniqueAttribute,
} from "@/lib/mockData";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: string | number;
  compare_price: string | number | null;
  images: string[] | null;
  category: Category;
  collections: Collection[] | null;
  attributes: Product["attributes"] | null;
  stock: number;
  is_featured: boolean;
  is_new_launch: boolean;
  is_bestseller: boolean;
  gift_wrap_available: boolean;
  sort_order: number;
  reviews: Review[] | null;
};

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    price: Number(row.price),
    comparePrice:
      row.compare_price !== null ? Number(row.compare_price) : undefined,
    images: row.images ?? [],
    category: row.category,
    collections: row.collections ?? [],
    attributes: row.attributes ?? {},
    stock: row.stock,
    isFeatured: row.is_featured,
    isNewLaunch: row.is_new_launch,
    isBestseller: row.is_bestseller,
    giftWrapAvailable: row.gift_wrap_available,
    reviews: row.reviews && row.reviews.length > 0 ? row.reviews : undefined,
  };
}

function readOnlyClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  if (!hasSupabaseKeys()) return MOCK_PRODUCTS;
  const supabase = readOnlyClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[products] getAllProducts failed, falling back to mock:", error.message);
    return MOCK_PRODUCTS;
  }
  if (!data || data.length === 0) return MOCK_PRODUCTS;
  return (data as ProductRow[]).map(rowToProduct);
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    if (!hasSupabaseKeys()) return mockGetBySlug(slug) ?? null;
    const supabase = readOnlyClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) {
      console.error("[products] getProductBySlug failed:", error.message);
      return mockGetBySlug(slug) ?? null;
    }
    if (!data) return null;
    return rowToProduct(data as ProductRow);
  }
);

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  if (!hasSupabaseKeys()) return mockGetRelated(product, limit);
  const supabase = readOnlyClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error || !data) return mockGetRelated(product, limit);
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductsByCategory(
  category: Category
): Promise<Product[]> {
  if (!hasSupabaseKeys()) return mockByCategory(category);
  const all = await getAllProducts();
  return all.filter((p) => p.category === category);
}

export async function getProductsByCollection(
  collection: Collection
): Promise<Product[]> {
  if (!hasSupabaseKeys()) return mockByCollection(collection);
  const all = await getAllProducts();
  return all.filter((p) => p.collections.includes(collection));
}

export async function getUniqueAttribute(
  key: "fragrance" | "colour" | "mood" | "material"
): Promise<string[]> {
  if (!hasSupabaseKeys()) return mockUniqueAttribute(key);
  const all = await getAllProducts();
  const set = new Set<string>();
  for (const p of all) {
    const v = p.attributes[key];
    if (v) set.add(v);
  }
  return Array.from(set).sort();
}
