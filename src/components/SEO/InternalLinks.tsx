"use client";

import Link from "next/link";
import type { ServiceId } from "../../data/services";
import { serviceSlugMap, type Language } from "../../lib/seo";

type InternalLinksProps = {
  currentServiceId: ServiceId;
  language: Language;
};

const relatedProducts: Record<ServiceId, ServiceId[]> = {
  "product-1": ["product-2", "product-6"],
  "product-2": ["product-1", "product-3"],
  "product-3": ["product-2", "product-4"],
  "product-4": ["product-3", "product-5"],
  "product-5": ["product-4", "product-6"],
  "product-6": ["product-5", "product-1"],
};

const anchorTexts: Record<ServiceId, { tr: string[]; en: string[] }> = {
  "product-1": {
    tr: ["Ürün 1 detayları", "otomasyon ürünü"],
    en: ["Product 1 details", "automation product"],
  },
  "product-2": {
    tr: ["Ürün 2 detayları", "otomasyon ürünü"],
    en: ["Product 2 details", "automation product"],
  },
  "product-3": {
    tr: ["Ürün 3 detayları", "otomasyon ürünü"],
    en: ["Product 3 details", "automation product"],
  },
  "product-4": {
    tr: ["Ürün 4 detayları", "otomasyon ürünü"],
    en: ["Product 4 details", "automation product"],
  },
  "product-5": {
    tr: ["Ürün 5 detayları", "otomasyon ürünü"],
    en: ["Product 5 details", "automation product"],
  },
  "product-6": {
    tr: ["Ürün 6 detayları", "otomasyon ürünü"],
    en: ["Product 6 details", "automation product"],
  },
};

export function InternalLinks({
  currentServiceId,
  language,
}: InternalLinksProps) {
  const related = relatedProducts[currentServiceId] || [];

  if (related.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-2xl font-semibold text-dark sm:text-3xl">
          {language === "tr" ? "Diğer Ürünler" : "Other Products"}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((serviceId) => {
            const slug = serviceSlugMap[serviceId]?.[language] || serviceId;
            const texts = anchorTexts[serviceId]?.[language] || [];
            const anchorText = texts[0] || serviceId;

            return (
              <Link
                key={serviceId}
                href={`/services/${slug}`}
                className="group rounded-2xl border border-dark/10 bg-white p-6 transition hover:border-lilac/50 hover:shadow-lg"
              >
                <h3 className="mb-2 text-lg font-semibold text-dark group-hover:text-lilac">
                  {anchorText}
                </h3>
                <p className="text-sm text-dark/70">
                  {language === "tr" ? "Detayları görüntüle" : "View details"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
