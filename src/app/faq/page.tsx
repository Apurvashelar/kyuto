import { HelpCircle } from "lucide-react";
import { FAQAccordion } from "./FAQAccordion";

export const metadata = {
  title: "FAQ",
  description: "Answers to things people often ask about Kyuto.",
};

const FAQ_SECTIONS = [
  {
    title: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Most orders ship within 2 working days and arrive in 3–7 days across India. Metros are typically faster (2–4 days).",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes — orders above ₹999 ship free. Under that, shipping is a flat ₹80 anywhere in India.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. You'll receive a tracking link over email and WhatsApp once your order ships, or check it from the Track Order page.",
      },
      {
        q: "Do you deliver internationally?",
        a: "Not yet — we currently ship within India only. Join our newsletter to hear when we launch internationally.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What's your return policy?",
        a: "We accept returns within 7 days of delivery for unused items in original packaging. Candles, once burnt, can't be returned for safety reasons.",
      },
      {
        q: "How do I start a return?",
        a: "Email hello@kyuto.in with your order number and we'll send a prepaid pickup link.",
      },
      {
        q: "Do you replace damaged items?",
        a: "Yes — if anything arrives broken, send a photo within 48 hours and we'll replace it for free.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        q: "Are your candles made from soy wax?",
        a: "Yes. All Kyuto candles are hand-poured with premium soy wax, cotton wicks, and phthalate-free fragrance oils.",
      },
      {
        q: "How long do the candles burn?",
        a: "Our standard 200g candles burn for approximately 40 hours and larger vessels for up to 70.",
      },
      {
        q: "Are the ceramics microwave-safe?",
        a: "All our stoneware is microwave and dishwasher safe unless noted otherwise on the product page.",
      },
      {
        q: "Can I customize a candle or hamper?",
        a: "Yes — head to the Customize your Candle page or drop us a note for bulk orders and we'll work with you.",
      },
    ],
  },
  {
    title: "Gifting & Corporate",
    items: [
      {
        q: "Do you offer gift wrapping?",
        a: "Every Kyuto order is packed beautifully by default. For special occasions, you can add a handwritten note at checkout.",
      },
      {
        q: "Do you do bulk / corporate orders?",
        a: "Yes, and we love them. Visit our Corporate Gifting page to request a catalogue and quote.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-gradient-section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <HelpCircle className="mx-auto text-kyuto-purple-700" size={28} />
          <p className="font-hand text-xl text-kyuto-pink-600 mt-2">
            common questions
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-kyuto-dark mt-1">
            Frequently asked
          </h1>
          <p className="mt-4 text-kyuto-grey">
            Can&apos;t find what you&apos;re looking for? Email us at
            kyuto.asthetic@gail.com - we reply within a day.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-2xl text-kyuto-dark mb-3">
                {section.title}
              </h2>
              <FAQAccordion items={section.items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
