"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ─── */
type Slide = {
  key: string;
  src: string;
  srcMd: string;
  srcSm: string;
  alt: string;
};

type HeroContent = {
  kicker: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollAria: string;
};

type ScrollScene = {
  num: string;
  title: string;
  desc: string;
  slideKey: string;
};

/* ─── Data ─── */
const SLIDES: Slide[] = [
  { key: "cobot",   src: "/img/hero/hero-cobot.jpg",   srcMd: "/img/hero/hero-cobot-md.jpg",   srcSm: "/img/hero/hero-cobot-sm.jpg",   alt: "Endüstriyel cobot kolu" },
  { key: "factory", src: "/img/hero/hero-factory.jpg", srcMd: "/img/hero/hero-factory-md.jpg", srcSm: "/img/hero/hero-factory-sm.jpg", alt: "Fabrika üretim hattı" },
  { key: "control", src: "/img/hero/hero-control.jpg", srcMd: "/img/hero/hero-control-md.jpg", srcSm: "/img/hero/hero-control-sm.jpg", alt: "Otomasyon kontrol paneli" },
  { key: "welding", src: "/img/hero/hero-welding.jpg", srcMd: "/img/hero/hero-welding-md.jpg", srcSm: "/img/hero/hero-welding-sm.jpg", alt: "Endüstriyel robot kaynak" },
];

const SCROLL_SCENES_TR: ScrollScene[] = [
  { num: "01", title: "Hassas Sensör Sistemleri",   desc: "Zorlu üretim ortamlarında konum, varlık ve mesafe algılama için güvenilir sensör katmanı.", slideKey: "factory" },
  { num: "02", title: "PLC & Kontrol Sistemleri",   desc: "Deterministik kontrol ve ölçeklenebilir hat otomasyonu için CPU, I/O ve haberleşme altyapısı.", slideKey: "control" },
  { num: "03", title: "Safety Mimarisi",            desc: "Makine emniyet mimarisi, interlock ve acil stop — ISO 13849 uyumlu çözümler.", slideKey: "welding" },
  { num: "04", title: "Endüstri 4.0 Entegrasyon",   desc: "Gerçek zamanlı veri takibi ile üretim hatlarında sıfır kesinti, maksimum verimlilik.", slideKey: "cobot" },
];

const SCROLL_SCENES_EN: ScrollScene[] = [
  { num: "01", title: "Precision Sensor Systems",   desc: "Reliable sensing layer for position, presence, and distance detection in harsh environments.", slideKey: "factory" },
  { num: "02", title: "PLC & Control Systems",      desc: "Deterministic control and scalable line automation with CPU, I/O, and communications.", slideKey: "control" },
  { num: "03", title: "Safety Architecture",        desc: "Machine safety architecture, interlock, and emergency stop — ISO 13849 compliant.", slideKey: "welding" },
  { num: "04", title: "Industry 4.0 Integration",  desc: "Real-time data tracking for zero downtime and maximum productivity on your lines.", slideKey: "cobot" },
];

/* ─── Sub-components ─── */

