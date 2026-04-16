export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-4 text-kyuto-dark/90 text-[15px] leading-relaxed">
      <h1 className="font-heading text-3xl text-kyuto-dark">Privacy Policy</h1>
      <p className="text-sm text-kyuto-grey">Last updated: 2026-04-01</p>

      <p>
        Kyuto respects your privacy. This policy explains what we collect and
        how we use it.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        What we collect
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Contact details you share when placing an order or enquiry</li>
        <li>Shipping addresses and order history</li>
        <li>Basic analytics (aggregated and anonymized)</li>
      </ul>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        How we use it
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>To fulfil orders and send order updates</li>
        <li>To respond to your messages</li>
        <li>To send you occasional updates (only if you opt in)</li>
      </ul>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Who we share it with
      </h2>
      <p>
        Only service providers we need to run Kyuto - payment processors,
        shipping partners, email tools. We never sell your data.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Your rights
      </h2>
      <p>
        You can ask us to access, correct, or delete your data at any time by
        writing to kyuto.asthetics@gmail.com. We reply within 7 days.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">Cookies</h2>
      <p>
        We use cookies to remember your cart and improve the experience. You
        can clear them from your browser any time.
      </p>
    </div>
  );
}
