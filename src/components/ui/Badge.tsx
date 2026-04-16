import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "sale" | "new" | "muted" | "warning";
  className?: string;
};

const variantStyles = {
  default: "bg-kyuto-purple-100 text-kyuto-purple-800",
  sale: "bg-kyuto-pink-500 text-white",
  new: "bg-kyuto-purple-600 text-white",
  muted: "bg-kyuto-grey/10 text-kyuto-grey",
  warning: "bg-amber-100 text-amber-800",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
