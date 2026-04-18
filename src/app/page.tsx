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
import { services } from "../data/services";
import { HomeTrustSection } from "../components/home/HomeTrustSection";
import { HomeIndustry40Section } from "../components/home/HomeIndustry40Section";
import { HomeUseCasesSection } from "../components/home/HomeUseCasesSection";
import { HomeProcessSection } from "../components/home/HomeProcessSection";
import { HomeFinalCtaSection } from "../components/home/HomeFinalCtaSection";
import { AnimatedMap } from "../components/home/AnimatedMap";

type Language = "tr" | "en";

const translations = {
  en: {
    brand: "Yazıcı Otomasyon",
    nav: {
      services: "Products",
      whyUs: "About Us",
      proof: "Gallery",
      contact: "Contact",
    },
    hero: {
      kicker: "Industrial Automation",
      title: "Industry 4.0–ready sensing and automation for your plant",
      description:
        "Maximum precision on the line with a disciplined approach to error reduction, transparent procurement, and responsive engineering support.",
      ctaPrimary: "Request a quote",
      ctaSecondary: "WhatsApp us",
      scrollAria: "Scroll to content",
    },
    counters: [
      { value: 6, suffix: "", label: "Product lines" },
      { value: 15, suffix: "+", label: "Years in the field" },
      { value: 100, suffix: "%", label: "Commitment to clarity" },
    ],
    trust: {
      title: "The partner plants rely on",
      intro:
        "We work with manufacturers and integrators who need predictable answers, disciplined supply, and field-credible components.",
      logos: [
        "Automation Partner\u00a0A",
        "Systems Integrator\u00a0B",
        "Process OEM\u00a0C",
        "Machine Builder\u00a0D",
        "Energy Plant\u00a0E",
        "Food Producer\u00a0F",
      ],
      bullets: [
        {
          title: "Domestic manufacturing strength",
          text: "Solutions aligned with local standards, faster logistics, and accountable after-sales access.",
        },
        {
          title: "Fast supply & support",
          text: "Stock-aware guidance and same-day responses for most availability questions via phone or WhatsApp.",
        },
        {
          title: "Industrial-grade durability",
          text: "Selection driven by environment, duty cycle, and protection class—not marketing specs.",
        },
      ],
    },
    industry40: {
      title: "Industry 4.0: a new chapter on the shop floor",
      cards: [
        {
          title: "Real-time data visibility",
          description: "Monitor critical variables as they happen to catch drift before it becomes downtime.",
          icon: "data" as const,
        },
        {
          title: "Lower error rates",
          description: "Consistent sensing and control reduce rework, scrap, and unplanned interventions.",
          icon: "error" as const,
        },
        {
          title: "Higher productivity",
          description: "Stable cycles and clearer operator context translate directly into output per shift.",
          icon: "efficiency" as const,
        },
        {
          title: "Energy savings",
          description: "Right-sized drives and smarter control cut wasted kWh without compromising throughput.",
          icon: "energy" as const,
        },
      ],
    },
    useCases: {
      title: "Where we add value",
      cards: [
        {
          title: "Automotive production",
          description: "Precision sensing, robust fieldbus, and repeatable control for high-mix assembly lines.",
        },
        {
          title: "Food & beverage",
          description: "Washdown-friendly components and traceable supply for hygiene-sensitive environments.",
        },
        {
          title: "Factory automation",
          description: "Retrofits and greenfield lines with clear BOMs, documentation, and commissioning support.",
        },
        {
          title: "Machine builders",
          description: "OEM-focused selection with lead-time transparency for your bill of materials.",
        },
      ],
    },
    homeProcess: {
      title: "How the engagement works",
      steps: [
        {
          title: "Requirements review",
          description: "We clarify voltage, environment, communications, and integration constraints up front.",
        },
        {
          title: "Product selection",
          description: "A short list of viable catalog references—no generic catalog dumps.",
        },
        {
          title: "Installation & commissioning",
          description: "Structured handover with documentation and remote or on-site guidance when needed.",
        },
        {
          title: "Ongoing technical support",
          description: "Direct access for spares, alternates, and troubleshooting as your line evolves.",
        },
      ],
    },
    finalCta: {
      title: "Want to reduce error and variability on your line?",
      ctaQuote: "Request a quote",
      ctaContact: "Contact us",
    },
    animatedMap: {
      title: "On-site technical support in Istanbul",
      description:
        "With Yazıcı Otomasyon, fast and reliable solutions for your production processes.",
      cta: "Contact us",
    },
    services: {
      kicker: "Products",
      title: "Value-led product lines",
      description:
        "Each card links to a detailed page. For datasheets, compatibility, and lead times, reach us on phone or WhatsApp.",
      action: "View details",
    },
    whyUs: {
      kicker: "About us",
      title: "Why Yazıcı Otomasyon?",
      description:
        "We combine domestic supply strength with field-credible engineering so your line decisions are defensible in production.",
      list: [
        {
          title: "Domestic manufacturing strength",
          description:
            "Locally aligned components, faster logistics, and accountable support when schedules are tight.",
        },
        {
          title: "Technical support",
          description:
            "Engineers who speak in clear constraints: voltage, duty, environment, and integration—not buzzwords.",
        },
        {
          title: "Fast resolution",
          description:
            "Short feedback loops on stock, alternates, and documentation so projects keep momentum.",
        },
        {
          title: "Industrial expertise",
          description:
            "Selection discipline honed on real plants—from drives and control to field instrumentation.",
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
      primaryCta: "Get in touch",
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
      whyUs: "HAKKIMIZDA",
      proof: "GALERİ",
      contact: "İLETİŞİM",
    },
    hero: {
      kicker: "Endüstriyel Otomasyon",
      title: "Endüstri 4.0 Uyumlu Sensör ve Otomasyon Çözümleri",
      description: "Üretim hatlarınızda maksimum hassasiyet, minimum hata payı.",
      ctaPrimary: "Teklif Al",
      ctaSecondary: "WhatsApp ile İletişime Geç",
      scrollAria: "İçeriğe kaydır",
    },
    counters: [
      { value: 6, suffix: "", label: "Ürün hattı" },
      { value: 15, suffix: "+", label: "Saha deneyimi" },
      { value: 100, suffix: "%", label: "Şeffaflık taahhüdü" },
    ],
    trust: {
      title: "Tercih Edilen Çözüm Ortağınız",
      intro:
        "Üreticiler ve entegratörlerle; öngörülebilir cevaplar, disiplinli tedarik ve sahada güvenilir bileşenler üzerinde çalışıyoruz.",
      logos: [
        "Otomasyon Ortağı\u00a0A",
        "Üretim Sistemleri\u00a0B",
        "Endüstri Çözümleri\u00a0C",
        "Makina Üretici\u00a0D",
        "Proses Teknoloji\u00a0E",
        "Enerji Otomasyon\u00a0F",
      ],
      bullets: [
        {
          title: "Yerli üretim gücü",
          text: "Yerel standartlara uyum, hızlı lojistik ve satış sonrasında erişilebilir destek.",
        },
        {
          title: "Hızlı tedarik ve destek",
          text: "Stok bilinciyle yönlendirme; birçok müsaitlik sorusuna telefon veya WhatsApp ile aynı gün dönüş.",
        },
        {
          title: "Endüstriyel dayanıklılık",
          text: "Ortam, görev döngüsü ve koruma sınıfına göre seçim — broşür değil, saha gerçeği.",
        },
      ],
    },
    industry40: {
      title: "Endüstri 4.0 ile Üretimde Yeni Dönem",
      cards: [
        {
          title: "Gerçek zamanlı veri takibi",
          description:
            "Kritik değişkenleri anlık izleyerek sapmayı duruşa dönüşmeden yakalarsınız.",
          icon: "data" as const,
        },
        {
          title: "Hata oranında azalma",
          description:
            "Tutarlı algılama ve kontrol; hurda, yeniden işleme ve plansız müdahaleyi azaltır.",
          icon: "error" as const,
        },
        {
          title: "Üretim verimliliğinde artış",
          description:
            "İstikrarlı çevrimler ve net operatör görünümü, vardiya başına çıktıyı doğrudan destekler.",
          icon: "efficiency" as const,
        },
        {
          title: "Enerji tasarrufu",
          description:
            "Doğru boyutlu sürücü ve akıllı kontrol; verimi düşürmeden gereksiz kWh tüketimini kısar.",
          icon: "energy" as const,
        },
      ],
    },
    useCases: {
      title: "Kullanım Alanları",
      cards: [
        {
          title: "Otomotiv üretimi",
          description:
            "Yüksek tekrarlanabilirlikte algılama, sağlam saha veri yolu ve çok çeşitli montaj hatlarında kontrol.",
        },
        {
          title: "Gıda üretimi",
          description:
            "Yıkamaya dayanıklı bileşenler ve hijyen odaklı ortamlarda izlenebilir tedarik.",
        },
        {
          title: "Fabrika otomasyonu",
          description:
            "Modernizasyon ve yeni hatlar için net BOM, dokümantasyon ve devreye alma desteği.",
        },
        {
          title: "Makine üreticileri",
          description:
            "OEM odaklı seçim ve malzeme listeniz için şeffaf termin yönetimi.",
        },
      ],
    },
    homeProcess: {
      title: "Süreç Nasıl İşliyor?",
      steps: [
        {
          title: "İhtiyaç Analizi",
          description:
            "Gerilim, ortam, haberleşme ve mevcut sistemle entegrasyon kısıtlarını baştan netleştiririz.",
        },
        {
          title: "Ürün Seçimi",
          description:
            "Katalogdan uygulanabilir kısa liste — jenerik yığın değil, sahada tutarlı çözüm.",
        },
        {
          title: "Kurulum",
          description:
            "Dokümantasyonla yapılandırılmış devreye alma; gerektiğinde uzaktan veya sahada eşlik.",
        },
        {
          title: "Teknik Destek",
          description:
            "Yedek, muadil ve arıza giderme için doğrudan hat; hat evriminize göre yanınızdayız.",
        },
      ],
    },
    finalCta: {
      title: "Üretimde Hata Payını Azaltmak İster Misiniz?",
      ctaQuote: "Teklif Al",
      ctaContact: "Bize Ulaşın",
    },
    animatedMap: {
      title: "İstanbul'da Yerinde Teknik Destek",
      description:
        "Yazıcı Otomasyon ile üretim süreçlerinize hızlı ve güvenilir çözümler.",
      cta: "Bize Ulaşın",
    },
    services: {
      kicker: "Ürünlerimiz",
      title: "Fayda odaklı ürün hatlarımız",
      description:
        "Her kart ilgili ürün sayfasına gider. Teknik veri, uyumluluk ve termin için telefon veya WhatsApp ile yazın.",
      action: "Detayları Gör",
    },
    whyUs: {
      kicker: "Hakkımızda",
      title: "Neden Yazıcı Otomasyon?",
      description:
        "Yerli üretim gücünü sahadan gelen mühendislik disipliniyle birleştiriyor; hat kararlarınızı üretimde savunulabilir kılıyoruz.",
      list: [
        {
          title: "Yerli üretim",
          description:
            "Yerel standartlara uygun bileşenler, hızlı lojistik ve termin baskısında hesap verebilir tedarik.",
        },
        {
          title: "Teknik destek",
          description:
            "Gerilim, görev, ortam ve entegrasyon kısıtlarıyla konuşan net mühendislik dili.",
        },
        {
          title: "Hızlı çözüm",
          description:
            "Stok, muadil ve dokümantasyon sorularında kısa geri bildirim döngüleriyle proje ivmesini koruruz.",
        },
        {
          title: "Endüstriyel uzmanlık",
          description:
            "Sürücüden kontrole, saha ölçümünden pano bileşenlerine gerçek tesis deneyimiyle seçim disiplini.",
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
      primaryCta: "İletişime Geç",
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
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const content = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const productCards = useMemo(
    () =>
      services.map((s) => ({
        id: s.id,
        title: s[lang].title,
        description: s[lang].description,
        highlight: s[lang].eyebrow,
      })),
    [lang]
  );

  return (
    <div className="bg-background text-foreground m-0 p-0">
      {/* Schema Markup */}
      <SchemaMarkup language={lang} faqItems={faqItems} />

      <header
        className={`sticky top-0 z-20 m-0 w-full border-b transition-[border-color,box-shadow,backdrop-filter,background-color] duration-300 ${
          headerScrolled
            ? "border-white/10 bg-dark/88 shadow-md shadow-black/20 backdrop-blur-md"
            : "border-white/[0.06] bg-dark/[0.14] shadow-none backdrop-blur-md"
        }`}
        id="main-header"
      >
        <div
          className={`absolute inset-0 -z-10 transition-opacity duration-300 ${
            headerScrolled ? "opacity-100" : "opacity-0"
          } bg-dark/75`}
          aria-hidden
        />
        <div
          className={`absolute inset-0 -z-10 lilac-gradient transition-opacity duration-300 ${
            headerScrolled ? "opacity-50" : "opacity-[0.42]"
          }`}
          aria-hidden
        />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/logo1.png"
              alt={content.brand}
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
            <span className="sr-only">{content.brand}</span>
          </Link>
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
        <section
          id="hero"
          className="relative -mt-[4.5rem] min-h-screen overflow-hidden bg-dark pb-20 pt-[4.5rem] text-white sm:-mt-20 sm:pb-16 sm:pt-20"
        >
          <div className="absolute inset-0 lilac-gradient" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            aria-hidden
          />
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
          <motion.div
            className="absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[100%] bg-lilac/10 blur-3xl"
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            initial={false}
            aria-hidden
          />
          <div className="relative z-10 flex min-h-screen items-center py-16 lg:py-24">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-20">
              <div className="max-w-2xl space-y-8">
                <p className="text-xs uppercase tracking-[0.4em] text-soft-lavender">
                  {content.hero.kicker}
                </p>
                <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {content.hero.title}
                </h1>
                <p className="text-lg text-white/75 sm:text-xl">{content.hero.description}</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <a
                    href="#contact"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
                  >
                    {content.hero.ctaPrimary}
                  </a>
                  <a
                    href="https://wa.me/905530568939"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:bg-white/10 hover:text-soft-lavender"
                  >
                    {content.hero.ctaSecondary}
                  </a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/30 lg:mx-0 lg:max-w-none"
              >
                <Image
                  src="/img/product-1.jpg"
                  alt={lang === "tr" ? "Endüstriyel sensör ve otomasyon görseli" : "Industrial sensor and automation visual"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-dark/55 via-dark/15 to-transparent"
                  aria-hidden
                />
              </motion.div>
            </div>
          </div>

          <a
            href="#trust"
            className="absolute bottom-6 left-1/2 z-[12] flex -translate-x-1/2 flex-col items-center gap-1 max-md:bottom-28 md:bottom-8"
            aria-label={content.hero.scrollAria}
          >
            <motion.span
              className="block h-9 w-px rounded-full bg-gradient-to-b from-white/65 via-white/35 to-transparent"
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="flex h-3 w-3 items-center justify-center text-white/50"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-current">
                <path
                  d="M1 1.5L5 4.5L9 1.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </a>
        </section>

        <section className="section-padding bg-dark text-white">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
            {content.counters.map((counter) => (
              <Counter key={counter.label} {...counter} />
            ))}
          </div>
        </section>

        <HomeTrustSection content={content.trust} />
        <HomeIndustry40Section content={content.industry40} />

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
              {productCards.map((service, idx) => {
                const serviceImages = [
                  "/img/product-1.jpg",
                  "/img/product-2.jpg",
                  "/img/product-3.jpg",
                  "/img/product-4.jpg",
                  "/img/product-5.jpg",
                  "/img/product-6.jpg",
                ];
                const serviceImage = serviceImages[idx] ?? "/img/product-1.jpg";
                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
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

        <HomeUseCasesSection content={content.useCases} />
        <HomeProcessSection content={content.homeProcess} />

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

        <HomeFinalCtaSection content={content.finalCta} />

        <section id="contact" className="section-padding bg-dark text-white">
          <div className="mx-auto max-w-5xl">
            {/* Headline & Copy */}
            <div className="mb-10 text-center">
              <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
                {content.contact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
                {content.contact.description}
              </p>
            </div>

            {/* Ana iletişim CTA — görünür tek tık */}
            <div className="mb-10 flex justify-center px-2">
              <a
                href={`tel:${content.contact.phone1.replace(/\s/g, "")}`}
                className="inline-flex w-full max-w-lg items-center justify-center rounded-full bg-lilac px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-lilac/35 transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:w-auto sm:px-14 sm:py-[1.1rem]"
                aria-label={content.contact.primaryCta}
              >
                {content.contact.primaryCta}
              </a>
            </div>

            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              {lang === "tr" ? "veya doğrudan kanallar" : "or reach us directly"}
            </p>

            {/* Primary Action Buttons */}
            <div id="contact-channels" className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
          </div>
        </section>

        <section
          className="border-t border-white/[0.06] bg-dark px-6 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-10 lg:px-20"
          aria-label={lang === "tr" ? "Konum ve teknik destek" : "Location and technical support"}
        >
          <AnimatedMap content={content.animatedMap} contactHref="#contact" />
        </section>

        <div className="h-12 bg-dark/95 sm:h-16" aria-hidden="true" />
      </main>

      <Footer language={lang} />

      <Chatbot />
      <MobileStickyCTA language={lang} />
    </div>
  );
}
