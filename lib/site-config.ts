// Single source of truth for all public-site copy + branding.
// Sourced from content/refined-copy.json and content/generation-manifest.json.

import refined from "@/content/refined-copy.json";
import manifest from "@/content/generation-manifest.json";

export type CtaLink = { label: string; href: string };
export type ServiceItem = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  primaryCta: CtaLink;
};

export const siteConfig = {
  brand: {
    name: refined.brand.legal_name,
    short: refined.brand.name,
    wordmark: refined.brand.wordmark_short,
    tagline: refined.brand.tagline,
    accent: manifest.color_profile.palette.amber,
  },
  hero: refined.hero,
  stats: refined.stats,
  services: refined.services as ServiceItem[],
  rentalClasses: refined.rental_classes,
  inventory: refined.inventory_for_sale,
  about: refined.about,
  benefits: refined.benefits,
  contact: refined.contact,
  reserve: refined.reserve,
  cta: refined.cta_section,
  footer: refined.footer,
  seo: refined.seo,
  colors: manifest.color_profile,
  variant: {
    archetype: manifest.archetype,
    style: manifest.style,
    voice: manifest.voice_family,
    header: manifest.header_variant,
    footer: manifest.footer_variant,
    hero_treatment: manifest.hero_treatment,
    motion_bg_pattern: manifest.motion_bg_pattern,
  },
  fonts: manifest.fonts,
  social: {
    facebook: "https://www.facebook.com/Canadian-Car-and-Truck-Rentals-Sales-and-Leasing-129368863834916",
    instagram: "https://www.instagram.com/canadiancarandtruck",
    twitter: "https://twitter.com/cdncartruck",
  },
};

export const phone = {
  local: refined.contact.phone_local,
  tollfree: refined.contact.phone_tollfree,
  localTel: "+16045328828",
  tollfreeTel: "+18882277817",
};
