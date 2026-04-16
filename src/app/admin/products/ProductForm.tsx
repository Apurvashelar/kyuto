"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Category, Collection, Product, Review } from "@/types/product";
import {
  CATEGORY_LABELS,
  COLLECTION_LABELS,
} from "@/types/product";

const CATEGORIES: Category[] = [
  "candles",
  "mugs",
  "cup-saucer",
  "tea-pots",
  "bowls",
  "gift-hampers",
];
const COLLECTIONS: Collection[] = [
  "diwali",
  "gifting",
  "minimal-home",
  "sale",
  "new-arrivals",
];

type Props = {
  mode: "create" | "edit";
  initial?: Product;
};

export function ProductForm({ mode, initial }: Props) {
  const router = useRouter();

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState<string>(String(initial?.price ?? ""));
  const [comparePrice, setComparePrice] = useState<string>(
    initial?.comparePrice != null ? String(initial.comparePrice) : ""
  );
  const [imagesText, setImagesText] = useState(
    (initial?.images ?? []).join("\n")
  );
  const [category, setCategory] = useState<Category>(
    initial?.category ?? "candles"
  );
  const [collections, setCollections] = useState<Collection[]>(
    initial?.collections ?? []
  );
  const [stock, setStock] = useState<string>(String(initial?.stock ?? "0"));
  const [sortOrder, setSortOrder] = useState<string>("0");
  const [isFeatured, setIsFeatured] = useState(!!initial?.isFeatured);
  const [isNewLaunch, setIsNewLaunch] = useState(!!initial?.isNewLaunch);
  const [isBestseller, setIsBestseller] = useState(!!initial?.isBestseller);
  const [giftWrap, setGiftWrap] = useState(
    initial?.giftWrapAvailable ?? true
  );

  const [fragrance, setFragrance] = useState(initial?.attributes.fragrance ?? "");
  const [colour, setColour] = useState(initial?.attributes.colour ?? "");
  const [mood, setMood] = useState(initial?.attributes.mood ?? "");
  const [material, setMaterial] = useState(initial?.attributes.material ?? "");
  const [size, setSize] = useState(initial?.attributes.size ?? "");

  const [reviews, setReviews] = useState<Review[]>(initial?.reviews ?? []);

  const [saving, setSaving] = useState(false);

  function addReview() {
    setReviews((prev) => [
      ...prev,
      {
        id: `r-${Date.now()}`,
        author: "",
        rating: 5,
        title: "",
        body: "",
        date: new Date().toISOString().slice(0, 10),
        verified: true,
      },
    ]);
  }

  function updateReview(i: number, patch: Partial<Review>) {
    setReviews((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  function removeReview(i: number) {
    setReviews((prev) => prev.filter((_, idx) => idx !== i));
  }

  function toggleCollection(c: Collection) {
    setCollections((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function deriveSlug() {
    if (slug) return;
    setSlug(
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const incomplete = reviews.findIndex(
      (r) => !r.author.trim() || !r.body.trim()
    );
    if (incomplete !== -1) {
      toast.error("Incomplete review", {
        description: `Review #${incomplete + 1} is missing an author name or body. Fill them in or remove the review before saving.`,
      });
      return;
    }

    setSaving(true);

    const images = imagesText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    const attributes: Record<string, string> = {};
    if (fragrance) attributes.fragrance = fragrance;
    if (colour) attributes.colour = colour;
    if (mood) attributes.mood = mood;
    if (material) attributes.material = material;
    if (size) attributes.size = size;

    const cleanedReviews = reviews.map((r) => ({
      id: r.id,
      author: r.author.trim(),
      rating: Math.max(1, Math.min(5, Number(r.rating) || 5)),
      title: r.title?.trim() || undefined,
      body: r.body.trim(),
      date: r.date,
      verified: !!r.verified,
    }));

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: initial?.id,
        slug,
        name,
        tagline,
        description,
        price: Number(price),
        compare_price: comparePrice ? Number(comparePrice) : null,
        images,
        category,
        collections,
        attributes,
        stock: Number(stock) || 0,
        sort_order: Number(sortOrder) || 0,
        is_featured: isFeatured,
        is_new_launch: isNewLaunch,
        is_bestseller: isBestseller,
        gift_wrap_available: giftWrap,
        reviews: cleanedReviews,
      }),
    });
    setSaving(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast.error("Save failed", { description: j.error });
      return;
    }
    toast.success(mode === "create" ? "Product created" : "Product updated");
    router.push("/admin/products");
    router.refresh();
  }

  const imageList = imagesText
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-sm text-kyuto-grey hover:text-kyuto-purple-700"
        >
          <ArrowLeft size={14} /> Back to products
        </Link>
        <h1 className="font-heading text-3xl text-kyuto-dark mt-2">
          {mode === "create" ? "New product" : `Edit: ${initial?.name}`}
        </h1>
      </div>

      <Section title="Basics">
        <Grid>
          <Field label="Name" required>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={deriveSlug}
              required
            />
          </Field>
          <Field label="Slug (URL)" required help="auto-filled from name; edit if needed">
            <input
              className={inputClass}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Field>
          <Field label="Tagline" help="short line under the product name">
            <input
              className={inputClass}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </Field>
          <Field label="Category" required>
            <select
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </Field>
        </Grid>
        <Field label="Description">
          <textarea
            className={inputClass + " min-h-[110px]"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
      </Section>

      <Section title="Pricing & Stock">
        <Grid>
          <Field label="Price (₹)" required>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Field>
          <Field label="Compare-at price (₹)" help="optional; shown as strikethrough">
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)}
            />
          </Field>
          <Field label="Stock">
            <input
              type="number"
              className={inputClass}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Field>
          <Field label="Sort order" help="lower = earlier on shop page">
            <input
              type="number"
              className={inputClass}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </Field>
        </Grid>
      </Section>

      <Section title="Images" subtitle="Paste Cloudinary URLs — one per line. First URL is the main image.">
        <textarea
          className={inputClass + " min-h-[130px] font-mono text-xs"}
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          placeholder={
            "https://res.cloudinary.com/dtyvqag3h/image/upload/v.../kyuto/products/your-slug/01.jpg"
          }
        />
        {imageList.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {imageList.map((url, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden bg-kyuto-purple-50 border border-kyuto-purple-100"
              >
                <Image
                  src={url}
                  alt={`Preview ${i + 1}`}
                  fill
                  sizes="160px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Collections & Flags">
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleCollection(c)}
              className={
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
                (collections.includes(c)
                  ? "bg-kyuto-purple-600 text-white"
                  : "bg-white border border-kyuto-purple-200 text-kyuto-grey hover:border-kyuto-purple-400")
              }
            >
              {COLLECTION_LABELS[c]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <Checkbox label="Featured" checked={isFeatured} onChange={setIsFeatured} />
          <Checkbox label="New launch" checked={isNewLaunch} onChange={setIsNewLaunch} />
          <Checkbox label="Bestseller" checked={isBestseller} onChange={setIsBestseller} />
          <Checkbox label="Gift wrap" checked={giftWrap} onChange={setGiftWrap} />
        </div>
      </Section>

      <Section title="Attributes" subtitle="All optional — shown on the product page.">
        <Grid>
          <Field label="Fragrance">
            <input
              className={inputClass}
              value={fragrance}
              onChange={(e) => setFragrance(e.target.value)}
            />
          </Field>
          <Field label="Colour">
            <input
              className={inputClass}
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            />
          </Field>
          <Field label="Mood">
            <input
              className={inputClass}
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </Field>
          <Field label="Material">
            <input
              className={inputClass}
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </Field>
          <Field
            label="Size"
            help="Write it exactly like: HEIGHT: 3.2 inches RIM DIAMETER: 3 inches CAPACITY: 250 ML — product page auto-extracts each value into the pink size card. Labels are optional; any you skip are hidden."
          >
            <input
              className={inputClass}
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="HEIGHT: 3.2 inches RIM DIAMETER: 3 inches CAPACITY: 250 ML"
            />
          </Field>
        </Grid>
      </Section>

      <Section
        title="Reviews"
        subtitle="Seed the product with a few curated reviews. Any with an empty name or body are dropped on save."
      >
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className="p-4 rounded-xl border border-kyuto-purple-100 bg-kyuto-pastel-cream/30 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => updateReview(i, { rating: n })}
                      aria-label={`${n} star${n === 1 ? "" : "s"}`}
                      className="p-0.5"
                    >
                      <Star
                        size={18}
                        className={
                          n <= r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-kyuto-purple-100 text-kyuto-purple-200 hover:text-amber-400"
                        }
                      />
                    </button>
                  ))}
                  <span className="text-xs text-kyuto-grey ml-2">
                    {r.rating} / 5
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeReview(i)}
                  aria-label="Remove review"
                  className="p-1.5 rounded-full text-kyuto-grey hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <Grid>
                <Field label="Author">
                  <input
                    className={inputClass}
                    value={r.author}
                    onChange={(e) => updateReview(i, { author: e.target.value })}
                  />
                </Field>
                <Field label="Date" help="YYYY-MM-DD">
                  <input
                    className={inputClass}
                    value={r.date}
                    onChange={(e) => updateReview(i, { date: e.target.value })}
                  />
                </Field>
              </Grid>
              <Field label="Title (optional)">
                <input
                  className={inputClass}
                  value={r.title ?? ""}
                  onChange={(e) => updateReview(i, { title: e.target.value })}
                />
              </Field>
              <Field label="Review">
                <textarea
                  className={inputClass + " min-h-[90px]"}
                  value={r.body}
                  onChange={(e) => updateReview(i, { body: e.target.value })}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!r.verified}
                  onChange={(e) =>
                    updateReview(i, { verified: e.target.checked })
                  }
                  className="w-4 h-4 accent-kyuto-purple-600"
                />
                <span className="text-kyuto-dark">Verified buyer</span>
              </label>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addReview}
            className="inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add review
          </Button>
        </div>
      </Section>

      <div className="sticky bottom-4 flex justify-end gap-3 bg-white/80 backdrop-blur border border-kyuto-purple-100 rounded-2xl p-3">
        <Link href="/admin/products">
          <Button type="button" variant="outline" size="sm">
            Cancel
          </Button>
        </Link>
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? "Saving..." : mode === "create" ? "Create product" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full h-10 px-3 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-kyuto-purple-100 p-6 space-y-4">
      <div>
        <h2 className="font-heading text-lg text-kyuto-dark">{title}</h2>
        {subtitle && (
          <p className="text-xs text-kyuto-grey mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-kyuto-dark mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {help && <span className="block text-[11px] text-kyuto-grey mt-1">{help}</span>}
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-kyuto-purple-600"
      />
      <span className="text-kyuto-dark">{label}</span>
    </label>
  );
}
