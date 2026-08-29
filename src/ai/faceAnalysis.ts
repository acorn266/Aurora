import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from "@mediapipe/tasks-vision";

const WASM_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";

const MODEL_PATH =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export type FaceShapeResult = {
  faceShape: "oval" | "round" | "square" | "heart" | "oblong";
  confidence: number;
};

let faceLandmarker: FaceLandmarker | null = null;

async function getFaceLandmarker() {
  if (faceLandmarker) {
    return faceLandmarker;
  }

  const vision = await FilesetResolver.forVisionTasks(WASM_PATH);

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: MODEL_PATH,
    },
    runningMode: "IMAGE",
    numFaces: 1,
  });

  return faceLandmarker;
}

function distance(
  a: NormalizedLandmark,
  b: NormalizedLandmark,
): number {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) +
      Math.pow(a.y - b.y, 2),
  );
}

/*
 * MediaPipe provides a dense facial landmark mesh.
 *
 * We use landmark geometry to estimate:
 * - face height
 * - cheek width
 * - jaw width
 * - forehead width
 *
 * Those measurements are then classified into Aurora's
 * five face-shape categories.
 *
 * This is a heuristic classifier built on top of
 * an ML-based facial landmark detector.
 */

function classifyFaceShape(
  landmarks: NormalizedLandmark[],
): FaceShapeResult {
  /*
   * Important MediaPipe landmark points:
   *
   * 10  = upper forehead
   * 152 = chin
   * 234 = left cheek
   * 454 = right cheek
   * 127 = left forehead/temple area
   * 356 = right forehead/temple area
   * 172 = left lower jaw
   * 397 = right lower jaw
   */

  const foreheadWidth = distance(
    landmarks[127],
    landmarks[356],
  );

  const cheekWidth = distance(
    landmarks[234],
    landmarks[454],
  );

  const jawWidth = distance(
    landmarks[172],
    landmarks[397],
  );

  const faceHeight = distance(
    landmarks[10],
    landmarks[152],
  );

  const widthHeightRatio = cheekWidth / faceHeight;
  const jawCheekRatio = jawWidth / cheekWidth;
  const foreheadCheekRatio =
    foreheadWidth / cheekWidth;

  /*
   * These thresholds are deliberately conservative.
   * We will tune them later using test photos.
   */

  let faceShape: FaceShapeResult["faceShape"];
  let confidence = 0.72;

  // Clearly longer than wide.
  if (widthHeightRatio < 0.68) {
    faceShape = "oblong";
    confidence = 0.82;
  }

  // Broad jaw + broad forehead + relatively balanced width.
  else if (
    jawCheekRatio > 0.86 &&
    foreheadCheekRatio > 0.82 &&
    widthHeightRatio > 0.70
  ) {
    faceShape = "square";
    confidence = 0.79;
  }

  // Wider forehead with noticeably narrower jaw.
  else if (
    foreheadCheekRatio > 0.88 &&
    jawCheekRatio < 0.78
  ) {
    faceShape = "heart";
    confidence = 0.76;
  }

  // Shorter/broader face with relatively rounded proportions.
  else if (
    widthHeightRatio > 0.78 &&
    jawCheekRatio > 0.72
  ) {
    faceShape = "round";
    confidence = 0.75;
  }

  // Balanced proportions are classified as oval.
  else {
    faceShape = "oval";
    confidence = 0.74;
  }

  return {
    faceShape,
    confidence,
  };
}

export async function analyzeFacePhoto(
  file: File,
): Promise<FaceShapeResult> {
  const imageUrl = URL.createObjectURL(file);

  try {
    const image = new Image();

    image.src = imageUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("Could not load the image."));
    });

    const landmarker = await getFaceLandmarker();

    const result = landmarker.detect(image);

    if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
      throw new Error(
        "Aurora couldn't detect a face. Please use a clear front-facing photo.",
      );
    }

    const landmarks = result.faceLandmarks[0];

    const requiredLandmarks = [
      10,
      152,
      127,
      356,
      234,
      454,
      172,
      397,
    ];

    const missingLandmark = requiredLandmarks.some(
      (index) => !landmarks[index],
    );

    if (missingLandmark) {
      throw new Error(
        "Aurora couldn't get enough facial detail from this photo.",
      );
    }

    return classifyFaceShape(landmarks);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}