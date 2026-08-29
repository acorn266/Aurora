// Turns a rough undertone/contrast/hair-depth reading (from either the photo
// analysis or the quiz) into a ranked list of colour seasons with a
// confidence score — the same "distance to target" idea the outfit matcher
// already uses, just run against SEASON_DATA instead of a single outfit.

import type { Season, StyleProfile } from "../data/profile";
import { SEASON_DATA, SEASONS } from "../data/seasons";

export type UndertoneGuess = "warm" | "cool" | "neutral";
export type ContrastLevel = "low" | "medium" | "high";
export type DepthLevel = "light" | "medium" | "deep";

export type SeasonInput = {
  undertone: UndertoneGuess;
  contrast: ContrastLevel;
  depth: DepthLevel;
};

export type SeasonRanking = { season: Season; confidence: number };

const WARMTH_NUM: Record<UndertoneGuess, number> = { warm: 0.55, cool: -0.45, neutral: 0.05 };
const CONTRAST_NUM: Record<ContrastLevel, number> = { low: 0.22, medium: 0.46, high: 0.75 };
const LIGHTNESS_NUM: Record<DepthLevel, number> = { light: 0.64, medium: 0.46, deep: 0.28 };

/** Ranks every season by closeness to the given reading, most-likely first. */
/**
 * Ranks every season by closeness to the user's
 * undertone, contrast, and depth characteristics.
 *
 * The returned confidence is a MATCH SCORE, not a
 * statistical probability.
 */
export function rankSeasons(input: SeasonInput): SeasonRanking[] {
  const w = WARMTH_NUM[input.undertone];
  const c = CONTRAST_NUM[input.contrast];
  const l = LIGHTNESS_NUM[input.depth];

  const raw = SEASONS.map((season) => {
    const d = SEASON_DATA[season];

    const warmthDistance =
      Math.abs(d.targetWarmth - w);

    const contrastDistance =
      Math.abs(d.targetContrast - c);

    const lightnessDistance =
      Math.abs(d.targetLightness - l);

    const distance =
      warmthDistance * 1.0 +
      contrastDistance * 0.8 +
      lightnessDistance * 0.6;

    /*
     * Maximum theoretical distance for this weighted
     * three-dimensional space.
     *
     * Warmth:   max difference = 1.0
     * Contrast: max difference = 1.0 × 0.8
     * Lightness:max difference = 1.0 × 0.6
     *
     * Total = 2.4
     */
    const maxDistance = 2.4;

    const match =
      Math.max(
        0,
        Math.min(
          1,
          1 - distance / maxDistance,
        ),
      );

    return {
      season,
      confidence: Math.round(match * 100),
    };
  });

  return raw.sort(
    (a, b) => b.confidence - a.confidence,
  );
}

/** Human-readable "why" for the top season, referencing the actual reading. */
export function explainSeason(input: SeasonInput, season: Season): string {
  const undertoneText =
    input.undertone === "warm" ? "warm undertone" : input.undertone === "cool" ? "cool undertone" : "neutral undertone";
  const contrastText = `${input.contrast} contrast`;
  const depthText = `${input.depth === "deep" ? "deep" : input.depth === "light" ? "light" : "medium-depth"} colouring`;
  return `Your ${undertoneText} and ${contrastText} (with ${depthText}) place you closest to ${season}. ${SEASON_DATA[season].blurb}`;
}

/** Builds a full engine-ready StyleProfile once a season + personal details are confirmed. */
export function buildProfileFromSeason(
  season: Season,
  details: {
    name: string;
    initials: string;
    faceShape: StyleProfile["faceShape"];
    hair: string;
    skin: string;
    undertone: UndertoneGuess;
    contrast: ContrastLevel;
  },
): StyleProfile {
  const d = SEASON_DATA[season];
  return {
    name: details.name,
    initials: details.initials,
    season,
    undertone: details.undertone,
    contrast: details.contrast,
    faceShape: details.faceShape,
    hair: details.hair,
    skin: details.skin,
    loved: d.loved,
    avoided: d.avoided,
    targetWarmth: d.targetWarmth,
    targetLightness: d.targetLightness,
    targetContrast: d.targetContrast,
  };
}
