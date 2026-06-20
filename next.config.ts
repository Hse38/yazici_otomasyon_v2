import type { NextConfig } from "next";
import { SERVICE_SLUGS } from "./src/lib/seo";
import type { ServiceId } from "./src/data/services";

const productRedirects = (Object.entries(SERVICE_SLUGS) as [ServiceId, string][]).flatMap(
  ([id, slug]) => [
    {
      source: `/services/${id}`,
      destination: `/urunler/${slug}`,
      permanent: true,
    },
    {
      source: `/services/${slug}`,
      destination: `/urunler/${slug}`,
      permanent: true,
    },
  ]
);

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...productRedirects,
      {
        source: "/services/:path*",
        destination: "/urunler/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
