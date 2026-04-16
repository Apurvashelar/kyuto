"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={item.q}
            className="rounded-xl bg-white border border-kyuto-pink-100/60 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
            >
              <span className="font-medium text-kyuto-dark text-sm">
                {item.q}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-kyuto-purple-700 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-kyuto-grey">
                {item.a}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
