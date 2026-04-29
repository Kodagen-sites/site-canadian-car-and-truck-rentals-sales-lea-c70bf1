"use client";

import { motion } from "framer-motion";
import { Layers, MapPin, Wrench, Banknote } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const ICONS = { Layers, MapPin, Wrench, Banknote } as const;

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-graphite">
      <div className="container-narrow">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{siteConfig.benefits.eyebrow}</p>
          <h2 className="font-display text-display-md text-white">
            {siteConfig.benefits.h2}
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {siteConfig.benefits.items.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5"
              >
                <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-md border border-amber/40 bg-amber/8 text-amber">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl text-white">{item.title}</h3>
                  <p className="text-white/65 mt-2 text-[15px] leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
