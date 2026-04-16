import Link from "next/link";
import { FOOTER_POLICIES } from "@/lib/constants";

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-section">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          <aside className="h-fit md:sticky md:top-24">
            <p className="font-hand text-lg text-kyuto-pink-600">the fine print</p>
            <h2 className="font-heading text-2xl text-kyuto-dark mt-1 mb-3">
              Policies
            </h2>
            <nav className="flex md:flex-col gap-1 overflow-x-auto">
              {FOOTER_POLICIES.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="px-3 py-2 rounded-lg text-sm text-kyuto-dark hover:bg-kyuto-pink-50 whitespace-nowrap"
                >
                  {p.label}
                </Link>
              ))}
            </nav>
          </aside>
          <article className="bg-white rounded-2xl border border-kyuto-pink-100/60 p-6 sm:p-10 prose prose-kyuto max-w-none">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
