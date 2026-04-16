"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";

const HIDDEN_PATHS = ["/cart", "/checkout", "/order-confirmation"];

export function FloatingCartButton() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.getItemCount());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;
  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.6, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-24 right-5 z-40"
      >
        <Link
          href="/cart"
          aria-label="Open cart"
          className="relative flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-gradient-to-r from-kyuto-purple-600 to-kyuto-pink-500 text-white shadow-xl shadow-kyuto-purple-400/40 hover:shadow-2xl hover:shadow-kyuto-pink-300/50 transition-shadow"
        >
          <ShoppingBag size={18} />
          <span className="text-sm font-medium">{count}</span>
          <span className="absolute inset-0 rounded-full ring-2 ring-white/30 animate-pulse pointer-events-none" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
