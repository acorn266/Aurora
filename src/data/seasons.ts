// Engine targets + palettes for every season the classifier can land on.
// Warm Autumn's numbers match the original hardcoded profile; the other
// three are standard colour-analysis positions expressed in the same
// -1..1 / 0..1 scales the matching engine already uses.

import type { Season } from "./profile";

export type SeasonData = {
  label: Season;
  blurb: string;          // one-line "why this season" description
  targetWarmth: number;    // -1..1
  targetLightness: number; // 0..1
  targetContrast: number;  // 0..1
  loved: string[];
  avoided: string[];
};

export const SEASONS: Season[] = ["Warm Autumn", "Soft Summer", "Bright Winter", "Light Spring"];

export const SEASON_DATA: Record<Season, SeasonData> = {
  "Warm Autumn": {
    label: "Warm Autumn",
    blurb: "Warm undertone with deeper, muted natural colouring — rich earth tones read as harmonious, icy or highly cool shades read as draining.",
    targetWarmth: 0.5,
    targetLightness: 0.42,
    targetContrast: 0.42,
    loved: ["terracotta", "olive", "gold", "cream", "rust", "camel", "burgundy"],
    avoided: ["ice blue", "fuchsia", "silver", "slate"],
  },
  "Soft Summer": {
    label: "Soft Summer",
    blurb: "Cool-neutral undertone with soft, low-contrast colouring — muted, dusty shades stay harmonious where saturated or very warm colours overpower.",
    targetWarmth: -0.15,
    targetLightness: 0.56,
    targetContrast: 0.26,
    loved: ["sage", "mauve", "slate", "blush", "denim", "stone", "plum"],
    avoided: ["rust", "mustard", "black", "fuchsia"],
  },
  "Bright Winter": {
    label: "Bright Winter",
    blurb: "Cool undertone with high natural contrast — clear, saturated colours match your own contrast, while muted or warm-muddy shades wash you out.",
    targetWarmth: -0.1,
    targetLightness: 0.36,
    targetContrast: 0.74,
    loved: ["fuchsia", "emerald", "navy", "ice blue", "silver", "black", "white"],
    avoided: ["mustard", "camel", "sage", "cream"],
  },
  "Light Spring": {
    label: "Light Spring",
    blurb: "Warm undertone with light, delicate natural colouring — clear, warm-light shades stay in harmony, while heavy or very dark colours overwhelm.",
    targetWarmth: 0.35,
    targetLightness: 0.64,
    targetContrast: 0.3,
    loved: ["cream", "gold", "sage", "blush", "camel", "mustard"],
    avoided: ["black", "charcoal", "navy", "plum"],
  },
};
