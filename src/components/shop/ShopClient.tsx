"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CATEGORY_LABELS } from "@/types/product";
import type { Category, Product } from "@/types/product";
import { cn } from "@/lib/utils";

type SortKey = "relevance" | "price-asc" | "price-desc" | "newest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ALL_CATEGORIES: Category[] = [
  "mugs",
  "cup-saucer",
  "tea-pots",
  "bowls",
  "candles",
  "gift-hampers",
];

type Props = {
  defaultCategory?: Category;
  title?: string;
  subtitle?: string;
  products: Product[];
};

export function ShopClient({ defaultCategory, title, subtitle, products }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategories = useMemo<Category[]>(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) return fromUrl.split(",") as Category[];
    if (defaultCategory) return [defaultCategory];
    return [];
  }, [searchParams, defaultCategory]);

  const sort = (searchParams.get("sort") as SortKey) ?? "relevance";
  const query = searchParams.get("q") ?? "";

  const [searchInput, setSearchInput] = useState(query);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function update(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleMulti(key: string, value: string, current: string[]) {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update(key, next.length ? next.join(",") : null);
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
    setSearchInput("");
  }

  const filtered = useMemo(() => {
    let out: Product[] = [...products];
    if (selectedCategories.length)
      out = out.filter((p) => selectedCategories.includes(p.category));
    if (query) {
      const q = query.toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        out.sort(
          (a, b) => Number(!!b.isNewLaunch) - Number(!!a.isNewLaunch)
        );
        break;
    }
    return out;
  }, [products, selectedCategories, query, sort]);

  const activeFilters: { label: string; onRemove: () => void }[] =
    selectedCategories.map((c) => ({
      label: CATEGORY_LABELS[c],
      onRemove: () =>
        update(
          "category",
          selectedCategories.filter((v) => v !== c).join(",") || null
        ),
    }));

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    update("q", searchInput || null);
  }

  const filterContent = (
    <div className="space-y-6">
      {!defaultCategory && (
        <FilterGroup title="Category">
          {ALL_CATEGORIES.map((c) => (
            <Checkbox
              key={c}
              label={CATEGORY_LABELS[c]}
              checked={selectedCategories.includes(c)}
              onChange={() => toggleMulti("category", c, selectedCategories)}
            />
          ))}
        </FilterGroup>
      )}
      <Button variant="ghost" size="sm" onClick={clearAll} className="w-full">
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="bg-gradient-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {defaultCategory && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-xs text-kyuto-grey flex items-center gap-1.5"
          >
            <Link href="/" className="hover:text-kyuto-purple-700 transition-colors">
              Home
            </Link>
            <span className="text-kyuto-grey/60">/</span>
            <Link href="/shop" className="hover:text-kyuto-purple-700 transition-colors">
              Shop
            </Link>
            <span className="text-kyuto-grey/60">/</span>
            <span className="text-kyuto-dark font-medium">
              {title ?? CATEGORY_LABELS[defaultCategory]}
            </span>
          </nav>
        )}
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {subtitle && (
              <p className="font-hand text-xl text-kyuto-pink-600">{subtitle}</p>
            )}
            <h1 className="font-heading text-3xl sm:text-5xl text-kyuto-dark">
              {title ?? "Shop All"}
            </h1>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 mb-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 relative"
          >
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kyuto-grey"
            />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search candles, mugs, hampers…"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-kyuto-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400 focus:border-transparent text-sm"
            />
          </form>

          <div className="flex gap-2">
            {!defaultCategory && (
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-kyuto-purple-200 bg-white text-sm font-medium text-kyuto-dark hover:border-kyuto-purple-400 hover:bg-kyuto-purple-50 transition-colors"
              >
                <SlidersHorizontal size={16} className="text-kyuto-purple-700" />
                Filters
              </button>
            )}
            <select
              value={sort}
              onChange={(e) => update("sort", e.target.value)}
              className="h-11 px-4 rounded-xl border border-kyuto-purple-200 bg-white text-sm font-medium text-kyuto-dark focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeFilters.map((f, i) => (
              <button
                key={`${f.label}-${i}`}
                type="button"
                onClick={f.onRemove}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-kyuto-purple-100 text-kyuto-purple-800 text-xs font-medium hover:bg-kyuto-purple-200 transition-colors"
              >
                {f.label}
                <X size={12} />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-kyuto-grey hover:text-kyuto-purple-700 underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div
          className={cn(
            "grid gap-8",
            !defaultCategory && "lg:grid-cols-[240px_1fr]"
          )}
        >
          {!defaultCategory && (
            <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              {filterContent}
            </aside>
          )}

          <div>
            <p className="text-sm text-kyuto-grey mb-4">
              Showing <Badge>{filtered.length}</Badge> of {products.length} products
            </p>
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-kyuto-dark/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl text-kyuto-dark">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-kyuto-purple-50"
              >
                <X size={20} />
              </button>
            </div>
            {filterContent}
            <div className="mt-6">
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full"
                size="lg"
              >
                View {filtered.length} results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-heading text-sm font-semibold text-kyuto-dark mb-3 uppercase tracking-wider">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
      <span
        className={cn(
          "w-4 h-4 rounded border flex items-center justify-center transition-colors",
          checked
            ? "bg-kyuto-purple-600 border-kyuto-purple-600"
            : "border-kyuto-purple-200 group-hover:border-kyuto-purple-400"
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 16 16"
            className="w-3 h-3 text-white"
            fill="currentColor"
          >
            <path d="M6 11.5L2.5 8l1-1 2.5 2.5L12.5 3l1 1z" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-kyuto-dark group-hover:text-kyuto-purple-700 transition-colors">
        {label}
      </span>
    </label>
  );
}
