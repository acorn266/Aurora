// Client-side-only "AI analysis": the photo never leaves the browser.
//
// Skin undertone, hair depth, and contrast are genuinely computed by
// sampling pixels from the uploaded image and running them through the same
// warmth()/lightness() maths the outfit-matching engine already uses — this
// is real signal, not a mock.
//
// Face shape genuinely requires a face-landmark model (e.g. face-api.js /
// mediapipe) that this lightweight build doesn't include. Rather than fake
// a number, we return a placeholder and flag it low-confidence — the
// onboarding UI always routes it through the "is this correct? / edit" step.

import { lightness, warmth } from "./color";
import type { ContrastLevel, DepthLevel, UndertoneGuess } from "./seasonEngine";

export type PhotoEstimate = {
  skinHex: string;
  hairHex: string;
  undertone: UndertoneGuess;
  contrast: ContrastLevel;
  depth: DepthLevel;
  faceShape: "oval" | "round" | "square" | "heart" | "oblong";
  faceShapeConfident: false; // always false — see note above
};

function averageHex(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): string {
  const { data } = ctx.getImageData(Math.max(0, x), Math.max(0, y), Math.max(1, w), Math.max(1, h));
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
  }
  n = Math.max(1, n);
  const toHex = (v: number) => Math.round(v / n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function estimateHairHex(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
): string {
  /*
   * Look around the upper part of the image,
   * but ignore very bright pixels that are likely
   * to belong to the background.
   */

  const x = Math.floor(w * 0.25);
  const y = Math.floor(h * 0.08);
  const width = Math.floor(w * 0.5);
  const height = Math.floor(h * 0.22);

  const { data } = ctx.getImageData(
    x,
    y,
    Math.max(1, width),
    Math.max(1, height),
  );

  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const brightness =
      0.299 * red +
      0.587 * green +
      0.114 * blue;

    // Ignore very bright background pixels.
    if (brightness > 175) {
      continue;
    }

    r += red;
    g += green;
    b += blue;
    n++;
  }

  // If there aren't enough dark pixels,
  // fall back to the old region.
  if (n < 50) {
    return averageHex(
      ctx,
      w * 0.3,
      h * 0.04,
      w * 0.4,
      h * 0.1,
    );
  }

  const toHex = (value: number) =>
    Math.round(value / n)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function analyzePhoto(img: HTMLImageElement): PhotoEstimate {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);

  const w = canvas.width;
  const h = canvas.height;

  // Heuristic regions assuming a roughly centred, front-facing selfie:
  // cheek/jaw band in the lower-middle third for skin, a strip across the
  // very top of the frame for hair.
  const skinHex = averageHex(ctx, w * 0.38, h * 0.42, w * 0.24, h * 0.14);
  const hairHex = estimateHairHex(ctx, w, h); 
  const skinWarmth = warmth(skinHex);
  const skinLight = lightness(skinHex);
  const hairLight = lightness(hairHex);

  const undertone: UndertoneGuess = skinWarmth > 0.06 ? "warm" : skinWarmth < -0.06 ? "cool" : "neutral";

  const contrastRaw = Math.abs(skinLight - hairLight);
  const contrast: ContrastLevel = contrastRaw > 0.32 ? "high" : contrastRaw > 0.15 ? "medium" : "low";

  const depth: DepthLevel = hairLight > 0.55 ? "light" : hairLight > 0.32 ? "medium" : "deep";

  return {
    skinHex,
    hairHex,
    undertone,
    contrast,
    depth,
    faceShape: "oval",
    faceShapeConfident: false,
  };
}

/** Loads a File into an <img> element so canvas can read its pixels. */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