function SlideProgress({ active, duration }: { active: boolean; duration: number }) {
  return (
    <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/15">
      <motion.div
        className="h-full bg-accent rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: active ? duration / 1000 : 0, ease: "linear" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

const MotionPicture = motion.create("picture");

/* ─── Main Component ─── */
export type HeroPhotoSectionProps = {
  content: HeroContent;
  language: "tr" | "en";
};

export function HeroPhotoSection({ content, language }: HeroPhotoSectionProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollScene, setScrollScene] = useState(0);
  const DURATION = 3800;

  const scenes = language === "tr" ? SCROLL_SCENES_TR : SCROLL_SCENES_EN;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), DURATION);
    return () => clearInterval(t);
  }, [paused]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const rect = scrollRef.current.getBoundingClientRect();
    const total = scrollRef.current.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / total));
    setScrollScene(Math.min(scenes.length - 1, Math.floor(p * scenes.length)));
  }, [scenes.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const activeScene = scenes[scrollScene];
  const sceneSlideIdx = SLIDES.findIndex((s) => s.key === activeScene.slideKey);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative isolate z-10 -mt-[4.5rem] h-screen min-h-screen max-h-screen overflow-hidden sm:-mt-20"
        aria-label="Hero"
      >
        {/* Background images — crossfade */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            {SLIDES.map((slide, i) =>
              i === current ? (
                <MotionPicture
                  key={slide.key}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                >
                  <source media="(max-width: 768px)" srcSet={slide.srcSm} />
                  <source media="(max-width: 1280px)" srcSet={slide.srcMd} />
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </MotionPicture>
              ) : null
            )}
          </AnimatePresence>

          {/* Navy gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(7,21,35,0.82) 0%, rgba(10,30,58,0.65) 50%, rgba(7,21,35,0.75) 100%)",
            }}
            aria-hidden
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 25%, rgba(7,21,35,0.72) 100%)",
            }}
            aria-hidden
          />
          {/* Grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
            aria-hidden
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-24 pt-[4.5rem] text-center sm:px-10 sm:pt-20 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {content.kicker}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.6)" }}
          >
            {content.title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mx-auto mt-6 h-0.5 w-14 bg-gradient-to-r from-accent to-transparent"
            style={{ transformOrigin: "center" }}
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-accent/40"
            >
              {content.ctaPrimary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="https://wa.me/905530568939"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/22 bg-white/8 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {content.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Slide navigation — bottom */}
        <div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {SLIDES.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={slide.alt}
              className="flex w-20 flex-col gap-1.5 focus-visible:outline-none"
            >
              <span className={`block h-0.5 rounded-full transition-colors duration-300 ${i === current ? "bg-white/50" : "bg-white/20"}`} />
              <SlideProgress active={i === current && !paused} duration={DURATION} />
            </button>
          ))}
        </div>

        {/* Scroll hint */}
        <a
          href="#scroll-showcase"
          aria-label={content.scrollAria}
          className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-1.5 text-white/35 transition hover:text-white/60 lg:flex"
        >
          <motion.span
            className="block h-10 w-px rounded-full bg-gradient-to-b from-white/60 via-white/30 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.svg
            width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M1 1.5L5 4.5L9 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </a>
      </section>

      {/* Separator — hero ends, showcase begins */}
      <div className="relative z-20 bg-[#071523]" aria-hidden>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="h-3 w-full bg-[#071523]" />
      </div>

      {/* ═══ SCROLL-DRIVEN SHOWCASE ═══ */}
      <div
        id="scroll-showcase"
        ref={scrollRef}
        className="relative isolate bg-[#071523]"
        style={{ height: "280vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#071523]">
          <div className="absolute inset-0 bg-[#071523]" aria-hidden />
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <MotionPicture
                key={activeScene.slideKey}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <source media="(max-width: 768px)" srcSet={SLIDES[sceneSlideIdx]?.srcSm} />
                <source media="(max-width: 1280px)" srcSet={SLIDES[sceneSlideIdx]?.srcMd} />
                <img
                  src={SLIDES[sceneSlideIdx]?.src}
                  alt={SLIDES[sceneSlideIdx]?.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </MotionPicture>
            </AnimatePresence>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(7,21,35,0.93) 0%, rgba(7,21,35,0.75) 45%, rgba(7,21,35,0.28) 100%)",
              }}
              aria-hidden
            />
          </div>

          <motion.div
            className="absolute top-0 left-0 z-20 h-0.5 bg-gradient-to-r from-accent to-accent/60"
            style={{
              width: `${((scrollScene + 1) / scenes.length) * 100}%`,
              transition: "width 0.4s ease",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-20">
            <div className="max-w-md lg:max-w-lg">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`num-${scrollScene}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-accent"
                >
                  {activeScene.num} / 0{scenes.length}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${scrollScene}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                  className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {activeScene.title}
                </motion.h2>
              </AnimatePresence>

              <motion.div
                key={`line-${scrollScene}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="my-5 h-0.5 w-12 bg-accent"
                style={{ transformOrigin: "left" }}
                aria-hidden
              />

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${scrollScene}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-base leading-relaxed text-white/55 sm:text-lg"
                >
                  {activeScene.desc}
                </motion.p>
              </AnimatePresence>

              <div className="mt-8 flex gap-2" aria-hidden>
                {scenes.map((_, i) => (
                  <span
                    key={i}
                    className={`block rounded-full transition-all duration-300 ${
                      i === scrollScene
                        ? "h-2 w-6 bg-accent"
                        : "h-2 w-2 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/25">
              {language === "tr" ? "kaydırarak ilerle" : "scroll to explore"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
