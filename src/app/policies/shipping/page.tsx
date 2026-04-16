export const metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <div className="space-y-4 text-kyuto-dark/90 text-[15px] leading-relaxed">
      <h1 className="font-heading text-3xl text-kyuto-dark">Shipping Policy</h1>
      <p className="text-sm text-kyuto-grey">Last updated: 2026-04-01</p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Processing time
      </h2>
      <p>
        Orders are packed and dispatched from our Hyderabad outlet within 2 working days. 
        Gift hampers and customised pieces may take up to 5 working days.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Delivery timelines
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Metros (Mumbai, Delhi, Bangalore, Pune, Hyderabad): 2–4 days</li>
        <li>Other tier-1 &amp; tier-2 cities: 3–6 days</li>
        <li>Remote pincodes: 5–8 days</li>
      </ul>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Shipping charges
      </h2>
      <p>
        Free shipping on all orders above ₹999. A flat ₹80 is charged on orders
        below. COD is available on eligible pincodes for a small extra fee.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">Tracking</h2>
      <p>
        You&apos;ll receive an email and WhatsApp message with a tracking link
        as soon as your order ships. You can also track from your account under
        My Orders.
      </p>

      <h2 className="font-heading text-xl text-kyuto-dark mt-6">
        Damaged in transit
      </h2>
      <p>
        If anything arrives broken, email a photo to hello@kyuto.in within 48
        hours of delivery and we&apos;ll replace it free of charge.
      </p>
    </div>
  );
}
