import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],  // serve avif first, webp fallback
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // cache images for 1 year
  },
};

export default nextConfig;