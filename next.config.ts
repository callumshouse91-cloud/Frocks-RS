import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All photos are local files in public/images. Nothing is fetched from elsewhere.
  images: { remotePatterns: [] },
};

export default nextConfig;
