"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/Button";

export function WelcomePopup() {
  const welcomePopupSeen = useUIStore((s) => s.welcomePopupSeen);
  const markWelcomeSeen = useUIStore((s) => s.markWelcomeSeen);
  const applyCoupon = useCartStore((s) => s.applyCoupon);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (welcomePopupSeen) return;
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, [welcomePopupSeen]);

  function dismiss() {
    setOpen(false);
    markWelcomeSeen();
  }

  function claim() {
    applyCoupon("WELCOME10", 10);
    dismiss();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-kyuto-dark/40 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ y: 20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-kyuto-pink-50 via-white to-kyuto-purple-50 border border-kyuto-pink-100 shadow-2xl p-8 text-center overflow-hidden"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/70 text-kyuto-grey"
            >
              <X size={18} />
            </button>

            <h2 className="font-heading text-xl text-kyuto-dark leading-snug">
              Welcome to the world of Kyuto!
            </h2>
            <p className="font-hand text-base text-kyuto-pink-600 mt-3">
              a little something for your first visit
            </p>
            <p className="mt-6 text-xs text-kyuto-grey">
              Enjoy <strong className="text-kyuto-dark">10% off</strong> your
              first order with code
            </p>
            <div className="mt-3 mx-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border-2 border-dashed border-kyuto-pink-300 font-mono text-sm tracking-widest text-kyuto-pink-600 font-semibold">
              WELCOME10
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/shop" onClick={claim} className="flex-1 w-full">
                <Button className="w-full" size="sm">
                  Claim & Shop Now
                </Button>
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="flex-1 text-xs text-kyuto-grey hover:text-kyuto-dark transition-colors py-2"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
