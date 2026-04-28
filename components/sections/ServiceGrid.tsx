import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function ServiceGrid() {
  const { servicesSection, services } = siteConfig;

  return (
    <section id="services" className="border-b border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-5">
            <span className="eyebrow">{servicesSection.eyebrow}</span>
            <h2 className="display-h2 mt-4">{servicesSection.h2}</h2>
            <p className="body-md mt-6 max-w-md">{servicesSection.body}</p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {services.slice(0, 6).map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-industrial group flex flex-col gap-4 p-6 transition-transform"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/40 transition-all group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="display-h3">{s.name}</h3>
                  <p className="mt-2 text-sm text-white/55">{s.tagline}</p>
                </div>
                <p className="mt-auto text-sm leading-relaxed text-white/70 line-clamp-3">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
