export type ParsedSize = {
  height?: string;
  rimDiameter?: string;
  capacity?: string;
};

/**
 * Parses a free-form size string like
 *   "HEIGHT: 3.2 inches RIM DIAMETER: 3 inches CAPACITY: 250 ML"
 * into structured values. Labels may appear in any order, case-insensitive,
 * and may be separated by spaces, commas, or newlines.
 */
export function parseSizeString(input: string | undefined): ParsedSize {
  if (!input) return {};
  const out: ParsedSize = {};
  // Split on the known label boundaries. re has a capture group → labels land
  // at odd indices, values (the text that follows each label) at even indices.
  const re = /(HEIGHT|RIM\s*DIAMETER|CAPACITY)\s*:\s*/gi;
  const parts = input.split(re);
  for (let i = 1; i < parts.length; i += 2) {
    const label = parts[i].replace(/\s+/g, " ").toUpperCase();
    const value = (parts[i + 1] ?? "").trim().replace(/[,;]$/, "").trim();
    if (!value) continue;
    if (label === "HEIGHT") out.height = value;
    else if (label === "RIM DIAMETER") out.rimDiameter = value;
    else if (label === "CAPACITY") out.capacity = value;
  }
  return out;
}
