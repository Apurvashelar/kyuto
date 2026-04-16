"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const REVIEWS = [
  {
    id: "rev-1",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302687/IMG_2031_scagyq.jpg",
    rating: 5,
    text: "I was literally not okay with this purchase, never it was my first time buying things online and I'm obsessed! Look at the Mug.",
    name: "Soba",
  },
  {
    id: "rev-2",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302685/IMG_2029_wipixv.jpg",
    rating: 5,
    text: "It is definitely aesthetic and gives extremely vibes.",
    name: "Taruni P",
  },
  {
    id: "rev-3",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302692/IMG_5583_dxtqjt.heic",
    rating: 5,
    text: "I got this gift hamper customized for my client. I loved it!",
    name: "Simran Lohari",
  },
  {
    id: "rev-4",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302695/IMG_6422_npmztz.heic",
    rating: 5,
    text: "Product is same as picture, good quality and very pretty. Will definitely order again soon!",
    name: "Ishita Jain",
  },
  {
    id: "rev-5",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302691/IMG_2835_fu1gmw.heic",
    rating: 4,
    text: "Absolutely loved the packaging! This cup is so minimal.",
    name: "Neha Shah",
    location: "Rose Bloom Candle",
  },
  {
    id: "rev-6",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302689/A111C5D3-7A83-4A27-8504-FEA09F6D7A6D_yoqlmj.jpg",
    rating: 5,
    text: "Ordered the cup-saucer set as a wedding gift. The recipient was thrilled, it looks so premium in real life.",
    name: "Kirti S.",
    location: "Ivory Cup & Saucer Set",
  },
  {
    id: "rev-7",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302684/IMG_2028_seqhjm.png",
    rating: 5,
    text: "I bought this cutie puppy cup and omg it's so adorable.",
    name: "Suri B.",
    location: "Ivory Cup & Saucer Set",
  },
  {
    id: "rev-8",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302689/e35f4a8b-aae8-4bbf-929d-80aa22002a81_s5vtw9.jpg",
    rating: 4,
    text: "Loved the color and shape.",
    name: "Pranita Singh",
    location: "Ivory Cup & Saucer Set",
  },
  {
    id: "rev-9",
    image: "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776302686/IMG_2030_sor7cs.jpg",
    rating: 5,
    text: "This is more pretty in real, look at the 3D detailing. Loved it Kyuto",
    name: "Zoya",
    location: "Ivory Cup & Saucer Set",
  },
];

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

export function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_WIDTH = 296; // 280px card + 16px gap

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH, behavior: "smooth" });
  }

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-3">
          <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
            Customers are saying
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <StarRow rating={5} size={16} />
            <span className="text-sm text-kyuto-grey font-medium">4.8 / 5 &nbsp;·&nbsp; 120+ reviews</span>
          </div>
        </ScrollReveal>

        {/* Carousel + arrows */}
        <div className="relative mt-8">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-kyuto-dark disabled:opacity-30 hover:bg-kyuto-purple-50 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory scrollbar-hide"
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="shrink-0 snap-start w-[280px] rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col"
              >
                {/* Product image */}
                <div className="relative w-full h-64 bg-kyuto-purple-50">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-contain px-4"
                    sizes="280px"
                  />
                </div>

                {/* Review body */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <StarRow rating={review.rating} />
                  <p className="text-sm text-kyuto-dark leading-relaxed line-clamp-4">
                    {review.text}
                  </p>
                  <div className="mt-auto pt-2 border-t border-gray-50">
                    <p className="text-sm font-semibold text-kyuto-dark">{review.name}</p>
                    <p className="text-xs text-kyuto-grey">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-kyuto-dark disabled:opacity-30 hover:bg-kyuto-purple-50 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
