import type { Metadata } from "next";
import { getServiceById, type ServiceId } from "../../../data/services";
import {
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
  keywordClusters,
  type Language,
} from "../../../lib/seo";

export async function buildServiceMetadata(
  params: { id: string },
  language: Language = "tr"
): Promise<Metadata> {
  const serviceId = params.id as ServiceId;
  const service = getServiceById(serviceId);

  if (!service) {
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

  const isSensorPage = serviceId === "product-2";
  const isControlPage = serviceId === "product-3";
  const isEncoderPage = serviceId === "product-4";
  const title = isSensorPage
    ? language === "tr"
      ? "Endüstriyel Sensör Sistemleri | Otomasyon Sensörleri | Yazıcı Otomasyon"
      : "Industrial Sensor Systems | Automation Sensors | Yazıcı Otomasyon"
    : isControlPage
      ? language === "tr"
        ? "PLC, HMI ve SCADA Sistemleri | Endüstriyel Kontrol Sistemleri"
        : "PLC, HMI and SCADA Systems | Industrial Control Systems"
      : isEncoderPage
        ? language === "tr"
          ? "Endüstriyel Encoder Sistemleri | Rotary & Linear Encoder | Yazıcı Otomasyon"
          : "Industrial Encoder Systems | Rotary & Linear Encoders | Yazıcı Otomasyon"
        : generateMetaTitle(service, language);
  const description = isSensorPage
    ? language === "tr"
      ? "Endüstriyel sensör çözümleri: endüktif, kapasitif, fotosel, fiber optik ve görüntü işleme sistemleri. İstanbul yerinde teknik destek."
      : "Industrial sensor solutions including inductive, capacitive, photoelectric, fiber optic, and vision systems with on-site support in Istanbul."
    : isControlPage
      ? language === "tr"
        ? "PLC, HMI ve SCADA tabanlı endüstriyel kontrol sistemleri. Üretim hatları için gerçek zamanlı kontrol ve otomasyon çözümleri."
        : "Industrial control systems based on PLC, HMI, and SCADA for real-time automation in production lines."
      : isEncoderPage
        ? language === "tr"
          ? "Endüstriyel encoder çözümleri: rotary encoder, linear encoder, mutlak ve artımlı encoder sistemleri. Yüksek hassasiyetli pozisyon ve hız ölçüm çözümleri."
          : "Industrial encoder solutions: rotary encoders, linear encoders, absolute and incremental systems for high-precision position and speed measurement."
        : generateMetaDescription(service, language);
  const canonical = generateCanonicalUrl(service.id, language);
  const content = service[language];

  const serviceImage = isSensorPage
    ? "/img/sensor-detail-hero.png"
    : isControlPage
      ? "/img/control-system-detail-hero.png"
      : isEncoderPage
        ? "/img/encoder-detail-hero.png"
        : `/img/${service.id}.jpg`;

  const keywords =
    language === "tr"
      ? [
          ...keywordClusters.commercial.tr,
          ...keywordClusters.midFunnel.tr,
          ...keywordClusters.informational.tr,
          "istanbul",
          "türkiye",
          "b2b otomasyon",
          content.title.toLowerCase(),
        ]
      : [
          ...keywordClusters.commercial.en,
          ...keywordClusters.midFunnel.en,
          ...keywordClusters.informational.en,
          "istanbul",
          "turkey",
          "b2b automation",
          content.title.toLowerCase(),
        ];

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    keywords,
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
          alt: content.title,
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
