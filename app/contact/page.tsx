import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { siteConfig, phone } from "@/lib/site-config";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Canadian Car and Truck Rentals, Sales & Leasing in Langley, BC. Phone, address, hours, and a contact form for reservations and sales inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 md:py-28">
          <div className="container-narrow grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="eyebrow mb-4">{siteConfig.contact.eyebrow}</p>
                <h1 className="font-display text-display-lg text-white">{siteConfig.contact.h1}</h1>
                <p className="text-white/65 mt-6 text-lg leading-relaxed">
                  {siteConfig.contact.lede}
                </p>
              </div>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-amber/40 bg-amber/8 text-amber">
                    <Phone size={16} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-white/45">Phone</p>
                    <a href={`tel:${phone.localTel}`} className="font-display text-xl text-white hover:text-amber">{phone.local}</a>
                    <p className="text-white/55 text-sm mt-1">
                      Toll-free <a className="hover:text-amber" href={`tel:${phone.tollfreeTel}`}>{phone.tollfree}</a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-amber/40 bg-amber/8 text-amber">
                    <Mail size={16} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-white/45">Email</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="font-display text-base text-white hover:text-amber break-all">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-amber/40 bg-amber/8 text-amber">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-white/45">Visit</p>
                    <p className="font-display text-base text-white">{siteConfig.contact.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-amber/40 bg-amber/8 text-amber">
                    <Clock size={16} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-white/45">Hours</p>
                    <ul className="space-y-1 mt-1">
                      {siteConfig.contact.hours.map((h) => (
                        <li key={h.day} className="text-white/85 text-[14px]">
                          <span className="text-white/55 mr-3 font-mono">{h.day}</span>
                          {h.open}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="border-t border-white/8 bg-steel/15">
          <div className="container-narrow py-12">
            <iframe
              title="Map"
              loading="lazy"
              className="w-full h-[360px] rounded-xl border border-white/10 bg-graphite"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.66%2C49.09%2C-122.65%2C49.11&layer=mapnik&marker=49.1011%2C-122.6541"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
