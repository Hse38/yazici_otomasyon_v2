"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  getServicePath,
  PRODUCT_CATEGORY_LABELS,
  SERVICE_IDS,
} from "../lib/seo";
import type { ServiceId } from "../data/services";

export type GlobalGalleryImage = {
  src: string;
  alt: string;
  serviceId: ServiceId;
  serviceTitle: string;
};

type GlobalGalleryProps = {
  language?: "tr" | "en";
};

export function getGlobalGalleryImages(
  language: "tr" | "en" = "tr"
): GlobalGalleryImage[] {
  return SERVICE_IDS.map((serviceId) => {
    const n = serviceId.replace("product-", "");
    const labels = PRODUCT_CATEGORY_LABELS[serviceId];
    return {
      src: `/img/product-${n}.jpg`,
      alt: `${labels[language]} — Yazıcı Otomasyon endüstriyel otomasyon`,
      serviceId,
      serviceTitle: labels[language],
    };
  });
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
            href={getServicePath(image.serviceId)}
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
