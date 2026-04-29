"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ServiceGrid() {
  return (
    <section className="py-20 md:py-28 relative bg-graphite">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Service lines</p>
            <h2 className="font-display text-display-md text-white">
              Three doors. One Langley yard.
            </h2>
            <p className="text-white/65 mt-4 text-lg">
              Same fleet operator, same desk, same conversation — whether you need a vehicle for the weekend, a truck on the lot, or a lease on a small fleet.
            </p>
          </div>
          <Link href="/contact" className="btn-secondary self-start md:self-end">
            Talk to the desk
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="brushed-card p-7 flex flex-col"
            >
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-amber/80">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl mt-3 text-white">{s.name}</h3>
                <p className="mt-3 text-white/70 text-[15px] leading-relaxed">{s.summary}</p>
                <ul className="mt-5 space-y-2">
                  {s.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-white/60">
                      <span className="mt-2 inline-block h-px w-3 bg-amber" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-7 pt-5 border-t border-white/8">
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 text-amber hover:text-amber-glow text-sm font-medium"
                >
                  {s.primaryCta.label}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
