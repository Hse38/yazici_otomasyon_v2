"use client";

import Image from "next/image";
import Link from "next/link";
import { BranchPhoneCard } from "./BranchPhoneCard";
import { BRANCHES, CONTACT_EMAIL, WHATSAPP_HREF } from "../data/branches";
import { getServicePath, PRODUCT_CATEGORY_LABELS } from "../lib/seo";
import type { ServiceId } from "../data/services";

type FooterProps = {
  language: "tr" | "en";
};

const FOOTER_CATEGORY_IDS: ServiceId[] = [
  "product-1",
  "product-2",
  "product-3",
  "product-4",
  "product-5",
  "product-6",
];

const copy = {
  tr: {
    brandPositioning:
      "Endüstri 4.0 uyumlu sensör ve otomasyon çözümleri ile üretim süreçlerinizi daha verimli hale getiriyoruz.",
    categoriesTitle: "Ürün hatları",
    whyTitle: "Neden Biz?",
    whyBullets: [
      "Yerli üretim",
      "Teknik destek",
      "Hızlı tedarik",
      "Endüstriyel dayanıklılık",
    ],
    contactTitle: "İletişim",
    phoneLabel: "Telefon",
    emailLabel: "E-posta",
    locationLabel: "Lokasyon",
    location: "İstanbul & Trakya, Türkiye",
    whatsapp: "WhatsApp",
    ctaQuote: "Hızlı Teklif Al",
    explore: "Site",
    exploreLinks: {
      about: "Hakkımızda",
      gallery: "Galeri",
      products: "Ürünler",
      contact: "İletişim",
    },
    rights: "© 2026 Yazıcı Otomasyon. Tüm hakları saklıdır.",
    legalKvkk: "KVKK",
    legalPrivacy: "Gizlilik Politikası",
  },
  en: {
    brandPositioning:
      "Industry 4.0–ready sensors and automation solutions that make your production processes more efficient.",
    categoriesTitle: "Product lines",
    whyTitle: "Why us?",
    whyBullets: [
      "Domestic manufacturing",
      "Technical support",
      "Fast supply",
      "Industrial-grade durability",
    ],
    contactTitle: "Contact",
    phoneLabel: "Phone",
    emailLabel: "Email",
    locationLabel: "Location",
    location: "Istanbul & Thrace, Turkey",
    whatsapp: "WhatsApp",
    ctaQuote: "Request a quick quote",
    explore: "Explore",
    exploreLinks: {
      about: "About us",
      gallery: "Gallery",
      products: "Products",
      contact: "Contact",
    },
    rights: "© 2026 Yazıcı Otomasyon. All rights reserved.",
    legalKvkk: "KVKK notice",
    legalPrivacy: "Privacy policy",
  },
} as const;

export function Footer({ language }: FooterProps) {
  const t = copy[language];
  const categories = FOOTER_CATEGORY_IDS.map((id) => ({
    href: getServicePath(id),
    label: PRODUCT_CATEGORY_LABELS[id][language],
  }));

  return (
    <footer className="border-t border-white/[0.06] bg-[#050a10] text-white">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(41,171,226,0.12), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-3 pt-12 sm:px-10 sm:pb-4 sm:pt-16 lg:px-20 lg:pb-4 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-5 lg:space-y-6 lg:col-span-5">
              <Link href="/" className="inline-block transition opacity-90 hover:opacity-100">
                <Image
                  src="/img/logo1.png"
                  alt="Yazıcı Otomasyon"
                  width={220}
                  height={64}
                  className="h-11 w-auto object-contain sm:h-12"
                />
              </Link>
              <p className="max-w-md text-[15px] leading-relaxed tracking-tight text-white/78 sm:text-base sm:leading-relaxed">
                {t.brandPositioning}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-lilac px-8 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_-8px_rgba(41,171,226,0.45)] transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a10]"
                >
                  {t.ctaQuote}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
                {t.categoriesTitle}
              </h3>
              <nav className="mt-5 flex flex-col gap-3.5" aria-label={t.categoriesTitle}>
                {categories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-white/70 transition hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
                {t.whyTitle}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {t.whyBullets.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-sm font-medium leading-snug text-white/72"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lilac/90 shadow-[0_0_10px_rgba(41,171,226,0.6)]"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
                {t.contactTitle}
              </h3>
              <div className="mt-5 space-y-5 text-sm">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
                    {t.phoneLabel}
                  </p>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {BRANCHES.map((branch) => (
                      <BranchPhoneCard
                        key={branch.id}
                        branch={branch}
                        language={language}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
                    {t.emailLabel}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1.5 block font-medium text-white/80 transition hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
                    {t.locationLabel}
                  </p>
                  <p className="mt-1.5 font-medium text-white/80">{t.location}</p>
                </div>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-lilac/50 hover:bg-lilac/15 hover:text-soft-lavender focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac/50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {t.whatsapp}
                </a>
              </div>
            </div>
          </div>

          <nav
            className="mt-5 flex min-h-0 flex-wrap items-center gap-x-4 gap-y-0.5 border-t border-white/[0.06] py-2 sm:gap-x-6 sm:py-2.5"
            aria-label={t.explore}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/35">
              {t.explore}
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
            <Link
              href="/#why-us"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 transition hover:text-white"
            >
              {t.exploreLinks.about}
            </Link>
            <Link
              href="/#proof"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 transition hover:text-white"
            >
              {t.exploreLinks.gallery}
            </Link>
            <Link
              href="/#products"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 transition hover:text-white"
            >
              {t.exploreLinks.products}
            </Link>
            <Link
              href="/#contact"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 transition hover:text-white"
            >
              {t.exploreLinks.contact}
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-2.5 text-xs text-white/45 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:px-10 lg:px-20">
          <span className="order-2 sm:order-1">{t.rights}</span>
          <nav
            className="order-1 flex flex-wrap items-center gap-x-5 gap-y-1 sm:order-2"
            aria-label="Legal"
          >
            <Link
              href="/kvkk"
              className="font-medium text-white/55 transition hover:text-white focus:outline-none focus-visible:underline"
            >
              {t.legalKvkk}
            </Link>
            <span className="hidden text-white/20 sm:inline" aria-hidden>
              |
            </span>
            <Link
              href="/gizlilik-politikasi"
              className="font-medium text-white/55 transition hover:text-white focus:outline-none focus-visible:underline"
            >
              {t.legalPrivacy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
