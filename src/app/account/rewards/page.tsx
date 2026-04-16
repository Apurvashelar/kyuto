import { Gift, Sparkles } from "lucide-react";

export const metadata = { title: "Rewards" };

export default function RewardsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Gift size={20} className="text-kyuto-purple-700" />
        <h2 className="font-heading text-2xl text-kyuto-dark">Kyuto Rewards</h2>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-kyuto-pink-50 via-white to-kyuto-purple-50 border border-kyuto-pink-100/60 p-8 sm:p-10 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Sparkles className="text-kyuto-pink-500" size={24} />
        </div>
        <p className="font-hand text-2xl text-kyuto-pink-600 mt-4">
          something sweet is brewing
        </p>
        <h3 className="font-heading text-2xl sm:text-3xl text-kyuto-dark mt-1">
          Our loyalty programme is coming soon
        </h3>
        <p className="text-sm text-kyuto-grey mt-3 max-w-md mx-auto">
          Earn Kyuto coins on every order, unlock exclusive drops, and get
          birthday treats. Orders placed before launch will be rewarded
          retroactively — so keep shopping.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { label: "Earn", text: "1 coin for every ₹10 spent" },
          { label: "Redeem", text: "Flat discounts on future orders" },
          { label: "Unlock", text: "Early access to seasonal drops" },
        ].map((t) => (
          <div
            key={t.label}
            className="p-4 rounded-xl border border-kyuto-purple-100 bg-kyuto-pastel-cream"
          >
            <p className="text-xs uppercase tracking-wide text-kyuto-grey">
              {t.label}
            </p>
            <p className="text-sm text-kyuto-dark mt-1">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
