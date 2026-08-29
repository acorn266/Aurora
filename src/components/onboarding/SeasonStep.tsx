import { useMemo, useState } from "react";
import { Check, RotateCw } from "lucide-react";
import type { StyleProfile } from "../../data/profile";
import { SEASON_DATA } from "../../data/seasons";
import { buildProfileFromSeason, explainSeason, rankSeasons } from "../../lib/seasonEngine";
import { hexForName } from "../../lib/color";
import type { DraftReadout } from "./types";

export default function SeasonStep({
  draft,
  onComplete,
  onBack,
}: {
  draft: DraftReadout;
  onComplete: (p: StyleProfile) => void;
  onBack: () => void;
}) {
  const ranking = useMemo(() => rankSeasons(draft), [draft]);
  const [pickIndex, setPickIndex] = useState(0);

  const pick = ranking[pickIndex];
  const data = SEASON_DATA[pick.season];
  const reasoning = explainSeason(draft, pick.season);

  function confirm() {
    const profile = buildProfileFromSeason(pick.season, {
      name: "",
      initials: "Y",
      faceShape: draft.faceShape,
      hair: draft.hairLabel.toLowerCase(),
      skin: draft.skinLabel.toLowerCase(),
      undertone: draft.undertone,
      contrast: draft.contrast,
    });
    onComplete(profile);
  }

  function tryAnother() {
    setPickIndex((i) => (i + 1) % ranking.length);
  }

  return (
    <div>
      <button onClick={onBack} className="tag mb-6 text-cream/40 hover:text-cream/70">
        ← Start over
      </button>

      <p className="eyebrow">Your colour analysis</p>
      <p className="mt-3 text-sm text-cream/60">
        Aurora sees: <span className="text-cream">{draft.undertone} undertone + {draft.contrast} contrast + {draft.depth} hair</span>
      </p>

      <div className="mt-5 border border-gold/30 bg-brand-gray/60 p-5">
        <p className="tag">Most likely season</p>
        <div className="mt-1.5 flex items-baseline justify-between">
          <h2 className="text-display text-3xl text-gold-soft">{pick.season}</h2>
          <span className="text-sm text-cream/55">Match: {pick.confidence}%</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {data.loved.slice(0, 7).map((name) => (
            <span
              key={name}
              className="flex items-center gap-1.5 border border-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-cream/70"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: hexForName(name) }} />
              {name}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <p className="eyebrow">Why?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-cream/75">{reasoning}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button onClick={confirm} className="btn-gold h-11 flex-1 text-sm">
          <Check size={15} /> This looks right
        </button>
        <button onClick={tryAnother} className="btn-ghost h-11 flex-1 text-sm">
          <RotateCw size={14} /> Try another season
        </button>
      </div>
    </div>
  );
}
