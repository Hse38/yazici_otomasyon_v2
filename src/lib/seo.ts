import type { ServiceId } from "../data/services";
import type { ServiceData } from "../data/services";

export type Language = "tr" | "en";

export const SITE_ORIGIN = "https://yaziciotomasyon.com";

export const serviceSlugMap: Record<ServiceId, { tr: string; en: string }> = {
  "product-1": { tr: "product-1", en: "product-1" },
  "product-2": { tr: "product-2", en: "product-2" },
  "product-3": { tr: "product-3", en: "product-3" },
  "product-4": { tr: "product-4", en: "product-4" },
  "product-5": { tr: "product-5", en: "product-5" },
  "product-6": { tr: "product-6", en: "product-6" },
};

export const keywordClusters = {
  commercial: {
    tr: [
      "endüstriyel otomasyon",
      "sürücü",
      "PLC",
      "HMI",
      "sensör",
      "saha ekipmanları",
    ],
    en: [
      "industrial automation",
      "drives",
      "PLC",
      "HMI",
      "sensors",
      "field devices",
    ],
  },
  midFunnel: {
    tr: [
      "tesis otomasyonu",
      "makina otomasyonu",
      "süreç kontrolü",
      "endüstriyel ürün tedariki",
    ],
    en: [
      "plant automation",
      "machine automation",
      "process control",
      "industrial product supply",
    ],
  },
  informational: {
    tr: [
      "otomasyon ürün seçimi",
      "teknik veri sayfası",
      "uyumluluk kontrolü",
    ],
    en: [
      "automation product selection",
      "datasheet review",
      "compatibility check",
    ],
  },
};

export function generateMetaTitle(
  service: ServiceData | null,
  language: Language
): string {
  const baseBrand = "Yazıcı Otomasyon";

  if (!service) {
    return language === "tr"
      ? `Endüstriyel Otomasyon Ürünleri | ${baseBrand}`
      : `Industrial Automation Products | ${baseBrand}`;
  }

  const content = service[language];
  return `${content.title} | ${baseBrand}`;
}

export function generateMetaDescription(
  service: ServiceData | null,
  language: Language
): string {
  if (!service) {
    return language === "tr"
      ? "Yazıcı Otomasyon: endüstriyel otomasyon ürünleri, teknik danışmanlık ve tedarik. Ürünlerimizi inceleyin, stok ve teknik bilgi için arayın."
      : "Yazıcı Otomasyon: industrial automation products, technical guidance, and supply. Browse our products and call for availability.";
  }

  const content = service[language];
  const capacity = content.capacity;

  const description =
    language === "tr"
      ? `${content.description} Özet: ${capacity.dailyProduction}. Kapsam: ${capacity.eventSize}. ${capacity.description} Teklif ve bilgi için iletişime geçin.`
      : `${content.description} Summary: ${capacity.dailyProduction}. Scope: ${capacity.eventSize}. ${capacity.description} Contact us for a quote.`;

  if (description.length > 160) {
    return description.substring(0, 157) + "...";
  }
  return description;
}

export function generateCanonicalUrl(
  serviceId: ServiceId | null,
  language: Language
): string {
  if (!serviceId) {
    return SITE_ORIGIN;
  }

  const slug = serviceSlugMap[serviceId]?.[language] || serviceId;
  return `${SITE_ORIGIN}/services/${slug}`;
}

export function generateBreadcrumbs(
  service: ServiceData | null,
  language: Language
): Array<{ name: string; url: string }> {
  const items = [
    {
      name: language === "tr" ? "Ana Sayfa" : "Home",
      url: SITE_ORIGIN,
    },
  ];

  if (service) {
    items.push({
      name: language === "tr" ? "Ürünler" : "Products",
      url: `${SITE_ORIGIN}/#products`,
    });

    items.push({
      name: service[language].title,
      url: generateCanonicalUrl(service.id, language),
    });
  }

  return items;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yazıcı Otomasyon",
  alternateName: "YAZICI OTOMASYON",
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/img/yazici-logo.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+90-553-056-89-39",
      contactType: "sales",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
  },
  sameAs: [] as string[],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_ORIGIN}/#organization`,
  name: "Yazıcı Otomasyon",
  image: `${SITE_ORIGIN}/img/yazici-logo.png`,
  telephone: "+90-553-056-89-39",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
  },
  areaServed: {
    "@type": "Country",
    name: "Turkey",
  },
  priceRange: "$$",
};
