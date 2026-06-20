"use client";

import { motion } from "framer-motion";
import type { ServiceData } from "../data/services";
import { Chatbot } from "./Chatbot";
import { useChatbot } from "../contexts/ChatbotContext";
import { ServiceGallery } from "./ServiceGallery";
import { SchemaMarkup } from "./SEO/SchemaMarkup";
import { ProductBreadcrumbs } from "./SEO/ProductBreadcrumbs";
import { InternalLinks } from "./SEO/InternalLinks";
import { PRODUCT_CATEGORY_LABELS } from "../lib/seo";
import { StickyCTA } from "./SEO/StickyCTA";
import { MobileNav } from "./Navigation/MobileNav";
import { DesktopNav } from "./Navigation/DesktopNav";
import { MobileStickyCTA } from "./Navigation/MobileStickyCTA";
import { Footer } from "./Footer";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ServiceDetailPageProps = {
  service: ServiceData;
  language: "tr" | "en";
};

// Navigation translations
const navTranslations = {
  tr: {
    brand: "Yazıcı Otomasyon",
    nav: {
      services: "Ürünler",
      whyUs: "Hakkımızda",
      proof: "Galeri",
      contact: "İletişim",
    },
  },
  en: {
    brand: "Yazıcı Otomasyon",
    nav: {
      services: "Products",
      whyUs: "About Us",
      proof: "Gallery",
      contact: "Contact",
    },
  },
} as const;

