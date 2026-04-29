import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "Canadian Car and Truck Rentals, Sales & Leasing — a Langley, BC fleet operator running 19 rental classes plus on-lot used vehicle sales and in-house financing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/section-cube-van.jpg"
              alt=""
              className="w-full h-full object-cover opacity-25"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-graphite/95 to-graphite" />
          </div>
          <div className="relative container-narrow grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">{siteConfig.about.eyebrow}</p>
              <h1 className="font-display text-display-xl text-white leading-[1.05]">
                {siteConfig.about.h1}
              </h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-white/70 text-lg leading-relaxed">{siteConfig.about.lede}</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-narrow grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">Story</p>
              <h2 className="font-display text-3xl text-white max-w-md leading-tight">
                Built for working customers, not weekend marketing.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              {siteConfig.about.bodyParagraphs.map((p, i) => (
                <p key={i} className="text-white/80 text-[17px] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-t border-white/8 bg-steel/20">
          <div className="container-narrow">
            <p className="eyebrow mb-6">Operating principles</p>
            <h2 className="font-display text-display-md text-white max-w-2xl">
              Three things we hold the line on.
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {siteConfig.about.values.map((v, i) => (
                <div key={v.label} className="brushed-card p-7">
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-amber/80">
                    Principle {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-xl text-white mt-3">{v.label}</h3>
                  <p className="text-white/65 mt-3 text-[15px] leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
