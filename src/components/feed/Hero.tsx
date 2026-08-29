import { motion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { useProfile } from "../../state/ProfileContext";
import { fadeUp, stagger } from "../../lib/motion";
import Avatar from "./Avatar";
import ColorDial from "./ColorDial";

export default function Hero() {
  const { profile } = useProfile();

  return (
    <motion.section
      variants={stagger(0.08, 0.04)}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl px-3 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-10 lg:pb-16"
    >
      <div className="aurora-hero relative overflow-hidden rounded-[1.5rem] border border-gold/20 bg-brand-gray/45 px-5 py-6 shadow-2xl shadow-black/20 sm:rounded-[2rem] sm:px-10 sm:py-12 lg:px-14 lg:py-14">

        <div className="aurora-hero-glow aurora-hero-glow-one" />
        <div className="aurora-hero-glow aurora-hero-glow-two" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-12">

          {/* LEFT */}
          <div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="eyebrow">
                Your personal style edit
              </span>

              <span className="aurora-live">
                <Sparkles size={11} />
                refreshed for you
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-display mt-4 max-w-3xl text-[2.7rem] leading-[0.98] text-cream sm:mt-6 sm:text-6xl lg:text-[5.4rem]"
            >
              Dress like{" "}
              <span className="text-gold-soft">
                yourself.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-sm leading-6 text-cream/60 sm:mt-6 sm:text-lg sm:leading-7"
            >
              Aurora turns your colour profile and personal details into a
              visual wardrobe of looks that feel considered, wearable and
              distinctly yours.
            </motion.p>

            {/* PROFILE */}
            <motion.div
              variants={fadeUp}
              className="mt-5 flex items-center gap-3 sm:mt-8"
            >
              <Avatar size={38} />

              <div>
                <p className="text-sm text-cream">
                  {profile.name ? `${profile.name}'s style profile` : "Your style profile"}
                </p>

                <p className="text-[11px] text-cream/45 sm:text-xs">
                  {profile.season} · {profile.undertone} ·{" "}
                  {profile.contrast} contrast
                </p>
              </div>
            </motion.div>

            {/* PERSONALIZED SIGNAL */}
            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-wrap gap-2 sm:mt-7"
            >
              <span className="aurora-filter aurora-filter-active">
                <span className="aurora-filter-dot" />
                {profile.season}
              </span>

              <span className="aurora-filter">
                <span className="aurora-filter-dot" />
                {profile.faceShape} face
              </span>

              <span className="aurora-filter">
                <span className="aurora-filter-dot" />
                {profile.contrast} contrast
              </span>
            </motion.div>

          </div>

          {/* COLOUR SIGNATURE */}
          <motion.div
            variants={fadeUp}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="aurora-dial-card max-w-[270px] p-4 sm:max-w-[340px] sm:p-6">

              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <span className="tag">
                  colour signature
                </span>

                <span className="text-[10px] text-cream/35 sm:text-xs">
                  
                </span>
              </div>

              <ColorDial
                profile={profile}
                size={270}
              />

              <div className="mt-3 text-center sm:mt-5">
                <p className="text-display text-lg text-cream sm:text-xl">
                  {profile.season}
                </p>

                <p className="mt-1 text-[10px] text-cream/45 sm:text-xs">
                  your harmony zone
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        <motion.a
          variants={fadeUp}
          href="#looks"
          className="aurora-scroll-cue"
          aria-label="Explore your looks"
        >
          <span>Explore your edit</span>
          <ArrowDown size={14} />
        </motion.a>

      </div>
    </motion.section>
  );
}