export function ServiceDetailPage({ service, language }: ServiceDetailPageProps) {
  const { setPageContext, setLanguage } = useChatbot();
  const [lang, setLang] = useState<"tr" | "en">(language);
  const content = service[language];
  const navContent = navTranslations[language];

  // Sync language with parent
  useEffect(() => {
    setLang(language);
    setLanguage(language);
  }, [language, setLanguage]);

  useEffect(() => {
    setPageContext("product-detail");
  }, [setPageContext]);

  const galleryImages = useMemo(() => {
    const match = /^product-(\d+)$/.exec(service.id);
    if (!match) return [];
    const n = match[1];
    return [
      {
        src: `/img/product-${n}.jpg`,
        alt:
          language === "tr"
            ? `${content.title} — Yazıcı Otomasyon`
            : `${content.title} — Yazıcı Otomasyon`,
      },
    ];
  }, [service.id, language, content.title]);

  const heroCover = galleryImages[0];
  const safetyHero = {
    src: "/img/safety-detail-hero.png",
    alt:
      language === "tr"
        ? "Schmersal güvenlik anahtarı — makine emniyet sistemleri"
        : "Schmersal safety switch — machine safety systems",
  };
  const sensorHero = {
    src: "/img/sensor-detail-hero.png",
    alt:
      language === "tr"
        ? "Endüstriyel proximity sensör — otomasyon algılama sistemleri"
        : "Industrial proximity sensor — automation sensing systems",
  };
  const controlSystemHero = {
    src: "/img/control-system-detail-hero.png",
    alt:
      language === "tr"
        ? "Siemens PLC kontrol paneli — endüstriyel kontrol sistemleri"
        : "Siemens PLC control panel — industrial control systems",
  };
  const encoderHero = {
    src: "/img/encoder-detail-hero.png",
    alt:
      language === "tr"
        ? "Endüstriyel rotary encoder — hassas pozisyon ölçümü"
        : "Industrial rotary encoder — precision position measurement",
  };
  const heroDisplay =
    service.id === "product-1"
      ? safetyHero
      : service.id === "product-2"
        ? sensorHero
        : service.id === "product-3"
          ? controlSystemHero
          : service.id === "product-4"
            ? encoderHero
        : heroCover;
  const isSensorSolutionPage = service.id === "product-2";
  const sensorSolutionCopy =
    language === "tr"
      ? {
          heroTitle: "Endüstriyel Sensör Sistemleri",
          heroDescription:
            "Üretim hatlarınız için doğru sensör teknolojisini seçin ve ölçüm güvenilirliğini artırın.",
          heroCta: "Teknik Danışmanlık Al",
          sectionWhat: "Sensör Sistemleri Nedir?",
          sectionWhatText:
            "Endüstriyel sensör sistemleri; üretim hatlarında algılama, pozisyonlama, mesafe, varlık ve kalite kontrolünü güvenilir şekilde gerçekleştiren otomasyon bileşenleridir.",
          sectionTypes: "Hangi Sensör Türlerini Sunuyoruz?",
          sectionBrands: "Çalıştığımız Global Sensör Markaları",
          sectionUseCases: "Bu Sensörler Nerede Kullanılır?",
          sectionTechnical: "Teknik Hizmetlerimiz",
          ctaBottom: "Uygulamanız için doğru sensörü birlikte belirleyelim",
          whatsapp: "WhatsApp",
          call: "Hemen Ara",
        }
      : {
          heroTitle: "Industrial Sensor Systems",
          heroDescription:
            "Select the right sensing technology for your production lines and improve measurement reliability.",
          heroCta: "Get Technical Consulting",
          sectionWhat: "What Are Sensor Systems?",
          sectionWhatText:
            "Industrial sensor systems provide reliable detection, positioning, distance measurement, presence sensing, and quality control across automation lines.",
          sectionTypes: "Which Sensor Types Do We Offer?",
          sectionBrands: "Global Sensor Brands We Work With",
          sectionUseCases: "Where Are These Sensors Used?",
          sectionTechnical: "Our Technical Services",
          ctaBottom: "Let's define the right sensor for your application together",
          whatsapp: "WhatsApp",
          call: "Call Now",
        };
  const sensorTypes =
    language === "tr"
      ? [
          { name: "Endüktif Sensörler", text: "Metal nesnelerin temasız algılanması için yüksek dayanımlı çözümler." },
          { name: "Kapasitif Sensörler", text: "Sıvı, granül ve plastik gibi farklı malzemelerin hassas algılanması." },
          { name: "Fotoseller", text: "Varlık/yokluk kontrolü ve konveyör hatlarında güvenilir algılama." },
          { name: "Fiber Optik Sensörler", text: "Dar alanlarda yüksek hassasiyet ve düşük tepki süresi." },
          { name: "Kontrast Sensörleri", text: "Etiket, baskı ve işaret algılamada net renk/kontrast ayrımı." },
          { name: "Mesafe Ölçüm Sensörleri", text: "Stabil mesafe ve konum geri bildirimi ile proses kontrolü." },
          { name: "Manyetik Sensörler", text: "Silindir ve hareketli mekanizmalarda sağlam manyetik algılama." },
          { name: "Görüntü İşleme Sistemleri", text: "Kalite kontrol ve hata yakalama için kamera tabanlı çözüm." },
        ]
      : [
          { name: "Inductive Sensors", text: "Rugged non-contact detection for metal targets." },
          { name: "Capacitive Sensors", text: "Reliable sensing across liquids, granules, and non-metal materials." },
          { name: "Photoelectric Sensors", text: "Stable object detection for conveyor and transfer lines." },
          { name: "Fiber Optic Sensors", text: "High precision sensing in tight and hard-to-reach spaces." },
          { name: "Contrast Sensors", text: "Accurate mark and label detection on printing and packaging lines." },
          { name: "Distance Sensors", text: "Consistent distance and position feedback for process control." },
          { name: "Magnetic Sensors", text: "Robust magnetic detection for cylinders and moving mechanisms." },
          { name: "Vision Systems", text: "Camera-based quality inspection and defect detection." },
        ];
  const sensorBrands = ["Sick", "Omron", "Autonics", "Balluff", "Panasonic", "Pepperl+Fuchs", "IFM"];
  const sensorTechnical =
    language === "tr"
      ? [
          "Doğru sensör seçimi danışmanlığı",
          "Ortam koşullarına uygun ürün belirleme",
          "Hassasiyet ve mesafe optimizasyonu",
          "Endüstriyel entegrasyon desteği",
          "Arıza tespiti ve sistem iyileştirme",
        ]
      : [
          "Sensor selection consulting for your application",
          "Environment-fit product identification",
          "Sensitivity and distance optimization",
          "Industrial integration support",
          "Failure analysis and system improvement",
        ];
  const sensorUseCases =
    language === "tr"
      ? ["Üretim hatları", "Paketleme makineleri", "Robotik sistemler", "Kalite kontrol hatları"]
      : ["Production lines", "Packaging machinery", "Robotic systems", "Quality control lines"];
  const isControlSolutionPage = service.id === "product-3";
  const controlSolutionCopy =
    language === "tr"
      ? {
          heroTitle: "Endüstriyel Kontrol Sistemleri",
          heroDescription:
            "Üretim süreçlerinizi tam kontrol altına alın. PLC, HMI ve SCADA sistemleri ile makinelerinizi gerçek zamanlı olarak yönetin, izleyin ve optimize edin.",
          heroCta: "Teknik Danışmanlık Al",
          sectionWhat: "PLC Nedir?",
          sectionWhatText:
            "PLC; üretim hatlarında makine, hareket ve proses kontrolünü deterministik yapıda yöneten endüstriyel kontrol birimidir.",
          sectionTypes: "HMI ve SCADA Sistemleri",
          sectionBrands: "Çalıştığımız Otomasyon Markaları",
          sectionUseCases: "Bu Sistemler Nerede Kullanılır?",
          sectionTechnical: "Sunduğumuz Çözümler",
          sectionProcess: "Sistem Kurulum Sürecimiz",
          ctaBottom: "Sistemlerinizi daha verimli ve kontrollü hale getirelim",
          whatsapp: "WhatsApp",
          call: "Hemen Ara",
        }
      : {
          heroTitle: "Industrial Control Systems",
          heroDescription:
            "Take full control of your production processes. Use PLC, HMI, and SCADA systems to monitor, control, and optimize machines in real time.",
          heroCta: "Get Technical Consulting",
          sectionWhat: "What Is a PLC?",
          sectionWhatText:
            "A PLC is an industrial controller that manages machine logic, motion, and process flow with deterministic performance.",
          sectionTypes: "HMI and SCADA Systems",
          sectionBrands: "Automation Brands We Work With",
          sectionUseCases: "Where Are These Systems Used?",
          sectionTechnical: "Solutions We Provide",
          sectionProcess: "Our System Deployment Process",
          ctaBottom: "Let's make your systems more efficient and controllable",
          whatsapp: "WhatsApp",
          call: "Call Now",
        };
  const controlComponents =
    language === "tr"
      ? [
          { name: "PLC Sistemleri", text: "Endüstriyel makinelerin kontrolünü sağlayan ana beyin." },
          { name: "HMI Paneller", text: "Operatörün sistemi izlediği ve kontrol ettiği arayüz." },
          { name: "SCADA Sistemleri", text: "Tüm üretim hattını merkezi olarak izleme ve kontrol." },
          { name: "Motion Control", text: "Servo ve motor kontrol sistemleri ile hassas hareket yönetimi." },
          { name: "Remote Monitoring", text: "Uzaktan erişim ve veri takibi ile sürdürülebilir operasyon." },
        ]
      : [
          { name: "PLC Systems", text: "Core control layer that drives industrial machine logic." },
          { name: "HMI Panels", text: "Operator interface used to monitor and control the system." },
          { name: "SCADA Systems", text: "Centralized supervision and control across production lines." },
          { name: "Motion Control", text: "Precise servo and motor control for synchronized movement." },
          { name: "Remote Monitoring", text: "Remote access and data tracking for continuous operations." },
        ];
  const controlTechnical =
    language === "tr"
      ? [
          "Gerçek zamanlı kontrol ve veri işleme",
          "Yüksek hassasiyetli proses yönetimi",
          "Endüstri 4.0 entegrasyonu",
          "Ağ tabanlı otomasyon (Profinet, Modbus, EtherNet/IP)",
          "Sistem optimizasyonu ve hata azaltma",
        ]
      : [
          "Real-time control and data processing",
          "High-precision process management",
          "Industry 4.0 integration",
          "Networked automation (Profinet, Modbus, EtherNet/IP)",
          "System optimization and fault reduction",
        ];
  const controlBrands = ["Siemens", "Schneider Electric", "Omron", "Delta", "Mitsubishi", "Beckhoff"];
  const controlUseCases =
    language === "tr"
      ? ["Üretim hatları", "Paketleme sistemleri", "Robotik otomasyon", "Enerji ve proses sistemleri"]
      : ["Production lines", "Packaging systems", "Robotic automation", "Energy and process systems"];
  const controlProcess =
    language === "tr"
      ? ["Analiz", "Tasarım", "Uygulama", "Devreye Alma", "Teknik Destek"]
      : ["Analysis", "Design", "Implementation", "Commissioning", "Technical Support"];
  const isEncoderSolutionPage = service.id === "product-4";
  const encoderSolutionCopy =
    language === "tr"
      ? {
          heroH1: "Endüstriyel Encoder Sistemleri",
          heroLead: "Hareketi Hassasiyetle Ölçün ve Kontrol Edin",
          heroDescription:
            "Rotary ve linear encoder sistemleri ile makine pozisyonunu, hızını ve hareketini yüksek doğrulukla izleyin.",
          heroCta: "Teknik Danışmanlık Al",
          sectionWhat: "Encoder Nedir?",
          sectionWhatText:
            "Encoder; dönen veya doğrusal hareketi elektriksel sinyallere dönüştürerek pozisyon, hız ve yön bilgisini otomasyon sistemine güvenilir biçimde ileten ölçüm elemanıdır.",
          sectionTypes: "Encoder Türleri",
          sectionTypesIntro:
            "Uygulamanıza göre doğru encoder ailesini seçerek tekrarlanabilir ölçüm, düşük jitter ve stabil geri besleme elde edersiniz.",
          sectionBrands: "Çalıştığımız Encoder Markaları",
          sectionUseCases: "Encoder Sistemleri Nerede Kullanılır?",
          sectionTechnical: "Teknik Hizmetlerimiz",
          showcaseTitle: "Encoder Uygulama Görünümü",
          showcaseCaption:
            "Endüstriyel encoder çözümlerinde tip seçimi, kablolama, sinyal bütünlüğü ve entegrasyon aynı disiplin altında ele alınır.",
          ctaBottom: "Makineniz için doğru encoder çözümünü birlikte belirleyelim",
          whatsapp: "WhatsApp",
          call: "Hemen Ara",
        }
      : {
          heroH1: "Industrial Encoder Systems",
          heroLead: "Measure and Control Motion with Precision",
          heroDescription:
            "Use rotary and linear encoder systems to monitor machine position, speed, and motion with high accuracy.",
          heroCta: "Get Technical Consulting",
          sectionWhat: "What Is an Encoder?",
          sectionWhatText:
            "An encoder converts rotary or linear motion into electrical signals so automation systems receive reliable position, speed, and direction feedback.",
          sectionTypes: "Encoder Types",
          sectionTypesIntro:
            "Choosing the right encoder family improves repeatability, minimizes jitter, and stabilizes closed-loop feedback for your application.",
          sectionBrands: "Encoder Brands We Work With",
          sectionUseCases: "Where Encoder Systems Are Used",
          sectionTechnical: "Our Technical Services",
          showcaseTitle: "Encoder Application Showcase",
          showcaseCaption:
            "We treat type selection, cabling, signal integrity, and integration as one disciplined engineering workflow.",
          ctaBottom: "Let's define the right encoder solution for your machine together",
          whatsapp: "WhatsApp",
          call: "Call Now",
        };
  const encoderTypes =
    language === "tr"
      ? [
          { name: "Artımlı Encoder (Incremental Encoder)", text: "Hız ve pozisyon değişimini ölçer." },
          { name: "Mutlak Encoder (Absolute Encoder)", text: "Güç kesilse bile pozisyon bilgisini korur." },
          { name: "Rotary Encoder", text: "Döner hareket ölçümü." },
          { name: "Linear Encoder", text: "Doğrusal hareket ölçümü." },
          { name: "Manyetik Encoder", text: "Zorlu ortamlar için dayanıklı." },
          { name: "Optik Encoder", text: "Yüksek hassasiyetli uygulamalar." },
        ]
      : [
          { name: "Incremental Encoder", text: "Measures changes in speed and position." },
          { name: "Absolute Encoder", text: "Retains position information even after power loss." },
          { name: "Rotary Encoder", text: "Measurement for rotary motion." },
          { name: "Linear Encoder", text: "Measurement for linear motion." },
          { name: "Magnetic Encoder", text: "Robust performance in harsh environments." },
          { name: "Optical Encoder", text: "High-resolution performance for precision applications." },
        ];
  const encoderTechnical =
    language === "tr"
      ? [
          "Yüksek çözünürlüklü pozisyon ölçümü",
          "Hız ve yön tespiti",
          "Endüstri 4.0 veri entegrasyonu",
          "Servo ve motion control uyumu",
          "Zorlu ortam koşullarına dayanıklılık",
        ]
      : [
          "High-resolution position measurement",
          "Speed and direction detection",
          "Industry 4.0 data integration",
          "Servo and motion control compatibility",
          "Durability in harsh operating conditions",
        ];
  const encoderBrands = ["Sick", "Omron", "Autonics", "IFM", "Pepperl+Fuchs", "Baumer", "Hengstler"];
  const encoderUseCases =
    language === "tr"
      ? [
          {
            title: "CNC makineleri",
            description: "Takım yollarında stabil eks geri beslemesi ve tekrarlanabilir işleme doğruluğu.",
          },
          {
            title: "Robotik sistemler",
            description: "Eksen senkronizasyonu ve güvenli hareket profilleri için yüksek çözünürlüklü geri bildirim.",
          },
          {
            title: "Konveyör hatları",
            description: "Hız eşleştirme ve pozisyon takibi ile akıcı transfer ve hat senkronizasyonu.",
          },
          {
            title: "Paketleme makineleri",
            description: "Kesim, yerleştirme ve hat hızı uyumu için hassas hız ve konum ölçümü.",
          },
          {
            title: "Servo motor sistemleri",
            description: "Kapalı çevrim kontrolde düşük hata ve hızlı tepki için uyumlu encoder mimarisi.",
          },
        ]
      : [
          {
            title: "CNC machines",
            description: "Stable axis feedback and repeatable machining accuracy for toolpath motion.",
          },
          {
            title: "Robotic systems",
            description: "High-resolution feedback for axis synchronization and safe motion profiles.",
          },
          {
            title: "Conveyor lines",
            description: "Speed matching and position tracking for smooth transfers and line sync.",
          },
          {
            title: "Packaging machinery",
            description: "Precise speed and position measurement for cutting, placing, and line-rate alignment.",
          },
          {
            title: "Servo motor systems",
            description: "Encoder architectures aligned with closed-loop control for fast response and low error.",
          },
        ];
  const encoderShowcaseTiles =
    language === "tr"
      ? [
          { label: "Incremental", sub: "Hız / pozisyon değişimi" },
          { label: "Absolute", sub: "Pozisyon hafızası" },
          { label: "Linear", sub: "Doğrusal eks" },
        ]
      : [
          { label: "Incremental", sub: "Speed / delta position" },
          { label: "Absolute", sub: "Position memory" },
          { label: "Linear", sub: "Linear axis" },
        ];

  return (
    <div className="bg-background text-foreground">
      <SchemaMarkup service={service} language={language} />
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/yazici-logo-dark.png"
              alt={navContent.brand}
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
            <span className="sr-only">{navContent.brand}</span>
          </Link>
          <div className="flex items-center gap-6">
            <DesktopNav
              language={language}
              navItems={navContent.nav}
              textColor="text-dark/70"
              hoverColor="hover:text-dark"
            />
            <MobileNav
              language={language}
              onLanguageChange={(newLang) => {
                localStorage.setItem("lang", newLang);
                setLang(newLang);
                setLanguage(newLang);
                window.location.reload();
              }}
              currentLang={lang}
              navItems={navContent.nav}
              brand={navContent.brand}
              ctaText={language === "tr" ? "Teklif Al" : "Get a Quote"}
              buttonColor="dark"
            />
            <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-dark md:flex">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("lang", "tr");
                  setLang("tr");
                  setLanguage("tr");
                  window.location.reload();
                }}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "tr"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-dark/20 text-dark/70 hover:border-soft-lavender hover:text-dark"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("lang", "en");
                  setLang("en");
                  setLanguage("en");
                  window.location.reload();
                }}
                className={`rounded-full border px-3 py-1 transition ${
                  lang === "en"
                    ? "border-soft-lavender bg-soft-lavender text-dark"
                    : "border-dark/20 text-dark/70 hover:border-soft-lavender hover:text-dark"
                }`}
              >
                EN
              </button>
            </div>
            <MobileNav
              language={language}
              onLanguageChange={(newLang) => {
                localStorage.setItem("lang", newLang);
                setLang(newLang);
                setLanguage(newLang);
                window.location.reload();
              }}
              currentLang={lang}
              navItems={navContent.nav}
              brand={navContent.brand}
              ctaText={language === "tr" ? "Teklif Al" : "Get a Quote"}
            />
          </div>
        </div>
      </header>

      <ProductBreadcrumbs service={service} language={language} />

      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-background via-background to-lilac/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(41,171,226,0.12),transparent_52%)]" />
        <div className="section-padding relative z-10 mx-auto max-w-6xl py-16 lg:flex lg:min-h-[70vh] lg:items-center lg:py-20">
          <div
            className={`grid w-full items-center gap-10 ${heroCover ? "lg:grid-cols-2 lg:gap-12 xl:gap-16" : ""}`}
          >
            {heroDisplay && (
              <motion.div
                initial={{ opacity: 0, x: isEncoderSolutionPage ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-lilac/20 bg-slate-100 shadow-lg shadow-lilac/10 lg:mx-0 lg:max-w-none ${
                  isEncoderSolutionPage ? "order-1 lg:order-2" : ""
                }`}
              >
                <Image
                  src={heroDisplay.src}
                  alt={heroDisplay.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            )}
            <div className={`space-y-8 ${isEncoderSolutionPage ? "order-2 lg:order-1" : ""}`}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs uppercase tracking-[0.4em] text-dark-purple"
              >
                {content.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-balance text-4xl font-semibold leading-tight text-dark sm:text-5xl lg:text-6xl"
              >
                {isSensorSolutionPage
                  ? sensorSolutionCopy.heroTitle
                  : isControlSolutionPage
                    ? controlSolutionCopy.heroTitle
                    : isEncoderSolutionPage
                      ? encoderSolutionCopy.heroH1
                      : content.title}
              </motion.h1>
              {isEncoderSolutionPage ? (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.14 }}
                  className="max-w-2xl text-balance text-2xl font-semibold leading-snug text-dark sm:text-3xl"
                >
                  {encoderSolutionCopy.heroLead}
                </motion.p>
              ) : null}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="max-w-2xl text-lg text-dark/70 sm:text-xl"
              >
                {isSensorSolutionPage
                  ? sensorSolutionCopy.heroDescription
                  : isControlSolutionPage
                    ? controlSolutionCopy.heroDescription
                    : isEncoderSolutionPage
                      ? encoderSolutionCopy.heroDescription
                      : content.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-lilac px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
                >
                  {isSensorSolutionPage
                    ? sensorSolutionCopy.heroCta
                    : isControlSolutionPage
                      ? controlSolutionCopy.heroCta
                      : isEncoderSolutionPage
                        ? encoderSolutionCopy.heroCta
                        : content.finalCta.primary}
                </a>
                <a
                  href="tel:+905530568939"
                  className="inline-flex items-center justify-center rounded-full border border-dark/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-dark transition hover:border-lilac hover:text-lilac"
                >
                  {isEncoderSolutionPage ? encoderSolutionCopy.call : content.finalCta.secondary}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-dark sm:text-3xl">
                {isSensorSolutionPage
                  ? sensorSolutionCopy.sectionWhat
                  : isControlSolutionPage
                    ? controlSolutionCopy.sectionWhat
                    : isEncoderSolutionPage
                      ? encoderSolutionCopy.sectionWhat
                    : language === "tr"
                      ? "Ürün Özeti"
                      : "Product Overview"}
              </h2>
              {isSensorSolutionPage ? (
                <p className="text-base leading-relaxed text-dark/70 sm:text-lg">{sensorSolutionCopy.sectionWhatText}</p>
              ) : isControlSolutionPage ? (
                <p className="text-base leading-relaxed text-dark/70 sm:text-lg">{controlSolutionCopy.sectionWhatText}</p>
              ) : isEncoderSolutionPage ? (
                <p className="text-base leading-relaxed text-dark/70 sm:text-lg">{encoderSolutionCopy.sectionWhatText}</p>
              ) : (
                <div className="space-y-4 text-dark/70">
                <div>
                  <h3 className="mb-2 font-semibold text-dark">
                    {language === "tr" ? "Ne" : "What"}
                  </h3>
                  <p>{content.overview.what}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-dark">
                    {language === "tr" ? "Kim İçin" : "Who"}
                  </h3>
                  <p>{content.overview.who}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-dark">
                    {language === "tr" ? "Ne Zaman" : "When"}
                  </h3>
                  <p>{content.overview.when}</p>
                </div>
              </div>
              )}
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-dark sm:text-3xl">
                {isSensorSolutionPage
                  ? sensorSolutionCopy.sectionTechnical
                  : isControlSolutionPage
                    ? controlSolutionCopy.sectionTechnical
                    : isEncoderSolutionPage
                      ? encoderSolutionCopy.sectionTechnical
                    : language === "tr"
                      ? "Temel Özellikler"
                      : "Key Highlights"}
              </h2>
              <ul className="space-y-4">
                {(isSensorSolutionPage
                  ? sensorTechnical
                  : isControlSolutionPage
                    ? controlTechnical
                    : isEncoderSolutionPage
                      ? encoderTechnical
                    : content.highlights).map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-dark/70">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lilac" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operational Process */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
              {isSensorSolutionPage
                ? sensorSolutionCopy.sectionTypes
                : isControlSolutionPage
                  ? controlSolutionCopy.sectionTypes
                  : isEncoderSolutionPage
                    ? encoderSolutionCopy.sectionTypes
                  : language === "tr"
                    ? "Satış ve Destek Süreci"
                    : "Sales & Support Process"}
            </h2>
            {!isSensorSolutionPage && !isControlSolutionPage && !isEncoderSolutionPage ? (
              <p className="max-w-2xl text-lg text-dark/70">
                {language === "tr"
                  ? "Teknik netlik ve hızlı geri bildirimle ilerleyen standart iş akışımız."
                  : "A straightforward workflow focused on technical clarity and fast feedback."}
              </p>
            ) : isEncoderSolutionPage ? (
              <p className="max-w-2xl text-lg text-dark/70">{encoderSolutionCopy.sectionTypesIntro}</p>
            ) : null}
          </div>
          {isSensorSolutionPage || isControlSolutionPage || isEncoderSolutionPage ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {(isSensorSolutionPage ? sensorTypes : isControlSolutionPage ? controlComponents : encoderTypes).map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-dark/10 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-lilac/15 text-xs font-bold text-lilac">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-lg font-semibold text-dark">{item.name}</h3>
                    <p className="text-sm text-dark/70">{item.text}</p>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {content.process.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lilac/10 text-lg font-semibold text-lilac">
                      {idx + 1}
                    </div>
                    {idx < content.process.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-lilac/20" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="mb-2 text-xl font-semibold text-dark">{step.title}</h3>
                    <p className="text-dark/70">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {isEncoderSolutionPage ? (
        <section className="section-padding border-t border-dark/10 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">{encoderSolutionCopy.showcaseTitle}</h2>
              <p className="max-w-3xl text-lg text-dark/70">{encoderSolutionCopy.showcaseCaption}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dark/10 bg-slate-100 shadow-[0_22px_55px_-28px_rgba(15,23,42,0.55)] lg:col-span-2">
                <Image
                  src="/img/encoder-detail-hero.png"
                  alt={
                    language === "tr"
                      ? "Encoder uygulama kolajı — endüstriyel ölçüm görseli"
                      : "Encoder application collage — industrial measurement visual"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="flex flex-col gap-4">
                {encoderShowcaseTiles.map((tile) => (
                  <div
                    key={tile.label}
                    className="flex flex-1 flex-col justify-center rounded-2xl border border-dark/10 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-dark/45">{tile.label}</p>
                    <p className="mt-2 text-sm font-medium text-dark">{tile.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery: skip when only hero image (already shown above) */}
      {galleryImages.length > 1 && (
        <section id="gallery" className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <ServiceGallery images={galleryImages} language={language} />
          </div>
        </section>
      )}

      {/* 4. Capacity & Scale Block */}
      <section className="section-padding bg-dark text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              {isSensorSolutionPage
                ? sensorSolutionCopy.sectionBrands
                : isControlSolutionPage
                  ? controlSolutionCopy.sectionBrands
                  : isEncoderSolutionPage
                    ? encoderSolutionCopy.sectionBrands
                  : language === "tr"
                    ? "Tedarik Özeti"
                    : "Supply Snapshot"}
            </h2>
          </div>
          {isSensorSolutionPage || isControlSolutionPage || isEncoderSolutionPage ? (
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-5">
              <motion.div
                className="flex min-w-max items-center gap-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {[
                  ...(isSensorSolutionPage ? sensorBrands : isControlSolutionPage ? controlBrands : encoderBrands),
                  ...(isSensorSolutionPage ? sensorBrands : isControlSolutionPage ? controlBrands : encoderBrands),
                ].map((brand, idx) => (
                  <span
                    key={`${brand}-${idx}`}
                    className="inline-flex shrink-0 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55 grayscale transition hover:grayscale-0 hover:border-white/50 hover:text-white"
                  >
                    {brand}
                  </span>
                ))}
              </motion.div>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
                    {language === "tr" ? "Dokümantasyon" : "Documentation"}
                  </p>
                  <p className="text-3xl font-semibold text-white">{content.capacity.dailyProduction}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
                    {language === "tr" ? "Kapsam" : "Scope"}
                  </p>
                  <p className="text-3xl font-semibold text-white">{content.capacity.eventSize}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-soft-lavender">
                    {language === "tr" ? "Hizmet Alanı" : "Coverage"}
                  </p>
                  <p className="text-3xl font-semibold text-white">
                    {content.capacity.simultaneousLocations}
                  </p>
                </div>
              </div>
              <p className="mt-8 max-w-2xl text-lg text-white/70">{content.capacity.description}</p>
            </>
          )}
        </div>
      </section>

      {/* 5. Use Cases */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
              {isSensorSolutionPage
                ? sensorSolutionCopy.sectionUseCases
                : isControlSolutionPage
                  ? controlSolutionCopy.sectionUseCases
                  : isEncoderSolutionPage
                    ? encoderSolutionCopy.sectionUseCases
                  : language === "tr"
                    ? "Kullanım Senaryoları"
                    : "Use Cases"}
            </h2>
            {!isEncoderSolutionPage ? (
              <p className="max-w-2xl text-lg text-dark/70">
                {language === "tr"
                  ? "Bu hizmetin tipik olarak kullanıldığı durumlar."
                  : "Typical scenarios where this service is used."}
              </p>
            ) : (
              <p className="max-w-2xl text-lg text-dark/70">
                {language === "tr"
                  ? "Pozisyon geri beslemesi kritik olan uygulamalarda encoder seçimi doğrudan ürün kalitesini ve hat verimini belirler."
                  : "Encoder selection directly impacts product quality and line efficiency wherever position feedback is critical."}
              </p>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {(isSensorSolutionPage
              ? sensorUseCases.map((u) => ({ title: u, description: language === "tr" ? "Sensör tabanlı otomasyon ihtiyaçlarında yaygın kullanım alanı." : "Common deployment area for sensor-driven automation." }))
              : isControlSolutionPage
                ? controlUseCases.map((u) => ({ title: u, description: language === "tr" ? "PLC/HMI/SCADA mimarisinin yaygın uygulama alanı." : "Common application area for PLC/HMI/SCADA architecture." }))
                : isEncoderSolutionPage
                  ? encoderUseCases
              : content.useCases).map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-dark/10 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-semibold text-dark">{useCase.title}</h3>
                <p className="text-dark/70">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {!isEncoderSolutionPage ? (
        <section className="section-padding bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 space-y-4">
              <h2 className="text-3xl font-semibold text-dark sm:text-4xl">
                {isControlSolutionPage
                  ? controlSolutionCopy.sectionProcess
                  : language === "tr"
                    ? "Neden Yazıcı Otomasyon?"
                    : "Why Yazıcı Otomasyon?"}
              </h2>
              <p className="max-w-2xl text-lg text-dark/70">
                {isControlSolutionPage
                  ? language === "tr"
                    ? "Saha keşfinden devreye alma ve bakım desteğine kadar uçtan uca mühendislik süreci."
                    : "End-to-end engineering workflow from site analysis to commissioning and support."
                  : language === "tr"
                    ? "Ürün seçiminde teknik netlik ve güvenilir tedarik."
                    : "Technical clarity and dependable supply when it matters."}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(isControlSolutionPage ? controlProcess : content.differentiators).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-2xl border border-dark/10 bg-white p-6"
                >
                  <p className="text-dark/70">
                    {isControlSolutionPage ? `${idx + 1}. ${item}` : item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 7. Related Services - Internal Linking */}
      <InternalLinks currentServiceId={service.id} language={language} />

      {/* 8. Final CTA */}
      <section id="contact" className="section-padding bg-dark text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
            {isSensorSolutionPage
              ? sensorSolutionCopy.ctaBottom
              : isControlSolutionPage
                ? controlSolutionCopy.ctaBottom
                : isEncoderSolutionPage
                  ? encoderSolutionCopy.ctaBottom
                : content.finalCta.headline}
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://wa.me/905530568939"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-lilac px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-soft-lavender hover:text-dark"
            >
              {isSensorSolutionPage
                ? sensorSolutionCopy.whatsapp
                : isControlSolutionPage
                  ? controlSolutionCopy.whatsapp
                  : isEncoderSolutionPage
                    ? encoderSolutionCopy.whatsapp
                  : content.finalCta.primary}
            </a>
            <a
              href="tel:+905530568939"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-soft-lavender hover:text-soft-lavender"
            >
              {isSensorSolutionPage
                ? sensorSolutionCopy.call
                : isControlSolutionPage
                  ? controlSolutionCopy.call
                  : isEncoderSolutionPage
                    ? encoderSolutionCopy.call
                  : content.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* Visual Separation - Large padding before footer */}
      <div className="h-20 bg-background" aria-hidden="true" />

      <Footer language={language} />

      <Chatbot />
      <StickyCTA language={language} />
      <MobileStickyCTA language={language} />
    </div>
  );
}
