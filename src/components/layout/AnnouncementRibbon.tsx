"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ANNOUNCEMENT } from "@/lib/constants";
import { useUIStore } from "@/stores/uiStore";

export function AnnouncementRibbon() {
  const { ribbonDismissed, dismissRibbon } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || ribbonDismissed) return null;

  const message = `${ANNOUNCEMENT}   •   Free Shipping above ₹1299   •   Handcrafted with Love   •   `;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative w-full bg-kyuto-purple-800 text-white text-xs sm:text-sm"
      >
        <div className="relative flex items-center overflow-hidden py-2">
          <div className="flex whitespace-nowrap animate-slide-ribbon">
            <span className="px-8 font-medium tracking-wide">{message.repeat(4)}</span>
            <span className="px-8 font-medium tracking-wide" aria-hidden>
              {message.repeat(4)}
            </span>
          </div>
          <button
            type="button"
            onClick={dismissRibbon}
            aria-label="Dismiss announcement"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
