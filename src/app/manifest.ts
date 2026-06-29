import type { MetadataRoute } from "next";

/**
 * Web App Manifest — served at /manifest.webmanifest.
 * Makes the SPH patient app installable (PWA-first per the HIS roadmap).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "St. Paul's Hospital of Iloilo — Patient App",
    short_name: "SPH Patient",
    description:
      "Book ancillary appointments, view your records and results, message the hospital, and manage your care — St. Paul's Hospital of Iloilo.",
    id: "/",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f7f6",
    theme_color: "#0e5a48",
    categories: ["medical", "health", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
