import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function CorporateGifting() {
  return (
    <section className="py-20 bg-kyuto-dark text-white">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-10 items-center">
        <ScrollReveal variant="slideRight">
          <p className="font-hand text-xl text-kyuto-pink-300">
            for teams, events & occasions
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
            Corporate & Bulk Gifting
          </h2>
          <p className="mt-4 text-white/70">
            From Diwali hampers for 500 employees to curated client gift boxes —
            we design, pack, and ship end-to-end.
          </p>
          <div className="mt-8">
            <Link href="/corporate-gifting">
              <Button size="lg">Enquire Now</Button>
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal variant="slideLeft" className="hidden md:block">
          <ul className="space-y-3 text-white/80 pl-5">
            <li className="relative before:absolute before:-left-5 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-kyuto-pink-400">
              Volume pricing for bulk orders
            </li>
            <li className="relative before:absolute before:-left-5 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-kyuto-pink-400">
              Custom branding & packaging
            </li>
            <li className="relative before:absolute before:-left-5 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-kyuto-pink-400">
              Personal cards for each recipient
            </li>
            <li className="relative before:absolute before:-left-5 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-kyuto-pink-400">
              Pan-India delivery via Shiprocket
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
