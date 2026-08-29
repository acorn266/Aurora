import { motion } from "motion/react";
import { hexForName } from "../../lib/color";
import type { StyleProfile } from "../../data/profile";

type ColorItem = {
  name: string;
  hex: string;
};

export default function ColorDial({
  profile,
  size = 300,
}: {
  profile: StyleProfile;
  size?: number;
}) {
  const colors: ColorItem[] = profile.loved
    .slice(0, 7)
    .map((name) => ({
      name,
      hex: hexForName(name),
    }));

  const n = Math.max(colors.length, 1);

  const cx = size / 2;
  const cy = size / 2;

  /*
   * The ring now occupies much more of the available space.
   * This is the main change from the previous version.
   */
  const outerRadius = size * 0.405;
  const innerRadius = size * 0.255;

  /*
   * Small gaps between wedges keep the wheel editorial
   * rather than looking like a traditional pie chart.
   */
  const gap = 0.018;

  const polar = (angle: number, radius: number) => [
    cx + radius * Math.cos(angle),
    cy + radius * Math.sin(angle),
  ];

  const wedgePath = (index: number) => {
    const segment = (Math.PI * 2) / n;

    const start =
      index * segment - Math.PI / 2 + gap;

    const end =
      (index + 1) * segment - Math.PI / 2 - gap;

    const [x1, y1] = polar(start, outerRadius);
    const [x2, y2] = polar(end, outerRadius);

    const [x3, y3] = polar(end, innerRadius);
    const [x4, y4] = polar(start, innerRadius);

    return [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4}`,
      "Z",
    ].join(" ");
  };

  /*
   * -1 = cool
   *  0 = neutral
   * +1 = warm
   */
  const warmth = Math.max(
    -1,
    Math.min(1, profile.targetWarmth)
  );

  const needleAngle =
    -130 + ((warmth + 1) / 2) * 260;

  const needleRadians =
    ((needleAngle - 90) * Math.PI) / 180;

  const needleLength = outerRadius - 5;

  const needleX =
    cx + needleLength * Math.cos(needleRadians);

  const needleY =
    cy + needleLength * Math.sin(needleRadians);

  /*
   * Labels sit comfortably outside the wheel.
   */
  const labelRadius = outerRadius + size * 0.115;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="overflow-visible"
        aria-label={`Colour signature for ${profile.season}`}
      >
        <defs>
          <filter
            id="aurora-dial-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation={size * 0.012}
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="aurora-centre">
            <stop
              offset="0%"
              stopColor="#242f49"
            />

            <stop
              offset="72%"
              stopColor="#171f34"
            />

            <stop
              offset="100%"
              stopColor="#11182a"
            />
          </radialGradient>

          <linearGradient
            id="aurora-gold"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#f7d36a"
            />

            <stop
              offset="50%"
              stopColor="#d4a017"
            />

            <stop
              offset="100%"
              stopColor="#a87512"
            />
          </linearGradient>
        </defs>

        {/* Outer halo */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius + 9}
          fill="none"
          stroke="#d4a017"
          strokeOpacity={0.12}
          strokeWidth={1}
        />

        {/* Very subtle secondary ring */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius + 4}
          fill="none"
          stroke="#f4e9d8"
          strokeOpacity={0.06}
          strokeWidth={1}
        />

        {/* COLOUR RING */}
        <g filter="url(#aurora-dial-glow)">
          {colors.map((color, index) => (
            <motion.path
              key={`${color.name}-${index}`}
              d={wedgePath(index)}
              fill={color.hex}
              stroke="#11182a"
              strokeWidth={2.5}
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 0.97,
                scale: 1,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
              }}
            />
          ))}
        </g>

        {/* Inner dark disc */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="url(#aurora-centre)"
          stroke="#d4a017"
          strokeOpacity={0.24}
          strokeWidth={1}
        />

        {/* Inner decorative ring */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius * 0.76}
          fill="none"
          stroke="#f4e9d8"
          strokeOpacity={0.07}
          strokeWidth={1}
        />

        {/* WARMTH INDICATOR */}
        <motion.line
          x1={cx}
          y1={cy - 2}
          x2={needleX}
          y2={needleY}
          stroke="#f4e9d8"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{
            opacity: 0,
            x2: cx,
            y2: cy,
          }}
          animate={{
            opacity: 1,
            x2: needleX,
            y2: needleY,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Needle tip */}
        <motion.circle
          cx={needleX}
          cy={needleY}
          r={4}
          fill="#f4e9d8"
          stroke="#d4a017"
          strokeWidth={1}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.65,
          }}
        />

        {/* CLEAN CENTRE */}
<text
  x={cx}
  y={cy - 17}
  textAnchor="middle"
  fill="#f4e9d8"
  fontSize={size * 0.032}
  fontFamily="'Work Sans', sans-serif"
  fontWeight={500}
  letterSpacing={size * 0.004}
  opacity={0.42}
>
  WARMTH
</text>

<text
  x={cx}
  y={cy + 8}
  textAnchor="middle"
  fill="#e8bc4a"
  fontSize={size * 0.075}
  fontFamily="'Marcellus', Georgia, serif"
  fontWeight={500}
>
  {warmth >= 0 ? "+" : ""}
  {warmth.toFixed(2)}
</text>

<text
  x={cx}
  y={cy + 29}
  textAnchor="middle"
  fill="#f4e9d8"
  fontSize={size * 0.021}
  fontFamily="'Work Sans', sans-serif"
  fontWeight={500}
  letterSpacing={size * 0.003}
  opacity={0.28}
>
  COLOUR SIGNATURE
</text>
      </svg>

      {/* COLOUR LABELS */}
      {colors.map((color, index) => {
        const angle =
          ((index + 0.5) / n) *
            Math.PI *
            2 -
          Math.PI / 2;

        const x =
          cx +
          labelRadius *
            Math.cos(angle);

        const y =
          cy +
          labelRadius *
            Math.sin(angle);

        return (
          <motion.span
            key={`${color.name}-label`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.45,
              delay: 0.25 + index * 0.05,
            }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-cream/48"
            style={{
              left: x,
              top: y,
            }}
          >
            {color.name}
          </motion.span>
        );
      })}
    </div>
  );
}