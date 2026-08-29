import { motion } from "motion/react";
import { Heart, Search, Upload } from "lucide-react";
import { CATEGORIES } from "../../data/outfits";
import Avatar from "./Avatar";

type Category = (typeof CATEGORIES)[number];

export default function Nav({
  category,
  onCategory,
  onUpload,
  onAvatarClick,
}: {
  category: Category;
  onCategory: (category: Category) => void;
  onUpload: () => void;
  onAvatarClick?: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="/" className="group flex items-center gap-3">
          <span className="aurora-mark">
            <span className="text-display-sc text-xs">A</span>
          </span>
          <span className="text-display text-[1.45rem] tracking-tight text-cream">Aurora</span>
          <span className="hidden border-l border-line pl-3 text-[10px] uppercase tracking-[0.2em] text-cream/35 lg:inline">
            outfits in your colour
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="aurora-icon-button hidden sm:grid" aria-label="Search">
            <Search size={16} />
          </button>
          <button className="aurora-icon-button hidden sm:grid" aria-label="Saved outfits">
            <Heart size={16} />
          </button>
          <button onClick={onUpload} className="btn-gold h-10 px-4 text-sm sm:px-5">
            <Upload size={15} />
            <span className="hidden sm:inline">Upload garments</span>
            <span className="sm:hidden">Upload</span>
          </button>
          <Avatar size={38} className="hidden sm:grid" onClick={onAvatarClick} />
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-7 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                onClick={() => onCategory(item)}
                className={`relative whitespace-nowrap pb-1 text-sm transition-colors ${
                  active ? "text-cream" : "text-cream/42 hover:text-cream/80"
                }`}
              >
                {item}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
