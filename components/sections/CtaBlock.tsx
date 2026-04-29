"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig, phone } from "@/lib/site-config";

export default function CtaBlock() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden border-t border-white/8">
      <div className="absolute inset-0">
        <img
          src="/section-truck-detail.jpg"
          alt=""
          className="w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/95 via-graphite/85 to-graphite" />
      </div>

      <div className="relative container-text text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          {siteConfig.cta.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-xl text-white leading-[1.05]"
        >
          {siteConfig.cta.h2}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/65 mt-6 text-lg max-w-xl mx-auto"
        >
          {siteConfig.cta.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link href={siteConfig.cta.primary_cta.href} className="btn-primary">
            {siteConfig.cta.primary_cta.label}
          </Link>
          <a href={`tel:${phone.localTel}`} className="btn-secondary">
            Call {phone.local}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
