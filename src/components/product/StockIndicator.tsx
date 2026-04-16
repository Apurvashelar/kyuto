import { cn } from "@/lib/utils";

export function StockIndicator({ stock }: { stock: number }) {
  let label = "In Stock";
  let tone = "text-emerald-700 bg-emerald-50";

  if (stock === 0) {
    label = "Out of Stock";
    tone = "text-red-700 bg-red-50";
  } else if (stock <= 5) {
    label = `Only ${stock} left`;
    tone = "text-amber-800 bg-amber-50";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        tone
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          stock === 0
            ? "bg-red-500"
            : stock <= 5
              ? "bg-amber-500"
              : "bg-emerald-500"
        )}
      />
      {label}
    </span>
  );
}
