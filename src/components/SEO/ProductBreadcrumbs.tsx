"use client";

import Link from "next/link";
import type { ServiceData } from "../../data/services";
import {
  generateBreadcrumbs,
  PRODUCT_CATEGORY_LABELS,
  type Language,
} from "../../lib/seo";

type ProductBreadcrumbsProps = {
  service: ServiceData;
  language: Language;
};

export function ProductBreadcrumbs({ service, language }: ProductBreadcrumbsProps) {
  const items = generateBreadcrumbs(service, language);
  const pageTitle = PRODUCT_CATEGORY_LABELS[service.id][language];

  return (
    <nav
      aria-label={language === "tr" ? "Sayfa konumu" : "Breadcrumb"}
      className="border-b border-dark/8 bg-white/80 backdrop-blur-sm"
    >
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 text-xs text-dark/55 sm:px-10 lg:px-20">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label =
            index === items.length - 1 ? pageTitle : item.name;
          const href =
            index === 0
              ? "/"
              : index === 1
                ? "/#products"
                : undefined;

          return (
            <li key={`${item.url}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-dark/30">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-dark/75">
                  {label}
                </span>
              ) : href ? (
                <Link href={href} className="transition hover:text-dark">
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
