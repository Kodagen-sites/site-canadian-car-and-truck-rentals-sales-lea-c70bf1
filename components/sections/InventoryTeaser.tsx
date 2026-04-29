"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(p);
}

function formatMileage(item: { mileage_km?: number; mileage_mi?: number }) {
  if (item.mileage_km != null) return `${item.mileage_km.toLocaleString("en-CA")} km`;
  if (item.mileage_mi != null) return `${item.mileage_mi.toLocaleString("en-CA")} mi`;
  return "—";
}

export default function InventoryTeaser() {
  const featured = siteConfig.inventory.slice(0, 6);
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/section-showroom.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-graphite/80 to-graphite" />
      </div>

      <div className="relative container-narrow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">On the lot</p>
            <h2 className="font-display text-display-md text-white">
              Inspected. Road-tested. Priced.
            </h2>
            <p className="text-white/65 mt-4 text-lg max-w-xl">
              A rotating used inventory of trucks, vans, SUVs and the occasional collector listing — every unit inspected and priced against the Fraser Valley market.
            </p>
          </div>
          <Link href="/services/pre-owned-vehicle-sales" className="btn-secondary self-start md:self-end">
            Browse all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <motion.article
              key={v.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="brushed-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-amber/80">
                  {v.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
                  {v.year}
                </span>
              </div>
              <h3 className="font-display text-xl text-white leading-tight">
                {v.year} {v.make}
              </h3>
              <p className="font-display text-base text-white/85 mt-1">{v.model}</p>
              <dl className="mt-5 grid grid-cols-2 gap-y-2 text-[12px]">
                <dt className="text-white/45 font-mono uppercase tracking-eyebrow">Mileage</dt>
                <dd className="text-white/80 text-right font-mono">{formatMileage(v)}</dd>
                <dt className="text-white/45 font-mono uppercase tracking-eyebrow">Price</dt>
                <dd className="text-amber text-right font-mono">{formatPrice(v.price_cad)}</dd>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
