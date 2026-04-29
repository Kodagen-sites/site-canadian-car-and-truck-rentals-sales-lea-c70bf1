import { siteConfig } from "./site-config";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand.name,
    url: siteConfig.seo.site_url,
    logo: `${siteConfig.seo.site_url}/og-default.png`,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.twitter],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone_local,
        contactType: "reservations",
        areaServed: "CA",
        availableLanguage: "English",
      },
    ],
  };
}

export function localBusinessJsonLd(): JsonLd {
  const { address, geo } = siteConfig.seo;
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "AutoDealer", "LocalBusiness"],
    name: siteConfig.brand.name,
    image: `${siteConfig.seo.site_url}/og-default.png`,
    "@id": siteConfig.seo.site_url,
    url: siteConfig.seo.site_url,
    telephone: siteConfig.contact.phone_local,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postal_code,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:30",
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand.name,
    url: siteConfig.seo.site_url,
    inLanguage: siteConfig.seo.locale.replace("_", "-"),
  };
}

export function serviceJsonLd(slug: string, name: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: siteConfig.brand.name,
      url: siteConfig.seo.site_url,
    },
    url: `${siteConfig.seo.site_url}/services/${slug}`,
    areaServed: { "@type": "Place", name: "Langley + Fraser Valley, BC" },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
