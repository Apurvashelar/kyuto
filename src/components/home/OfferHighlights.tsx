import { Gift, RefreshCw, Truck } from "lucide-react";

const highlights = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders above ₹1299",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    subtitle: "Within 7 days of delivery",
  },
  {
    icon: Gift,
    title: "Handcrafted",
    subtitle: "Made with love in India",
  },
];

export function OfferHighlights() {
  return (
    <section className="bg-kyuto-pastel-cream border-y border-kyuto-purple-100">
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="flex items-center gap-4 justify-center sm:justify-start"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-sm text-kyuto-purple-600">
              <h.icon size={20} />
            </div>
            <div>
              <p className="font-heading text-base text-kyuto-purple-800 leading-tight">
                {h.title}
              </p>
              <p className="text-sm text-kyuto-grey">{h.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
