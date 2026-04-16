"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = { images: string[]; alt: string };

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }

  return (
    <div className="space-y-4">
      <div
        ref={imgRef}
        className="relative aspect-square rounded-3xl overflow-hidden bg-kyuto-purple-50 cursor-zoom-in"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMove}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className={cn(
            "object-cover transition-transform duration-300",
            zooming ? "scale-[1.7]" : "scale-100"
          )}
          style={
            zooming
              ? { transformOrigin: `${origin.x}% ${origin.y}%` }
              : undefined
          }
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "relative shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all",
                i === active
                  ? "ring-2 ring-kyuto-purple-500 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
