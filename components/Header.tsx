"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-900/85 backdrop-blur-md">
      {/* Utility strip */}
      <div className="hidden border-b border-line/60 bg-ink-800/60 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-white/55">
          <span className="tracking-wide">
            20026 Fraser Hwy · Langley, BC · Open during posted hours
          </span>
          <div className="flex items-center gap-6">
            <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-accent">
              {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={siteConfig.contact.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              Directions
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-page flex h-16 items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded border border-line bg-ink-800">
            <span className="text-[10px] font-bold tracking-widest text-accent">CCT</span>
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
            {siteConfig.brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.primary.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.isDropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-accent"
              >
                {item.label}
                {item.isDropdown && <span className="ml-1 text-[9px]">▾</span>}
              </Link>
              {item.isDropdown && openDropdown === item.label && item.subitems && (
                <div className="absolute left-0 top-full w-64 rounded-md border border-line bg-ink-800/95 p-2 shadow-lg backdrop-blur">
                  {item.subitems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block rounded px-3 py-2 text-sm text-white/75 hover:bg-ink-700 hover:text-accent"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="hidden text-sm font-medium text-white/80 hover:text-accent lg:inline"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
          <Link href={siteConfig.nav.primaryCta.href} className="btn-primary hidden sm:inline-flex">
            {siteConfig.nav.primaryCta.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpenMobile((v) => !v)}
            aria-label="Toggle navigation"
            className="grid h-10 w-10 place-items-center rounded border border-line text-white lg:hidden"
          >
            <span className="text-lg leading-none">{openMobile ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {openMobile && (
        <div className="border-t border-line bg-ink-900/95 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {siteConfig.nav.primary.map((item) => (
              <div key={item.label} className="border-b border-line/40 py-2">
                <Link
                  href={item.href}
                  onClick={() => setOpenMobile(false)}
                  className="block py-2 text-base font-medium text-white"
                >
                  {item.label}
                </Link>
                {item.subitems &&
                  item.subitems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setOpenMobile(false)}
                      className="block pl-4 py-1.5 text-sm text-white/70"
                    >
                      ↳ {sub.label}
                    </Link>
                  ))}
              </div>
            ))}
            <Link
              href={siteConfig.nav.primaryCta.href}
              onClick={() => setOpenMobile(false)}
              className="btn-primary mt-3 w-full"
            >
              {siteConfig.nav.primaryCta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
