import { useState } from "react";
import type { ContrastLevel, DepthLevel, UndertoneGuess } from "../../lib/seasonEngine";
import type { DraftReadout } from "./types";

type Answers = {
  depth: DepthLevel | null;
  undertone: UndertoneGuess | null;
  contrast: ContrastLevel | null;
  faceShape: DraftReadout["faceShape"] | null;
};

const QUESTIONS: {
  key: keyof Answers;
  prompt: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "depth",
    prompt: "What's your natural hair colour?",
    options: [
      { value: "light", label: "Blonde / light brown" },
      { value: "medium", label: "Medium brown" },
      { value: "deep", label: "Dark brown / black" },
    ],
  },
  {
    key: "undertone",
    prompt: "How would you describe your skin's undertone?",
    options: [
      { value: "warm", label: "Warm — golden or peachy" },
      { value: "cool", label: "Cool — pink or rosy" },
      { value: "neutral", label: "Neutral, or not sure" },
    ],
  },
  {
    key: "contrast",
    prompt: "Is there a lot of contrast between your hair and skin, or is it fairly tonal?",
    options: [
      { value: "high", label: "High — very different depths" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low — fairly similar / tonal" },
    ],
  },
  {
    key: "faceShape",
    prompt: "Which face shape is closest to yours?",
    options: [
      { value: "oval", label: "Oval" },
      { value: "round", label: "Round" },
      { value: "square", label: "Square" },
      { value: "heart", label: "Heart" },
      { value: "oblong", label: "Oblong" },
    ],
  },
];

const HAIR_LABELS: Record<DepthLevel, string> = {
  light: "Light brown / blonde",
  medium: "Medium brown",
  deep: "Dark brown / black",
};
const SKIN_LABELS: Record<UndertoneGuess, string> = {
  warm: "Warm undertone",
  cool: "Cool undertone",
  neutral: "Neutral undertone",
};

export default function QuizStep({
  onReady,
  onBack,
}: {
  onReady: (draft: DraftReadout) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ depth: null, undertone: null, contrast: null, faceShape: null });

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  function choose(value: string) {
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    if (isLast) {
      onReady({
        faceShape: next.faceShape ?? "oval",
        faceShapeConfident: true, // user chose it directly — more reliable than any guess
        hairLabel: HAIR_LABELS[next.depth as DepthLevel],
        skinLabel: SKIN_LABELS[next.undertone as UndertoneGuess],
        undertone: next.undertone as UndertoneGuess,
        contrast: next.contrast as ContrastLevel,
        depth: next.depth as DepthLevel,
      });
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div>
      <button
        onClick={() => (step === 0 ? onBack() : setStep(step - 1))}
        className="tag mb-6 text-cream/40 hover:text-cream/70"
      >
        ← Back
      </button>

      <p className="eyebrow">
        Question {step + 1} of {QUESTIONS.length}
      </p>
      <h2 className="text-display mt-3 text-2xl leading-snug text-cream">{q.prompt}</h2>

      <div className="mt-7 space-y-2.5">
        {q.options.map((o) => (
          <button
            key={o.value}
            onClick={() => choose(o.value)}
            className="block w-full border border-line px-4 py-3 text-left text-sm text-cream/85 transition-colors hover:border-gold/55 hover:text-cream"
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-1.5">
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`h-[3px] flex-1 ${i <= step ? "bg-gold" : "bg-line"}`} />
        ))}
      </div>
    </div>
  );
}
