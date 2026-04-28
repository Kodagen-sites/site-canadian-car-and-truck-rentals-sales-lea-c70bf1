import type { Metadata } from "next";
import ReserveForm from "@/components/ReserveForm";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Reserve a vehicle",
  description: "Reserve a car, SUV, van, moving truck, or trailer at the Langley, BC yard. We confirm by phone or email.",
  alternates: { canonical: "/reserve" },
};

export default function ReservePage() {
  const { reservePage, contact } = siteConfig;

  return (
    <article className="bg-ink-900">
      <header className="border-b border-line py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow">{reservePage.eyebrow}</span>
          <h1 className="display-hero mt-4 max-w-4xl">{reservePage.h2}</h1>
          <p className="body-lg mt-6 max-w-2xl">{reservePage.body}</p>
        </div>
      </header>

      <section className="border-b border-line py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-5">
            <div className="card-industrial p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                Skip the form
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                For same-day pickup, call.
              </h3>
              <p className="mt-3 text-sm text-white/70">
                The yard answers the phone during open hours. Faster than the form for stock checks
                and last-minute rentals.
              </p>
              <a href={`tel:${contact.phone}`} className="btn-primary mt-5 w-full">
                {contact.phoneDisplay}
              </a>
            </div>

            <div className="mt-4 rounded-md border border-line bg-ink-800/60 p-5 text-xs text-white/60">
              <p className="font-mono uppercase tracking-eyebrow text-accent">
                What we ask for at pickup
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed">
                <li>· Driver’s license</li>
                <li>· One additional piece of ID</li>
                <li>· Credit card or cash deposit</li>
                <li>· Insurance details (for non-coverage rentals)</li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <ReserveForm />
          </div>
        </div>
      </section>
    </article>
  );
}
