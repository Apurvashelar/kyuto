import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function CandleCustomizer() {
  return (
    <section className="relative py-20 bg-gradient-kyuto overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-10 h-24 w-24 rounded-full bg-kyuto-pink-300/40 blur-2xl animate-float" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-28 w-28 rounded-full bg-kyuto-purple-300/40 blur-2xl animate-float-delayed" />
      <div className="mx-auto max-w-4xl px-6 text-center relative">
        <ScrollReveal>
          <p className="font-hand text-2xl text-kyuto-purple-700">
            your scent, your colour, your story
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-5xl text-kyuto-dark">
            Customize Your Candle
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-kyuto-grey">
            Choose your fragrance, tint, and vessel — we&apos;ll pour it just
            for you and wrap it like a little secret.
          </p>
          <div className="mt-8">
            <Link href="/customize-candle">
              <Button size="lg">Start Customizing</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
