import { Mail, MessageCircle, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Contact",
  description: "Drop us a note — we read every message.",
};

export default function ContactPage() {
  return (
    <div className="bg-gradient-section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto">
          <p className="font-hand text-xl text-kyuto-pink-600">say hello</p>
          <h1 className="font-heading text-4xl sm:text-4xl text-kyuto-dark mt-2">
            We&apos;d love to hear from you!
          </h1>
          <p className="mt-4 text-kyuto-grey">
            Questions, feedback, or just want to chat about products? Drop us a
            note and we&apos;ll reply within a day or two.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-kyuto-pink-100/60">
            <ContactForm />
          </div>

          <aside className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-kyuto-pink-100/60">
              <Mail className="text-kyuto-purple-700" size={18} />
              <p className="font-heading text-lg text-kyuto-dark mt-2">
                Email us
              </p>
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="text-sm text-kyuto-purple-700 hover:underline"
              >
                {SITE.supportEmail}
              </a>
              <p className="text-xs text-kyuto-grey mt-1">
                For orders, returns & partnerships.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-kyuto-pink-100/60">
              <MessageCircle className="text-kyuto-pink-600" size={18} />
              <p className="font-heading text-lg text-kyuto-dark mt-2">
                WhatsApp
              </p>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-kyuto-purple-700 hover:underline"
              >
                +{SITE.whatsapp}
              </a>
              <p className="text-xs text-kyuto-grey mt-1">
                Mon–Sat · 10am–7pm IST
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-kyuto-pink-100/60">
              <MapPin className="text-kyuto-purple-700" size={18} />
              <p className="font-heading text-lg text-kyuto-dark mt-2">
                Studio
              </p>
              <p className="text-sm text-kyuto-grey">
                Kyuto
                <br />
                Sarath City Capital Mall, Hyderabad 500084
                <br />
                India
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
