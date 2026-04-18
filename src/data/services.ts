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

type ProductLocale = {
  description: string;
  overviewWhat: string;
  highlights: string[];
};

const PRODUCT_TR: ProductLocale[] = [
  {
    description:
      "Temassız algılama ile bakım maliyetlerini düşürür; mekanik temas kaynaklı arızaları azaltarak hat kullanılabilirliğini ve ölçüm tekrarlanabilirliğini artırır.",
    overviewWhat:
      "Yakınlık ve endüstriyel sensör uygulamalarında güvenilir tespit; IP sınıfı ve ortam koşullarına uygun doğru referans seçimi.",
    highlights: [
      "Fire ve hurda oranını düşüren stabil algılama",
      "Bakım aralıklarını uzatan temassız yapı",
      "PLC ve saha veri yolu ile uyumlu entegrasyon",
      "Stok ve alternatif ürün için net yönlendirme",
      "Hızlı teknik ön değerlendirme",
    ],
  },
  {
    description:
      "Motor kontrolünde hassas tork ve hız yönetimi ile enerji tüketimini optimize eder, mekanik stresi azaltarak ekipman ömrünü ve üretim istikrarını destekler.",
    overviewWhat:
      "Sürücü seçimi, motor plakası ve yük profiline göre; harmonik, frenleme ve haberleşme gereksinimleriyle birlikte değerlendirilir.",
    highlights: [
      "Soft start / VFD ile ani akım ve mekanik şok azaltımı",
      "Enerji verimliliği ve geri kazanım seçenekleri",
      "Mevcut otomasyon mimarisine uyumlu yapılandırma",
      "Termin ve yedek stratejisiyle kesintisiz üretim",
      "Devreye almada teknik hat desteği",
    ],
  },
  {
    description:
      "Kontrol ve güvenlik mantığını netleştirerek hata kaynaklarını erken izole eder; operatör müdahalesini azaltıp süreç tekrarlanabilirliğini güçlendirir.",
    overviewWhat:
      "PLC/RTU ve ilgili I/O ile hat otomasyonu; projeye uygun CPU, bellek ve iletişim modülü eşlemesi.",
    highlights: [
      "Uygulama önceliklerine göre mimari öneri",
      "Standartlara uygun programlama ve dokümantasyon yönlendirmesi",
      "Yedekleme ve versiyon yönetimi için pratik çerçeve",
      "Saha testi öncesi risk kontrol listesi",
      "Sonradan genişlemeye uygun slot/planlama",
    ],
  },
  {
    description:
      "Operatör görünürlüğünü artırarak tepki sürelerini kısaltır; alarm ve trend takibi ile duruş nedenlerini hızlı analiz etmenizi sağlar.",
    overviewWhat:
      "HMI/SCADA ve endüstriyel PC seçimi; reçete, kullanıcı rolü ve uzaktan erişim ihtiyaçlarına göre donanım.",
    highlights: [
      "Okunabilir ekran tasarımı için donanım çözünürlüğü",
      "ERP/MES köprüleri için iletişim seçenekleri",
      "Uzaktan tanı desteğine uygun yapı",
      "Sertifika ve çevrimiçi güvenlik gereksinimleri",
      "Eğitim ve devreye alma sürecinde rehberlik",
    ],
  },
  {
    description:
      "Saha seviyesinde güvenilir sinyal iletimi sağlayarak kablosuz gecikme ve hatalı ölçüm riskini düşürür; bakım ekiplerinin teşhis süresini kısaltır.",
    overviewWhat:
      "Analog/dijital I/O, sıcaklık basınç akış ve saha veri yolu bileşenleri; zorlu ortamlarda doğru koruma sınıfı.",
    highlights: [
      "Gürültülü ortamda doğru kablo ve ekranlama önerisi",
      "Ex ve sıcaklık sınıflarında uygunluk kontrolü",
      "Kısa devre ve aşırı gerilime karşı koruma zinciri",
      "Modüler genişleme ile esnek hat tasarımı",
      "Yedek ünite ve hızlı değişim stratejisi",
    ],
  },
  {
    description:
      "Güç dağıtımı ve bağlantı bileşenlerinde standartlara uygun seçimle arıza riskini azaltır; tesis güvenliği ve iş sürekliliği için doğru malzeme sınıfı sunar.",
    overviewWhat:
      "Pano içi bileşen, kablo, konnektör ve koruma; projeye özel BOM ve teknik onay süreci.",
    highlights: [
      "Isı ve kısa devre hesaplarına uygun kesit önerisi",
      "Etiketleme ve izlenebilirlik için dokümantasyon",
      "Tedarik zincirinde şeffaf termin",
      "Muadil ve ikinci kaynak seçenekleri",
      "Kurulum sonrası kontrol listesi desteği",
    ],
  },
];

