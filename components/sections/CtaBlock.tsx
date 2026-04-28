import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function CtaBlock() {
  const { cta } = siteConfig;

  return (
    <section className="border-b border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <span className="eyebrow">{cta.eyebrow}</span>
            <h2 className="display-h2 mt-4">{cta.h2}</h2>
            <p className="body-md mt-6 max-w-md">{cta.body}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={cta.primaryCta.href} className="btn-primary">
                {cta.primaryCta.label}
                <span aria-hidden>→</span>
              </Link>
              <Link href={cta.secondaryCta.href} className="btn-secondary">
                {cta.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm sm:max-w-md">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                  Yard
                </p>
                <p className="mt-1.5 text-white/80">
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{" "}
                  {siteConfig.contact.address.postalCode}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                  Desk
                </p>
                <p className="mt-1.5">
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-white/80 hover:text-accent">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-white/65 hover:text-accent">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right: short form (CTA2 split) */}
          <form
            className="card-industrial lg:col-span-6 p-6 sm:p-8"
            action="mailto:canadiancarandtruck@gmail.com"
            method="post"
            encType="text/plain"
          >
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Quick reservation request
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Tell us what you need
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Pickup date" name="pickup_date" type="date" required />
              <Field label="Return date" name="return_date" type="date" required />
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium uppercase tracking-eyebrow text-white/60">
                  Vehicle class
                </label>
                <select
                  name="vehicle_class"
                  className="mt-1.5 w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
                  defaultValue="car"
                >
                  <option value="car">Car / SUV</option>
                  <option value="van">Van</option>
                  <option value="moving-truck">Moving truck</option>
                  <option value="trailer">Trailer</option>
                  <option value="purchase">Used vehicle (purchase)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              Send reservation request
            </button>

            <p className="mt-4 text-xs text-white/45">
              Submitted requests reach the Langley desk. We confirm by phone or email during open
              hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium uppercase tracking-eyebrow text-white/60">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent"
      />
    </div>
  );
}
