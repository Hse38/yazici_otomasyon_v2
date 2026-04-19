"use client";

import { useMemo } from "react";
import type { ServiceData } from "../../data/services";
import type { Language } from "../../lib/seo";
import {
  getOrganizationJsonLd,
  getLocalBusinessJsonLd,
  generateBreadcrumbs,
  generateCanonicalUrl,
  getPublicSiteUrl,
} from "../../lib/seo";

type SchemaMarkupProps = {
  service?: ServiceData | null;
  language?: Language;
  faqItems?: Array<{ question: string; answer: string }>;
  images?: Array<{ src: string; alt: string }>;
};

export function SchemaMarkup({
  service,
  language = "en",
  faqItems = [],
  images = [],
}: SchemaMarkupProps) {
  const schemas = useMemo(() => {
    const allSchemas: object[] = [];

    // 1. Organization Schema (always present)
    allSchemas.push(getOrganizationJsonLd());

    // 2. LocalBusiness Schema (always present)
    allSchemas.push(getLocalBusinessJsonLd());

    // 3. BreadcrumbList Schema
    const breadcrumbs = generateBreadcrumbs(service ?? null, language);
    allSchemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });

    // 4. Service Schema (if service provided)
    if (service != null) {
      const content = service[language];
      const serviceUrl = generateCanonicalUrl(service.id, language);

      const serviceSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        url: serviceUrl,
        name: content.title,
        description: content.description,
        provider: {
          "@id": `${getPublicSiteUrl()}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Turkey",
        },
        serviceType: content.title,
      };

      serviceSchema.serviceArea = {
        "@type": "Country",
        name: "Turkey",
      };

      allSchemas.push(serviceSchema);
    }

    // 6. FAQPage Schema (if FAQ items provided)
    if (faqItems.length > 0) {
      allSchemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
    }

    // 7. ImageObject Schema (for gallery images)
    if (images.length > 0) {
      images.forEach((image, index) => {
        allSchemas.push({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "@id": `${image.src}#image-${index}`,
          contentUrl: `${getPublicSiteUrl()}${image.src}`,
          description: image.alt,
          name: image.alt,
        });
      });
    }

    return allSchemas;
  }, [service, language, faqItems, images]);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
