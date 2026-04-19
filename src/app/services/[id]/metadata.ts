import type { Metadata } from "next";
import { getServiceById, type ServiceId } from "../../../data/services";
import {
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
  serviceSlugMap,
  type Language,
} from "../../../lib/seo";

export async function generateMetadata(
  params: { id: string },
  language: Language = "en"
): Promise<Metadata> {
  const serviceId = params.id as ServiceId;
  const service = getServiceById(serviceId);

  if (!service) {
    return {
      title: "Service Not Found | En Tatlı Telaşım",
      description: "The requested service could not be found.",
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

  // Get service-specific image
  const serviceImage = isSensorPage
    ? "/img/sensor-detail-hero.png"
    : isControlPage
      ? "/img/control-system-detail-hero.png"
      : isEncoderPage
        ? "/img/encoder-detail-hero.png"
        : `/img/${service.id}.jpg`;
  const ogImage = `https://entatlitelasim.com${serviceImage}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    keywords: language === "tr"
      ? [
          "etkinlik catering",
          "catering organizasyon",
          content.title.toLowerCase(),
          "Istanbul catering",
          "büyük ölçekli catering",
          "kurumsal catering",
        ]
      : [
          "event catering",
          "catering organization",
          content.title.toLowerCase(),
          "Istanbul catering",
          "large-scale catering",
          "corporate catering",
        ],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "En Tatlı Telaşım",
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
