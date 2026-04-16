import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ComingSoon({
  title,
  subtitle,
  milestone,
}: {
  title: string;
  subtitle?: string;
  milestone: string;
}) {
  return (
    <div className="bg-gradient-section min-h-[60vh]">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-hand text-xl text-kyuto-pink-600">{milestone}</p>
        <h1 className="mt-2 font-heading text-3xl sm:text-5xl text-kyuto-dark">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-kyuto-grey max-w-md mx-auto">{subtitle}</p>
        )}
        <Link href="/" className="inline-block mt-8">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
