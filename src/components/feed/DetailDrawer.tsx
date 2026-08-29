import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useProfile } from "../../state/ProfileContext";
import type { ScoredOutfit } from "./OutfitGrid";

export default function DetailDrawer({
  item,
  onClose,
}: {
  item: ScoredOutfit | null;
  onClose: () => void;
}) {
  const { profile } = useProfile();
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 h-full w-full max-w-md overflow-y-auto border-l border-gold/25 bg-ink-soft"
          >
            <div className="relative">
              <img src={item.outfit.image} alt={item.outfit.title} className="h-72 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/10 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-sm border border-white/10 bg-ink/55 text-cream backdrop-blur hover:border-gold/50"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="tag text-gold-soft/75">{item.outfit.source}</p>
                <h2 className="text-display mt-1 text-2xl text-cream">{item.outfit.title}</h2>
              </div>
            </div>

            <div className="space-y-7 border-t border-gold/15 p-6">
              <div className="inline-flex items-center gap-1.5 rounded-sm border border-gold/35 bg-ink px-3 py-1 text-sm font-medium text-gold-soft">
                {item.analysis.matchScore}% match for {profile.name}
              </div>

              <section>
                <h3 className="eyebrow mb-2 text-cream/40">Why it works for you</h3>
                <p className="text-sm leading-relaxed text-cream/75">{item.analysis.why}</p>
              </section>

              <section>
                <h3 className="eyebrow mb-2 text-cream/40">The pieces</h3>
                <ul className="space-y-2">
                  {item.outfit.items.map((p) => (
                    <li key={p.name} className="flex items-center gap-3 text-sm text-cream/75">
                      <span
                        className="h-4 w-4 shrink-0 rounded-sm border border-white/10"
                        style={{ background: item.outfit.palette[item.outfit.items.indexOf(p)] ?? item.outfit.palette[0] }}
                      />
                      {p.name} <span className="text-cream/35">· {p.color}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="eyebrow mb-2 text-cream/40">Colour palette</h3>
                <div className="flex gap-2">
                  {item.outfit.palette.map((c, i) => (
                    <div key={c + i} className="flex-1">
                      <div className="h-12 rounded-sm border border-white/10" style={{ background: c }} />
                      <p className="tag mt-1.5 text-center normal-case">{item.analysis.swatchNames[i]}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="eyebrow mb-2 text-cream/40">How to wear it</h3>
                <ol className="space-y-2.5">
                  {item.analysis.tips.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-cream/75">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-sm border border-gold/40 text-[11px] font-medium text-gold-soft">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>
              </section>

              <p className="border-t border-line pt-4 text-xs text-cream/35">
                Full outfit page — with wardrobe swaps &amp; styling variations — arrives in the next phase.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
