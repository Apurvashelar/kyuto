import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata = {
  title: "Journal",
  description: "Notes from the Kyuto studio — on scent, slow living, and craft.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <div className="bg-gradient-section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <p className="font-hand text-xl text-kyuto-pink-600">the kyuto journal</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-kyuto-dark mt-1">
            Notes from the studio
          </h1>
          <p className="mt-4 text-kyuto-grey max-w-xl mx-auto">
            Slow thoughts on craft, home, and living with a little more intention.
          </p>
        </div>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="mt-12 grid md:grid-cols-2 gap-6 p-3 rounded-2xl bg-white border border-kyuto-pink-100/60 hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-wide text-kyuto-pink-600">
                Ceramics
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl text-kyuto-dark mt-2">
                {featured.title}
              </h2>
              <p className="text-sm text-kyuto-grey mt-3">
                {featured.excerpt}
              </p>
              <p className="text-xs text-kyuto-grey mt-4">
                {featured.author} · {featured.readTime} read
              </p>
            </div>
          </Link>
        )}

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl overflow-hidden bg-white border border-kyuto-pink-100/60 hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-kyuto-purple-50">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-kyuto-pink-600">
                  {p.tags[0]}
                </p>
                <h3 className="font-heading text-lg text-kyuto-dark mt-1">
                  {p.title}
                </h3>
                <p className="text-sm text-kyuto-grey mt-2 line-clamp-2">
                  {p.excerpt}
                </p>
                <p className="text-xs text-kyuto-grey mt-3">
                  {p.readTime} read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
