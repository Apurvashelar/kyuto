import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="bg-gradient-section">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-kyuto-purple-700 hover:underline"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-kyuto-pink-600">
            {post.tags.join(" · ")}
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl text-kyuto-dark mt-2">
            {post.title}
          </h1>
          <p className="text-sm text-kyuto-grey mt-3">
            {post.author} ·{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            · {post.readTime} read
          </p>
        </div>

        <div className="relative aspect-[16/9] mt-8 rounded-2xl overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            priority
            className="object-cover"
          />
        </div>

        <div className="prose prose-kyuto mt-8 space-y-5 text-kyuto-dark/90 leading-relaxed">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i} className="text-[15px]">
              {para}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
