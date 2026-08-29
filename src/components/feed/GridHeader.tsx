import { Heart, SlidersHorizontal } from "lucide-react";

export type Sort = "match" | "contrast" | "warmth" | "newest";

const LABELS: Record<Sort, string> = {
  match: "Best match",
  contrast: "Highest contrast",
  warmth: "Warmest palette",
  newest: "Newest",
};

export default function GridHeader({
  count,
  savedCount,
  sort,
  onSort,
}: {
  count: number;
  savedCount: number;
  sort: Sort;
  onSort: (sort: Sort) => void;
}) {
  return (
    <div className="mb-7 flex flex-col gap-5 border-b border-line/70 pb-6 pt-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">The edit</p>
        <h2 className="text-display mt-2 text-3xl text-cream sm:text-4xl">Looks that feel like you</h2>
        <p className="mt-2 text-sm text-cream/42">
          {count} {count === 1 ? "look" : "looks"} ranked by your colour harmony.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="aurora-stat-pill">
          <Heart size={13} className={savedCount ? "fill-sand-soft text-sand-soft" : ""} />
          {savedCount} saved
        </span>
        <label className="aurora-sort">
          <SlidersHorizontal size={13} />
          <select value={sort} onChange={(e) => onSort(e.target.value as Sort)}>
            {(Object.keys(LABELS) as Sort[]).map((key) => (
              <option key={key} value={key}>{LABELS[key]}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
