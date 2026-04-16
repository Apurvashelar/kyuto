import type { Product, Category, Collection } from "@/types/product";

// Unsplash images work without auth and are placeholder-friendly.
// Swap to Cloudinary-hosted URLs once real assets are uploaded.
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "p-rose-bloom",
    slug: "rose-bloom-candle",
    name: "Rose Bloom Candle",
    tagline: "Soft florals, slow evenings",
    description:
      "A hand-poured soy wax candle blending fresh rose petals, vanilla musk, and a whisper of sandalwood. Burn time 40+ hours.",
    price: 899,
    comparePrice: 1199,
    images: [
      img("photo-1602874801006-e26c7f1063c1"),
      img("photo-1603006905003-be475563bc59"),
      img("photo-1607348063933-4c2c1f2ff069"),
    ],
    category: "candles",
    collections: ["gifting", "new-arrivals", "sale"],
    attributes: {
      fragrance: "Rose & Vanilla",
      colour: "Blush Pink",
      mood: "Romantic",
      material: "Soy wax",
      size: "200g",
    },
    stock: 12,
    isFeatured: true,
    isBestseller: true,
    isNewLaunch: true,
    giftWrapAvailable: true,
    reviews: [
      {
        id: "r1",
        author: "Aanya M.",
        rating: 5,
        title: "Smells like a spring garden",
        body: "The fragrance is soft and lingers without being overpowering. The packaging was gorgeous too.",
        date: "2026-03-14",
        verified: true,
      },
      {
        id: "r2",
        author: "Rhea K.",
        rating: 4,
        body: "Gorgeous colour. Bought as a gift and it was loved.",
        date: "2026-02-20",
        verified: true,
      },
    ],
  },
  {
    id: "p-lavender-haze",
    slug: "lavender-haze-candle",
    name: "Lavender Haze Candle",
    tagline: "Quiet mornings, softer nights",
    description:
      "Calming French lavender with a touch of eucalyptus — ideal for reading corners and warm baths.",
    price: 749,
    images: [
      img("photo-1602874801006-e26c7f1063c1"),
      img("photo-1612198188060-c7c2a3b66eae"),
    ],
    category: "candles",
    collections: ["minimal-home", "gifting"],
    attributes: {
      fragrance: "Lavender & Eucalyptus",
      colour: "Lavender",
      mood: "Calm",
      material: "Soy wax",
      size: "200g",
    },
    stock: 8,
    isBestseller: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-vanilla-sandal",
    slug: "vanilla-sandal-candle",
    name: "Vanilla Sandalwood Candle",
    tagline: "Warm, woody, grounded",
    description:
      "A rich blend of French vanilla and Mysore sandalwood — our most-gifted candle.",
    price: 999,
    images: [
      img("photo-1607348063933-4c2c1f2ff069"),
      img("photo-1603006905003-be475563bc59"),
    ],
    category: "candles",
    collections: ["gifting", "diwali"],
    attributes: {
      fragrance: "Vanilla & Sandalwood",
      colour: "Ivory",
      mood: "Cozy",
      material: "Soy wax",
      size: "250g",
    },
    stock: 0,
    isBestseller: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-blush-mug",
    slug: "blush-ceramic-mug",
    name: "Blush Ceramic Mug",
    tagline: "Your new 7am ritual",
    description:
      "A hand-glazed ceramic mug in a soft blush pink with a matte finish. Dishwasher safe.",
    price: 499,
    comparePrice: 649,
    images: [
      img("photo-1514228742587-6b1558fcca3d"),
      img("photo-1570649980020-3946cd2ba9a7"),
    ],
    category: "mugs",
    collections: ["minimal-home", "sale"],
    attributes: {
      colour: "Blush",
      material: "Stoneware",
      size: "300ml",
    },
    stock: 24,
    isFeatured: true,
    isNewLaunch: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-lilac-mug",
    slug: "lilac-dream-mug",
    name: "Lilac Dream Mug",
    tagline: "Soft purple, soft mornings",
    description:
      "A dreamy lilac hue on smooth glazed stoneware. Pairs with our Lilac Saucer set.",
    price: 549,
    images: [
      img("photo-1570649980020-3946cd2ba9a7"),
      img("photo-1514228742587-6b1558fcca3d"),
    ],
    category: "mugs",
    collections: ["minimal-home", "new-arrivals"],
    attributes: {
      colour: "Lilac",
      material: "Stoneware",
      size: "320ml",
    },
    stock: 15,
    isNewLaunch: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-ivory-cupsaucer",
    slug: "ivory-cup-saucer-set",
    name: "Ivory Cup & Saucer Set",
    tagline: "Afternoon tea, elevated",
    description:
      "A delicate cup and saucer pairing in ivory with hand-painted gold trim. Set of 2.",
    price: 1499,
    comparePrice: 1799,
    images: [
      img("photo-1563822249366-3efb23b8e0c9"),
      img("photo-1544787219-7f47ccb76574"),
    ],
    category: "cup-saucer",
    collections: ["gifting", "sale"],
    attributes: {
      colour: "Ivory & Gold",
      material: "Porcelain",
      size: "200ml cup",
    },
    stock: 6,
    isBestseller: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-peach-teapot",
    slug: "peach-ceramic-teapot",
    name: "Peach Ceramic Teapot",
    tagline: "Brewed with grace",
    description:
      "A minimalist peach teapot with a bamboo handle. Holds 800ml — enough for two generous cups.",
    price: 1999,
    images: [
      img("photo-1558160074-4d7d8bdf4256"),
      img("photo-1544787219-7f47ccb76574"),
    ],
    category: "tea-pots",
    collections: ["minimal-home", "gifting"],
    attributes: {
      colour: "Peach",
      material: "Stoneware",
      size: "800ml",
    },
    stock: 4,
    isFeatured: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-mint-bowl",
    slug: "mint-serving-bowl",
    name: "Mint Serving Bowl",
    tagline: "Serve in style",
    description:
      "A handmade ceramic bowl in sage-mint, perfect for fruit, salads, or ramen.",
    price: 699,
    images: [
      img("photo-1578849278619-e73505e9610f"),
      img("photo-1556909114-44e3e70034e2"),
    ],
    category: "bowls",
    collections: ["minimal-home"],
    attributes: {
      colour: "Mint",
      material: "Stoneware",
      size: "Medium",
    },
    stock: 18,
    giftWrapAvailable: true,
  },
  {
    id: "p-mauve-bowl",
    slug: "mauve-ramen-bowl",
    name: "Mauve Ramen Bowl",
    tagline: "Big bowl energy",
    description:
      "A deep, wide bowl in dusty mauve for ramen, soups, or beautiful breakfasts.",
    price: 849,
    images: [
      img("photo-1556909114-44e3e70034e2"),
      img("photo-1578849278619-e73505e9610f"),
    ],
    category: "bowls",
    collections: ["new-arrivals"],
    attributes: {
      colour: "Mauve",
      material: "Stoneware",
      size: "Large",
    },
    stock: 11,
    isNewLaunch: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-diwali-hamper",
    slug: "diwali-glow-hamper",
    name: "Diwali Glow Hamper",
    tagline: "Festive, folded, gifted",
    description:
      "Includes two candles, a pair of diya holders, and a handwritten card — wrapped in pink silk ribbon.",
    price: 2499,
    comparePrice: 2999,
    images: [
      img("photo-1606293459209-d197bbd12cc7"),
      img("photo-1513885535751-8b9238bd345a"),
    ],
    category: "gift-hampers",
    collections: ["diwali", "gifting", "sale"],
    attributes: {
      mood: "Festive",
    },
    stock: 9,
    isFeatured: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-gift-hamper-rose",
    slug: "rose-ritual-hamper",
    name: "Rose Ritual Hamper",
    tagline: "Little luxuries, gift-wrapped",
    description:
      "A blush mug, Rose Bloom candle, and artisanal tea — curated for the everyday romantic.",
    price: 1999,
    images: [
      img("photo-1513885535751-8b9238bd345a"),
      img("photo-1606293459209-d197bbd12cc7"),
    ],
    category: "gift-hampers",
    collections: ["gifting", "new-arrivals"],
    attributes: { mood: "Romantic" },
    stock: 7,
    isBestseller: true,
    isNewLaunch: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-citrus-candle",
    slug: "citrus-bloom-candle",
    name: "Citrus Bloom Candle",
    tagline: "Sunshine in a jar",
    description:
      "Zesty citrus peel, jasmine, and white tea. Wakes up any room instantly.",
    price: 849,
    images: [
      img("photo-1603006905003-be475563bc59"),
      img("photo-1602874801006-e26c7f1063c1"),
    ],
    category: "candles",
    collections: ["minimal-home", "new-arrivals"],
    attributes: {
      fragrance: "Citrus & Jasmine",
      colour: "Pale Yellow",
      mood: "Fresh",
      material: "Soy wax",
      size: "180g",
    },
    stock: 20,
    isNewLaunch: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-mini-teapot",
    slug: "mini-matte-teapot",
    name: "Mini Matte Teapot",
    tagline: "Solo tea ceremonies",
    description:
      "A single-serve teapot in matte blush — for intentional mornings.",
    price: 1299,
    images: [
      img("photo-1544787219-7f47ccb76574"),
      img("photo-1558160074-4d7d8bdf4256"),
    ],
    category: "tea-pots",
    collections: ["minimal-home"],
    attributes: {
      colour: "Matte Blush",
      material: "Stoneware",
      size: "350ml",
    },
    stock: 5,
    giftWrapAvailable: true,
  },
  {
    id: "p-gold-rim-cupsaucer",
    slug: "gold-rim-cup-saucer",
    name: "Gold Rim Cup & Saucer",
    tagline: "Classic, reimagined",
    description:
      "Porcelain cup and saucer with a hand-applied 22k gold rim. Set of 2.",
    price: 1799,
    images: [
      img("photo-1544787219-7f47ccb76574"),
      img("photo-1563822249366-3efb23b8e0c9"),
    ],
    category: "cup-saucer",
    collections: ["gifting", "diwali"],
    attributes: { colour: "Ivory & Gold", material: "Porcelain" },
    stock: 3,
    isBestseller: true,
    giftWrapAvailable: true,
  },
  {
    id: "p-pastel-candle-trio",
    slug: "pastel-candle-trio",
    name: "Pastel Candle Trio",
    tagline: "Three moods in one box",
    description:
      "A trio of our top candles — Rose Bloom, Lavender Haze, Citrus Bloom — in a gift box.",
    price: 2199,
    comparePrice: 2597,
    images: [
      img("photo-1602874801006-e26c7f1063c1"),
      img("photo-1603006905003-be475563bc59"),
    ],
    category: "gift-hampers",
    collections: ["gifting", "sale", "new-arrivals"],
    attributes: { mood: "Variety" },
    stock: 10,
    isFeatured: true,
    isNewLaunch: true,
    giftWrapAvailable: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, limit);
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByCollection(collection: Collection): Product[] {
  return PRODUCTS.filter((p) => p.collections.includes(collection));
}

export function uniqueAttribute(
  key: "fragrance" | "colour" | "mood" | "material"
): string[] {
  const set = new Set<string>();
  for (const p of PRODUCTS) {
    const v = p.attributes[key];
    if (v) set.add(v);
  }
  return Array.from(set).sort();
}
