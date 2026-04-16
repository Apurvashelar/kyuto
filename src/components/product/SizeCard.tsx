import { parseSizeString } from "@/lib/products/parseSize";

export function SizeCard({ size }: { size: string | undefined }) {
  const parsed = parseSizeString(size);
  const rows: { label: string; value: string }[] = [];
  if (parsed.height) rows.push({ label: "Height", value: parsed.height });
  if (parsed.rimDiameter)
    rows.push({ label: "Rim Diameter", value: parsed.rimDiameter });
  if (parsed.capacity) rows.push({ label: "Capacity", value: parsed.capacity });

  if (rows.length === 0) return null;

  return (
    <p className="text-[11px] font-normal text-kyuto-purple-400 flex flex-wrap items-center gap-x-2 gap-y-1">
      {rows.map((r, i) => (
        <span key={r.label} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-kyuto-purple-300">|</span>}
          <span>
            {r.label}: {r.value}
          </span>
        </span>
      ))}
    </p>
  );
}
