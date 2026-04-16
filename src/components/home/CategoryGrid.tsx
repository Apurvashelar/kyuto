import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Tile = {
  slug: string;
  name: string;
  image: string;
  href?: string;
};

const TILES: Tile[] = [
  {
    slug: "mugs",
    name: "Mugs",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776223601/DSC0524834525424321532_ezhmte.jpg",
  },
  {
    slug: "cup-saucer",
    name: "Cup-Saucer Sets",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776289138/Cute_Cup_Saucer__krx8is.jpg",
  },
  {
    slug: "bowls",
    name: "Bowls",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776304621/Small_Pink_Heart_Glass_Bowl_-_Smooth_Glass_Crystal_Bowl_-_3_Inch_Heart_Shaped_Glass_Bowl_-_Pink_Glass_Heart_Bowl_for_Crystals_BOWLS_1083_ssiika.jpg",
  },
  {
    slug: "candles",
    name: "Candles",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776304600/La_belleza_de_lo_artesanal_en_cada_detalle_imyf7k.jpg",
  },
  {
    slug: "sale",
    name: "Sale",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776304602/Who_doesn_t_love_a_sale____50_off_select_clothing_outerwear__Available_online_in-store_discount_will_aut_bqf9wb.jpg",
    href: "/shop?collection=sale",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-14 sm:py-20 bg-kyuto-pastel-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-kyuto-purple-700 font-semibold">
            shop by category
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Our Collections
          </h2>
          <p className="mt-3 font-hand text-xl text-kyuto-pink-600">
            thoughtfully made, designed to last
          </p>
        </ScrollReveal>

        <div className="flex gap-5 sm:gap-8 overflow-x-auto overflow-y-visible scrollbar-hide -mx-4 px-4 py-4 sm:mx-0 sm:px-0 sm:py-6 sm:justify-center sm:flex-wrap">
          {TILES.map((tile, i) => (
            <ScrollReveal
              key={tile.slug}
              delay={i * 0.05}
              className="flex-shrink-0"
            >
              <Link
                href={tile.href ?? `/collections/${tile.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-kyuto-pink-300 ring-offset-4 ring-offset-kyuto-pastel-cream transition-all duration-300 group-hover:ring-kyuto-pink-500 group-hover:ring-offset-8">
                  <Image
                    src={tile.image}
                    alt={tile.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <span className="text-sm sm:text-base text-kyuto-dark font-medium tracking-wide transition-colors group-hover:text-kyuto-pink-600">
                  {tile.name}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
