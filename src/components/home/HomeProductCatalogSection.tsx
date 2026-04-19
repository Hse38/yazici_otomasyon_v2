"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type CatalogCategory = {
  key: string;
  title: string;
  description: string;
  brands: readonly string[];
  features: readonly string[];
  imageSet: readonly string[];
};

type CatalogContent = {
  kicker: string;
  title: string;
  description: string;
  categories: readonly CatalogCategory[];
};

export function HomeProductCatalogSection({ content }: { content: CatalogContent }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.36em] text-dark-purple">{content.kicker}</p>
        <h2 className="text-3xl font-semibold text-dark sm:text-4xl">{content.title}</h2>
        <p className="text-base leading-relaxed text-dark/70 sm:text-lg">{content.description}</p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {content.categories.map((category, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <motion.article
              key={category.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-[0_16px_36px_-24px_rgba(7,15,22,0.4)]"
            >
              <div
                className={`grid gap-0 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
              >
                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                  <h3 className="text-2xl font-semibold text-dark sm:text-3xl">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-dark/70 sm:text-base">
                    {category.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {category.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-dark/80 sm:text-base">
                        <span className="mt-0.5 text-sm font-semibold text-lilac" aria-hidden>
                          ✔
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-dark/10 bg-slate-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div className="rounded-2xl border border-dark/10 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-3 gap-3">
                      {category.imageSet.map((src) => (
                        <div key={`${category.key}-${src}`} className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                          <Image src={src} alt={`${category.title} visual`} fill className="object-cover" sizes="(max-width:1024px) 33vw, 220px" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 overflow-x-auto pb-1">
                    <div className="flex min-w-max gap-2.5">
                      {category.brands.map((brand) => (
                        <span
                          key={`${category.key}-${brand}`}
                          className="inline-flex shrink-0 items-center rounded-full border border-dark/10 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-dark/45 transition hover:border-dark/20 hover:text-dark"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

