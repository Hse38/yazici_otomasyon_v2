"use client";

import { motion, useReducedMotion } from "framer-motion";

export type HomeContactMapContent = {
  title: string;
  description: string;
  primaryCta: string;
  whatsapp: string;
  call: string;
  phone1: string;
  channelsHint: string;
};

const BG = "/img/harita.png";

const MAP_KEN = { scale: [1.02, 1.06] };

const MAP_TRANSITION = {
  duration: 18,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

export function HomeContactMapSection({ content }: { content: HomeContactMapContent }) {
  const reduceMotion = useReducedMotion();
  const tel = content.phone1.replace(/\s/g, "");

  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[min(92vh,820px)] w-full items-center overflow-hidden bg-slate-900 py-20 text-white sm:py-24 md:py-28"
      aria-labelledby="contact-map-heading"
    >
      {/* Map texture — absolute full bleed */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute inset-[-6%] origin-center will-change-transform"
          initial={false}
          animate={reduceMotion ? undefined : MAP_KEN}
          transition={reduceMotion ? undefined : MAP_TRANSITION}
        >
          {/* Harita doğrudan görünsün — ağır filtre / filigran yok */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat [filter:brightness(0.98)_contrast(1.02)]"
            style={{ backgroundImage: `url(${BG})` }}
          />
        </motion.div>

        {/* İsteğe bağlı çok hafif kenar okuması (haritayı maskelemez) */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.12)_100%)]"
          aria-hidden
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-20"
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex w-full justify-start">
          {/* Glass card — spec: rgba black 50%, blur 12px, border 10% white */}
          <div
            className="w-full max-w-[min(100%,28rem)] rounded-2xl border border-white/10 bg-black/55 p-10 shadow-[0_40px_100px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[14px] sm:p-11 md:max-w-md md:p-12"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          >
            <h2
              id="contact-map-heading"
              className="text-left font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-balance text-white sm:text-4xl md:text-[2.4rem]"
            >
              {content.title}
            </h2>
            <p className="mt-5 text-left text-[15px] leading-relaxed text-white/75 sm:text-base">
              {content.description}
            </p>

            <div className="mt-9 space-y-5">
              <a
                href={`tel:${tel}`}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#3b82f6] px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-white shadow-[0_0_44px_-6px_rgba(59,130,246,0.55),0_12px_32px_-12px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb] hover:shadow-[0_0_56px_-4px_rgba(59,130,246,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#93c5fd] focus-visible:ring-offset-2 focus-visible:ring-offset-black/70 sm:w-auto"
                aria-label={content.primaryCta}
              >
                {content.primaryCta}
              </a>

              <p className="text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                {content.channelsHint}
              </p>

              <div
                id="contact-channels"
                className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch"
              >
                <a
                  href="https://wa.me/905530568939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 rounded-full border border-[#3b82f6]/45 bg-[#3b82f6]/[0.08] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#dbeafe] shadow-[0_0_28px_-8px_rgba(59,130,246,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-[#3b82f6] hover:bg-[#3b82f6]/18 hover:text-white hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 sm:min-w-[11rem]"
                  aria-label={content.whatsapp}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {content.whatsapp}
                </a>
                <a
                  href={`tel:${tel}`}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.05] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/92 shadow-[0_0_24px_-10px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:min-w-[11rem]"
                  aria-label={content.call}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {content.call}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
