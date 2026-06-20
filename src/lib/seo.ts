import type { ServiceId } from "../data/services";
import type { ServiceData } from "../data/services";
import { BRANCHES } from "../data/branches";

export type Language = "tr" | "en";

/** Varsayılan canlı site; `NEXT_PUBLIC_SITE_URL` ile deploy ortamında override edin. */
export const SITE_ORIGIN = "https://yaziciotomasyon.com";

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const withProto = (value: string) => {
  const v = value.trim();
  if (!v) return SITE_ORIGIN;
  if (v.startsWith("http://") || v.startsWith("https://")) return stripTrailingSlash(v);
  return `https://${stripTrailingSlash(v)}`;
};

/**
 * Kanonik site kökü: önce `NEXT_PUBLIC_SITE_URL`, sonra Vercel host, son olarak SITE_ORIGIN.
 */
export function getPublicSiteUrl(): string {
  if (typeof process === "undefined") return SITE_ORIGIN;

  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return withProto(explicit);

  if (process.env.VERCEL_ENV === "production") {
    const host =
      process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
    if (host) return withProto(host);
  }
  if (process.env.VERCEL_URL) return withProto(process.env.VERCEL_URL);
  return SITE_ORIGIN;
}

/** Keyword slug'lar — kanonik URL parçası */
export const SERVICE_SLUGS: Record<ServiceId, string> = {
  "product-1": "safety-sistemleri",
  "product-2": "sensor-sistemleri",
  "product-3": "kontrol-sistemleri",
  "product-4": "encoder-cozumleri",
  "product-5": "instrument-cozumleri",
  "product-6": "pano-guc-bilesenleri",
};

export const SLUG_TO_SERVICE_ID: Record<string, ServiceId> = Object.fromEntries(
  (Object.entries(SERVICE_SLUGS) as [ServiceId, string][]).map(([id, slug]) => [slug, id])
) as Record<string, ServiceId>;

/** Geriye dönük uyumluluk */
export const serviceSlugMap: Record<ServiceId, { tr: string; en: string }> = Object.fromEntries(
  (Object.entries(SERVICE_SLUGS) as [ServiceId, string][]).map(([id, slug]) => [
    id,
    { tr: slug, en: slug },
  ])
) as Record<ServiceId, { tr: string; en: string }>;

export const PRODUCT_CATEGORY_LABELS: Record<
  ServiceId,
  { tr: string; en: string }
> = {
  "product-1": { tr: "Safety Sistemleri", en: "Safety Systems" },
  "product-2": { tr: "Sensör Sistemleri", en: "Sensor Systems" },
  "product-3": { tr: "Kontrol Sistemleri", en: "Control Systems" },
  "product-4": { tr: "Encoder Çözümleri", en: "Encoder Solutions" },
  "product-5": { tr: "Instrument Çözümleri", en: "Instrument Solutions" },
  "product-6": { tr: "Pano & Güç Bileşenleri", en: "Panel & Power Components" },
};

export const SERVICE_IDS = Object.keys(SERVICE_SLUGS) as ServiceId[];

export function getServiceSlug(serviceId: ServiceId): string {
  return SERVICE_SLUGS[serviceId];
}

export function getServicePath(serviceId: ServiceId): string {
  return `/urunler/${SERVICE_SLUGS[serviceId]}`;
}

export function resolveServiceIdFromParam(param: string | undefined): ServiceId | undefined {
  if (!param) return undefined;
  if (/^product-[1-6]$/.test(param)) return param as ServiceId;
  return SLUG_TO_SERVICE_ID[param];
}

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

export type ServiceSeoOverride = {
  title: string;
  description: string;
  ogImageAlt: string;
  ogImage?: string;
};

export const serviceSeoOverrides: Record<
  ServiceId,
  Record<Language, ServiceSeoOverride>
