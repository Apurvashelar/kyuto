"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductCarouselProps = {
  products: Product[];
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        disabled={!canScrollLeft}
        className={cn(
          "hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 items-center justify-center w-11 h-11 rounded-full bg-white text-kyuto-dark shadow-md hover:bg-kyuto-pink-50 transition-all",
          !canScrollLeft && "opacity-0 pointer-events-none"
        )}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
      >
        {products.map((p, i) => (
          <div
            key={p.id}
            className="flex-shrink-0 snap-start w-[60%] sm:w-[40%] md:w-[30%] lg:w-[23%]"
          >
            <ProductCard product={p} priority={i < 2} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        disabled={!canScrollRight}
        className={cn(
          "hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 items-center justify-center w-11 h-11 rounded-full bg-white text-kyuto-dark shadow-md hover:bg-kyuto-pink-50 transition-all",
          !canScrollRight && "opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
