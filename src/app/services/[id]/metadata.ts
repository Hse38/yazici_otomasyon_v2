import type { Metadata } from "next";
import { getServiceById, type ServiceId } from "../../../data/services";
import {
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
  getServiceSeoOverride,
  resolveServiceIdFromParam,
  type Language,
} from "../../../lib/seo";

export async function buildServiceMetadata(
  params: { slug: string },
  language: Language = "tr"
): Promise<Metadata> {
  const serviceId = resolveServiceIdFromParam(params.slug);
  const service = serviceId ? getServiceById(serviceId) : undefined;

  if (!service || !serviceId) {
    return {
      title:
        language === "tr"
          ? "Sayfa bulunamadı | Yazıcı Otomasyon"
          : "Page not found | Yazıcı Otomasyon",
      description:
        language === "tr"
          ? "Aradığınız ürün veya çözüm sayfası bulunamadı. Ana sayfadan devam edebilir veya iletişime geçebilirsiniz."
          : "The product or solution page you requested could not be found. Continue from the home page or contact us.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = getServiceSeoOverride(serviceId, language);
  const title = generateMetaTitle(service, language);
  const description = generateMetaDescription(service, language);
  const canonical = generateCanonicalUrl(service.id, language);
  const serviceImage = seo.ogImage ?? `/img/${service.id}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Yazıcı Otomasyon",
      images: [
        {
          url: serviceImage,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
        },
      ],
      locale: language === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [serviceImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/** @deprecated use buildServiceMetadata with slug param */
export async function buildServiceMetadataById(
  params: { id: string },
  language: Language = "tr"
): Promise<Metadata> {
  return buildServiceMetadata({ slug: params.id }, language);
}
