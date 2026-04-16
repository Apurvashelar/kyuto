"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import {
  FOOTER_POLICIES,
  FOOTER_QUICK_LINKS,
  SITE,
} from "@/lib/constants";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5A11.5 11.5 0 0 0 7.6 22.6c-.1-.9-.2-2.3 0-3.3l1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.6 2 1.6 2 2 0 3.5-2.1 3.5-5 0-2.6-1.9-4.5-4.6-4.5a4.8 4.8 0 0 0-5 4.8c0 1 .4 2 .8 2.6.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.6-2.1-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.7-2.4 6.7-5.7 6.7-1.1 0-2.1-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.1-1.4 2.9A11.5 11.5 0 1 0 12 .5Z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    console.log("[newsletter] signup:", email);
    setTimeout(() => {
      setStatus("sent");
      setEmail("");
    }, 600);
  }

  return (
    <footer className="bg-kyuto-dark text-white/90 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Image
              src="/kyuto-logo.png"
              alt={SITE.name}
              width={160}
              height={160}
              className="h-16 w-auto"
            />
            <p className="font-hand text-xl text-kyuto-pink-200">
              {SITE.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-kyuto-pink-500 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href={SITE.pinterest}
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="p-2 rounded-full bg-white/10 hover:bg-kyuto-pink-500 transition-colors"
              >
                <PinterestIcon />
              </a>
              <a
                href={`mailto:${SITE.supportEmail}`}
                aria-label="Email"
                className="p-2 rounded-full bg-white/10 hover:bg-kyuto-pink-500 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-kyuto-pink-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-white">Policies</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_POLICIES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-kyuto-pink-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-2 text-white">
              Join Kyuto Family
            </h4>
            <p className="text-sm text-white/70 mb-4">
              Get 10% off on your first order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-kyuto-pink-400"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-kyuto-purple-500 to-kyuto-pink-500 text-white font-medium hover:shadow-lg hover:shadow-kyuto-pink-500/30 transition-shadow disabled:opacity-60"
              >
                {status === "sent"
                  ? "Subscribed ✨"
                  : status === "submitting"
                    ? "Subscribing…"
                    : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Kyuto. All rights reserved.</p>
          <p className="font-hand text-base text-white/70">
            Crafted with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
