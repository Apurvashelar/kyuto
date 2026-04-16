import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const posts = [
  {
    slug: "how-to-care-for-soy-candles",
    title: "How to Care for Your Soy Candle",
    excerpt:
      "Five small rituals that make your candle burn cleaner, last longer, and smell better every time.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    date: "March 28, 2026",
  },
  {
    slug: "gift-guide-diwali-2026",
    title: "Kyuto Gift Guide: Diwali 2026",
    excerpt:
      "Our most-gifted hampers for family, colleagues, and the friend you want to spoil.",
    image:
      "https://images.unsplash.com/photo-1606293459209-d197bbd12cc7?auto=format&fit=crop&w=600&q=80",
    date: "March 14, 2026",
  },
  {
    slug: "tea-rituals-we-love",
    title: "Tea Rituals We Love This Spring",
    excerpt:
      "From floral blends to grounding chai — how our favourite cups come alive.",
    image:
      "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=600&q=80",
    date: "February 22, 2026",
  },
];

export function BlogPreview() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-section">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">the journal</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Kyuto Stories
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-kyuto-purple-100 hover:shadow-lg hover:shadow-kyuto-purple-200/40 transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-kyuto-purple-50">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-kyuto-purple-600 font-medium">
                    {p.date}
                  </p>
                  <h3 className="mt-2 font-heading text-xl text-kyuto-dark leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-kyuto-grey line-clamp-2">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-kyuto-purple-700 group-hover:text-kyuto-pink-600 transition-colors">
                    Read more →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
