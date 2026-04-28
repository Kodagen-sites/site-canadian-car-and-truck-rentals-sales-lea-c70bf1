import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function InventoryTeaser() {
  const { inventoryTeaser } = siteConfig;

  return (
    <section className="border-b border-line bg-ink-800/40 py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">{inventoryTeaser.eyebrow}</span>
            <h2 className="display-h2 mt-4">{inventoryTeaser.h2}</h2>
            <p className="body-md mt-5">{inventoryTeaser.body}</p>
          </div>
          <Link
            href="/services/pre-owned-vehicle-sales"
            className="btn-secondary self-start sm:self-end"
          >
            See all vehicles →
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg border border-line">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="bg-ink-800 font-mono text-[11px] uppercase tracking-eyebrow text-accent">
              <tr>
                <th className="hidden w-20 px-5 py-3 sm:table-cell">Year</th>
                <th className="px-5 py-3">Vehicle</th>
                <th className="hidden px-5 py-3 md:table-cell">Type</th>
                <th className="w-24 px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {inventoryTeaser.items.map((row) => (
                <tr key={`${row.year}-${row.name}`} className="bg-ink-900 hover:bg-ink-800/70">
                  <td className="hidden px-5 py-4 font-mono text-white/55 sm:table-cell">
                    {row.year}
                  </td>
                  <td className="px-5 py-4 font-medium text-white">
                    <span className="sm:hidden">{row.year} </span>
                    {row.name}
                  </td>
                  <td className="hidden px-5 py-4 text-white/60 md:table-cell">{row.type}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent/15 px-2 py-1 font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      On lot
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs text-white/45">{inventoryTeaser.footnote}</p>
      </div>
    </section>
  );
}
