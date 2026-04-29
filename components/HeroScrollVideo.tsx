"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const FRAME_COUNT = 192;
const FRAME_BASE = "/frames/frame_";
const FRAME_PAD = 4;
const FRAME_EXT = ".jpg";
const SCROLL_DISTANCE_PX_PER_FRAME = 4; // 192 frames × 4 = 768px scroll arc

function frameSrc(idx: number) {
  return `${FRAME_BASE}${String(idx).padStart(FRAME_PAD, "0")}${FRAME_EXT}`;
}

export default function HeroScrollVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  // Preload first + middle + last frames as a smoke test, then progressively load all
  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;
    let firstFrame: HTMLImageElement | null = null;

    function drawIndex(idx: number) {
      const i = Math.max(1, Math.min(FRAME_COUNT, Math.round(idx)));
      const img = images[i - 1];
      if (!img || !canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      const aspect = img.naturalWidth / img.naturalHeight;
      let drawW = canvas.width;
      let drawH = canvas.width / aspect;
      if (drawH < canvas.height) {
        drawH = canvas.height;
        drawW = canvas.height * aspect;
      }
      const dx = (canvas.width - drawW) / 2;
      const dy = (canvas.height - drawH) / 2;
      ctx.fillStyle = "#0e1218";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, drawW, drawH);
    }

    function onScroll() {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const idx = 1 + progress * (FRAME_COUNT - 1);
      drawIndex(idx);
    }

    // Load all frames lazily
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i + 1);
      img.onload = () => {
        loaded++;
        if (i === 0) {
          firstFrame = img;
          drawIndex(1);
          setReady(true);
        }
        if (loaded > FRAME_COUNT * 0.85) {
          // enough loaded, we're good
        }
      };
      images[i] = img;
    }

    if (reduceMotion) {
      // Static: just render frame 1 and skip scroll listener
      const img = new Image();
      img.src = frameSrc(1);
      img.onload = () => {
        images[0] = img;
        drawIndex(1);
        setReady(true);
      };
      return;
    }

    let raf = 0;
    const onScrollThrottled = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    window.addEventListener("resize", onScrollThrottled);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScrollThrottled);
      window.removeEventListener("resize", onScrollThrottled);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${100 + (FRAME_COUNT * SCROLL_DISTANCE_PX_PER_FRAME) / 10}vh` }}
    >
      {/* Sticky canvas viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        {/* Static fallback image while frames preload */}
        {!ready && (
          <img
            src="/frames-source/scene-1-start.jpg"
            alt=""
            className="hero-frame opacity-90"
            aria-hidden="true"
          />
        )}

        {/* Atmospheric overlay — graphite gradient + amber beam */}
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-graphite/95 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-amber-beam opacity-50 pointer-events-none" />

        {/* Hero overlay text — HO2 left-aligned with stats */}
        <div className="absolute inset-0 flex items-end pb-20 md:pb-28 pointer-events-none">
          <div className="container-narrow w-full">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="max-w-[58ch] pointer-events-auto"
            >
              <p className="eyebrow mb-5">{siteConfig.hero.eyebrow}</p>
              <h1 className="font-display text-display-xl text-white">
                {siteConfig.hero.h1.map((line, i) => (
                  <span key={i} className="block">
                    {line.line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-lg text-white/80 max-w-[44ch] leading-relaxed">
                {siteConfig.hero.subhead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={siteConfig.hero.primary_cta.href}
                  className="btn-primary"
                >
                  {siteConfig.hero.primary_cta.label}
                </Link>
                <Link
                  href={siteConfig.hero.secondary_cta.href}
                  className="btn-secondary"
                >
                  {siteConfig.hero.secondary_cta.label}
                </Link>
              </div>

              {/* Stats strip */}
              <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-md">
                {siteConfig.stats.map((s) => (
                  <div key={s.label} className="border-l border-amber/60 pl-4">
                    <div className="font-display tabular-nums text-2xl md:text-3xl text-amber">
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="text-[11px] uppercase tracking-eyebrow text-white/55 mt-1 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
