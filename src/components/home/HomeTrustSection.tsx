"use client";

import { motion } from "framer-motion";

export type TrustContent = {
  title: string;
  intro: string;
  logos: readonly string[];
  bullets: readonly { title: string; text: string }[];
};

export function HomeTrustSection({ content }: { content: TrustContent }) {
  return (
    <section
      id="trust"
      className="section-padding bg-white text-dark"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 h-0.5 w-12 origin-center bg-gradient-to-r from-accent via-accent to-transparent"
          />
          <motion.h2
            id="trust-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-4 text-base text-dark/65 sm:text-lg"
          >
            {content.intro}
          </motion.p>
        </div>

        {/* Logo marquee band */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-dark/6 bg-background py-5">
          <div className="flex w-max animate-marquee gap-4">
            {[...content.logos, ...content.logos].map((name, i) => (
              <div
                key={i}
                className="flex min-w-[140px] items-center justify-center rounded-xl border border-dark/8 bg-white px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-dark/40 shadow-sm"
              >
                {name}
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>

        {/* Bullets */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {content.bullets.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              className="card-hover group rounded-2xl border border-dark/8 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-navy/6 text-sm font-bold text-navy">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-lg font-semibold text-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/65">{item.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
