"use client";

import Link from "next/link";
import type { ServiceId } from "../../data/services";
import { getServicePath, PRODUCT_CATEGORY_LABELS, type Language } from "../../lib/seo";

type InternalLinksProps = {
  currentServiceId: ServiceId;
  language: Language;
};

type CrossSellCard = {
  title: string;
  description: string;
  targetId: ServiceId;
};

type CrossSellBlock = {
  kicker: string;
  title: string;
  intro: string;
  linkLabel: string;
  cards: CrossSellCard[];
};

const crossSellByService: Record<ServiceId, Record<Language, CrossSellBlock>> = {
  "product-1": {
    tr: {
      kicker: "Tamamlayıcı çözüm",
      title: "Emniyet sensörleri ve algılama",
      intro:
        "Safety mimarinizi destekleyen proximity, manyetik ve fotoelektrik sensörlerle interlock ve pozisyon geri bildirimini güçlendirin.",
      linkLabel: "Sensör sistemlerini incele",
      cards: [
        {
          title: "Endüktif ve proximity sensörler",
          description:
            "Metal hedef algılama ve güvenlik kapısı uygulamalarında temassız, yüksek dayanımlı sensör seçenekleri.",
          targetId: "product-2",
        },
        {
          title: "Manyetik yakınlık sensörleri",
          description:
            "Silindir ve hareketli mekanizmalarda emniyet geri bildirimi için manyetik algılama çözümleri.",
          targetId: "product-2",
        },
      ],
    },
    en: {
      kicker: "Complementary solution",
      title: "Safety sensing and detection",
      intro:
        "Strengthen interlock and position feedback with proximity, magnetic, and photoelectric sensors that support your safety architecture.",
      linkLabel: "Explore sensor systems",
      cards: [
        {
          title: "Inductive and proximity sensors",
          description:
            "Non-contact, rugged sensing for metal targets and safety gate applications.",
          targetId: "product-2",
        },
        {
          title: "Magnetic proximity sensors",
          description:
            "Magnetic detection for cylinders and moving mechanisms in safety feedback loops.",
          targetId: "product-2",
        },
      ],
    },
  },
  "product-2": {
    tr: {
      kicker: "Yerli üretim",
      title: "Mıknatıs sensörleri",
      intro:
        "Silindir, güvenlik ve transfer hatlarında manyetik algılama ihtiyaçları için yerli çözümler; teknik danışmanlıkla doğru referans ve stabil çalışma.",
      linkLabel: "Safety sistemlerini incele",
      cards: [
        {
          title: "YZC Otomasyon Mıknatıs Sensörü",
          description:
            "Reed ve manyetik yapı için endüstriyel dayanım; temassız algılama ile bakım yükünü düşürür.",
          targetId: "product-1",
        },
        {
          title: "Emniyet interlock entegrasyonu",
          description:
            "Sensör katmanınızı ISO 13849 uyumlu safety mimarisiyle birleştirin; interlock ve acil stop çözümleri.",
          targetId: "product-1",
        },
      ],
    },
    en: {
      kicker: "Domestic production",
      title: "Magnetic sensors",
      intro:
        "Domestic magnetic sensing for cylinders, safety, and transfer lines with engineering-led selection for stable operation.",
      linkLabel: "Explore safety systems",
      cards: [
        {
          title: "YZC Automation Magnetic Sensor",
          description:
            "Industrial-grade reed/magnetic sensing for contactless detection and lower maintenance load.",
          targetId: "product-1",
        },
        {
          title: "Safety interlock integration",
          description:
            "Combine your sensing layer with ISO 13849 aligned safety architecture, interlock, and emergency stop.",
          targetId: "product-1",
        },
      ],
    },
  },
  "product-3": {
    tr: {
      kicker: "Tamamlayıcı çözüm",
      title: "Sensör ve hareket geri bildirimi",
      intro:
        "Kontrol mimarinizi tamamlayan sensör ve encoder bileşenleriyle hat izlenebilirliğini ve deterministik kontrolü güçlendirin.",
      linkLabel: "Detayları incele",
      cards: [
        {
          title: "Endüstriyel sensör sistemleri",
          description:
            "I/O haritalama ve saha algılama için endüktif, kapasitif ve fotosel sensör portföyü.",
          targetId: "product-2",
        },
        {
          title: "Encoder çözümleri",
          description:
            "Hız ve pozisyon geri bildirimi için rotary ve linear encoder seçenekleri.",
          targetId: "product-4",
        },
      ],
    },
    en: {
      kicker: "Complementary solution",
      title: "Sensing and motion feedback",
      intro:
        "Improve line traceability and deterministic control with sensor and encoder components that complete your control architecture.",
      linkLabel: "View details",
      cards: [
        {
          title: "Industrial sensor systems",
          description:
            "Inductive, capacitive, and photoelectric portfolio for I/O mapping and field detection.",
          targetId: "product-2",
        },
        {
          title: "Encoder solutions",
          description:
            "Rotary and linear encoder options for speed and position feedback.",
          targetId: "product-4",
        },
      ],
    },
  },
  "product-4": {
    tr: {
      kicker: "Tamamlayıcı çözüm",
      title: "Kontrol ve sürücü entegrasyonu",
      intro:
        "Encoder sinyallerinizi doğru okuyacak PLC, sürücü ve haberleşme altyapısıyla senkronizasyonu ve hassasiyeti koruyun.",
      linkLabel: "Kontrol sistemlerini incele",
      cards: [
        {
          title: "PLC ve motion kontrol",
          description:
            "Encoder geri bildirimini destekleyen CPU, motion modülü ve haberleşme topolojisi.",
          targetId: "product-3",
        },
        {
          title: "Sensör tabanlı referans noktaları",
          description:
            "Encoder ile birlikte kullanılan proximity ve kontrast sensörleriyle güvenilir referans algılama.",
          targetId: "product-2",
        },
      ],
    },
    en: {
      kicker: "Complementary solution",
      title: "Control and drive integration",
      intro:
        "Preserve synchronization and precision with PLC, drive, and communication infrastructure that reads encoder signals correctly.",
      linkLabel: "Explore control systems",
      cards: [
        {
          title: "PLC and motion control",
          description:
            "CPU, motion modules, and communication topology supporting encoder feedback.",
          targetId: "product-3",
        },
        {
          title: "Sensor-based reference points",
          description:
            "Reliable reference detection with proximity and contrast sensors used alongside encoders.",
          targetId: "product-2",
        },
      ],
    },
  },
  "product-5": {
    tr: {
      kicker: "Tamamlayıcı çözüm",
      title: "Pano ve güç altyapısı",
      intro:
        "Enstrümantasyon sinyallerinizi pano içinde güvenle taşıyacak koruma, kablo ve güç bileşenleriyle proses ölçüm zincirinizi tamamlayın.",
      linkLabel: "Pano bileşenlerini incele",
      cards: [
        {
          title: "Pano & güç bileşenleri",
          description:
            "Koruma, kablo, konnektör ve dağıtım bileşenleriyle saha enstrümantasyonu entegrasyonu.",
          targetId: "product-6",
        },
        {
          title: "Kontrol ve SCADA entegrasyonu",
          description:
            "Ölçüm verilerini PLC/SCADA katmanına taşıyan kontrol ve haberleşme altyapısı.",
          targetId: "product-3",
        },
      ],
    },
    en: {
      kicker: "Complementary solution",
      title: "Panel and power infrastructure",
      intro:
        "Complete your measurement chain with protection, cabling, and power components that carry instrumentation signals safely inside the panel.",
      linkLabel: "Explore panel components",
      cards: [
        {
          title: "Panel & power components",
          description:
            "Protection, cabling, connectors, and distribution for field instrumentation integration.",
          targetId: "product-6",
        },
        {
          title: "Control and SCADA integration",
          description:
            "Control and communication infrastructure that moves measurement data to PLC/SCADA layers.",
          targetId: "product-3",
        },
      ],
    },
  },
  "product-6": {
    tr: {
      kicker: "Tamamlayıcı çözüm",
      title: "Proses enstrümantasyonu",
      intro:
        "Pano bileşenlerinizi sahadaki basınç, sıcaklık, seviye ve akış ölçümüyle tamamlayarak tesis güvenilirliğini artırın.",
      linkLabel: "Instrument çözümlerini incele",
      cards: [
        {
          title: "Instrument çözümleri",
          description:
            "Endress+Hauser, WIKA ve Yokogawa ile proses ölçüm ve izlenebilirlik çözümleri.",
          targetId: "product-5",
        },
        {
          title: "Kontrol sistemleri",
          description:
            "Ölçüm verilerini işleyen PLC/HMI tabanlı kontrol ve alarm mimarisi.",
          targetId: "product-3",
        },
      ],
    },
    en: {
      kicker: "Complementary solution",
      title: "Process instrumentation",
      intro:
        "Improve plant reliability by pairing panel components with field pressure, temperature, level, and flow measurement.",
      linkLabel: "Explore instrument solutions",
      cards: [
        {
          title: "Instrument solutions",
          description:
            "Process measurement and traceability with Endress+Hauser, WIKA, and Yokogawa.",
          targetId: "product-5",
        },
        {
          title: "Control systems",
          description:
            "PLC/HMI-based control and alarm architecture that processes measurement data.",
          targetId: "product-3",
        },
      ],
    },
  },
};

export function InternalLinks({ currentServiceId, language }: InternalLinksProps) {
  const copy = crossSellByService[currentServiceId][language];
  const cards = copy.cards.filter((card) => card.targetId !== currentServiceId);

  if (cards.length === 0) return null;

  return (
    <section
      className="section-padding bg-background"
      aria-labelledby="related-products-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-purple">
            {copy.kicker}
          </p>
          <h2
            id="related-products-heading"
            className="text-2xl font-semibold tracking-tight text-dark sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="text-base text-dark/70 sm:text-lg">{copy.intro}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((card) => {
            const targetLabel = PRODUCT_CATEGORY_LABELS[card.targetId][language];
            return (
              <Link
                key={card.title}
                href={getServicePath(card.targetId)}
                className="group relative overflow-hidden rounded-2xl border border-dark/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-lilac/40 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(41,171,226,0.08),transparent_55%)]" />
                <div className="relative flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark text-[10px] font-bold uppercase tracking-wider text-white"
                  >
                    {targetLabel.slice(0, 3)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lilac">
                      {targetLabel}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-dark group-hover:text-lilac">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-dark/70">{card.description}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-dark/50 group-hover:text-lilac">
                      {copy.linkLabel} →
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
