"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function FleetClasses() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background imagery — fleet aerial */}
      <div className="absolute inset-0">
        <img
          src="/section-fleet-grid.jpg"
          alt=""
          className="w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-graphite/85 to-graphite" />
      </div>

      <div className="relative container-narrow grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4 md:sticky md:top-32">
          <p className="eyebrow mb-4">Rental fleet</p>
          <h2 className="font-display text-display-md text-white">
            19 working classes. One yard.
          </h2>
          <p className="text-white/65 mt-5 text-base leading-relaxed">
            Compact car for the airport run. Half-ton crew cab for the jobsite. 5-ton box truck for the move. The class you need is on the lot — not on a partner network.
          </p>
          <Link href="/services/vehicle-rentals" className="btn-secondary mt-6">
            See all classes
          </Link>
        </div>

        <div className="md:col-span-8 grid gap-3 sm:grid-cols-2">
          {siteConfig.rentalClasses.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="brushed-card p-6"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-lg text-white">{cat.category}</h3>
                <span className="font-mono text-xs text-amber/80">
                  {String(cat.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="text-[13px] text-white/65">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
