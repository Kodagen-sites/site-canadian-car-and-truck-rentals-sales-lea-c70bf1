import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Check } from "lucide-react";

export const revalidate = 60;

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = siteConfig.services.findIndex((s) => s.slug === slug);
  const next = siteConfig.services[(idx + 1) % siteConfig.services.length];
  const SITE = siteConfig.seo.site_url;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd(service.slug, service.name, service.description),
            breadcrumbJsonLd([
              { name: "Home", url: SITE },
              { name: "Services", url: `${SITE}/services` },
              { name: service.name, url: `${SITE}/services/${service.slug}` },
            ]),
          ]),
        }}
      />
      <Header />
      <main>
        <section className="py-20 md:py-28 border-b border-white/8">
          <div className="container-narrow grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">Service · {String(idx + 1).padStart(2, "0")}</p>
              <h1 className="font-display text-display-lg text-white">{service.name}</h1>
              <p className="text-white/65 mt-6 text-lg max-w-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Link href={service.primaryCta.href} className="btn-primary">
                {service.primaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-narrow grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">Included</p>
              <h2 className="font-display text-3xl text-white">
                What this service covers
              </h2>
              <p className="text-white/65 mt-4 text-base leading-relaxed">
                Working features that come standard. Anything beyond this gets quoted at the desk against the actual vehicle.
              </p>
            </div>
            <ul className="md:col-span-7 space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 brushed-card p-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber/15 text-amber">
                    <Check size={14} />
                  </span>
                  <span className="text-white/85 text-[15px]">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-24 border-t border-white/8">
          <div className="container-narrow flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-2">Next service</p>
              <Link
                href={`/services/${next.slug}`}
                className="font-display text-3xl text-white hover:text-amber transition-colors"
              >
                {next.name} →
              </Link>
            </div>
            <Link href="/contact" className="btn-secondary">
              Talk to the desk
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
