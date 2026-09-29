import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // News images are CMS-managed URLs; allow any HTTPS host so next/image can optimize them.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
