import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Leaf, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About",
  description:
    "Kyuto is a small Indian studio crafting candles, ceramics, and gift hampers with care and intention.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Made with love",
    body: "Every ceramic piece is shaped and finished by hand - made by humans, not machines.",
  },
  {
    icon: Leaf,
    title: "Thoughtful materials",
    body: "Carefully chosen ceramics, natural glazes, and mindfully sourced materials - because what goes into your home matters.",
  },
  {
    icon: Users,
    title: "Local artisans",
    body: "Rooted in Hyderabad, expanding across India - we're a homegrown brand that believes in keeping things real and close to heart.",
  },
  {
    icon: Sparkles,
    title: "Small batches",
    body: "Every collection is curated, not mass-produced - so what you pick truly feels special.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-section">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-hand text-xl text-kyuto-pink-600">our story</p>
            <h1 className="font-heading text-2xl sm:text-3xl text-kyuto-dark mt-2">
              Thoughtfully made, designed to last
            </h1>
            <p className="mt-5 text-kyuto-grey">
              Kyuto was born from curiosity, built on friendship, and fuelled by a belief that beautiful things deserve a place in every home.
              Two friends, one gap in the market, and a whole lot of heart - that's how our ceramic journey began at Sarath City Capital Mall,
              Hyderabad. The overwhelming love from our customers pushed us to dream bigger, and now we're bringing Kyuto to doorsteps across
              India. Today, we're scaling nationally through our online store, expanding our catalog with scented candles, and continuing to
              grow a brand our customers genuinely love.
            </p>
            <p className="mt-5 text-kyuto-grey">
              At Kyuto, we don't just sell ceramics - we design the feeling of home.
            </p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md max-w-sm mx-auto w-full">
            <Image
              src="https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776399316/418cf639-9232-4dc5-856e-eca62ece02c7_hkivsw.jpg"
              alt="Kyuto founders"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-36 grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776288254/Momento_de_Respirac%CC%A7a%CC%83o_gbmp6y.jpg"
              alt="Kyuto studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl text-kyuto-dark">
              A brand that listens
            </h2>
            <p className="text-kyuto-grey">
              We design for the moments that matter - morning chai in a handcrafted mug, a quiet corner made warmer by a
              flickering scented candle, a table that feels like you. Every piece in our collection is chosen with intention,
              because we believe your space should tell your story.
            </p>
            <p className="text-kyuto-grey">
              We listen to our customers deeply. It's what pushed us from one outlet in Hyderabad to homes across
              India and it's what keeps us raising the bar, one beautiful piece at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="text-center mb-10">
          <p className="font-hand text-xl text-kyuto-pink-600">what we value</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark mt-2">
            The Kyuto way
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-white border border-kyuto-pink-100/60"
              >
                <div className="w-10 h-10 rounded-full bg-kyuto-pink-50 flex items-center justify-center">
                  <Icon className="text-kyuto-pink-600" size={18} />
                </div>
                <h3 className="font-heading text-lg text-kyuto-dark mt-4">
                  {v.title}
                </h3>
                <p className="text-sm text-kyuto-grey mt-2">{v.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-kyuto-dark">
          Come say hi
        </h2>
        <p className="mt-3 text-kyuto-grey max-w-xl mx-auto">
          We love hearing from you - whether it&apos;s feedback, a custom
          request, or just a kind note. Our inbox is warm and our replies are
          real.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/contact">
            <Button>Contact us</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline">Shop the collection</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
