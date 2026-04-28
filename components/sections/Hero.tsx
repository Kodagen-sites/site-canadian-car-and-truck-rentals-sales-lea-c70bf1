"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  const { eyebrow, h1Lines, subhead, primaryCta, secondaryCta } = siteConfig.hero;

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink-900">
      {/* Layered photography parallax background — concept gradient placeholder until owner adds hero asset */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(255,170,64,0.18), transparent 60%), radial-gradient(ellipse 50% 50% at 30% 75%, rgba(80,120,180,0.10), transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="container-page relative z-10 grid min-h-[78vh] items-center gap-12 py-24 lg:grid-cols-12 lg:py-32">
        {/* Left: hero text (HO2 left-aligned) */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display-hero mt-6"
          >
            {h1Lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="body-lg mt-8 max-w-xl"
          >
            {subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link href={primaryCta.href} className="btn-primary">
              {primaryCta.label}
              <span aria-hidden>→</span>
            </Link>
            <Link href={secondaryCta.href} className="btn-secondary">
              {secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        {/* Right: stat trio + small panel (HO2 supporting block) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="card-industrial p-6">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Yard at a glance
            </p>
            <div className="mt-5 space-y-4">
              {siteConfig.stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 border-b border-line/60 pb-3 last:border-0 last:pb-0">
                  <span className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="text-right text-xs text-white/55">
                    <span className="block font-medium text-white/85">{s.label}</span>
                    <span className="block">{s.context}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-md border border-line bg-ink-800/60 px-4 py-3 text-xs">
            <span className="text-white/60">Open during posted hours · Walk-ins welcome</span>
            <a
              href="#process"
              className="font-medium text-accent transition-colors hover:text-white"
            >
              How it works →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
