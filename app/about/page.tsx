import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "A working Fraser Valley rental yard with rentals, used vehicle sales, and in-house financing — all at one Langley address.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { about } = siteConfig;

  return (
    <article className="bg-ink-900">
      <header className="border-b border-line py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow">{about.eyebrow}</span>
          <h1 className="display-hero mt-4 max-w-4xl">{about.h2}</h1>
        </div>
      </header>

      <section className="border-b border-line py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {about.bodyParagraphs.map((p, i) => (
              <p key={i} className="body-lg mb-6 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className="card-industrial p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                Yard at a glance
              </p>
              <dl className="mt-5 space-y-4">
                {siteConfig.stats.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-6 border-b border-line/60 pb-3 last:border-0 last:pb-0">
                    <dt className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {s.value}
                    </dt>
                    <dd className="text-right text-xs text-white/60">
                      <span className="block font-medium text-white/85">{s.label}</span>
                      <span className="block">{s.context}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ink-800/40 py-20 sm:py-24">
        <div className="container-page">
          <span className="eyebrow">HOW WE OPERATE</span>
          <h2 className="display-h2 mt-4 max-w-3xl">Three things we don’t do.</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {about.values.map((v) => (
              <div key={v.label} className="bg-ink-900 p-8">
                <h3 className="display-h3">{v.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <Link href="/reserve" className="btn-primary">
              Reserve a vehicle →
            </Link>
            <a href={`tel:${siteConfig.contact.phone}`} className="btn-secondary">
              Call the lot
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
