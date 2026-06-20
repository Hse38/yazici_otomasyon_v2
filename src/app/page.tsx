"use client";

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
import { HomeTrustSection } from "../components/home/HomeTrustSection";
import { HomeIndustry40Section } from "../components/home/HomeIndustry40Section";
import { HomeUseCasesSection } from "../components/home/HomeUseCasesSection";
import { HomeProcessSection } from "../components/home/HomeProcessSection";
import { HomeFinalCtaSection } from "../components/home/HomeFinalCtaSection";
import { HomeContactMapSection } from "../components/home/HomeContactMapSection";
import { HomeProductCatalogSection } from "../components/home/HomeProductCatalogSection";
import { HeroPhotoSection } from "../components/home/HeroPhotoSection";

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
    services: {
      kicker: "Industrial Catalog",
      title: "Engineering-grade categories and brand ecosystem",
      description:
        "Browse our category-based showcase to evaluate capability, standards alignment, and proven brand coverage.",
      detailAction: "View details",
      categories: [
        {
          key: "safety",
          serviceId: "product-1",
          title: "Safety Systems",
          description:
            "Machine safety architecture for guarding, interlock, emergency stop, and compliance-critical applications.",
          brands: [
            { name: "Schmersal", logoAlt: "Schmersal logo" },
            { name: "Euchner", logoAlt: "Euchner logo" },
            { name: "Bernstein", logoAlt: "Bernstein logo" },
            { name: "Sick", logoAlt: "Sick logo" },
            { name: "Pizzato", logoAlt: "Pizzato logo" },
            { name: "Pilz", logoAlt: "Pilz logo" },
          ],
          features: [
            "Safety assessment and architecture planning",
            "Risk analysis and hazard mitigation workflow",
            "Machine revision and retrofit execution",
            "ISO 13849 alignment support",
          ],
          imageSet: ["/img/product-1.jpg", "/img/product-2.jpg", "/img/product-3.jpg"],
        },
        {
          key: "sensor",
          serviceId: "product-2",
          title: "Sensor Systems",
          description:
            "Reliable sensing layer for position, presence, distance, and process detection in harsh industrial environments.",
          brands: [
            { name: "Sick", logoAlt: "Sick logo" },
            { name: "IFM", logoAlt: "IFM logo" },
            { name: "Balluff", logoAlt: "Balluff logo" },
            { name: "Turck", logoAlt: "Turck logo" },
            { name: "Omron", logoAlt: "Omron logo" },
            { name: "Pepperl+Fuchs", logoAlt: "Pepperl+Fuchs logo" },
          ],
          features: [
            "Application-based sensor selection",
            "IP and environment fit verification",
            "Signal quality and false-trigger prevention",
            "PLC and fieldbus integration planning",
          ],
          imageSet: ["/img/product-2.jpg", "/img/product-4.jpg", "/img/product-5.jpg"],
        },
        {
          key: "control",
          serviceId: "product-3",
          title: "Control System",
          description:
            "PLC, HMI, I/O, and communication infrastructure designed for deterministic control and scalable line automation.",
          brands: [
            { name: "Siemens", logoAlt: "Siemens logo" },
            { name: "Schneider Electric", logoAlt: "Schneider Electric logo" },
            { name: "Mitsubishi Electric", logoAlt: "Mitsubishi Electric logo" },
            { name: "Omron", logoAlt: "Omron logo" },
            { name: "Beckhoff", logoAlt: "Beckhoff logo" },
            { name: "Allen-Bradley", logoAlt: "Allen-Bradley logo" },
            {
              name: "Planet Makina",
              logoSrc: "/img/brands/planet-makina-logo.svg",
              logoAlt: "Planet Makina logo",
            },
          ],
          features: [
            "Control architecture and CPU sizing",
            "I/O mapping and communication topology",
            "HMI/SCADA integration readiness",
            "Documentation and commissioning discipline",
          ],
          imageSet: ["/img/product-3.jpg", "/img/product-4.jpg", "/img/product-6.jpg"],
        },
        {
          key: "encoder",
          serviceId: "product-4",
          title: "Encoder Solutions",
          description:
            "Motion feedback components for precise speed, position, and synchronization requirements on rotary and linear systems.",
          brands: [
            { name: "Sick", logoAlt: "Sick logo" },
            { name: "Kübler", logoAlt: "Kübler logo" },
            { name: "Baumer", logoAlt: "Baumer logo" },
            { name: "Leine Linde", logoAlt: "Leine Linde logo" },
            { name: "Omron", logoAlt: "Omron logo" },
            { name: "Pepperl+Fuchs", logoAlt: "Pepperl+Fuchs logo" },
          ],
          features: [
            "Absolute and incremental encoder selection",
            "Mechanical fit and shaft coupling guidance",
            "Noise-resilient signal strategy",
            "Drive and controller compatibility checks",
          ],
          imageSet: ["/img/product-1.jpg", "/img/product-5.jpg", "/img/product-6.jpg"],
        },
        {
          key: "instrument",
          serviceId: "product-5",
          title: "Instrument Solutions",
          description:
            "Field instrumentation for pressure, temperature, level, and flow with plant-grade reliability and traceability.",
          brands: [
            { name: "Endress+Hauser", logoAlt: "Endress+Hauser logo" },
            { name: "WIKA", logoAlt: "WIKA logo" },
            { name: "Yokogawa", logoAlt: "Yokogawa logo" },
            { name: "Siemens", logoAlt: "Siemens logo" },
            { name: "KROHNE", logoAlt: "KROHNE logo" },
            { name: "ABB", logoAlt: "ABB logo" },
          ],
          features: [
            "Measurement chain design support",
            "Calibration and accuracy planning",
            "Process condition suitability checks",
            "Installation and maintenance readiness",
          ],
          imageSet: ["/img/product-2.jpg", "/img/product-3.jpg", "/img/product-6.jpg"],
        },
      ],
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
      sectorsTitle: "Industries we work in and sample firms",
      sectors: [
        {
          sector: "Pharmaceutical",
          companies: [
            "Polifarma",
            "Koçak Farma",
            "Farmatek",
            "Abdi İbrahim",
            "World Medicine",
            "Recordati İlaç",
          ],
        },
        {
          sector: "Automotive",
          companies: ["Tek-Elman Otomotiv", "Hema Endüstri"],
        },
        {
          sector: "Food filling & packaging",
          companies: ["Opack Makine", "Brightpack"],
        },
        {
          sector: "Furniture & decor",
          companies: ["Dekor Ahşap", "Lignadecor", "Roma Plastik"],
        },
        {
          sector: "Textile",
          companies: [
            "EPA Teknoloji",
            "Robotek Makina",
            "DMS Makina",
            "Planet Makina",
            "Özmak Makina",
          ],
        },
      ],
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
      branchesLabel: "Our branches",
      phone1: "+90 553 056 89 39",
      phone2: "+90 532 056 34 39",
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
    services: {
      kicker: "Endüstriyel Katalog",
      title: "Mühendislik odaklı kategori ve marka ekosistemi",
      description:
        "Kategori bazlı vitrin ile teknik yetkinlik, standart uyumu ve güçlü marka kapsamını birlikte değerlendirin.",
      detailAction: "Detay sayfası",
      categories: [
        {
          key: "safety",
          serviceId: "product-1",
          title: "Safety Sistemleri",
          description:
            "Makine emniyet mimarisi, interlock, acil stop ve uyumluluk kritik uygulamalarda uçtan uca çözüm yaklaşımı.",
          brands: [
            { name: "Schmersal", logoAlt: "Schmersal logosu" },
            { name: "Euchner", logoAlt: "Euchner logosu" },
            { name: "Bernstein", logoAlt: "Bernstein logosu" },
            { name: "Sick", logoAlt: "Sick logosu" },
            { name: "Pizzato", logoAlt: "Pizzato logosu" },
            { name: "Pilz", logoAlt: "Pilz logosu" },
          ],
          features: [
            "Emniyet değerlendirmesi",
            "Risk analizi ve tehlike azaltma akışı",
            "Makine revizyonu ve retrofit uygulamaları",
            "ISO 13849 uyumluluk desteği",
          ],
          imageSet: ["/img/product-1.jpg", "/img/product-2.jpg", "/img/product-3.jpg"],
        },
        {
          key: "sensor",
          serviceId: "product-2",
          title: "Sensör Sistemleri",
          description:
            "Zorlu üretim ortamlarında konum, varlık, mesafe ve proses algılama için güvenilir sensör katmanı.",
          brands: [
            { name: "Sick", logoAlt: "Sick logosu" },
            { name: "IFM", logoAlt: "IFM logosu" },
            { name: "Balluff", logoAlt: "Balluff logosu" },
            { name: "Turck", logoAlt: "Turck logosu" },
            { name: "Omron", logoAlt: "Omron logosu" },
            { name: "Pepperl+Fuchs", logoAlt: "Pepperl+Fuchs logosu" },
          ],
          features: [
            "Uygulamaya uygun sensör seçimi",
            "IP sınıfı ve ortam uygunluğu doğrulaması",
            "Yanlış tetikleme riskini azaltan sinyal kalitesi",
            "PLC ve saha veri yolu entegrasyon planlaması",
          ],
          imageSet: ["/img/product-2.jpg", "/img/product-4.jpg", "/img/product-5.jpg"],
        },
        {
          key: "control",
          serviceId: "product-3",
          title: "Control System",
          description:
            "Deterministik kontrol ve ölçeklenebilir hat otomasyonu için PLC, HMI, I/O ve iletişim altyapısı.",
          brands: [
            { name: "Siemens", logoAlt: "Siemens logosu" },
            { name: "Schneider Electric", logoAlt: "Schneider Electric logosu" },
            { name: "Mitsubishi Electric", logoAlt: "Mitsubishi Electric logosu" },
            { name: "Omron", logoAlt: "Omron logosu" },
            { name: "Beckhoff", logoAlt: "Beckhoff logosu" },
            { name: "Allen-Bradley", logoAlt: "Allen-Bradley logosu" },
            {
              name: "Planet Makina",
              logoSrc: "/img/brands/planet-makina-logo.svg",
              logoAlt: "Planet Makina logosu",
            },
          ],
          features: [
            "Kontrol mimarisi ve CPU boyutlandırma",
            "I/O haritalama ve haberleşme topolojisi",
            "HMI/SCADA entegrasyon hazırlığı",
            "Dokümantasyon ve devreye alma disiplini",
          ],
          imageSet: ["/img/product-3.jpg", "/img/product-4.jpg", "/img/product-6.jpg"],
        },
        {
          key: "encoder",
          serviceId: "product-4",
          title: "Encoder Çözümleri",
          description:
            "Döner ve lineer sistemlerde hız, pozisyon ve senkronizasyon için hassas geri besleme bileşenleri.",
          brands: [
            { name: "Sick", logoAlt: "Sick logosu" },
            { name: "Kübler", logoAlt: "Kübler logosu" },
            { name: "Baumer", logoAlt: "Baumer logosu" },
            { name: "Leine Linde", logoAlt: "Leine Linde logosu" },
            { name: "Omron", logoAlt: "Omron logosu" },
            { name: "Pepperl+Fuchs", logoAlt: "Pepperl+Fuchs logosu" },
          ],
          features: [
            "Absolute ve incremental encoder seçimi",
            "Mekanik uyum ve mil bağlantı yönlendirmesi",
            "Gürültüye dayanıklı sinyal stratejisi",
            "Sürücü ve kontrolör uyumluluk kontrolü",
          ],
          imageSet: ["/img/product-1.jpg", "/img/product-5.jpg", "/img/product-6.jpg"],
        },
        {
          key: "instrument",
          serviceId: "product-5",
          title: "Instrument Çözümleri",
          description:
            "Basınç, sıcaklık, seviye ve debi ölçümlerinde tesis ölçeğinde güvenilirlik ve izlenebilirlik.",
          brands: [
            { name: "Endress+Hauser", logoAlt: "Endress+Hauser logosu" },
            { name: "WIKA", logoAlt: "WIKA logosu" },
            { name: "Yokogawa", logoAlt: "Yokogawa logosu" },
            { name: "Siemens", logoAlt: "Siemens logosu" },
            { name: "KROHNE", logoAlt: "KROHNE logosu" },
            { name: "ABB", logoAlt: "ABB logosu" },
          ],
          features: [
            "Ölçüm zinciri kurgusu ve saha uygunluğu",
            "Kalibrasyon ve doğruluk planlaması",
            "Proses koşullarına göre ürün doğrulama",
            "Kurulum ve bakım hazırlığı",
          ],
          imageSet: ["/img/product-2.jpg", "/img/product-3.jpg", "/img/product-6.jpg"],
        },
      ],
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
      sectorsTitle: "Çalıştığımız sektörler ve örnek firmalar",
      sectors: [
        {
          sector: "İlaç",
          companies: [
            "Polifarma",
            "Koçak Farma",
            "Farmatek",
            "Abdi İbrahim",
            "World Medicine",
            "Recordati İlaç",
          ],
        },
        {
          sector: "Otomotiv",
          companies: ["Tek-Elman Otomotiv", "Hema Endüstri"],
        },
        {
          sector: "Gıda dolum & paketleme",
          companies: ["Opack Makine", "Brightpack"],
        },
        {
          sector: "Mobilya & dekor",
          companies: ["Dekor Ahşap", "Lignadecor", "Roma Plastik"],
        },
        {
          sector: "Tekstil",
          companies: [
            "EPA Teknoloji",
            "Robotek Makina",
            "DMS Makina",
            "Planet Makina",
            "Özmak Makina",
          ],
        },
      ],
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
      branchesLabel: "Şubelerimiz",
      phone1: "+90 553 056 89 39",
      phone2: "+90 532 056 34 39",
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

function getCompanyMonogram(name: string): string {
  const cleaned = name
    .replace(/&/g, " ")
    .replace(/[-/]/g, " ")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "CO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function Counter({ value, suffix }: { value: number; suffix: string; label?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let animationFrame = 0;
    const duration = 1200;
    const start = performance.now();
    setDisplay(0);

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
    <span className="stat-number text-4xl font-semibold text-white sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Home() {
  const { setPageContext, setLanguage } = useChatbot();
  const [lang, setLang] = useState<Language>("tr");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const content = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 60);
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

  return (
    <div className="bg-background text-foreground m-0 p-0">
      {/* Schema Markup */}
      <SchemaMarkup language={lang} faqItems={faqItems} />

      <header
        className={`sticky top-0 z-20 m-0 w-full transition-all duration-300 ${
          headerScrolled
            ? "border-b border-dark/8 bg-white/95 shadow-md backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        id="main-header"
      >
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
              textColor={headerScrolled ? "text-dark/80" : "text-white/80"}
              hoverColor={headerScrolled ? "hover:text-dark" : "hover:text-white"}
            />
            <div className={`hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] md:flex ${headerScrolled ? "text-dark" : "text-white"}`}>
              <button
                type="button"
                onClick={() => setLang("tr")}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "tr"
                    ? headerScrolled
                      ? "border-accent bg-accent text-white"
                      : "border-soft-lavender bg-soft-lavender text-dark"
                    : headerScrolled
                      ? "border-dark/20 text-dark/70 hover:border-accent hover:text-dark"
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
                    ? headerScrolled
                      ? "border-accent bg-accent text-white"
                      : "border-soft-lavender bg-soft-lavender text-dark"
                    : headerScrolled
                      ? "border-dark/20 text-dark/70 hover:border-accent hover:text-dark"
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
        <HeroPhotoSection
          content={{
            kicker: content.hero.kicker,
            title: content.hero.title,
            description: content.hero.description,
            ctaPrimary: content.hero.ctaPrimary,
            ctaSecondary: content.hero.ctaSecondary,
            scrollAria: content.hero.scrollAria,
          }}
          language={lang}
        />

        <section className="border-b border-navy/15 bg-navy py-16 text-white">
          <div className="mx-auto grid max-w-6xl gap-0 px-6 sm:px-10 lg:px-20 md:grid-cols-3 md:divide-x md:divide-white/10">
            {content.counters.map((counter) => (
              <div key={counter.label} className="flex flex-col items-center py-8 md:py-0 text-center">
                <Counter {...counter} />
                <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  {counter.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <HomeTrustSection content={content.trust} />
        <HomeIndustry40Section content={content.industry40} />

        <section id="products" className="section-padding bg-background">
          <HomeProductCatalogSection content={content.services} />
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
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-dark/55">
                {content.proof.sectorsTitle}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {content.proof.sectors.map((item) => (
                  <article
                    key={item.sector}
                    className="rounded-2xl border border-dark/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-dark">
                      {item.sector}
                    </h4>
                    {item.companies.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {item.companies.map((company) => (
                          <span
                            key={`${item.sector}-${company}`}
                            className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-background px-2.5 py-1.5 text-xs font-medium text-dark/80"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark text-[10px] font-semibold leading-none tracking-wide text-white"
                            >
                              {getCompanyMonogram(company)}
                            </span>
                            <span>{company}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-xs font-medium text-dark/55">
                        {lang === "tr" ? "Örnek firma bilgisi paylaşılacak." : "Sample firms will be shared."}
                      </p>
                    )}
                  </article>
                ))}
              </div>
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

        <HomeContactMapSection
          content={{
            title: content.contact.title,
            description: content.contact.description,
            primaryCta: content.contact.primaryCta,
            whatsapp: content.contact.whatsapp,
            call: content.contact.call,
            phone1: content.contact.phone1,
            phone2: content.contact.phone2,
            channelsHint:
              lang === "tr" ? "veya doğrudan kanallar" : "or reach us directly",
          }}
        />
      </main>

      <Footer language={lang} />

      <Chatbot />
      <MobileStickyCTA language={lang} />
    </div>
  );
}
