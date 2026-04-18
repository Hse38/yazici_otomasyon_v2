"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type AnimatedMapContent = {
  title: string;
  description: string;
  cta: string;
};

const MAP_QUERY = "Yazıcı Otomasyon İstanbul";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&hl=tr&z=14&ie=UTF8&iwloc=B&output=embed`;

const KEN_BURNS = {
  scale: [1, 1.06],
  x: ["-0.8%", "1.2%"],
  y: ["0.3%", "-1.1%"],
};

const KEN_TRANSITION = {
  duration: 22,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

type AnimatedMapProps = {
  content: AnimatedMapContent;
  contactHref?: string;
};

export function AnimatedMap({ content, contactHref = "#contact" }: AnimatedMapProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoadMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "160px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, { stiffness: 140, damping: 22, mass: 0.4 });
  const springY = useSpring(parallaxY, { stiffness: 140, damping: 22, mass: 0.4 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      parallaxX.set(px);
      parallaxY.set(py);
    },
    [parallaxX, parallaxY, reduceMotion]
  );

  const onLeave = useCallback(() => {
    parallaxX.set(0);
    parallaxY.set(0);
  }, [parallaxX, parallaxY]);

  return (
    <motion.section
      ref={rootRef}
      aria-labelledby="animated-map-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduceMotion ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div
        className="group relative mx-auto max-w-6xl"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          style={{ x: springX, y: springY }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-dark shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] will-change-transform"
        >
          <div className="relative h-[min(70vh,520px)] min-h-[320px] w-full sm:min-h-[420px] md:h-[500px]">
            <motion.div
              className="absolute inset-0 origin-center"
              animate={reduceMotion ? undefined : KEN_BURNS}
              transition={reduceMotion ? undefined : KEN_TRANSITION}
            >
              {loadMap ? (
                <iframe
                  title={MAP_QUERY}
                  src={MAP_EMBED_SRC}
                  className="pointer-events-auto absolute left-1/2 top-1/2 h-[118%] w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 grayscale-[0.15] contrast-[1.02] sm:grayscale-[0.08]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-slate-900 via-dark to-slate-950"
                  aria-hidden
                />
              )}
            </motion.div>

            {/* Vignette spotlight */}
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 55% 50% at 50% 45%, transparent 0%, transparent 32%, rgba(7,15,22,0.55) 72%, rgba(7,15,22,0.92) 100%)",
              }}
              aria-hidden
            />

            {/* Center pin */}
            <div
              className="pointer-events-none absolute left-1/2 top-[46%] z-[2] -translate-x-1/2 -translate-y-1/2"
              aria-hidden
            >
              <motion.span
                className="absolute left-1/2 top-1/2 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3b82f6]/50"
                animate={reduceMotion ? undefined : { scale: [1, 2.35], opacity: [0.45, 0] }}
                transition={
                  reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeOut" }
                }
              />
              <motion.span
                className="absolute left-1/2 top-1/2 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3b82f6]/35"
                animate={reduceMotion ? undefined : { scale: [1, 2.8], opacity: [0.3, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.45 }
                }
              />
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute h-3.5 w-3.5 rounded-full bg-[#3b82f6] shadow-[0_0_22px_6px_rgba(59,130,246,0.55)] ring-2 ring-white/25" />
              </span>
            </div>

            {/* Bottom-left copy */}
            <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end p-5 sm:p-8 md:p-10">
              <div className="pointer-events-auto max-w-[min(100%,22rem)] space-y-3 sm:max-w-md">
                <h2
                  id="animated-map-heading"
                  className="font-serif text-2xl font-semibold leading-tight tracking-tight text-white text-balance sm:text-3xl"
                >
                  {content.title}
                </h2>
                <p className="text-sm leading-relaxed text-white/75 sm:text-base">{content.description}</p>
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Link
                    href={contactHref}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#3b82f6]/50 bg-[#3b82f6]/15 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#93c5fd] shadow-[0_0_0_1px_rgba(59,130,246,0.12)] backdrop-blur-sm transition hover:border-[#3b82f6] hover:bg-[#3b82f6]/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                  >
                    {content.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