> = {
  "product-1": {
    tr: {
      title: "Safety Sistemleri | Makine Emniyet ve Interlock | Yazıcı Otomasyon",
      description:
        "Schmersal, Pilz ve Sick markalarıyla makine emniyet mimarisi, interlock, acil stop ve ISO 13849 uyumlu safety çözümleri. İstanbul teknik destek.",
      ogImageAlt: "Schmersal güvenlik anahtarı — makine emniyet sistemleri",
      ogImage: "/img/safety-detail-hero.png",
    },
    en: {
      title: "Safety Systems | Machine Safety & Interlock | Yazıcı Otomasyon",
      description:
        "Machine safety architecture with Schmersal, Pilz, and Sick — interlock, emergency stop, and ISO 13849 aligned solutions with Istanbul support.",
      ogImageAlt: "Schmersal safety switch — machine safety systems",
      ogImage: "/img/safety-detail-hero.png",
    },
  },
  "product-2": {
    tr: {
      title: "Endüstriyel Sensör Sistemleri | Otomasyon Sensörleri | Yazıcı Otomasyon",
      description:
        "Endüstriyel sensör çözümleri: endüktif, kapasitif, fotosel, fiber optik ve görüntü işleme sistemleri. İstanbul yerinde teknik destek.",
      ogImageAlt: "Endüstriyel proximity sensör — otomasyon algılama sistemleri",
      ogImage: "/img/sensor-detail-hero.png",
    },
    en: {
      title: "Industrial Sensor Systems | Automation Sensors | Yazıcı Otomasyon",
      description:
        "Industrial sensor solutions including inductive, capacitive, photoelectric, fiber optic, and vision systems with on-site support in Istanbul.",
      ogImageAlt: "Industrial proximity sensor — automation sensing systems",
      ogImage: "/img/sensor-detail-hero.png",
    },
  },
  "product-3": {
    tr: {
      title: "PLC, HMI ve SCADA Sistemleri | Endüstriyel Kontrol Sistemleri | Yazıcı Otomasyon",
      description:
        "PLC, HMI ve SCADA tabanlı endüstriyel kontrol sistemleri. Üretim hatları için gerçek zamanlı kontrol ve otomasyon çözümleri.",
      ogImageAlt: "Siemens PLC kontrol paneli — endüstriyel kontrol sistemleri",
      ogImage: "/img/control-system-detail-hero.png",
    },
    en: {
      title: "PLC, HMI and SCADA Systems | Industrial Control Systems | Yazıcı Otomasyon",
      description:
        "Industrial control systems based on PLC, HMI, and SCADA for real-time automation in production lines.",
      ogImageAlt: "Siemens PLC control panel — industrial control systems",
      ogImage: "/img/control-system-detail-hero.png",
    },
  },
  "product-4": {
    tr: {
      title: "Endüstriyel Encoder Sistemleri | Rotary & Linear Encoder | Yazıcı Otomasyon",
      description:
        "Endüstriyel encoder çözümleri: rotary encoder, linear encoder, mutlak ve artımlı encoder sistemleri. Yüksek hassasiyetli pozisyon ve hız ölçümü.",
      ogImageAlt: "Endüstriyel rotary encoder — hassas pozisyon ölçümü",
      ogImage: "/img/encoder-detail-hero.png",
    },
    en: {
      title: "Industrial Encoder Systems | Rotary & Linear Encoders | Yazıcı Otomasyon",
      description:
        "Industrial encoder solutions: rotary encoders, linear encoders, absolute and incremental systems for high-precision position and speed measurement.",
      ogImageAlt: "Industrial rotary encoder — precision position measurement",
      ogImage: "/img/encoder-detail-hero.png",
    },
  },
  "product-5": {
    tr: {
      title: "Instrument Çözümleri | Saha Ölçüm ve Enstrümantasyon | Yazıcı Otomasyon",
      description:
        "Basınç, sıcaklık, seviye ve akış ölçümü için Endress+Hauser, WIKA ve Yokogawa enstrümantasyon çözümleri. Proses güvenilirliği ve izlenebilirlik.",
      ogImageAlt: "Endüstriyel basınç transmitter — saha enstrümantasyon çözümleri",
    },
    en: {
      title: "Instrument Solutions | Field Measurement & Instrumentation | Yazıcı Otomasyon",
      description:
        "Pressure, temperature, level, and flow instrumentation from Endress+Hauser, WIKA, and Yokogawa for process reliability and traceability.",
      ogImageAlt: "Industrial pressure transmitter — field instrumentation solutions",
    },
  },
  "product-6": {
    tr: {
      title: "Pano & Güç Bileşenleri | Endüstriyel Pano Tedariki | Yazıcı Otomasyon",
      description:
        "Pano içi güç dağıtımı, koruma, kablo ve konnektör bileşenleri. Standartlara uygun BOM ve teknik onay süreciyle endüstriyel pano tedariki.",
      ogImageAlt: "Endüstriyel pano güç bileşenleri — otomasyon tedarik",
    },
    en: {
      title: "Panel & Power Components | Industrial Panel Supply | Yazıcı Otomasyon",
      description:
        "Panel power distribution, protection, cables, and connectors with standards-aligned BOM and technical approval for industrial panel supply.",
      ogImageAlt: "Industrial panel power components — automation supply",
    },
  },
};

