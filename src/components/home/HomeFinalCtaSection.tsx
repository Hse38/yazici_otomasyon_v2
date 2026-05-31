"use client";

import { motion } from "framer-motion";

export type FinalCtaContent = {
  title: string;
  ctaQuote: string;
  ctaContact: string;
};

export function HomeFinalCtaSection({ content }: { content: FinalCtaContent }) {
  return (
    <section
      className="relative overflow-hidden section-padding bg-navy text-white"
      aria-label="Call to action"
    >
      {/* BG effects */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-40" aria-hidden />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none" aria-hidden />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-navy-mid/60 blur-[80px] pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 h-0.5 w-12 bg-accent"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {content.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-accent/40"
          >
            {content.ctaQuote}
          </a>
          <a
            href="tel:+905530568939"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/15 hover:-translate-y-0.5"
          >
            {content.ctaContact}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
