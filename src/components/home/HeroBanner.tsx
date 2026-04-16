import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-kyuto-purple-300/40 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-kyuto-pink-200/60 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
        <p className="font-hand text-2xl sm:text-3xl text-kyuto-purple-700 mb-4">
          welcome to the world of Kyuto
        </p>
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl leading-tight text-kyuto-dark">
          Where Art Meets{" "}
          <span className="bg-gradient-to-r from-kyuto-purple-700 to-kyuto-pink-500 bg-clip-text text-transparent">
            Aroma
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-kyuto-grey">
          Handcrafted candles, ceramic cups, tea-pots & curated gift hampers —
          designed to turn your everyday into a soft ritual.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">Explore Collections</Button>
          </Link>
          <Link href="/customize-candle">
            <Button size="lg" variant="outline">
              Customize a Candle
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
