// Generate Nano Banana keyframes via Gemini API.
// Reads prompts from ../prompts/, writes JPGs to ../public/frames-source/ and ../public/.

import { GoogleGenAI } from "@google/genai";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const MODEL = "gemini-3.1-flash-image-preview";
const ASPECT = "16:9";
const DELAY_MS = 6000;
const MAX_RETRIES = 3;

const ai = new GoogleGenAI({ apiKey: API_KEY });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ROOT = new URL("..", import.meta.url).pathname;

const TARGETS = [
  { promptPath: "prompts/scene-1/start.txt", outPath: "public/frames-source/scene-1-start.jpg" },
  { promptPath: "prompts/scene-1/end.txt", outPath: "public/frames-source/scene-1-end.jpg" },
  { promptPath: "prompts/section-fleet-grid.txt", outPath: "public/section-fleet-grid.jpg" },
  { promptPath: "prompts/section-truck-detail.txt", outPath: "public/section-truck-detail.jpg" },
  { promptPath: "prompts/section-showroom.txt", outPath: "public/section-showroom.jpg" },
  { promptPath: "prompts/section-cube-van.txt", outPath: "public/section-cube-van.jpg" },
];

async function fileExists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function generateOne({ promptPath, outPath }) {
  const fullPrompt = join(ROOT, promptPath);
  const fullOut = join(ROOT, outPath);
  if (await fileExists(fullOut)) {
    console.log(`  [skip] ${outPath} already exists`);
    return { skipped: true };
  }
  const prompt = (await readFile(fullPrompt, "utf8")).trim();
  await mkdir(join(fullOut, ".."), { recursive: true });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  [gen] ${promptPath} -> ${outPath} (attempt ${attempt})`);
      const result = await ai.models.generateContent({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseModalities: ["IMAGE"],
          imageConfig: { aspectRatio: ASPECT },
        },
      });
      const parts = result?.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((p) => p.inlineData?.data);
      if (!imagePart) {
        throw new Error("No image returned in response");
      }
      const buf = Buffer.from(imagePart.inlineData.data, "base64");
      await writeFile(fullOut, buf);
      console.log(`  [ok] wrote ${(buf.length / 1024).toFixed(0)} KB`);
      return { ok: true, bytes: buf.length };
    } catch (err) {
      const msg = err?.message ?? String(err);
      console.warn(`  [retry] ${msg}`);
      const isRate = /rate|429|quota/i.test(msg);
      const wait = isRate ? 30_000 : 5_000 * attempt;
      await sleep(wait);
      if (attempt === MAX_RETRIES) throw err;
    }
  }
}

async function main() {
  console.log(`Generating ${TARGETS.length} images via ${MODEL}`);
  const results = [];
  for (const t of TARGETS) {
    try {
      const r = await generateOne(t);
      results.push({ ...t, ...r });
      if (!r?.skipped) await sleep(DELAY_MS);
    } catch (err) {
      console.error(`  [fail] ${t.outPath}: ${err.message}`);
      results.push({ ...t, error: err.message });
    }
  }
  console.log("\nSummary:");
  for (const r of results) {
    console.log(`  ${r.outPath}: ${r.error ? "FAIL " + r.error : r.skipped ? "SKIP" : "OK"}`);
  }
  const failures = results.filter((r) => r.error).length;
  process.exit(failures > 0 ? 1 : 0);
}

main();
