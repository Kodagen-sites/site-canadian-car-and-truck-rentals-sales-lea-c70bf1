import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.seo.site_url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "/",
    "/services",
    "/about",
    "/contact",
    "/reserve",
    ...siteConfig.services.map((s) => `/services/${s.slug}`),
  ];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
