"use client";

import Link from "next/link";
import type { ServiceId } from "../../data/services";
import { serviceSlugMap, type Language } from "../../lib/seo";

type InternalLinksProps = {
  currentServiceId: ServiceId;
  language: Language;
};

type MagneticCard = {
  title: string;
  description: string;
  /** Sensor line detail page (manyetik / yakınlık içerik için uygun giriş noktası) */
  serviceId: ServiceId;
};

const domesticMagneticContent: Record<
  Language,
  { kicker: string; title: string; intro: string; linkLabel: string; cards: MagneticCard[] }
> = {
  tr: {
    kicker: "Yerli üretim",
    title: "Mıknatıs sensörleri",
    intro:
      "Silindir, güvenlik ve transfer hatlarında manyetik algılama ihtiyaçları için yerli çözümler; teknik danışmanlıkla doğru referans ve stabil çalışma.",
    linkLabel: "Sensör çözümlerini incele",
    cards: [
      {
        title: "YZC Otomasyon Mıknatıs Sensörü",
        description:
          "Reed ve manyetik yapı için endüstriyel dayanım; temassız algılama ile bakım yükünü düşürür, hat tekrarlanabilirliğini destekler.",
        serviceId: "product-2",
      },
      {
        title: "YZC Manyetik Yakınlık Sensör Serisi",
        description:
          "Yakınlık ve pozisyon geri bildirimi gerektiren uygulamalarda yerli üretim seçenekleri; stok ve muadil yönlendirmesiyle hızlı tedarik.",
        serviceId: "product-2",
      },
    ],
  },
  en: {
    kicker: "Domestic production",
    title: "Magnetic sensors",
    intro:
      "Domestic solutions for magnetic sensing on cylinders, safety, and transfer lines, with engineering-led selection for stable operation.",
    linkLabel: "Explore sensor solutions",
    cards: [
      {
        title: "YZC Automation Magnetic Sensor",
        description:
          "Industrial-grade reed/magnetic sensing for contactless detection, lower maintenance load, and repeatable line behavior.",
        serviceId: "product-2",
      },
      {
        title: "YZC Magnetic Proximity Sensor Series",
        description:
          "Domestic options for proximity and position feedback, with clear stock and alternate guidance for faster supply.",
        serviceId: "product-2",
      },
    ],
  },
};

export function InternalLinks({ currentServiceId: _currentServiceId, language }: InternalLinksProps) {
  const copy = domesticMagneticContent[language];

  return (
    <section
      className="section-padding bg-background"
      aria-labelledby="domestic-magnetic-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-purple">
            {copy.kicker}
          </p>
          <h2
            id="domestic-magnetic-heading"
            className="text-2xl font-semibold tracking-tight text-dark sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="text-base text-dark/70 sm:text-lg">{copy.intro}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {copy.cards.map((card) => {
            const slug = serviceSlugMap[card.serviceId]?.[language] ?? card.serviceId;
            return (
              <Link
                key={card.title}
                href={`/services/${slug}`}
                className="group relative overflow-hidden rounded-2xl border border-dark/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-lilac/40 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(41,171,226,0.08),transparent_55%)]" />
                <div className="relative flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark text-xs font-bold uppercase tracking-wider text-white"
                  >
                    YZC
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lilac">
                      {language === "tr" ? "Yerli üretim" : "Made domestically"}
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
