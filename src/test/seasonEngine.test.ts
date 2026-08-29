import { describe, expect, it } from "vitest";
import { rankSeasons, buildProfileFromSeason } from "../lib/seasonEngine";
import { SEASONS } from "../data/seasons";

describe("season classifier", () => {
  it("ranks all four seasons with confidences that sum to ~100", () => {
    const ranking = rankSeasons({ undertone: "warm", contrast: "medium", depth: "deep" });
    expect(ranking).toHaveLength(4);
    const total = ranking.reduce((sum, r) => sum + r.confidence, 0);
    expect(total).toBeGreaterThanOrEqual(98);
    expect(total).toBeLessThanOrEqual(102);
  });

  it("recovers Warm Autumn from the same reading the original hardcoded profile implies", () => {
    const ranking = rankSeasons({ undertone: "warm", contrast: "medium", depth: "deep" });
    expect(ranking[0].season).toBe("Warm Autumn");
  });

  it("recovers Bright Winter from a cool, high-contrast, deep reading", () => {
    const ranking = rankSeasons({ undertone: "cool", contrast: "high", depth: "deep" });
    expect(ranking[0].season).toBe("Bright Winter");
  });

  it("is deterministic — same input yields identical ranking", () => {
    const a = rankSeasons({ undertone: "warm", contrast: "low", depth: "light" });
    const b = rankSeasons({ undertone: "warm", contrast: "low", depth: "light" });
    expect(a).toEqual(b);
  });

  it("builds a complete, engine-ready profile for every season", () => {
    for (const season of SEASONS) {
      const profile = buildProfileFromSeason(season, {
        name: "Test",
        initials: "T",
        faceShape: "oval",
        hair: "medium brown",
        skin: "medium",
        undertone: "warm",
        contrast: "medium",
      });
      expect(profile.season).toBe(season);
      expect(profile.loved.length).toBeGreaterThan(0);
      expect(typeof profile.targetWarmth).toBe("number");
    }
  });
});
