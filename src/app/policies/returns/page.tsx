export const metadata = { title: "Returns Policy" };

export default function ReturnsPolicyPage() {
  return (
    <div className="space-y-4 text-kyuto-dark/90 text-[15px] leading-relaxed">
      <h1 className="font-heading text-3xl text-kyuto-dark">Returns &amp; Refunds</h1>
      <p className="text-sm text-kyuto-grey">Last updated: 2026-04-01</p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Return window
      </h2>
      <p>
        We accept returns within 7 days of delivery for unused items in their
        original packaging.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        What&apos;s not returnable
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Ceramic products that are used</li>
        <li>Custom or personalized hampers</li>
        <li>Sale items marked final</li>
      </ul>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        How to request a return
      </h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Email kyuto.asthetics@gmail.com with your order number and reason.</li>
        <li>We&apos;ll share a prepaid reverse-pickup link within 24 hours.</li>
        <li>Pack the item in its original box and hand it to the courier.</li>
        <li>
          Once we receive and inspect it, a refund is issued to your original
          payment method within 5–7 working days.
        </li>
      </ol>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">Exchanges</h2>
      <p>
        We&apos;re happy to exchange for a different product of the same or
        greater value (you pay the difference). Just write to us at kyuto.asthetics@gmail.com and we'll take care of it.
      </p>
    </div>
  );
}
