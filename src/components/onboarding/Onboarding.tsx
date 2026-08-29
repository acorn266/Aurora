import { useState } from "react";
import { Camera, ListChecks } from "lucide-react";
import { useProfile } from "../../state/ProfileContext";
import PhotoStep from "./PhotoStep";
import QuizStep from "./QuizStep";
import SeasonStep from "./SeasonStep";
import type { DraftReadout } from "./types";

type Stage = "welcome" | "photo" | "quiz" | "season";

export default function Onboarding() {
  const { completeOnboarding } = useProfile();
  const [stage, setStage] = useState<Stage>("welcome");
  const [draft, setDraft] = useState<DraftReadout | null>(null);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ink">
      <div className="mx-auto flex min-h-full max-w-lg flex-col justify-center px-6 py-16">
        {stage === "welcome" && (
          <Welcome onUpload={() => setStage("photo")} onQuiz={() => setStage("quiz")} />
        )}

        {stage === "photo" && (
          <PhotoStep
            onBack={() => setStage("welcome")}
            onReady={(d) => {
              setDraft(d);
              setStage("season");
            }}
          />
        )}

        {stage === "quiz" && (
          <QuizStep
            onBack={() => setStage("welcome")}
            onReady={(d) => {
              setDraft(d);
              setStage("season");
            }}
          />
        )}

        {stage === "season" && draft && (
          <SeasonStep draft={draft} onBack={() => setStage("welcome")} onComplete={completeOnboarding} />
        )}
      </div>
    </div>
  );
}

function Welcome({ onUpload, onQuiz }: { onUpload: () => void; onQuiz: () => void }) {
  return (
    <div className="text-center">
      <p className="eyebrow justify-center">Meet Aurora</p>
      <h1 className="text-display mt-4 text-4xl leading-tight text-cream">
        Let's get to know your style.
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream/55">
        Upload a selfie and Aurora will estimate your colouring, or answer four quick questions instead.
        Either way, you can correct anything it gets wrong.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button onClick={onUpload} className="btn-gold h-12 px-7 text-sm">
          <Camera size={16} /> Upload photo
        </button>
        <button onClick={onQuiz} className="btn-ghost h-12 px-7 text-sm">
          <ListChecks size={16} /> Take the quiz
        </button>
      </div>
    </div>
  );
}
