import type { Metadata } from "next";
import { auth } from "@/auth";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SITE } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Christ-centered, excellent healthcare in Iloilo City`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_PH",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: SITE.name }],
  },
  twitter: { card: "summary" },
};

/** schema.org structured data for search engines. */
const hospitalJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: SITE.legalName,
  alternateName: SITE.shortName,
  url: SITE.url,
  logo: `${SITE.url}/sphlogo.png`,
  description: SITE.description,
  telephone: "+63-33-337-2742",
  email: SITE.contact.email,
  foundingDate: "1911",
  address: {
    "@type": "PostalAddress",
    streetAddress: "General Luna Street, Brgy. Danao",
    addressLocality: "Iloilo City",
    addressRegion: "Iloilo",
    postalCode: "5000",
    addressCountry: "PH",
  },
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: SITE.social.map((s) => s.href),
};

/**
 * Public marketing site shell. Reads the shared session so the header reflects
 * SSO state (signed-in visitors go straight to the app).
 */
export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
