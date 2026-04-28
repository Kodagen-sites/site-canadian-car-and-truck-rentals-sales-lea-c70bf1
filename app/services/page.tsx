import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Rentals & Services",
  description:
    "Cars, SUVs, vans, moving trucks, trailers, pre-owned vehicle sales, and in-house financing — all on one Langley, BC lot.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <article className="bg-ink-900">
      <header className="border-b border-line py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow">SERVICES</span>
          <h1 className="display-h2 mt-4 max-w-3xl">
            Six rental categories, plus pre-owned sales and in-house financing.
          </h1>
          <p className="body-md mt-6 max-w-2xl">
            Everything we do happens at one address in Langley. Pick a service to see what’s
            available, then reserve online or call the yard.
          </p>
        </div>
      </header>

      <div className="container-page py-20 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card-industrial group flex flex-col gap-4 p-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                {String(i + 1).padStart(2, "0")} · Service
              </span>
              <h2 className="display-h3">{s.name}</h2>
              <p className="text-sm text-white/55">{s.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-4">
                {s.summary}
              </p>
              <span className="mt-auto pt-4 text-sm text-accent transition-transform group-hover:translate-x-1">
                See details →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
