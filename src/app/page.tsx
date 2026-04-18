"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getGlobalGalleryImages } from "../components/GlobalGallery";
import { HorizontalGallery } from "../components/HorizontalGallery";
import { SchemaMarkup } from "../components/SEO/SchemaMarkup";
import { MobileNav } from "../components/Navigation/MobileNav";
import { DesktopNav } from "../components/Navigation/DesktopNav";
import { MobileStickyCTA } from "../components/Navigation/MobileStickyCTA";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";
import { useChatbot } from "../contexts/ChatbotContext";
import { useEffect, useMemo, useState } from "react";

type Language = "tr" | "en";

const translations = {
  en: {
    brand: "Yazıcı Otomasyon",
    nav: {
      services: "Products",
      whyUs: "Why Us",
      proof: "Gallery",
      contact: "Contact",
    },
    hero: {
      kicker: "Industrial Automation",
      title: "Reliable automation products with clear technical guidance",
      description:
        "We help teams choose the right components for drives, control, and field applications—then we support you through supply and commissioning.",
      ctaPrimary: "Contact Us",
      ctaSecondary: "Call Now",
    },
    counters: [
      { value: 6, suffix: "", label: "Product Lines" },
      { value: 15, suffix: "+", label: "Years Experience" },
      { value: 100, suffix: "%", label: "Commitment" },
    ],
    services: {
      kicker: "Products",
      title: "Featured product range",
      description:
        "Browse our core references. For datasheets, compatibility checks, and lead times, reach out by phone or WhatsApp.",
      list: [
        {
          title: "Product 1",
          description:
            "Industrial automation component from our catalog—request technical details and availability.",
          highlight: "Product 1",
        },
        {
          title: "Product 2",
          description:
            "Industrial automation component from our catalog—request technical details and availability.",
          highlight: "Product 2",
        },
        {
          title: "Product 3",
          description:
            "Industrial automation component from our catalog—request technical details and availability.",
          highlight: "Product 3",
        },
        {
          title: "Product 4",
          description:
            "Industrial automation component from our catalog—request technical details and availability.",
          highlight: "Product 4",
        },
        {
          title: "Product 5",
          description:
            "Industrial automation component from our catalog—request technical details and availability.",
          highlight: "Product 5",
        },
        {
          title: "Product 6",
          description:
            "Industrial automation component from our catalog—request technical details and availability.",
          highlight: "Product 6",
        },
      ],
      action: "View Details",
    },
    whyUs: {
      kicker: "Why Us",
      title: "Technical clarity, disciplined supply, and responsive communication.",
      description:
        "Automation projects move faster when product selection is unambiguous and expectations are aligned from day one.",
      list: [
        {
          title: "Application-first guidance",
          description:
            "We translate your constraints into a short list of viable references—not a generic catalog dump.",
        },
        {
          title: "Predictable procurement",
          description:
            "Clear lead times, transparent options, and structured follow-up until material is on its way.",
        },
        {
          title: "After-sales accessibility",
          description:
            "Direct access when questions arise during integration, commissioning, or spare cycles.",
        },
        {
          title: "Nationwide coverage",
          description:
            "We support customers across Turkey with the same standards of responsiveness.",
        },
      ],
    },
    proof: {
      kicker: "Gallery",
      title: "A snapshot of our product visuals.",
      description:
        "Explore the gallery below—each tile links to its product page for more context.",
      gallery: [
        { id: 1, title: "Product imagery", description: "Representative visuals from our range." },
        { id: 2, title: "Product imagery", description: "Representative visuals from our range." },
        { id: 3, title: "Product imagery", description: "Representative visuals from our range." },
        { id: 4, title: "Product imagery", description: "Representative visuals from our range." },
      ],
      logos: ["Elco", "Gefran", "Industry 4.0", "Drives", "Sensors"],
    },
    faq: {
      kicker: "FAQ",
      title: "Common questions",
      list: [
        {
          question: "Do you ship across Turkey?",
          answer: "Yes. We coordinate delivery nationwide and share lead times up front.",
        },
        {
          question: "Can you help with compatibility against an existing panel?",
          answer:
            "Share photos, nameplates, and any manuals you have. We will confirm fitment or propose the closest equivalent.",
        },
        {
          question: "How fast can I get an answer on stock?",
          answer:
            "Most availability questions are answered the same day when you reach us by phone or WhatsApp.",
        },
      ],
    },
    contact: {
      title: "Talk to us about your next requirement.",
      description:
        "Call or message us with your application notes. We will respond quickly with clear next steps.",
      whatsapp: "WhatsApp",
      call: "Call Now",
      phone1: "+90 553 056 89 39",
      phone2: "",
      phone2WhatsApp: false,
      email: "",
      address: {
        street: "",
        city: "Türkiye",
        country: "",
      },
      website: "",
    },
    footer: {
      rights: "© 2026 Yazıcı Otomasyon. All rights reserved.",
      address: "Turkey · +90 553 056 89 39",
    },
    chat: {
      title: "Yazıcı Otomasyon",
      description: "Share your application and timeline. We will guide you to the right product path.",
      action: "Contact",
      toggle: "Chat",
      aria: "Toggle chatbot",
    },
    mobile: {
      whatsapp: "WhatsApp",
      call: "Call",
    },
    schema: {
      description:
        "Industrial automation products and technical supply support from Yazıcı Otomasyon.",
      serviceDescription:
        "Product selection guidance, availability checks, and dependable delivery for automation projects.",
    },
  },
  tr: {
    brand: "Yazıcı Otomasyon",
    nav: {
      services: "ÜRÜNLER",
      whyUs: "NEDEN BİZ",
      proof: "GALERİ",
      contact: "İLETİŞİM",
    },
    hero: {
      kicker: "Endüstriyel Otomasyon",
      title: "Güvenilir otomasyon ürünleri ve net teknik yönlendirme",
      description:
        "Sürücü, kontrol ve saha uygulamalarınız için doğru bileşeni seçmenize yardımcı olur; tedarik ve devreye almada yanınızda oluruz.",
      ctaPrimary: "İletişime Geç",
      ctaSecondary: "Hemen Ara",
    },
    counters: [
      { value: 6, suffix: "", label: "Ürün vitrini" },
      { value: 15, suffix: "+", label: "Yıl deneyim" },
      { value: 100, suffix: "%", label: "Taahhüt" },
    ],
    services: {
      kicker: "Ürünlerimiz",
      title: "Öne çıkan ürün gamımız",
      description:
        "Aşağıdaki referansları inceleyin. Teknik veri, uyumluluk ve termin için telefon veya WhatsApp ile yazın.",
      list: [
        {
          title: "Ürün 1",
          description:
            "Katalogumuzdan endüstriyel otomasyon bileşeni — teknik detay ve stok için iletişime geçin.",
          highlight: "Ürün 1",
        },
        {
          title: "Ürün 2",
          description:
            "Katalogumuzdan endüstriyel otomasyon bileşeni — teknik detay ve stok için iletişime geçin.",
          highlight: "Ürün 2",
        },
        {
          title: "Ürün 3",
          description:
            "Katalogumuzdan endüstriyel otomasyon bileşeni — teknik detay ve stok için iletişime geçin.",
          highlight: "Ürün 3",
        },
        {
          title: "Ürün 4",
          description:
            "Katalogumuzdan endüstriyel otomasyon bileşeni — teknik detay ve stok için iletişime geçin.",
          highlight: "Ürün 4",
        },
        {
          title: "Ürün 5",
          description:
            "Katalogumuzdan endüstriyel otomasyon bileşeni — teknik detay ve stok için iletişime geçin.",
          highlight: "Ürün 5",
        },
        {
          title: "Ürün 6",
          description:
            "Katalogumuzdan endüstriyel otomasyon bileşeni — teknik detay ve stok için iletişime geçin.",
          highlight: "Ürün 6",
        },
      ],
      action: "Detayları Gör",
    },
    whyUs: {
      kicker: "Neden Biz",
      title: "Teknik netlik, disiplinli tedarik ve hızlı iletişim.",
      description:
        "Ürün seçimi şeffaf olduğunda otomasyon projeleri daha hızlı ilerler; beklentileri ilk günden netleştiririz.",
      list: [
        {
          title: "Uygulama odaklı yönlendirme",
          description:
            "Kısıtlarınızı kısa bir uygun referans listesine çeviririz — jenerik katalog yığını değil.",
        },
        {
          title: "Öngörülebilir tedarik",
          description:
            "Net terminler, şeffaf seçenekler ve malzeme yola çıkana kadar düzenli takip.",
        },
        {
          title: "Satış sonrası erişilebilirlik",
          description:
            "Entegrasyon, devreye alma veya yedek döngülerinde sorularınız için doğrudan hat.",
        },
        {
          title: "Türkiye geneli",
          description:
            "Tüm Türkiye'de aynı hız ve standartta yanıt vermeyi hedefleriz.",
        },
      ],
    },
    proof: {
      kicker: "Galeri",
      title: "Ürün görsellerimizden bir seçki.",
      description:
        "Aşağıdaki galeriyi gezin — her kare ilgili ürün sayfasına bağlanır.",
      gallery: [
        { id: 1, title: "Ürün görselleri", description: "Gamımızdan temsili kareler." },
        { id: 2, title: "Ürün görselleri", description: "Gamımızdan temsili kareler." },
        { id: 3, title: "Ürün görselleri", description: "Gamımızdan temsili kareler." },
        { id: 4, title: "Ürün görselleri", description: "Gamımızdan temsili kareler." },
      ],
      logos: ["Elco", "Gefran", "Endüstri 4.0", "Sürücü", "Sensör"],
    },
    faq: {
      kicker: "SSS",
      title: "Sık sorulanlar",
      list: [
        {
          question: "Türkiye geneline sevkiyat yapıyor musunuz?",
          answer: "Evet. Terminleri önceden paylaşarak ülke genelinde gönderim koordine ediyoruz.",
        },
        {
          question: "Mevcut panoya uyumluluk kontrolü yapıyor musunuz?",
          answer:
            "Fotoğraf, etiket ve varsa dokümanları paylaşın; uygunluğu teyit eder veya en yakın eşdeğeri öneririz.",
        },
        {
          question: "Stok sorusuna ne kadar sürede dönüş olur?",
          answer:
            "Telefon veya WhatsApp ile ulaştığınızda birçok stok sorusu aynı gün içinde yanıtlanır.",
        },
      ],
    },
    contact: {
      title: "İhtiyacınızı birlikte netleştirelim.",
      description:
        "Uygulama notlarınızı telefon veya WhatsApp ile iletin; hızlı ve net adımlarla dönüş yapalım.",
      whatsapp: "WhatsApp",
      call: "Hemen Ara",
      phone1: "+90 553 056 89 39",
      phone2: "",
      phone2WhatsApp: false,
      email: "",
      address: {
        street: "",
        city: "Türkiye",
        country: "",
      },
      website: "",
    },
    footer: {
      rights: "© 2026 Yazıcı Otomasyon. Tüm hakları saklıdır.",
      address: "Türkiye · +90 553 056 89 39",
    },
    chat: {
      title: "Yazıcı Otomasyon",
      description: "Uygulamanızı ve zaman çizelgenizi yazın; doğru ürün yolunu birlikte çizelim.",
      action: "İletişim",
      toggle: "Sohbet",
      aria: "Sohbeti aç/kapat",
    },
    mobile: {
      whatsapp: "WhatsApp",
      call: "Ara",
    },
    schema: {
      description:
        "Yazıcı Otomasyon ile endüstriyel otomasyon ürünleri ve teknik tedarik desteği.",
      serviceDescription:
        "Ürün seçimi, uygunluk kontrolü ve güvenilir teslimat ile otomasyon projelerinize destek.",
    },
  },
} as const;

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-4xl font-semibold text-white">
        {display}
        {suffix}
      </span>
      <span className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const { setPageContext, setLanguage } = useChatbot();
  const [lang, setLang] = useState<Language>("tr");
  const content = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") {
      setLang(stored);
      return;
    }
    // Default to Turkish if no preference stored
    setLang("tr");
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    setLanguage(lang); // Sync chatbot language
  }, [lang, setLanguage]);

  // Set page context for chatbot
  useEffect(() => {
    setPageContext("home");
    
    // Optional: Detect section in view for more context-aware responses
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId === "products") {
              setPageContext("product-list");
            } else if (sectionId === "proof") {
              setPageContext("product-detail");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [setPageContext]);


  // Generate FAQ items for schema
  const faqItems = useMemo(() => {
    return content.faq.list.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  }, [content.faq.list]);

  return (
    <div className="bg-background text-foreground m-0 p-0">
      {/* Schema Markup */}
      <SchemaMarkup language={lang} faqItems={faqItems} />

      <header
        className="sticky top-0 z-20 w-full backdrop-blur-md m-0"
        id="main-header"
      >
        <div className="absolute inset-0 bg-dark/80 -z-10" />
        <div className="absolute inset-0 lilac-gradient -z-10 opacity-60" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <a href="#" className="flex items-center">
            <Image
              src="/img/yazici-logo.png"
              alt={content.brand}
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
            <span className="sr-only">{content.brand}</span>
          </a>
          <div className="flex items-center gap-6">
            <DesktopNav
              language={lang}
              navItems={content.nav}
              textColor="text-white/80"
              hoverColor="hover:text-white"
            />
            <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white md:flex">
              <button
                type="button"
                onClick={() => setLang("tr")}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "tr"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-white/20 text-white/70 hover:border-soft-lavender hover:text-white"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "en"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-white/20 text-white/70 hover:border-soft-lavender hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
            <MobileNav
              language={lang}
              onLanguageChange={(newLang) => {
                setLang(newLang);
                localStorage.setItem("lang", newLang);
              }}
              currentLang={lang}
              navItems={content.nav}
              brand={content.brand}
              ctaText={content.hero.ctaPrimary}
            />
          </div>
        </div>
      </header>

      <main className="m-0 p-0">
        <section className="relative min-h-screen overflow-hidden bg-dark text-white m-0 p-0 -mt-0">
          <div className="absolute inset-0 lilac-gradient" />
          <motion.div
            className="absolute inset-0 grain-overlay opacity-60"
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            initial={false}
          />
          <motion.div
            className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-lilac/20 blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            initial={false}
          />
          <div className="relative z-10 flex min-h-screen items-center pt-0">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 sm:px-10 lg:px-20 pt-0">
              <div className="max-w-3xl space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-soft-lavender">
                  {content.hero.kicker}
                </p>
                <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {content.hero.title}
                </h1>
                <p className="text-lg text-white/70 sm:text-xl">
                  {content.hero.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
                >
                  {content.hero.ctaPrimary}
                </a>
                <a
                  href="tel:+905530568939"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:text-soft-lavender"
                >
                  {content.hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark text-white">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
            {content.counters.map((counter) => (
              <Counter key={counter.label} {...counter} />
            ))}
          </div>
        </section>

        <section id="products" className="section-padding bg-background">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                {content.services.kicker}
              </p>
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {content.services.title}
              </h2>
              <p className="text-lg text-dark/70">
                {content.services.description}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.services.list.map((service, idx) => {
                const serviceIds = [
                  "product-1",
                  "product-2",
                  "product-3",
                  "product-4",
                  "product-5",
                  "product-6",
                ] as const;
                const serviceImages = [
                  "/img/product-1.jpg",
                  "/img/product-2.jpg",
                  "/img/product-3.jpg",
                  "/img/product-4.jpg",
                  "/img/product-5.jpg",
                  "/img/product-6.jpg",
                ];
                const serviceId = serviceIds[idx] ?? `product-${idx + 1}`;
                const serviceImage = serviceImages[idx] ?? "/img/product-1.jpg";
                return (
                  <Link
                    key={service.title}
                    href={`/services/${serviceId}`}
                    className="group relative block overflow-hidden rounded-3xl border border-dark/10 bg-white p-8 shadow-lg transition hover:-translate-y-2 focus-within:ring-2 focus-within:ring-lilac/50 focus:outline-none cursor-pointer"
                    aria-label={`${content.services.action}: ${service.title}`}
                  >
                    <div className="relative mb-6 h-40 overflow-hidden rounded-2xl">
                      <Image
                        src={serviceImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.3em] text-dark-purple">
                        {service.highlight}
                      </span>
                      <h3 className="text-2xl font-semibold text-dark">
                        {service.title}
                      </h3>
                      <p className="text-sm text-dark/70">{service.description}</p>
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-lilac transition group-hover:text-dark-purple pointer-events-none">
                        {content.services.action}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why-us" className="section-padding bg-background">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-8">
              <div className="relative h-56 w-full flex justify-center">
                <div className="relative h-full w-full max-w-md">
                  <Image
                    src="/img/yazici-logo-dark.png"
                    alt={content.brand}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                  {content.whyUs.kicker}
                </p>
                <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                  {content.whyUs.title}
                </h2>
                <p className="text-lg text-dark/70">
                  {content.whyUs.description}
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              {content.whyUs.list.map((reason) => (
                <div
                  key={reason.title}
                  className="glass-panel rounded-2xl p-6 text-white"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="section-padding bg-background text-dark">
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                {content.proof.kicker}
              </p>
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {content.proof.title}
              </h2>
              <p className="text-lg text-dark/70">
                {content.proof.description}
              </p>
            </div>
            <HorizontalGallery
              images={getGlobalGalleryImages(lang)}
              language={lang}
            />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
              {content.proof.logos.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center rounded-2xl border border-dark/10 bg-white px-4 py-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-dark/50"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-dark-purple">
                {content.faq.kicker}
              </p>
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {content.faq.title}
              </h2>
            </div>
            <div className="grid gap-6">
              {content.faq.list.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-dark/10 bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-dark">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm text-dark/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding bg-dark text-white">
          <div className="mx-auto max-w-5xl">
            {/* Headline & Copy */}
            <div className="mb-12 text-center">
              <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
                {content.contact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
                {content.contact.description}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              {/* WhatsApp Button - PRIMARY CTA */}
              <a
                href="https://wa.me/905530568939"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark"
                aria-label={content.contact.whatsapp}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {content.contact.whatsapp}
              </a>

              {/* Call Button - SECONDARY CTA */}
              <a
                href="tel:+905530568939"
                className="flex items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:bg-white/10 hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-dark"
                aria-label={content.contact.call}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {content.contact.call}
              </a>
            </div>

            {/* Contact Details Block */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Phone Numbers */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {lang === "tr" ? "Telefon" : "Phone"}
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${content.contact.phone1.replace(/\s/g, "")}`}
                      className="block text-lg font-medium text-white transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                      aria-label={`${lang === "tr" ? "Ara" : "Call"} ${content.contact.phone1}`}
                    >
                      {content.contact.phone1}
                    </a>
                    <span className="rounded-full bg-lilac/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-soft-lavender">
                      WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {lang === "tr" ? "Adres" : "Address"}
                </h3>
                <address className="not-italic text-base leading-relaxed text-white/80">
                  {content.contact.address.street ? (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${content.contact.address.street} ${content.contact.address.city} ${content.contact.address.country}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                    >
                      <div>{content.contact.address.street}</div>
                      <div>{content.contact.address.city}</div>
                      <div>{content.contact.address.country}</div>
                    </a>
                  ) : (
                    <div>
                      <div>{content.contact.address.city}</div>
                      {content.contact.address.country ? (
                        <div>{content.contact.address.country}</div>
                      ) : null}
                    </div>
                  )}
                </address>
              </div>

              {/* Email & Website */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {lang === "tr" ? "İletişim" : "Contact"}
                </h3>
                <div className="space-y-2">
                  {content.contact.email ? (
                    <a
                      href={`mailto:${content.contact.email}`}
                      className="block text-base font-medium text-white transition hover:text-soft-lavender focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                      aria-label={`${lang === "tr" ? "E-posta gönder" : "Send email"} ${content.contact.email}`}
                    >
                      {content.contact.email}
                    </a>
                  ) : null}
                  {content.contact.website ? (
                    <a
                      href={`https://${content.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-white/60 transition hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 focus:ring-offset-dark rounded"
                    >
                      {content.contact.website}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Separation - Large padding before footer */}
        <div className="h-20 bg-dark/95" aria-hidden="true" />
      </main>

      <Footer language={lang} />

      <Chatbot />
      <MobileStickyCTA language={lang} />
    </div>
  );
}
