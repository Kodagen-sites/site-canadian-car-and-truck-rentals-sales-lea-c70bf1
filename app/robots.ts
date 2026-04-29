import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.seo.site_url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
