import { useProfile } from "../../state/ProfileContext";

/** The user's mark — initials on a gold-sandstone arched plaque (stands in for the onboarding photo). */
export default function Avatar({
  size = 40,
  className = "",
  onClick,
}: {
  size?: number;
  className?: string;
  onClick?: () => void;
}) {
  const { profile } = useProfile();
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`grid shrink-0 place-items-center border border-gold/55 text-display font-normal text-ink ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        borderRadius: "999px 999px 3px 3px / " + Math.round(size * 0.32) + "px " + Math.round(size * 0.32) + "px 3px 3px",
        background: "linear-gradient(135deg, #e8bc4a, #d4a017 50%, #c1666b)",
      }}
      aria-label={`${profile.name}, ${profile.season}${onClick ? " — click to retake your colour analysis" : ""}`}
      title={`${profile.name} · ${profile.season}${onClick ? " · click to retake analysis" : ""}`}
    >
      {profile.initials}
    </Tag>
  );
}
