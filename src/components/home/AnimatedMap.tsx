"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";

export type AnimatedMapContent = {
  title: string;
  description: string;
  cta: string;
};

const MAP_QUERY = "Yazıcı Otomasyon İstanbul";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&hl=tr&z=14&ie=UTF8&iwloc=B&output=embed`;

const KEN_BURNS = {
  scale: [1, 1.09],
  x: ["-1.2%", "1.4%"],
  y: ["0.4%", "-1.6%"],
};

const KEN_TRANSITION = {
  duration: 26,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

type AnimatedMapProps = {
  content: AnimatedMapContent;
  contactHref?: string;
};

const MapFrame = memo(function MapFrame({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      title={title}
      src={src}
      className="pointer-events-none absolute left-1/2 top-[48%] h-[135%] w-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 opacity-95 [filter:grayscale(1)_brightness(0.35)_blur(2px)]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      tabIndex={-1}
    />
  );
});

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
      { rootMargin: "180px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, { stiffness: 120, damping: 24, mass: 0.45 });
  const springY = useSpring(parallaxY, { stiffness: 120, damping: 24, mass: 0.45 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      parallaxX.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
      parallaxY.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
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
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduceMotion ? undefined : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        className="group/map relative mx-auto max-w-6xl"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          style={{ x: springX, y: springY }}
          className="relative will-change-transform"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#02060a] shadow-[0_32px_100px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(59,130,246,0.06)]">
            <div className="relative aspect-[21/10] min-h-[min(72vh,560px)] w-full sm:min-h-[440px] md:min-h-[500px]">
              <div
                className={`absolute inset-0 origin-center overflow-hidden transition-[transform] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  reduceMotion ? "" : "group-hover/map:scale-[1.022]"
                }`}
              >
                {/* Map stack — scaled & clipped to minimize embed chrome */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-[-8%] origin-center will-change-transform"
                    animate={reduceMotion ? undefined : KEN_BURNS}
                    transition={reduceMotion ? undefined : KEN_TRANSITION}
                  >
                    {loadMap ? (
                      <MapFrame src={MAP_EMBED_SRC} title={MAP_QUERY} />
                    ) : (
                      <div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0f172a_0%,#02060a_70%)]"
                        aria-hidden
                      />
                    )}
                  </motion.div>
                </div>

                {/* Cinematic vignette + edge crush */}
                <div
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background: `
                    radial-gradient(ellipse 48% 44% at 50% 46%, rgba(2,6,10,0.12) 0%, rgba(2,6,10,0.55) 52%, rgba(0,0,0,0.94) 100%),
                    radial-gradient(ellipse 120% 90% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)
                  `,
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/[0.88]"
                  aria-hidden
                />

                {/* Pin — focal point */}
                <div
                  className="pointer-events-none absolute left-1/2 top-[46%] z-[2] -translate-x-1/2 -translate-y-1/2"
                  aria-hidden
                >
                  <motion.span
                    className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3b82f6]/40"
                    animate={reduceMotion ? undefined : { scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3b82f6]/30"
                    animate={reduceMotion ? undefined : { scale: [1, 3.1], opacity: [0.35, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  />
                  <span className="relative flex size-4 items-center justify-center transition-transform duration-500 group-hover/map:scale-110">
                    <span
                      className="absolute size-4 rounded-full bg-[#3b82f6] ring-2 ring-white/20 transition-[box-shadow,transform] duration-500 group-hover/map:shadow-[0_0_40px_16px_rgba(59,130,246,0.72)] group-hover/map:ring-[#93c5fd]/45"
                      style={{ boxShadow: "0 0 28px 10px rgba(59,130,246,0.45)" }}
                    />
                  </span>
                </div>

                {/* Bottom mask — covers typical embed footer / hints */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-black via-black/95 to-transparent sm:h-32"
                  aria-hidden
                />
              </div>

              {/* Left content — not scaled on map hover */}
              <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-start px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16">
                <div className="pointer-events-auto max-w-[20.5rem] space-y-4 sm:max-w-md">
                  <h2
                    id="animated-map-heading"
                    className="font-serif text-2xl font-semibold leading-[1.15] tracking-tight text-white text-balance sm:text-4xl"
                  >
                    {content.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/72 sm:text-base">{content.description}</p>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Link
                      href={contactHref}
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#3b82f6]/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_-8px_rgba(59,130,246,0.55)] backdrop-blur-sm transition hover:bg-[#2563eb] hover:shadow-[0_0_48px_-6px_rgba(59,130,246,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#93c5fd] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02060a]"
                    >
                      {content.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
