import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services — Rentals, Sales, Financing, Leasing",
  description:
    "Vehicle rentals across 19 classes, pre-owned vehicle sales, in-house financing and leasing. One Langley yard, three service lines.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <Header />
      <main className="container-narrow py-24 md:py-32">
        <p className="eyebrow mb-4">Services</p>
        <h1 className="font-display text-display-lg text-white max-w-3xl">
          Three service lines. Same desk.
        </h1>
        <p className="text-white/65 mt-6 text-lg max-w-2xl">
          Rent, buy or lease — every conversation starts at the same Langley desk. Pick the line you need below for the full breakdown of inclusions, terms and current availability.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="brushed-card p-7 group"
            >
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-amber/80">
                Service {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-2xl mt-3 text-white group-hover:text-amber transition-colors">
                {s.name}
              </h2>
              <p className="mt-3 text-white/65 text-[15px] leading-relaxed">{s.summary}</p>
              <span className="mt-6 inline-block text-amber text-sm font-medium">
                {s.primaryCta.label} →
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
