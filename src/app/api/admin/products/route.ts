import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth/admin";
import {
  createSupabaseAdminClient,
  hasServiceRoleKey,
} from "@/lib/supabase/admin";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type ReviewPayload = {
  id: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
  verified?: boolean;
};

type ProductPayload = {
  id?: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  price: number;
  compare_price?: number | null;
  images: string[];
  category: string;
  collections: string[];
  attributes: Record<string, unknown>;
  stock: number;
  is_featured?: boolean;
  is_new_launch?: boolean;
  is_bestseller?: boolean;
  gift_wrap_available?: boolean;
  sort_order?: number;
  reviews?: ReviewPayload[];
};

export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!hasServiceRoleKey()) {
    return NextResponse.json(
      { error: "Service role key not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as ProductPayload | null;
  if (!body || !body.name || !body.slug || body.price == null || !body.category) {
    return NextResponse.json(
      { error: "Missing required fields (name, slug, price, category)" },
      { status: 400 }
    );
  }

  const id = body.id?.trim() || `p-${slugify(body.slug)}`;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("products").upsert({
    id,
    slug: body.slug,
    name: body.name,
    tagline: body.tagline ?? "",
    description: body.description ?? "",
    price: body.price,
    compare_price: body.compare_price ?? null,
    images: body.images ?? [],
    category: body.category,
    collections: body.collections ?? [],
    attributes: body.attributes ?? {},
    stock: body.stock ?? 0,
    is_featured: body.is_featured ?? false,
    is_new_launch: body.is_new_launch ?? false,
    is_bestseller: body.is_bestseller ?? false,
    gift_wrap_available: body.gift_wrap_available ?? false,
    sort_order: body.sort_order ?? 0,
    reviews: body.reviews ?? [],
    updated_at: new Date().toISOString(),
  });
  if (error) {
    console.error("[admin/products] upsert failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}

export async function DELETE(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!hasServiceRoleKey()) {
    return NextResponse.json(
      { error: "Service role key not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
