import { Gift, Package, Sparkles, Check } from "lucide-react";
import { CorporateEnquiryForm } from "./CorporateEnquiryForm";

export const metadata = {
  title: "Corporate Gifting",
  description:
    "Thoughtful, hand-packed corporate gift hampers from Kyuto — for teams, clients, and occasions that matter.",
};

const PERKS = [
  "Custom hampers starting at 10 units",
  "Branded notes and packaging",
  "PAN-India delivery with tracking",
  "Dedicated gifting concierge",
  "GST invoicing",
];

export default function CorporateGiftingPage() {
  return (
    <div className="bg-gradient-section">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Gift className="mx-auto text-kyuto-pink-600" size={32} />
          <p className="font-hand text-xl text-kyuto-pink-600 mt-2">
            gift with intent
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-kyuto-dark mt-1">
            Corporate Gifting
          </h1>
          <p className="mt-4 text-kyuto-grey">
            Curated gift sets for onboarding, client appreciation, Diwali,
            weddings, and everything in between. Hand-packed in our studio,
            delivered beautifully across India.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Package,
              title: "Curated hampers",
              body: "Pick from 12+ ready-to-ship sets or build one from scratch with our team.",
            },
            {
              icon: Sparkles,
              title: "Personal touches",
              body: "Branded ribbons, custom sleeves, handwritten notes — we sweat the small stuff.",
            },
            {
              icon: Gift,
              title: "Bulk pricing",
              body: "Volume discounts kick in from 25+ units. Ask us for a custom quote.",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-white border border-kyuto-pink-100/60"
              >
                <div className="w-10 h-10 rounded-full bg-kyuto-pink-50 flex items-center justify-center">
                  <Icon className="text-kyuto-pink-600" size={18} />
                </div>
                <h3 className="font-heading text-lg text-kyuto-dark mt-4">
                  {p.title}
                </h3>
                <p className="text-sm text-kyuto-grey mt-2">{p.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-kyuto-pink-100/60">
            <h2 className="font-heading text-2xl text-kyuto-dark">
              Tell us about your gift
            </h2>
            <p className="text-sm text-kyuto-grey mt-1">
              Our gifting concierge will reply within 24 hours with ideas &amp;
              a quote.
            </p>
            <div className="mt-6">
              <CorporateEnquiryForm />
            </div>
          </div>

          <aside className="p-6 rounded-2xl bg-kyuto-pink-50/60 border border-kyuto-pink-100/60 h-fit">
            <p className="font-hand text-xl text-kyuto-pink-600">
              what you get
            </p>
            <h3 className="font-heading text-xl text-kyuto-dark mt-1">
              The Kyuto promise
            </h3>
            <ul className="mt-4 space-y-2">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-kyuto-dark">
                  <Check size={16} className="text-kyuto-purple-700 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
