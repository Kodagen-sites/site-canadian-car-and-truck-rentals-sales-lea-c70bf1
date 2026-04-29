// Generate Veo 3.1 Lite hero clip from scene-1 keyframes + motion prompt.

import { GoogleGenAI } from "@google/genai";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "veo-3.1-lite-generate-preview";
const RESOLUTION = "720p";
const ASPECT = "16:9";
const POLL_INTERVAL_MS = 8000;
const MAX_POLL_ATTEMPTS = 60; // ~8 minutes

const ai = new GoogleGenAI({ apiKey: API_KEY });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ROOT = new URL("..", import.meta.url).pathname;

async function fileExists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function loadImageBase64(path) {
  const buf = await readFile(path);
  return { mimeType: "image/jpeg", imageBytes: buf.toString("base64") };
}

async function main() {
  const sceneDir = join(ROOT, "prompts/scene-1");
  const startImg = join(ROOT, "public/frames-source/scene-1-start.jpg");
  const endImg = join(ROOT, "public/frames-source/scene-1-end.jpg");
  const motionPath = join(sceneDir, "motion.txt");
  const outPath = join(ROOT, "raw/scene-1.mp4");

  if (await fileExists(outPath)) {
    console.log("scene-1.mp4 already exists, skipping");
    return;
  }

  await mkdir(join(ROOT, "raw"), { recursive: true });

  const motionPrompt = (await readFile(motionPath, "utf8")).trim();
  const startImage = await loadImageBase64(startImg);
  const endImage = await loadImageBase64(endImg);

  console.log(`Submitting Veo job: ${MODEL} @ ${RESOLUTION}`);
  let operation = await ai.models.generateVideos({
    model: MODEL,
    prompt: motionPrompt,
    image: startImage,
    config: {
      aspectRatio: ASPECT,
      resolution: RESOLUTION,
      lastFrame: endImage,
      numberOfVideos: 1,
    },
  });

  console.log(`Operation submitted: ${operation.name ?? "(name pending)"}`);

  let attempts = 0;
  while (!operation.done && attempts < MAX_POLL_ATTEMPTS) {
    attempts++;
    await sleep(POLL_INTERVAL_MS);
    operation = await ai.operations.getVideosOperation({ operation });
    console.log(`  poll ${attempts}: done=${operation.done}`);
  }

  if (!operation.done) {
    console.error("Veo operation timed out");
    process.exit(1);
  }

  if (operation.error) {
    console.error("Veo error:", operation.error);
    process.exit(1);
  }

  const videos = operation.response?.generatedVideos ?? [];
  if (videos.length === 0) {
    console.error("No video returned");
    process.exit(1);
  }

  const video = videos[0];
  // SDK returns either a download URL or inline bytes
  if (video.video?.uri) {
    console.log(`Downloading video from URI...`);
    await ai.files.download({ file: video.video, downloadPath: outPath });
  } else if (video.video?.videoBytes) {
    const buf = Buffer.from(video.video.videoBytes, "base64");
    await writeFile(outPath, buf);
  } else {
    console.error("No video data in response");
    console.error(JSON.stringify(operation.response, null, 2).slice(0, 500));
    process.exit(1);
  }

  const finalStat = await stat(outPath);
  console.log(`Wrote ${outPath} (${(finalStat.size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
