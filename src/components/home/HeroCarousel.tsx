"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  href: string;
  image: string;
  mobileImage?: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  cta?: string;
  align?: "left" | "center" | "right";
};

const SLIDES: Slide[] = [
  {
    href: "/shop",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776307250/Gemini_Generated_Image_15e0yd15e0yd15e0_nsqglf.png",
    mobileImage:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/c_fill,g_auto,w_900,h_1125/q_auto/f_auto/v1776307250/Gemini_Generated_Image_15e0yd15e0yd15e0_nsqglf.png",
    alt: "Ceramic cups and saucers",
    eyebrow: "morning tea, elevated",
    title: "Ceramics for slow rituals",
    cta: "Shop Ceramics",
    align: "left",
  },
  {
    href: "/shop",
    image:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776307659/Gemini_Generated_Image_2t3xf02t3xf02t3x_gwed0m.png",
    mobileImage:
      "https://res.cloudinary.com/dtyvqag3h/image/upload/c_fill,g_auto,w_900,h_1125/q_auto/f_auto/v1776307659/Gemini_Generated_Image_2t3xf02t3xf02t3x_gwed0m.png",
    alt: "Romantizing your home",
    eyebrow: "your mood, your vibes",
    title: "Romantizing your home",
    cta: "Shop now",
    align: "left",
  },
];

const ROTATION_MS = 5500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATION_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[index];

  return (
    <section
      className="relative w-full overflow-hidden bg-kyuto-purple-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.href + index}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Link
              href={slide.href}
              className="block relative w-full h-full group"
            >
              <picture>
                {slide.mobileImage && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={slide.mobileImage}
                  />
                )}
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </picture>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent sm:bg-gradient-to-r sm:from-black/40 sm:via-black/10 sm:to-transparent" />

              <div
                className={cn(
                  "absolute inset-0 flex items-end sm:items-center p-6 sm:p-12 lg:p-20",
                  slide.align === "right" &&
                  "sm:justify-end sm:text-right",
                  slide.align === "center" &&
                  "sm:justify-center sm:text-center"
                )}
              >
                <div className="max-w-xl text-white">
                  {slide.eyebrow && (
                    <p className="font-hand text-xl sm:text-2xl text-white/90 mb-2">
                      {slide.eyebrow}
                    </p>
                  )}
                  {slide.title && (
                    <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl leading-tight drop-shadow-md">
                      {slide.title}
                    </h2>
                  )}
                  {slide.cta && (
                    <span className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-kyuto-dark text-sm font-medium group-hover:bg-kyuto-pink-100 transition-colors">
                      {slide.cta} →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/70 hover:bg-white text-kyuto-dark backdrop-blur transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/70 hover:bg-white text-kyuto-dark backdrop-blur transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-8 bg-white"
                  : "w-4 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
