import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const COLUMNS = [
  {
    heading: "Rent",
    items: [
      { label: "Cars, SUVs & Vans", href: "/services/car-suv-van-rentals" },
      { label: "Moving Trucks", href: "/services/moving-truck-rentals" },
      { label: "Trailers", href: "/services/trailer-rentals" },
    ],
  },
  {
    heading: "Buy",
    items: [
      { label: "Pre-Owned Vehicles", href: "/services/pre-owned-vehicle-sales" },
      { label: "In-House Financing", href: "/services/in-house-financing" },
      { label: "Leasing", href: "/services/leasing" },
    ],
  },
  {
    heading: "Visit",
    items: [
      { label: "Langley Yard", href: "/contact" },
      { label: "About Us", href: "/about" },
      { label: "Reserve a Vehicle", href: "/reserve" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-900">
      <div className="container-page py-16 sm:py-20">
        {/* Top: brand + columns */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded border border-line bg-ink-800">
                <span className="text-[11px] font-bold tracking-widest text-accent">CCT</span>
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">
                {siteConfig.brand.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.brand.tagline} A working Fraser Valley yard with rentals, used vehicle
              sales, and in-house financing all at one desk.
            </p>

            <div className="mt-8 space-y-2 text-sm text-white/65">
              <p>{siteConfig.contact.address.street}</p>
              <p>
                {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{" "}
                {siteConfig.contact.address.postalCode}
              </p>
              <p>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-accent">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-accent">
                  {col.heading}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-line my-10" />

        {/* Disclaimer + copyright */}
        <div className="flex flex-col gap-4 text-xs text-white/45 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xl leading-relaxed">{siteConfig.legal.footerDisclaimer}</p>
          <p>
            © {year} {siteConfig.legal.copyrightHolder}.
          </p>
        </div>
      </div>
    </footer>
  );
}
