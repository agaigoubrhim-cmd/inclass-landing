import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this application when another lockfile exists higher up.
  turbopack: {
    root: process.cwd(),
  },
  // Allow the Arena live-preview subdomains (e.g. 3000-*.e2b.app) during dev.
  allowedDevOrigins: ["*.e2b.app"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.inclass.app",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/profs",
        destination: "/comment-ca-marche/eleves",
        permanent: false,
      },
      {
        source: "/tuteurs",
        destination: "/comment-ca-marche/profs",
        permanent: false,
      },
      {
        source: "/parents",
        destination: "/comment-ca-marche/eleves#parents",
        permanent: false,
      },
      {
        source: "/tarifs",
        destination: "/comment-ca-marche/eleves",
        permanent: false,
      },
      {
        source: "/faq",
        destination: "/comment-ca-marche/eleves#faq",
        permanent: false,
      },
      {
        source: "/devenir-prof",
        destination: "/comment-ca-marche/profs",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
