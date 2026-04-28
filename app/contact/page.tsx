import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit the Canadian Car and Truck yard at 20026 Fraser Hwy, Langley, BC. Call (604) 532-8828 or send a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contactPage, contact } = siteConfig;

  return (
    <article className="bg-ink-900">
      <header className="border-b border-line py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow">{contactPage.eyebrow}</span>
          <h1 className="display-hero mt-4 max-w-4xl">{contactPage.h2}</h1>
          <p className="body-lg mt-6 max-w-2xl">{contactPage.formIntro}</p>
        </div>
      </header>

      <section className="border-b border-line py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* Left: address + map placeholder (CT1 map-left) */}
          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-line bg-ink-800">
              <div className="grid-pattern relative h-72">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <a
                    href={contact.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-accent/40 bg-ink-900/80 px-4 py-2 text-sm text-accent backdrop-blur transition hover:bg-ink-800"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="space-y-4 p-6 text-sm">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                    Address
                  </p>
                  <p className="mt-1.5 text-white/85">
                    {contact.address.street}
                    <br />
                    {contact.address.city}, {contact.address.region} {contact.address.postalCode}
                    <br />
                    Canada
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-line pt-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                      Phone
                    </p>
                    <p className="mt-1.5">
                      <a href={`tel:${contact.phone}`} className="text-white/85 hover:text-accent">
                        {contact.phoneDisplay}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                      Email
                    </p>
                    <p className="mt-1.5">
                      <a
                        href={`mailto:${contact.email}`}
                        className="break-all text-white/85 hover:text-accent"
                      >
                        {contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </article>
  );
}
