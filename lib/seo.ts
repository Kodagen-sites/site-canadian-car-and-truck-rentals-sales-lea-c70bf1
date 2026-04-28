import { siteConfig } from "./site-config";

export function organizationJsonLd() {
  const a = siteConfig.contact.address;
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "AutoDealer", "LocalBusiness"],
    name: siteConfig.brand.nameFull,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: ["Langley", "Surrey", "Abbotsford", "Vancouver", "Fraser Valley"],
  };
}

export function serviceJsonLd(service: { name: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: `${siteConfig.seo.siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.brand.nameFull,
      telephone: siteConfig.contact.phone,
    },
    areaServed: "Fraser Valley, BC",
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.seo.siteUrl}${it.href}`,
    })),
  };
}
