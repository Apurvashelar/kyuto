"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useUIStore } from "@/stores/uiStore";

export function MobileNav() {
  const { mobileNavOpen, setMobileNav } = useUIStore();

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNav(false)}
            className="fixed inset-0 z-40 bg-kyuto-dark/40 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-gradient-kyuto shadow-2xl md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-kyuto-purple-200/60">
              <Image
                src="/kyuto-logo.png"
                alt="Kyuto"
                width={120}
                height={120}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setMobileNav(false)}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-white/40 transition-colors"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileNav(false)}
                      className="block px-4 py-3 text-lg font-medium text-kyuto-dark rounded-xl hover:bg-white/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ul className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-kyuto-pink-200 pl-3">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileNav(false)}
                              className="block px-3 py-2 text-sm text-kyuto-dark/80 rounded-lg hover:bg-white/60 hover:text-kyuto-pink-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href="/account"
                    onClick={() => setMobileNav(false)}
                    className="block px-4 py-3 text-lg font-medium text-kyuto-dark rounded-xl hover:bg-white/60 transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/wishlist"
                    onClick={() => setMobileNav(false)}
                    className="block px-4 py-3 text-lg font-medium text-kyuto-dark rounded-xl hover:bg-white/60 transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-5 border-t border-kyuto-purple-200/60">
              <p className="font-hand text-kyuto-purple-700 text-lg">
                Where art meets aroma.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
