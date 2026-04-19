import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "../lib/seo";
import type { ServiceId } from "../data/services";

const SERVICE_IDS: ServiceId[] = [
  "product-1",
  "product-2",
  "product-3",
  "product-4",
  "product-5",
  "product-6",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getPublicSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${base}/gizlilik-politikasi`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_IDS.map((id) => ({
    url: `${base}/services/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...serviceEntries];
}
