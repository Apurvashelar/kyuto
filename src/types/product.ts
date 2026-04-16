export type Category =
  | "candles"
  | "mugs"
  | "cup-saucer"
  | "tea-pots"
  | "bowls"
  | "gift-hampers";

export type Collection =
  | "diwali"
  | "gifting"
  | "minimal-home"
  | "sale"
  | "new-arrivals";

export type ProductAttributes = {
  fragrance?: string;
  colour?: string;
  mood?: string;
  material?: string;
  size?: string;
  weight?: number;
  height?: string;
  rimDiameter?: string;
  capacity?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
  verified?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  collections: Collection[];
  attributes: ProductAttributes;
  stock: number;
  isFeatured?: boolean;
  isNewLaunch?: boolean;
  isBestseller?: boolean;
  giftWrapAvailable?: boolean;
  reviews?: Review[];
};

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  giftWrap?: boolean;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  candles: "Candles",
  mugs: "Mugs",
  "cup-saucer": "Cup & Saucer Sets",
  "tea-pots": "Tea Pots",
  bowls: "Bowls",
  "gift-hampers": "Gift Hampers",
};

export const COLLECTION_LABELS: Record<Collection, string> = {
  diwali: "Diwali",
  gifting: "Gifting",
  "minimal-home": "Minimal Home Aesthetics",
  sale: "Sale",
  "new-arrivals": "New Arrivals",
};
