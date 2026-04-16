export const SITE = {
  name: "Kyuto",
  tagline: "Where Art Meets Aroma",
  description:
    "Handcrafted candles, ceramic cups, tea-pots, bowls & curated gift hampers — made with love.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyuto.in",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919370899377",
  instagram: "https://www.instagram.com/kyuto.aesthetics?utm_source=qr",
  supportEmail: "kyuto.asthetics@gmail.com",
};

export const CATEGORY_LINKS = [
  { href: "/collections/candles", label: "Candles" },
  { href: "/collections/mugs", label: "Mugs" },
  { href: "/collections/cup-saucer", label: "Cup-Saucer Sets" },
  { href: "/collections/bowls", label: "Bowls" },
] as const;

export type NavLink = {
  href: string;
  label: string;
  children?: ReadonlyArray<{ href: string; label: string }>;
};

export const NAV_LINKS: ReadonlyArray<NavLink> = [
  { href: "/shop", label: "Shop" },
  { href: "/shop", label: "Collections", children: CATEGORY_LINKS },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const ANNOUNCEMENT =
  "Flat 20% OFF on orders above ₹2999 — Use Code: KYUTO20";

export const FOOTER_POLICIES = [
  { href: "/policies/shipping", label: "Shipping Policy" },
  { href: "/policies/returns", label: "Returns Policy" },
  { href: "/policies/privacy", label: "Privacy Policy" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/corporate-gifting", label: "Corporate Gifting" },
  { href: "/blog", label: "Blog" },
  { href: "/account", label: "My Account" },
] as const;
