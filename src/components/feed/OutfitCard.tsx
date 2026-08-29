import { motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Heart,
  Sparkles,
} from "lucide-react";

import type { Outfit } from "../../data/outfits";
import type { OutfitAnalysis } from "../../lib/colorTheory";

import { useProfile } from "../../state/ProfileContext";
import Avatar from "./Avatar";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23202a42'/%3E%3Cstop offset='1' stop-color='%23c1666b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='1000' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' fill='%23f4e9d8' font-family='Georgia' font-size='42' text-anchor='middle'%3EAurora%3C/text%3E%3C/svg%3E";

function Verdict({
  ok,
  label,
}: {
  ok: boolean;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] transition-all duration-300 ${
        ok
          ? "border-gold/35 bg-gold/[0.08] text-gold-soft"
          : "border-white/10 bg-ink/20 text-cream/30"
      }`}
    >
      {ok ? (
        <Check size={9} strokeWidth={2.5} />
      ) : (
        <span className="h-1 w-1 rounded-full bg-current" />
      )}

      {label}
    </span>
  );
}

export default function OutfitCard({
  outfit,
  analysis,
  saved,
  onToggleSave,
  onOpen,
  index,
  featured = false,
}: {
  outfit: Outfit;
  analysis: OutfitAnalysis;
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
  index: number;
  featured?: boolean;
}) {
  const { profile } = useProfile();

  return (
    <div className="perspective-1200 h-full">
      <motion.article
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.975 }}
        transition={{
          duration: 0.55,
          delay: Math.min(index * 0.035, 0.3),
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -6,
          transition: {
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        onClick={onOpen}
        className={`
          group relative h-full cursor-pointer overflow-hidden
          rounded-[1.5rem]
          border border-white/[0.09]
          bg-brand-gray
          shadow-[0_18px_55px_rgba(0,0,0,0.22)]
          transition-[border-color,box-shadow,transform]
          duration-500
          hover:border-gold/30
          hover:shadow-[0_28px_75px_rgba(0,0,0,0.32)]
          ${
            featured
              ? "min-h-[660px] lg:min-h-[690px]"
              : "min-h-[500px] lg:min-h-[520px]"
          }
        `}
      >
        {/* =========================================================
            IMAGE
        ========================================================= */}

        <img
          src={outfit.image}
          alt={outfit.title}
          loading={index < 4 ? "eager" : "lazy"}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-[1400ms]
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover:scale-[1.055]
            ${
              featured
                ? "object-center"
                : "object-center"
            }
          `}
        />

        {/* =========================================================
            IMAGE ATMOSPHERE
        ========================================================= */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-black/30
            via-transparent
            to-ink/[0.97]
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-ink/[0.88]
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-gold/[0.07]
            via-transparent
            to-sand/[0.06]
            opacity-0
            transition-opacity
            duration-700
            group-hover:opacity-100
          "
        />

        {/* Featured image gets a slightly stronger editorial wash */}
        {featured && (
          <>
            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-ink/30
                via-transparent
                to-transparent
              "
            />

            <div
              className="
                absolute inset-x-0 bottom-0 h-[72%]
                bg-gradient-to-t
                from-ink
                via-ink/55
                to-transparent
              "
            />
          </>
        )}

        {/* =========================================================
            TOP META
        ========================================================= */}

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 lg:p-6">
          <div className="flex items-center gap-2">
            <span
              className={`
                rounded-full
                border border-gold/40
                bg-ink/65
                font-medium
                uppercase
                tracking-[0.14em]
                text-gold-soft
                backdrop-blur-xl
                shadow-lg shadow-black/10
                ${
                  featured
                    ? "px-4 py-2.5 text-[10px]"
                    : "px-3.5 py-2 text-[9px]"
                }
              `}
            >
              {analysis.matchScore}% match
            </span>

            {featured && (
              <span
                className="
                  hidden items-center gap-1.5
                  rounded-full
                  border border-white/15
                  bg-ink/55
                  px-3.5 py-2.5
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  text-cream/70
                  backdrop-blur-xl
                  lg:flex
                "
              >
                <Sparkles size={10} />
                Aurora's top pick
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={(event) => {
              event.stopPropagation();
              onToggleSave();
            }}
            aria-label={
              saved ? "Remove from saved" : "Save outfit"
            }
            className="
              grid h-11 w-11 place-items-center
              rounded-full
              border border-white/15
              bg-ink/50
              text-cream
              backdrop-blur-xl
              shadow-lg shadow-black/15
              transition-all duration-300
              hover:border-gold/45
              hover:bg-ink/75
              hover:text-gold-soft
            "
          >
            <Heart
              size={17}
              strokeWidth={1.7}
              className={
                saved
                  ? "fill-sand-soft text-sand-soft"
                  : ""
              }
            />
          </motion.button>
        </div>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <div
          className={`
            absolute inset-x-0 bottom-0 z-10
            ${
              featured
                ? "p-6 lg:p-8"
                : "p-5 lg:p-6"
            }
          `}
        >
          {/* Category */}
          <div className="mb-3.5 flex flex-wrap items-center gap-2">
            <span className="aurora-card-tag">
              {outfit.category}
            </span>

            {featured && (
              <span className="aurora-card-tag">
                Aurora edit
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`
              text-display
              leading-[1.02]
              tracking-[-0.02em]
              text-cream
              ${
                featured
                  ? "max-w-4xl text-4xl lg:text-[3.65rem]"
                  : "max-w-[90%] text-2xl lg:text-[2rem]"
              }
            `}
          >
            {outfit.title}
          </h3>

          {/* Palette + open */}
          <div
            className="
              mt-5
              flex items-center justify-between
              gap-5
            "
          >
            <div className="flex items-center gap-1.5">
              {outfit.palette
                .slice(0, 5)
                .map((color, paletteIndex) => (
                  <span
                    key={`${color}-${paletteIndex}`}
                    title={
                      analysis.swatchNames[paletteIndex]
                    }
                    className={`
                      rounded-full
                      border border-white/35
                      shadow-md
                      transition-transform duration-300
                      group-hover:scale-110
                      ${
                        featured
                          ? "h-6 w-6"
                          : "h-5 w-5"
                      }
                    `}
                    style={{
                      background: color,
                    }}
                  />
                ))}
            </div>

            <span
              className="
                flex items-center gap-1.5
                text-xs
                text-cream/45
                transition-colors duration-300
                group-hover:text-cream/85
              "
            >
              View look
              <ArrowUpRight
                size={13}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </span>
          </div>

          {/* =====================================================
              FEATURED PERSONALISATION
          ===================================================== */}

          {featured ? (
            <div
              className="
                mt-5
                rounded-[1.35rem]
                border border-white/10
                bg-ink/72
                px-5 py-4
                backdrop-blur-xl
                transition-all duration-500
                group-hover:border-gold/20
                group-hover:bg-ink/82
                lg:px-6 lg:py-5
              "
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size={32} />

                  <div className="min-w-0">
                    <p className="truncate text-[11px] text-cream">
                      For {profile.name}
                    </p>

                    <p
                      className="
                        truncate
                        text-[9px]
                        uppercase
                        tracking-[0.11em]
                        text-cream/35
                      "
                    >
                      {profile.season} · colour harmony
                    </p>
                  </div>
                </div>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-gold-soft/70
                  "
                >
                  Personalised
                </span>
              </div>

              <div className="mt-3.5 flex flex-wrap gap-1.5">
                <Verdict
                  ok={analysis.undertoneMatch}
                  label="Undertone"
                />

                <Verdict
                  ok={analysis.contrastMatch}
                  label="Contrast"
                />

                <Verdict
                  ok={analysis.seasonMatch}
                  label={profile.season}
                />
              </div>
            </div>
          ) : (
            /* ===================================================
               NORMAL CARD PERSONALISATION
            =================================================== */

            <div
              className="
                mt-4
                flex items-center justify-between
                border-t border-white/[0.09]
                pt-3.5
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    grid h-6 w-6 place-items-center
                    rounded-full
                    border border-gold/25
                    bg-gold/[0.07]
                  "
                >
                  <Sparkles
                    size={9}
                    className="text-gold-soft"
                  />
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-cream/40
                  "
                >
                  Personalised for you
                </span>
              </div>

              <span
                className={`
                  text-[9px]
                  uppercase
                  tracking-[0.12em]
                  ${
                    analysis.seasonMatch
                      ? "text-gold-soft/75"
                      : "text-cream/30"
                  }
                `}
              >
                {analysis.seasonMatch
                  ? "Great match"
                  : "Good match"}
              </span>
            </div>
          )}
        </div>
      </motion.article>
    </div>
  );
}