export function getServiceSeoOverride(
  serviceId: ServiceId,
  language: Language
): ServiceSeoOverride {
  return serviceSeoOverrides[serviceId][language];
}

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

  return getServiceSeoOverride(service.id, language).title;
}

export function generateMetaDescription(
  service: ServiceData | null,
  language: Language
): string {
  if (!service) {
    return language === "tr"
      ? "İstanbul merkezli Yazıcı Otomasyon: safety, sensör, PLC/HMI, encoder ve instrument çözümleri; teknik danışmanlık ve tedarik. +90 553 056 89 39."
      : "Istanbul-based Yazıcı Otomasyon: safety, sensors, PLC/HMI, encoders, and instrumentation with technical guidance and supply. +90 553 056 89 39.";
  }

  return getServiceSeoOverride(service.id, language).description;
}

export function generateCanonicalUrl(
  serviceId: ServiceId | null,
  _language: Language
): string {
  const base = getPublicSiteUrl();
  if (!serviceId) {
    return base;
  }

  return `${base}${getServicePath(serviceId)}`;
}

export function generateBreadcrumbs(
  service: ServiceData | null,
  language: Language
): Array<{ name: string; url: string }> {
  const base = getPublicSiteUrl();
  const items = [
    {
      name: language === "tr" ? "Ana Sayfa" : "Home",
      url: base,
    },
  ];

  if (service) {
    items.push({
      name: language === "tr" ? "Ürünler" : "Products",
      url: `${base}/#products`,
    });

    items.push({
      name: PRODUCT_CATEGORY_LABELS[service.id][language],
      url: generateCanonicalUrl(service.id, language),
    });
  }

  return items;
}

export function getOrganizationJsonLd(): Record<string, unknown> {
  const base = getPublicSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Yazıcı Otomasyon",
    alternateName: "YAZICI OTOMASYON",
    url: base,
    logo: `${base}/img/logo1.png`,
    email: "info@yaziciotomasyon.com",
    contactPoint: BRANCHES.map((branch) => ({
      "@type": "ContactPoint",
      telephone: branch.tel.replace(/(\+\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4-$5"),
      contactType: branch.id === "istanbul" ? "sales" : "customer support",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    sameAs: [] as string[],
  };
}

export function getLocalBusinessJsonLd(): Record<string, unknown>[] {
  const base = getPublicSiteUrl();
  const branchAddresses: Record<(typeof BRANCHES)[number]["id"], { locality: string; region: string }> = {
    istanbul: { locality: "İstanbul", region: "İstanbul" },
    trakya: { locality: "Çorlu", region: "Tekirdağ" },
  };

  return BRANCHES.map((branch) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#branch-${branch.id}`,
    name:
      branch.id === "istanbul"
        ? "Yazıcı Otomasyon — İstanbul Merkez"
        : "Yazıcı Otomasyon — Trakya Şube",
    image: `${base}/img/logo1.png`,
    url: base,
    telephone: branch.tel,
    email: "info@yaziciotomasyon.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: branchAddresses[branch.id].locality,
      addressRegion: branchAddresses[branch.id].region,
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
    priceRange: "$$",
    parentOrganization: {
      "@id": `${base}/#organization`,
    },
  }));
}
