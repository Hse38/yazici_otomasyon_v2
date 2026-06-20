"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ServiceId } from "../../data/services";
import { getServicePath } from "../../lib/seo";

type CatalogCategory = {
  key: string;
  serviceId: string;
  title: string;
  description: string;
  brands: readonly {
    name: string;
    logoAlt: string;
    logoSrc?: string;
  }[];
  features: readonly string[];
  imageSet: readonly string[];
};

type CatalogContent = {
  kicker: string;
  title: string;
  description: string;
  detailAction: string;
  categories: readonly CatalogCategory[];
};

export function HomeProductCatalogSection({ content }: { content: CatalogContent }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-16">
      <div className="mb-12 flex flex-col gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
        >
          {content.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
        >
          {content.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="max-w-xl text-base text-dark/60"
        >
          {content.description}
        </motion.p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {content.categories.map((category, idx) => {
          const reverse = idx % 2 === 1;
          const detailHref = getServicePath(category.serviceId as ServiceId);

          return (
            <motion.article
              key={category.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="card-hover group/card overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-[0_16px_36px_-24px_rgba(7,15,22,0.4)]"
            >
              <div
                className={`grid gap-0 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
              >
                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                  <Link
                    href={detailHref}
                    className="group/title inline-flex w-fit max-w-full cursor-pointer items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
                    aria-label={`${category.title} — ${content.detailAction}`}
                  >
                    <h3 className="text-2xl font-semibold text-dark transition group-hover/title:text-dark-purple sm:text-3xl">
                      {category.title}
                    </h3>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-dark/55 transition-transform group-hover/title:translate-x-1 group-hover/title:text-dark"
                      aria-hidden
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
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
                  <Link
                    href={detailHref}
                    className="group/images block cursor-pointer rounded-2xl border border-dark/10 bg-white p-4 shadow-sm transition duration-300 hover:border-dark/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 group-hover/card:border-dark/15 group-hover/card:shadow-md"
                    aria-label={`${category.title} — ${content.detailAction}`}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {category.imageSet.map((src) => (
                        <div
                          key={`${category.key}-${src}`}
                          className="relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                        >
                          <Image
                            src={src}
                            alt={`${category.title} — Yazıcı Otomasyon endüstriyel otomasyon`}
                            fill
                            className="object-cover transition duration-300 group-hover/images:scale-[1.03]"
                            sizes="(max-width:1024px) 33vw, 220px"
                          />
                        </div>
                      ))}
                    </div>
                  </Link>

                  <div className="mt-5 overflow-hidden pb-1">
                    <motion.div
                      className="flex min-w-max gap-2.5"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {[...category.brands, ...category.brands].map((brand, brandIndex) => (
                        <div
                          key={`${category.key}-${brand.name}-${brandIndex}`}
                          className="inline-flex h-10 min-w-[124px] shrink-0 items-center justify-center rounded-full border border-dark/10 bg-white px-3.5 transition hover:border-dark/20"
                          title={brand.name}
                          aria-hidden={brandIndex >= category.brands.length}
                        >
                          {brand.logoSrc ? (
                            <Image
                              src={brand.logoSrc}
                              alt={brand.logoAlt}
                              width={110}
                              height={24}
                              className="h-5 w-auto object-contain opacity-75 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                              sizes="110px"
                            />
                          ) : (
                            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-dark/45 transition hover:text-dark">
                              {brand.name}
                            </span>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                  <div className="mt-5">
                    <Link
                      href={detailHref}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-dark/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-dark/70 transition hover:-translate-y-0.5 hover:border-dark/25 hover:text-dark hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
                    >
                      {content.detailAction}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
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