const PRODUCT_EN: ProductLocale[] = [
  {
    description:
      "Non-contact sensing cuts maintenance spend and contact-related failures, improving line availability and measurement repeatability.",
    overviewWhat:
      "Reliable detection for proximity and industrial sensors, aligned to IP rating and environmental constraints.",
    highlights: [
      "Stable sensing that reduces scrap and rework",
      "Contact-free design extends maintenance intervals",
      "Straightforward integration with PLC and fieldbus",
      "Clear guidance on stock and alternates",
      "Fast technical pre-screening",
    ],
  },
  {
    description:
      "Precise torque and speed control optimizes energy use, reduces mechanical stress, and supports equipment life and production stability.",
    overviewWhat:
      "Drive selection based on motor plate and load profile, including harmonics, braking, and communications needs.",
    highlights: [
      "Soft start/VFD reduces inrush and mechanical shock",
      "Energy savings and regeneration options where applicable",
      "Configuration aligned to your automation architecture",
      "Lead-time and spare strategies for continuity",
      "Technical hotline during commissioning",
    ],
  },
  {
    description:
      "Clear control and safety logic isolates fault sources earlier, cuts operator interventions, and strengthens process repeatability.",
    overviewWhat:
      "PLC/RTU and I/O for line automation; CPU, memory, and communication modules matched to the application.",
    highlights: [
      "Architecture guidance tied to your priorities",
      "Standards-aware programming and documentation direction",
      "Practical backup and versioning practices",
      "Pre–factory acceptance risk checklist",
      "Headroom for future expansion",
    ],
  },
  {
    description:
    "Better operator visibility shortens response times; alarms and trends help you analyze downtime causes quickly.",
    overviewWhat:
      "HMI/SCADA and industrial PC selection for recipes, roles, and remote access requirements.",
    highlights: [
      "Hardware resolution suited to readable graphics",
      "Connectivity options for ERP/MES bridges",
      "Structures that support remote diagnostics",
      "Certificates and online security considerations",
      "Guidance through training and go-live",
    ],
  },
  {
    description:
      "Reliable field-level signaling reduces latency and measurement error risks, shortening troubleshooting for maintenance teams.",
    overviewWhat:
      "Analog/digital I/O, temperature/pressure/flow, and fieldbus components with correct protection classes.",
    highlights: [
      "Cable and shielding guidance for noisy plants",
      "Compliance checks for harsh and classified areas",
      "Protection chain against short circuit and overvoltage",
      "Modular expansion for flexible line design",
      "Spares strategy for fast swap-outs",
    ],
  },
  {
    description:
      "Standards-aligned power and connectivity choices lower failure risk and support facility safety and business continuity.",
    overviewWhat:
      "Panel components, cables, connectors, and protection with BOM-focused technical approval.",
    highlights: [
      "Conductor sizing aligned to thermal and fault conditions",
      "Documentation for labeling and traceability",
      "Transparent lead times in the supply chain",
      "Alternates and second-source options when needed",
      "Post-install verification checklist support",
    ],
  },
];

function buildProduct(index: number): ServiceData {
  if (index < 1 || index > 6) {
    throw new Error("Invalid product index");
  }
  const id = `product-${index}` as ServiceId;
  const i = index - 1;
  const tr = PRODUCT_TR[i]!;
  const en = PRODUCT_EN[i]!;

  return {
    id,
    tr: {
      eyebrow: "ÜRÜNLER",
      title: `Ürün ${index}`,
      description: tr.description,
      overview: {
        what: tr.overviewWhat,
        who: "Makina üreticileri, sistem entegratörleri, bakım-onarım ekipleri ve son kullanıcılar.",
        when: "Yatırım, modernizasyon, hat genişletme ve yedek parça ihtiyaçlarında hızlı bilgi ve destek.",
      },
      highlights: tr.highlights,
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
      description: en.description,
      overview: {
        what: en.overviewWhat,
        who: "Machine builders, system integrators, maintenance teams, and end users.",
        when: "Greenfield projects, modernization, line extensions, and spare-part needs.",
      },
      highlights: en.highlights,
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

export const services: ServiceData[] = ([1, 2, 3, 4, 5, 6] as const).map((i) => buildProduct(i));

export function getServiceById(id: ServiceId): ServiceData | undefined {
  return services.find((service) => service.id === id);
}
