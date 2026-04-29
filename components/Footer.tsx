import Link from "next/link";
import { siteConfig, phone } from "@/lib/site-config";

const cols = [
  {
    heading: "Rentals",
    items: [
      { label: "Cars & SUVs", href: "/services/vehicle-rentals" },
      { label: "Vans", href: "/services/vehicle-rentals" },
      { label: "Trucks", href: "/services/vehicle-rentals" },
      { label: "Moving Trucks", href: "/services/moving-truck-rentals" },
      { label: "Trailers", href: "/services/trailer-rentals" },
    ],
  },
  {
    heading: "Sales & Leasing",
    items: [
      { label: "Pre-Owned Inventory", href: "/services/pre-owned-vehicle-sales" },
      { label: "Financing", href: "/services/vehicle-financing" },
      { label: "Leasing", href: "/services/vehicle-leasing" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Reserve", href: "/reserve" },
    ],
  },
  {
    heading: "Visit",
    items: [
      { label: "20026 Fraser Hwy", href: "/contact" },
      { label: "Langley, BC V3A 4E5", href: "/contact" },
      { label: "Mon–Fri 8:00–5:30", href: "/contact" },
      { label: "Sat 8:00–4:30 · Sun closed", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-graphite mt-20">
      <div className="container-narrow py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label={siteConfig.brand.name}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber text-graphite font-display font-semibold tracking-tight">
                {siteConfig.brand.wordmark}
              </span>
              <span className="font-display text-base text-white">
                Canadian Car &amp; Truck
              </span>
            </Link>
            <p className="text-sm text-white/65 max-w-xs leading-relaxed">
              {siteConfig.footer.brandStatement}
            </p>
            <div className="flex gap-4 pt-2">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener" className="text-white/50 hover:text-amber text-xs">Facebook</a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener" className="text-white/50 hover:text-amber text-xs">Instagram</a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener" className="text-white/50 hover:text-amber text-xs">X</a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading} className="md:col-span-2 space-y-3">
              <h4 className="font-display text-[12px] uppercase tracking-eyebrow text-amber/90">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.items.map((it) => (
                  <li key={`${col.heading}-${it.label}`}>
                    <Link href={it.href} className="text-[13px] text-white/70 hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider my-10" />

        <div className="grid gap-6 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p className="font-display text-2xl text-white">
              {siteConfig.footer.ctaHeadline}
            </p>
            <p className="text-white/60 text-sm mt-2">
              Reserve online or call the desk. Either path puts a working vehicle on the lot for you.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <Link href="/reserve" className="btn-primary">Reserve a Vehicle</Link>
            <a href={`tel:${phone.localTel}`} className="btn-secondary">Call {phone.local}</a>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center text-[12px] text-white/40">
          {siteConfig.footer.footnotes.map((line: string) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
