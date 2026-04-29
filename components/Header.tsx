"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig, phone } from "@/lib/site-config";

const navItems = [
  { label: "Rentals", href: "/services/vehicle-rentals" },
  { label: "Sales", href: "/services/pre-owned-vehicle-sales" },
  { label: "Financing", href: "/services/vehicle-financing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility strip — phone, hours, address */}
      <div className="hidden md:block border-b border-white/5 bg-graphite/95 backdrop-blur-md text-[12px]">
        <div className="container-narrow flex items-center justify-between py-2 text-white/60">
          <div className="flex items-center gap-6">
            <span className="font-mono">20026 Fraser Hwy · Langley, BC</span>
            <span className="font-mono">Mon–Fri 8:00–5:30 · Sat 8:00–4:30</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${phone.localTel}`} className="font-mono hover:text-amber transition-colors">
              {phone.local}
            </a>
            <span className="text-white/30">·</span>
            <a href={`tel:${phone.tollfreeTel}`} className="font-mono hover:text-amber transition-colors">
              Toll-free {phone.tollfree}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-colors ${
          scrolled
            ? "bg-graphite/95 backdrop-blur-xl border-b border-white/8"
            : "bg-graphite/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container-narrow flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 group" aria-label={siteConfig.brand.name}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-amber text-graphite font-display font-semibold text-sm tracking-tight">
              {siteConfig.brand.wordmark}
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-[15px] text-white tracking-tight">
                Canadian Car &amp; Truck
              </span>
              <span className="text-[10px] uppercase tracking-eyebrow text-white/50">
                Rentals · Sales · Leasing
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-white/80 hover:text-amber transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.localTel}`}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Call us"
            >
              <Phone size={16} />
            </a>
            <Link
              href="/reserve"
              className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5"
            >
              Reserve a Vehicle
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-graphite text-ivory md:hidden">
          <div className="container-narrow flex items-center justify-between py-4 border-b border-white/10">
            <span className="font-display text-lg">Canadian Car &amp; Truck</span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="container-narrow flex flex-col gap-2 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-2xl font-display py-3 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/reserve"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-6 justify-center"
            >
              Reserve a Vehicle
            </Link>
            <a href={`tel:${phone.localTel}`} className="btn-secondary mt-3 justify-center">
              Call {phone.local}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
