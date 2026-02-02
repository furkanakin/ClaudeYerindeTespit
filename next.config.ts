import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // SEO-friendly URL rewrites for English locale
  async rewrites() {
    return [
      // English SEO URLs -> Internal Turkish routes
      { source: '/en/about', destination: '/en/hakkimizda' },
      { source: '/en/packages', destination: '/en/paketler' },
      { source: '/en/faq', destination: '/en/sss' },
      { source: '/en/contact', destination: '/en/iletisim' },
      { source: '/en/privacy', destination: '/en/gizlilik' },
      { source: '/en/gdpr', destination: '/en/kvkk' },
      { source: '/en/terms', destination: '/en/kullanim-kosullari' },
      { source: '/en/agreements', destination: '/en/sozlesmeler' },
    ];
  },
};

export default nextConfig;
