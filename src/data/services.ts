export type ServiceId =
  | "product-1"
  | "product-2"
  | "product-3"
  | "product-4"
  | "product-5"
  | "product-6";

export type ServiceData = {
  id: ServiceId;
  en: {
    eyebrow: string;
    title: string;
    description: string;
    overview: {
      what: string;
      who: string;
      when: string;
    };
    highlights: string[];
    process: {
      title: string;
      description: string;
    }[];
    capacity: {
      dailyProduction: string;
      eventSize: string;
      simultaneousLocations: string;
      description: string;
    };
    useCases: {
      title: string;
      description: string;
    }[];
    differentiators: string[];
    finalCta: {
      headline: string;
      primary: string;
      secondary: string;
    };
  };
  tr: {
    eyebrow: string;
    title: string;
    description: string;
    overview: {
      what: string;
      who: string;
      when: string;
    };
    highlights: string[];
    process: {
      title: string;
      description: string;
    }[];
    capacity: {
      dailyProduction: string;
      eventSize: string;
      simultaneousLocations: string;
      description: string;
    };
    useCases: {
      title: string;
      description: string;
    }[];
    differentiators: string[];
    finalCta: {
      headline: string;
      primary: string;
      secondary: string;
    };
  };
};

function buildProduct(index: number): ServiceData {
  if (index < 1 || index > 6) {
    throw new Error("Invalid product index");
  }
  const id = `product-${index}` as ServiceId;
  return {
    id,
    tr: {
      eyebrow: "ÜRÜNLER",
      title: `Ürün ${index}`,
      description: `Ürün ${index} — endüstriyel otomasyon ve süreç kontrolü ihtiyaçlarınız için. Teknik veri, uyumluluk ve stok için iletişime geçin.`,
      overview: {
        what: "Fabrika ve tesislerde ölçüm, kontrol, sürücü ve saha bileşenleri için uygun ürün eşlemesi.",
        who: "Makina üreticileri, sistem entegratörleri, bakım-onarım ekipleri ve son kullanıcılar.",
        when: "Yatırım, modernizasyon, hat genişletme ve yedek parça ihtiyaçlarında hızlı bilgi ve destek.",
      },
      highlights: [
        "Doğru ürün eşlemesi ve teknik ön değerlendirme",
        "Projeye uygun konfigürasyon danışmanlığı",
        "Tedarik ve termin planlaması",
        "Dokümantasyon ve entegrasyon yönlendirmesi",
        "Satış sonrası iletişim kanalı",
      ],
      process: [
        {
          title: "İhtiyaç analizi",
          description: "Uygulama, çevre koşulları ve mevcut sistemle uyumun netleştirilmesi.",
        },
        {
          title: "Ürün seçimi",
          description: "Katalog ve teknik kritere göre doğru referansın belirlenmesi.",
        },
        {
          title: "Teklif ve onay",
          description: "Fiyat, termin ve teslim şeklinin paylaşılması.",
        },
        {
          title: "Tedarik",
          description: "Sipariş ve lojistik süreçlerinin takibi.",
        },
        {
          title: "Devreye alma desteği",
          description: "Gerekli durumlarda saha veya uzaktan yönlendirme.",
        },
      ],
      capacity: {
        dailyProduction: "Teknik dokümantasyon",
        eventSize: "Projeye özel",
        simultaneousLocations: "Türkiye geneli",
        description: "Ürün kapsamı ve stok bilgisi güncel katalog ile teyit edilir.",
      },
      useCases: [
        {
          title: "Hat modernizasyonu",
          description: "Yaşlanan ekipmanın güncel platformlarla yenilenmesi.",
        },
        {
          title: "Yeni makina",
          description: "OEM veya son kullanıcı projelerinde bileşen seçimi.",
        },
        {
          title: "Yedekleme",
          description: "Kritik hatlar için hızlı yedek ünite temini.",
        },
        {
          title: "Enerji verimliliği",
          description: "Sürücü ve kontrol bileşenleriyle daha verimli çalışma.",
        },
      ],
      differentiators: [
        "Otomasyon odağında net ürün danışmanlığı",
        "Şeffaf iletişim ve teknik netlik",
        "Disiplinli tedarik süreci",
      ],
      finalCta: {
        headline: "Ürün ve stok bilgisi için bugün arayın.",
        primary: "İletişime Geçin",
        secondary: "Telefon ile Ara",
      },
    },
    en: {
      eyebrow: "PRODUCTS",
      title: `Product ${index}`,
      description: `Product ${index} for industrial automation and process control. Contact us for datasheets, compatibility, and availability.`,
      overview: {
        what: "Component matching for measurement, control, drives, and field devices in plants and factories.",
        who: "Machine builders, system integrators, maintenance teams, and end users.",
        when: "Greenfield projects, modernization, line extensions, and spare-part needs.",
      },
      highlights: [
        "Correct product matching and technical pre-check",
        "Configuration guidance for your application",
        "Supply and lead-time planning",
        "Documentation and integration guidance",
        "After-sales contact channel",
      ],
      process: [
        {
          title: "Requirements review",
          description: "Clarify application, environment, and compatibility with existing systems.",
        },
        {
          title: "Product selection",
          description: "Choose the right catalog reference against technical criteria.",
        },
        {
          title: "Quotation & approval",
          description: "Share pricing, lead time, and delivery terms.",
        },
        {
          title: "Supply",
          description: "Order handling and logistics follow-up.",
        },
        {
          title: "Commissioning support",
          description: "On-site or remote guidance when needed.",
        },
      ],
      capacity: {
        dailyProduction: "Technical documentation",
        eventSize: "Project-specific",
        simultaneousLocations: "Nationwide (TR)",
        description: "Scope and availability are confirmed against the current catalog.",
      },
      useCases: [
        {
          title: "Line modernization",
          description: "Refresh aging equipment with current platforms.",
        },
        {
          title: "New machinery",
          description: "Component selection for OEM or end-user projects.",
        },
        {
          title: "Spares & backup",
          description: "Fast spare units for critical lines.",
        },
        {
          title: "Energy efficiency",
          description: "Drive and control upgrades for better performance.",
        },
      ],
      differentiators: [
        "Clear, automation-first product guidance",
        "Transparent communication",
        "Disciplined supply execution",
      ],
      finalCta: {
        headline: "Call today for product and availability details.",
        primary: "Get in Touch",
        secondary: "Call Now",
      },
    },
  };
}

export const services: ServiceData[] = (
  [1, 2, 3, 4, 5, 6] as const
).map((i) => buildProduct(i));

export function getServiceById(id: ServiceId): ServiceData | undefined {
  return services.find((service) => service.id === id);
}
