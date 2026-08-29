import { useEffect, useMemo, useState } from "react";
import Nav from "./components/feed/Nav";
import Hero from "./components/feed/Hero";
import GridHeader, { type Sort } from "./components/feed/GridHeader";
import OutfitGrid, { type ScoredOutfit } from "./components/feed/OutfitGrid";
import UploadModal from "./components/feed/UploadModal";
import DetailDrawer from "./components/feed/DetailDrawer";
import Onboarding from "./components/onboarding/Onboarding";
import { CATEGORIES, outfits } from "./data/outfits";
import { useProfile } from "./state/ProfileContext";
import { analyseOutfit } from "./lib/colorTheory";

type Category = (typeof CATEGORIES)[number];
const SAVED_KEY = "aurora.saved";

export default function App() {
  const { profile, hasOnboarded, resetOnboarding } = useProfile();
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<Sort>("match");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [detail, setDetail] = useState<ScoredOutfit | null>(null);
  const [saved, setSaved] = useState<Set<string>>(() => {
    try {
      return new Set<string>(JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]"));
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify([...saved]));
  }, [saved]);

  const scored = useMemo<ScoredOutfit[]>(
    () => outfits.map((outfit) => ({ outfit, analysis: analyseOutfit(outfit, profile) })),
    [profile],
  );

  const visible = useMemo(() => {
    const order = outfits.map((o) => o.id);
    const list = scored.filter(
      ({ outfit }) =>
        category === "All" || outfit.category === category,
    );

    const sorters: Record<Sort, (a: ScoredOutfit, b: ScoredOutfit) => number> = {
      match: (a, b) => b.analysis.matchScore - a.analysis.matchScore,
      contrast: (a, b) => b.analysis.contrast - a.analysis.contrast,
      warmth: (a, b) => b.analysis.warmthAvg - a.analysis.warmthAvg,
      newest: (a, b) => order.indexOf(a.outfit.id) - order.indexOf(b.outfit.id),
    };

    return [...list].sort(sorters[sort]);
  }, [scored, category, sort]);

  

  const toggleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (!hasOnboarded) return <Onboarding />;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav
        category={category}
        onCategory={setCategory}
        onUpload={() => setUploadOpen(true)}
        onAvatarClick={resetOnboarding}
      />

      <main>
        <Hero />

        <section id="looks" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <GridHeader
            count={visible.length}
            savedCount={saved.size}
            sort={sort}
            onSort={setSort}
          />
          <OutfitGrid
            items={visible}
            saved={saved}
            onToggleSave={toggleSave}
            onOpen={setDetail}
          />
        </section>
      </main>

      <footer className="border-t border-line/70 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-center sm:px-6">
          <p className="text-display text-2xl text-gold-soft">Aurora</p>
          <p className="tag">personalised style · colour intelligence · everyday dressing</p>
        </div>
      </footer>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <DetailDrawer item={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
