import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  SearchX,
  Sparkles,
} from "lucide-react";

import type { Outfit } from "../../data/outfits";
import type { OutfitAnalysis } from "../../lib/colorTheory";

import OutfitCard from "./OutfitCard";

export type ScoredOutfit = {
  outfit: Outfit;
  analysis: OutfitAnalysis;
};

export default function OutfitGrid({
  items,
  saved,
  onToggleSave,
  onOpen,
}: {
  items: ScoredOutfit[];
  saved: Set<string>;
  onToggleSave: (id: string) => void;
  onOpen: (o: ScoredOutfit) => void;
}) {
  if (items.length === 0) {
    return (
      <div
        className="
          flex min-h-[360px]
          flex-col items-center justify-center
          gap-3
          rounded-[2rem]
          border border-dashed border-line
          text-center text-cream/45
        "
      >
        <SearchX
          size={32}
          className="text-gold-soft/60"
          strokeWidth={1.5}
        />

        <p className="text-display text-lg text-cream/80">
          Nothing in this edit yet
        </p>

        <p className="max-w-sm text-sm">
          Try another category or explore a different
          part of your wardrobe.
        </p>
      </div>
    );
  }

  const featured = items[0];
  const supporting = items.slice(1);

  return (
    <div className="space-y-20">
      {/* =========================================================
          FEATURED LOOK
      ========================================================= */}

      <section>
        {/* SECTION HEADER */}

        <div
          className="
            mb-7
            flex items-end justify-between
            gap-8
          "
        >
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <Sparkles
                size={14}
                className="text-gold-soft"
              />

              <span className="eyebrow">
                Aurora's top pick
              </span>
            </div>

            <h2
              className="
                text-display
                text-3xl
                tracking-[-0.02em]
                text-cream
                lg:text-[2.65rem]
              "
            >
              The look we'd choose for you
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-cream/45
              "
            >
              Your strongest match right now, based on
              your colour harmony, contrast and personal
              style profile.
            </p>
          </div>

          {/* MATCH SCORE */}

          <div
            className="
              hidden shrink-0
              text-right
              lg:block
            "
          >
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-cream/30
              "
            >
              Match
            </p>

            <p
              className="
                mt-1
                text-display
                text-3xl
                text-gold-soft
              "
            >
              {featured.analysis.matchScore}%
            </p>
          </div>
        </div>

        {/* FEATURED LAYOUT */}

        <motion.div
          layout
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            grid
            overflow-hidden
            rounded-[1.6rem]
            lg:grid-cols-[minmax(0,1.72fr)_minmax(320px,.68fr)]
          "
        >
          {/* FEATURED IMAGE */}

          <div className="min-h-[690px]">
            <OutfitCard
              outfit={featured.outfit}
              analysis={featured.analysis}
              index={0}
              featured
              saved={saved.has(featured.outfit.id)}
              onToggleSave={() =>
                onToggleSave(featured.outfit.id)
              }
              onOpen={() => onOpen(featured)}
            />
          </div>

          {/* FEATURED INSIGHT */}

          <aside
            className="
              flex
              min-h-[690px]
              flex-col
              justify-between
              border
              border-l-0
              border-white/[0.08]
              bg-brand-gray/55
              p-8
              lg:p-9
            "
          >
            <div>
              <p className="eyebrow">
                Why Aurora chose it
              </p>

              <h3
                className="
                  text-display
                  mt-4
                  text-[2rem]
                  leading-[1.08]
                  text-cream
                  lg:text-[2.25rem]
                "
              >
                A strong match for your natural harmony.
              </h3>

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-cream/48
                "
              >
                This look is selected from your
                personalised colour profile. It balances
                your season, undertone and contrast to
                create a more harmonious overall look.
              </p>

              {/* VISUAL DIVIDER */}

              <div
                className="
                  my-8
                  h-px
                  bg-gradient-to-r
                  from-gold/25
                  via-white/[0.07]
                  to-transparent
                "
              />

              <div className="space-y-4">
                <Signal
                  label="Colour harmony"
                  value={featured.analysis.undertoneMatch}
                />

                <Signal
                  label="Contrast balance"
                  value={featured.analysis.contrastMatch}
                />

                <Signal
                  label="Season compatibility"
                  value={featured.analysis.seasonMatch}
                />
              </div>
            </div>

            <button
              onClick={() => onOpen(featured)}
              className="
                group
                mt-10
                flex h-13
                items-center justify-between
                rounded-xl
                border border-gold/30
                bg-gold/[0.06]
                px-5
                text-xs
                uppercase
                tracking-[0.17em]
                text-gold-soft
                transition-all duration-300
                hover:border-gold/55
                hover:bg-gold/[0.12]
              "
            >
              <span>
                Explore this look
              </span>

              <ArrowUpRight
                size={15}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>
          </aside>
        </motion.div>
      </section>

      {/* =========================================================
          SUPPORTING LOOKS
      ========================================================= */}

      {supporting.length > 0 && (
        <section id="looks">
          {/* HEADER */}

          <div
            className="
              mb-8
              flex items-end justify-between
              gap-8
            "
          >
            <div>
              <p className="eyebrow">
                More for you
              </p>

              <h2
                className="
                  text-display
                  mt-2
                  text-3xl
                  tracking-[-0.02em]
                  text-cream
                  lg:text-[2.65rem]
                "
              >
                Looks that fit your profile
              </h2>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-cream/40
                "
              >
                A considered edit of looks ranked around
                your personal colour harmony and style.
              </p>
            </div>

            <p
              className="
                hidden
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-cream/30
                lg:block
              "
            >
              {supporting.length} more looks
            </p>
          </div>

          {/* GRID */}

          <motion.div
            layout
            className="
              grid
              gap-6
              lg:grid-cols-3
              lg:gap-7
            "
          >
            <AnimatePresence mode="popLayout">
              {supporting.map((item, index) => (
                <motion.div
                  key={item.outfit.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 22,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(
                      index * 0.045,
                      0.3
                    ),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="min-w-0"
                >
                  <OutfitCard
                    outfit={item.outfit}
                    analysis={item.analysis}
                    index={index + 1}
                    featured={false}
                    saved={saved.has(item.outfit.id)}
                    onToggleSave={() =>
                      onToggleSave(item.outfit.id)
                    }
                    onOpen={() => onOpen(item)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}
    </div>
  );
}

/* ===============================================================
   FEATURED SIGNAL
================================================================ */

function Signal({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {
  return (
    <div
      className="
        group/signal
        flex items-center justify-between
        border-b border-white/[0.07]
        pb-4
      "
    >
      <span
        className="
          text-xs
          text-cream/50
          transition-colors
          group-hover/signal:text-cream/70
        "
      >
        {label}
      </span>

      <span
        className={`
          text-[10px]
          uppercase
          tracking-[0.15em]
          ${
            value
              ? "text-gold-soft"
              : "text-cream/25"
          }
        `}
      >
        {value ? "Excellent" : "Good"}
      </span>
    </div>
  );
}