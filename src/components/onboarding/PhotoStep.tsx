import { useRef, useState, type ReactNode } from "react";
import { Check, Pencil, Upload } from "lucide-react";
import { analyzePhoto, loadImage } from "../../lib/photoAnalysis";
import { analyzeFacePhoto } from "../../ai/faceAnalysis";
import type { ContrastLevel, DepthLevel, UndertoneGuess } from "../../lib/seasonEngine";
import type { DraftReadout } from "./types";

type Stage = "upload" | "analyzing" | "review";

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
const FACE_SHAPES: DraftReadout["faceShape"][] = ["oval", "round", "square", "heart", "oblong"];

export default function PhotoStep({
  onReady,
  onBack,
}: {
  onReady: (draft: DraftReadout) => void;
  onBack: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("upload");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftReadout | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined | null) {
    if (!file) return;

    setError(null);
    setDraft(null);
    setEditing(false);

    setPreviewUrl(URL.createObjectURL(file));
    setStage("analyzing");

    try {
      const img = await loadImage(file);

    // Existing Aurora analysis:
    // undertone, contrast, depth, etc.
      const est = analyzePhoto(img);

    // Real ML-based facial landmark analysis:
    // face shape is estimated from MediaPipe facial landmarks.
      const faceEst = await analyzeFacePhoto(file);

    // Small delay so the analysis state feels intentional.
      await new Promise((r) => setTimeout(r, 800));

      setDraft({
        faceShape: faceEst.faceShape,
        faceShapeConfident: faceEst.confidence >= 0.75,
        hairLabel: HAIR_LABELS[est.depth],
        skinLabel: SKIN_LABELS[est.undertone],
        undertone: est.undertone,
        contrast: est.contrast,
        depth: est.depth,
      });

      setStage("review");
    } catch (err) {
      console.error("Aurora photo analysis failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Aurora couldn't analyze this photo. Please try another clear, front-facing photo.",
      );

      setStage("upload");
    }
  }

  if (stage === "upload") {
    return (
      <div className="text-center">
        <button onClick={onBack} className="tag mb-6 text-cream/40 hover:text-cream/70">
          ← Back
        </button>
        <p className="eyebrow justify-center">Step 1 · Photo</p>
        <h2 className="text-display mt-3 text-3xl text-cream">Upload a photo</h2>
        <p className="mt-2 text-sm text-cream/55">
          A clear, front-facing photo in natural light works best. It stays on your device.
        </p>
        {error && (
          <div className="mx-auto mt-5 max-w-md rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-left text-sm text-red-200">
            {error}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className="mt-8 flex w-full flex-col items-center gap-3 rounded-sm border border-dashed border-gold/35 py-16 text-cream/55 transition-colors hover:border-gold/60 hover:text-cream"
        >
          <Upload size={26} className="text-gold-soft" />
          <span className="text-sm">Click to choose a photo, or drop it here</span>
        </button>
      </div>
    );
  }

  if (stage === "analyzing") {
    return (
      <div className="text-center">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Uploaded"
            className="mx-auto mb-8 h-56 w-56 rounded-full border border-gold/40 object-cover"
          />
        )}
        <p className="eyebrow justify-center">AI Analysis</p>
        <h2 className="text-display mt-3 text-2xl text-cream">Aurora is looking…</h2>
        <p className="mt-2 text-sm text-cream/55">Mapping facial features and analyzing your colour characteristics...</p>
      </div>
    );
  }

  // stage === "review"
  const d = draft!;
  return (
    <div>
      <button onClick={onBack} className="tag mb-6 text-cream/40 hover:text-cream/70">
        ← Start over
      </button>
      <p className="eyebrow">Here's what Aurora sees</p>

      <div className="mt-4 flex items-center gap-4">
        {previewUrl && (
          <img src={previewUrl} alt="Uploaded" className="h-20 w-20 rounded-full border border-gold/40 object-cover" />
        )}
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
          <ReadRow label="Face shape" value={cap(d.faceShape)} unsure={!d.faceShapeConfident} />
          <ReadRow label="Hair" value={d.hairLabel} />
          <ReadRow label="Skin" value={d.skinLabel} />
          <ReadRow label="Contrast" value={cap(d.contrast)} />
        </div>
      </div>

      {editing && (
        <div className="mt-6 space-y-4 border-t border-line pt-5">
          <EditRow label="Face shape">
            <select
              value={d.faceShape}
              onChange={(e) => setDraft({ ...d, faceShape: e.target.value as DraftReadout["faceShape"] })}
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
            >
              {FACE_SHAPES.map((f) => (
                <option key={f} value={f}>{cap(f)}</option>
              ))}
            </select>
          </EditRow>
          <EditRow label="Undertone">
            <select
              value={d.undertone}
              onChange={(e) =>
                setDraft({
                  ...d,
                  undertone: e.target.value as UndertoneGuess,
                  skinLabel: SKIN_LABELS[e.target.value as UndertoneGuess],
                })
              }
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
            >
              <option value="warm">Warm</option>
              <option value="cool">Cool</option>
              <option value="neutral">Neutral</option>
            </select>
          </EditRow>
          <EditRow label="Hair depth">
            <select
              value={d.depth}
              onChange={(e) =>
                setDraft({
                  ...d,
                  depth: e.target.value as DepthLevel,
                  hairLabel: HAIR_LABELS[e.target.value as DepthLevel],
                })
              }
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
            >
              <option value="light">Light brown / blonde</option>
              <option value="medium">Medium brown</option>
              <option value="deep">Dark brown / black</option>
            </select>
          </EditRow>
          <EditRow label="Contrast">
            <select
              value={d.contrast}
              onChange={(e) => setDraft({ ...d, contrast: e.target.value as ContrastLevel })}
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </EditRow>
        </div>
      )}

      <p className="mt-6 text-sm text-cream/55">Is this correct?</p>
      <div className="mt-3 flex gap-3">
        {!editing ? (
          <>
            <button onClick={() => onReady(d)} className="btn-gold h-11 flex-1 text-sm">
              <Check size={15} /> Looks right
            </button>
            <button onClick={() => setEditing(true)} className="btn-ghost h-11 flex-1 text-sm">
              <Pencil size={14} /> Edit
            </button>
          </>
        ) : (
          <button onClick={() => onReady(d)} className="btn-gold h-11 flex-1 text-sm">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function ReadRow({ label, value, unsure }: { label: string; value: string; unsure?: boolean }) {
  return (
    <div>
      <p className="tag">{label}{unsure ? " · best guess" : ""}</p>
      <p className="text-sm text-cream">{value}</p>
    </div>
  );
}

function EditRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="tag mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
