import type { MetadataRoute } from "next";
import { SITE } from "@/components/marketing/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/dashboard", "/patients", "/doctors", "/profile", "/inquiries", "/kitchen-sink", "/search"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
