"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export type HomeContactMapContent = {
  title: string;
  description: string;
  primaryCta: string;
  whatsapp: string;
  call: string;
  phone1: string;
  phone2: string;
  channelsHint: string;
};

function AnimatedStat({
  value,
  suffix,
  label,
  icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: ReactNode;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1400 + delay * 200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1 * delay }}
      className="flex items-center justify-between rounded-2xl border border-accent/18 bg-white/[0.04] px-6 py-5"
    >
      <div>
        <div className="text-4xl font-bold tracking-tight text-white">
          {count}
          <span className="text-accent">{suffix}</span>
        </div>
        <div className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
          {label}
        </div>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
        {icon}
      </div>
    </motion.div>
  );
}

export function HomeContactMapSection({
  content,
}: {
  content: HomeContactMapContent;
}) {
  const tel = content.phone1.replace(/\s/g, "");
  const tel2 = content.phone2.replace(/\s/g, "");

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-dark py-20 text-white sm:py-24 md:py-28"
      aria-labelledby="contact-heading"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />
      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-dark-purple/40 blur-[80px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ── Sol: İletişim ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Kicker */}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              İletişim
            </p>

            <div className="space-y-5">
              <h2
                id="contact-heading"
                className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {content.title}
              </h2>
              <p className="text-base leading-relaxed text-white/55 sm:text-lg">
                {content.description}
              </p>
            </div>

            {/* CTA butonlar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${tel}`}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-accent/40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {content.primaryCta}
              </a>

              <a
                href="https://wa.me/905530568939"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {content.whatsapp}
              </a>

              <a
                href={`tel:${tel2}`}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {content.phone2}
              </a>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "📍", text: "İstanbul, Türkiye" },
                { icon: "⚡", text: "Aynı gün dönüş" },
                { icon: "🇹🇷", text: "Türkiye geneli sevkiyat" },
              ].map((chip) => (
                <span
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/50"
                >
                  <span aria-hidden>{chip.icon}</span>
                  {chip.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Sağ: İstatistik kartları ── */}
          <div className="flex flex-col gap-4">
            <AnimatedStat
              value={6}
              suffix=""
              label="Ürün hattı"
              delay={0}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
              }
            />
            <AnimatedStat
              value={15}
              suffix="+"
              label="Yıl saha deneyimi"
              delay={1}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2" strokeLinecap="round"/>
                </svg>
              }
            />
            <AnimatedStat
              value={100}
              suffix="%"
              label="Şeffaflık taahhüdü"
              delay={2}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              }
            />

            {/* Email chip */}
            <motion.a
              href="mailto:info@yaziciotomasyon.com"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-4 transition hover:border-accent/25 hover:bg-white/[0.06]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">E-posta</div>
                <div className="text-xs text-white/45">info@yaziciotomasyon.com</div>
              </div>
              <svg className="ml-auto text-white/20" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
