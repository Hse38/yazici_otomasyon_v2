"use client";

import { useMemo } from "react";
import type { ServiceData } from "../../data/services";
import type { Language } from "../../lib/seo";
import {
  organizationSchema,
  localBusinessSchema,
  generateBreadcrumbs,
  generateCanonicalUrl,
  SITE_ORIGIN,
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
    allSchemas.push(organizationSchema);

    // 2. LocalBusiness Schema (always present)
    allSchemas.push(localBusinessSchema);

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

      const serviceSchema: any = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: content.title,
        description: content.description,
        provider: {
          "@id": `${SITE_ORIGIN}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Turkey",
        },
        serviceType: content.title,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "TRY",
          price: "0",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "TRY",
            price: "0",
            valueAddedTaxIncluded: true,
          },
        },
      };

      // Add service area
      serviceSchema.serviceArea = {
        "@type": "Country",
        name: "Turkey",
      };

      // Add aggregate rating if available
      // serviceSchema.aggregateRating = { ... }

      allSchemas.push(serviceSchema);

      // 5. Product Schema (for catering packages)
      allSchemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${serviceUrl}#product`,
        name: content.title,
        description: content.description,
        brand: {
          "@type": "Brand",
          name: "Yazıcı Otomasyon",
        },
        category: "Industrial automation product",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "TRY",
          price: "0",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "TRY",
            price: "0",
            valueAddedTaxIncluded: true,
          },
        },
      });
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
          contentUrl: `${SITE_ORIGIN}${image.src}`,
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
