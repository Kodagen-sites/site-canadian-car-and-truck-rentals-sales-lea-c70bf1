import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReserveForm from "@/components/ReserveForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reserve a Vehicle",
  description:
    "Reserve a working vehicle from Canadian Car and Truck Rentals — pick the class, dates and pickup location. A desk operator confirms availability and locks the unit.",
  alternates: { canonical: "/reserve" },
};

export const dynamic = "force-static";

export default function ReservePage() {
  return (
    <>
      <Header />
      <main className="container-narrow py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">{siteConfig.reserve.eyebrow}</p>
            <h1 className="font-display text-display-lg text-white">{siteConfig.reserve.h1}</h1>
            <p className="text-white/65 mt-6 text-lg leading-relaxed">{siteConfig.reserve.lede}</p>
            <div className="mt-8 brushed-card p-5">
              <p className="text-[12px] uppercase tracking-eyebrow text-amber/80">Need a same-day pickup?</p>
              <p className="text-white/80 text-base mt-2">
                Call <a href="tel:+16045328828" className="text-amber hover:text-amber-glow">604-532-8828</a>. Toll-free <a href="tel:+18882277817" className="text-amber hover:text-amber-glow">1-888-227-7817</a>.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <ReserveForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
