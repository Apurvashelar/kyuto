import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const collections = [
  {
    slug: "candles",
    name: "Candles",
    tagline: "Hand-poured moods",
    image:
      "https://images.unsplash.com/photo-1602874801006-e26c7f1063c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "mugs",
    name: "Mugs",
    tagline: "Morning rituals",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "cup-saucer",
    name: "Cup & Saucer",
    tagline: "Afternoon grace",
    image:
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "tea-pots",
    name: "Tea Pots",
    tagline: "Slow brews",
    image:
      "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "bowls",
    name: "Bowls",
    tagline: "Serve with soul",
    image:
      "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "gift-hampers",
    name: "Gift Hampers",
    tagline: "Thoughtfully curated",
    image:
      "https://images.unsplash.com/photo-1606293459209-d197bbd12cc7?auto=format&fit=crop&w=600&q=80",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">shop by</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Our Collections
          </h2>
        </ScrollReveal>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-5 sm:overflow-visible sm:mx-0 sm:px-0">
          {collections.map((c, i) => (
            <ScrollReveal
              key={c.slug}
              delay={i * 0.05}
              className="snap-start shrink-0 w-44 sm:w-auto"
            >
              <Link
                href={`/collections/${c.slug}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-kyuto-purple-50">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 1024px) 30vw, 15vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-heading text-base text-kyuto-dark">
                    {c.name}
                  </p>
                  <p className="font-hand text-sm text-kyuto-purple-600">
                    {c.tagline}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
