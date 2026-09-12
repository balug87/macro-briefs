import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old scaffold used /archive. Keep those URLs working.
  async redirects() {
    return [
      { source: "/archive", destination: "/briefs", permanent: true },
      { source: "/archive/:slug", destination: "/briefs/:slug", permanent: true }
    ];
  }
};

export default nextConfig;
