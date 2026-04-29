import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.seo.site_url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.seo.default_title,
    template: `%s · ${siteConfig.brand.short}`,
  },
  description: siteConfig.seo.default_description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: SITE_URL,
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.default_title,
    description: siteConfig.seo.default_description,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: siteConfig.brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.default_title,
    description: siteConfig.seo.default_description,
    site: siteConfig.seo.twitter_handle,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e1218",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]),
          }}
        />
      </head>
      <body className="min-h-screen bg-graphite text-ivory antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
