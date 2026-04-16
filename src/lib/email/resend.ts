import "server-only";
import { Resend } from "resend";
import { formatCurrency } from "@/lib/utils";

const FROM = "Kyuto <onboarding@resend.dev>";

export type OrderEmailItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

export type OrderEmailAddress = {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderEmailPayload = {
  orderId: string;
  buyerEmail: string;
  items: OrderEmailItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: OrderEmailAddress;
  paymentId: string;
};

function hasResend(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY!);
}

function row(label: string, value: string) {
  return `<tr><td style="padding:4px 0;color:#6B7280;font-size:13px">${label}</td><td style="padding:4px 0;text-align:right;color:#1E1B2E;font-size:13px">${value}</td></tr>`;
}

function buildHtml(p: OrderEmailPayload, variant: "buyer" | "admin") {
  const shortId = p.orderId.slice(0, 8).toUpperCase();
  const itemRows = p.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:10px 0;color:#1E1B2E;font-size:14px">${i.name} <span style="color:#6B7280">× ${i.quantity}</span></td>
          <td style="padding:10px 0;text-align:right;color:#1E1B2E;font-size:14px">${formatCurrency(
            i.price * i.quantity
          )}</td>
        </tr>`
    )
    .join("");

  const heading =
    variant === "buyer"
      ? `Thanks for your order, ${p.address.name.split(" ")[0] || "lovely"} 💜`
      : `New order received — #${shortId}`;
  const intro =
    variant === "buyer"
      ? "We've got your order and will pack it with care. You'll hear from us again when it ships."
      : `Buyer: ${p.buyerEmail}. Payment ID: ${p.paymentId}.`;

  return `<!doctype html>
<html>
<body style="margin:0;background:#FFF8F0;font-family:Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <div style="background:#ffffff;border:1px solid #F3E8FF;border-radius:16px;padding:28px">
      <h1 style="margin:0 0 6px 0;font-size:22px;color:#1E1B2E">${heading}</h1>
      <p style="margin:0 0 18px 0;color:#6B7280;font-size:14px">${intro}</p>
      <p style="margin:0 0 4px 0;color:#6B7280;font-size:12px">Order ID</p>
      <p style="margin:0 0 20px 0;font-family:monospace;color:#1E1B2E;font-size:14px">#${shortId}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #F3E8FF;margin-top:8px">
        ${itemRows}
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #F3E8FF;margin-top:12px;padding-top:12px">
        ${row("Subtotal", formatCurrency(p.subtotal))}
        ${p.discount > 0 ? row("Discount", `-${formatCurrency(p.discount)}`) : ""}
        ${row("Shipping", p.shipping === 0 ? "Free" : formatCurrency(p.shipping))}
        <tr><td style="padding:10px 0 0 0;color:#1E1B2E;font-size:15px;font-weight:600;border-top:1px solid #F3E8FF">Total</td><td style="padding:10px 0 0 0;text-align:right;color:#1E1B2E;font-size:15px;font-weight:600;border-top:1px solid #F3E8FF">${formatCurrency(
          p.total
        )}</td></tr>
      </table>

      <div style="margin-top:22px;padding-top:18px;border-top:1px solid #F3E8FF">
        <p style="margin:0 0 6px 0;color:#6B7280;font-size:12px">Shipping to</p>
        <p style="margin:0;color:#1E1B2E;font-size:13px;line-height:1.5">
          ${p.address.name}<br/>
          ${p.address.line1}${p.address.line2 ? `, ${p.address.line2}` : ""}<br/>
          ${p.address.city}, ${p.address.state} ${p.address.pincode}<br/>
          ${p.address.phone}
        </p>
      </div>
    </div>
    <p style="text-align:center;color:#6B7280;font-size:11px;margin-top:18px">Kyuto · made with care</p>
  </div>
</body>
</html>`;
}

export async function sendOrderEmails(p: OrderEmailPayload) {
  if (!hasResend()) {
    console.warn("[email] RESEND_API_KEY not set — skipping order emails");
    return;
  }
  const client = getClient();
  const shortId = p.orderId.slice(0, 8).toUpperCase();

  const results = await Promise.allSettled([
    client.emails.send({
      from: FROM,
      to: p.buyerEmail,
      subject: `Your Kyuto order #${shortId}`,
      html: buildHtml(p, "buyer"),
    }),
    process.env.ORDER_NOTIFY_EMAIL
      ? client.emails.send({
          from: FROM,
          to: process.env.ORDER_NOTIFY_EMAIL,
          subject: `🛍️ New order #${shortId} — ${formatCurrency(p.total)}`,
          html: buildHtml(p, "admin"),
        })
      : Promise.resolve(null),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(
        `[email] ${i === 0 ? "buyer" : "admin"} email failed:`,
        r.reason
      );
    }
  });
}
