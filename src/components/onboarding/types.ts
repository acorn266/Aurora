import type { ContrastLevel, DepthLevel, UndertoneGuess } from "../../lib/seasonEngine";
import type { StyleProfile } from "../../data/profile";

/** What both the photo path and the quiz path produce, before we classify a season. */
export type DraftReadout = {
  faceShape: StyleProfile["faceShape"];
  faceShapeConfident: boolean;
  hairLabel: string;   // e.g. "Dark brown"
  skinLabel: string;   // e.g. "Medium, warm"
  undertone: UndertoneGuess;
  contrast: ContrastLevel;
  depth: DepthLevel;
};
