"use client";

import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  language: "tr" | "en";
};

const productLinks = {
  tr: [
    { id: "product-1", title: "Ürün 1" },
    { id: "product-2", title: "Ürün 2" },
    { id: "product-3", title: "Ürün 3" },
    { id: "product-4", title: "Ürün 4" },
    { id: "product-5", title: "Ürün 5" },
    { id: "product-6", title: "Ürün 6" },
  ],
  en: [
    { id: "product-1", title: "Product 1" },
    { id: "product-2", title: "Product 2" },
    { id: "product-3", title: "Product 3" },
    { id: "product-4", title: "Product 4" },
    { id: "product-5", title: "Product 5" },
    { id: "product-6", title: "Product 6" },
  ],
} as const;

const footerContent = {
  tr: {
    brand: {
      statement:
        "Endüstriyel otomasyon ürünleri, teknik danışmanlık ve güvenilir tedarik.",
    },
    services: "Ürünler",
    company: "Şirket",
    companyLinks: {
      about: "Hakkımızda",
      gallery: "Galeri",
      process: "Ürünler",
      contact: "İletişim",
    },
    contact: "İletişim",
    rights: "© 2026 Yazıcı Otomasyon. Tüm hakları saklıdır.",
    location: "Türkiye",
  },
  en: {
    brand: {
      statement:
        "Industrial automation products, technical guidance, and dependable supply.",
    },
    services: "Products",
    company: "Company",
    companyLinks: {
      about: "About Us",
      gallery: "Gallery",
      process: "Products",
      contact: "Contact",
    },
    contact: "Contact",
    rights: "© 2026 Yazıcı Otomasyon. All rights reserved.",
    location: "Turkey",
  },
};

export function Footer({ language }: FooterProps) {
  const content = footerContent[language];
  const productList = productLinks[language];
  const contactInfo = {
    phone: "+90 553 056 89 39",
  };

  return (
    <footer className="bg-dark/95 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/img/yazici-logo.png"
                alt="Yazıcı Otomasyon"
                width={200}
                height={60}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              {content.brand.statement}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {content.services}
            </h3>
            <nav className="flex flex-col gap-3">
              {productList.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {content.company}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/#why-us"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.about}
              </Link>
              <Link
                href="/#proof"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.gallery}
              </Link>
              <Link
                href="/#products"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.process}
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
              >
                {content.companyLinks.contact}
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {content.contact}
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="block transition hover:text-white focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                aria-label={`${language === "tr" ? "Ara" : "Call"} ${contactInfo.phone}`}
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-xs text-white/50 sm:px-10 sm:flex-row sm:items-center sm:justify-between lg:px-20">
          <span>{content.rights}</span>
          <span>{content.location}</span>
        </div>
      </div>
    </footer>
  );
}
