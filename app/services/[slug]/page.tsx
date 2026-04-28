import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const s = siteConfig.services.find((x) => x.slug === slug);
  if (!s) return { title: "Service not found" };
  return {
    title: s.name,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = siteConfig.services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <article className="bg-ink-900">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.name, href: `/services/${service.slug}` },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <header className="border-b border-line py-20 sm:py-28">
        <div className="container-page">
          <nav className="text-xs text-white/45">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-accent">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{service.name}</span>
          </nav>

          <span className="eyebrow mt-8 block">SERVICE</span>
          <h1 className="display-hero mt-4 max-w-4xl">{service.name}</h1>
          <p className="body-lg mt-5 max-w-2xl">{service.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={service.primaryCta.href} className="btn-primary">
              {service.primaryCta.label}
              <span aria-hidden>→</span>
            </Link>
            <a href={`tel:${siteConfig.contact.phone}`} className="btn-secondary">
              Call the lot
            </a>
          </div>
        </div>
      </header>

      {/* Summary + highlights */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">WHAT IT IS</span>
            <p className="body-lg mt-5 max-w-2xl">{service.summary}</p>
          </div>
          <aside className="card-industrial p-6 lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Highlights
            </p>
            <ul className="mt-5 space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-accent" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-ink-800/40 py-20 sm:py-24">
        <div className="container-page">
          <span className="eyebrow">ALSO ON THE LOT</span>
          <h2 className="display-h2 mt-4">More from the yard.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-industrial group flex flex-col gap-3 p-6"
              >
                <h3 className="display-h3">{s.name}</h3>
                <p className="text-sm text-white/55">{s.tagline}</p>
                <span className="mt-auto pt-3 text-sm text-accent transition-transform group-hover:translate-x-1">
                  See details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
