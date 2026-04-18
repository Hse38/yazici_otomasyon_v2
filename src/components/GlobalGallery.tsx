"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export type GlobalGalleryImage = {
  src: string;
  alt: string;
  serviceSlug: string;
  serviceTitle: string;
};

type GlobalGalleryProps = {
  language?: "tr" | "en";
};

const productTitles = {
  "product-1": { tr: "Ürün 1", en: "Product 1" },
  "product-2": { tr: "Ürün 2", en: "Product 2" },
  "product-3": { tr: "Ürün 3", en: "Product 3" },
  "product-4": { tr: "Ürün 4", en: "Product 4" },
  "product-5": { tr: "Ürün 5", en: "Product 5" },
  "product-6": { tr: "Ürün 6", en: "Product 6" },
} as const;

export function getGlobalGalleryImages(
  language: "tr" | "en" = "tr"
): GlobalGalleryImage[] {
  const images: GlobalGalleryImage[] = [];
  (Object.keys(productTitles) as Array<keyof typeof productTitles>).forEach(
    (slug) => {
      const n = slug.replace("product-", "");
      images.push({
        src: `/img/product-${n}.jpg`,
        alt:
          language === "tr"
            ? `${productTitles[slug].tr} — Yazıcı Otomasyon`
            : `${productTitles[slug].en} — Yazıcı Otomasyon`,
        serviceSlug: slug,
        serviceTitle: productTitles[slug][language],
      });
    }
  );
  return images;
}

export function GlobalGallery({ language = "tr" }: GlobalGalleryProps) {
  const images = useMemo(() => getGlobalGalleryImages(language), [language]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Link
            href={`/services/${image.serviceSlug}`}
            className="group block overflow-hidden rounded-2xl border border-dark/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-dark">{image.serviceTitle}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
