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
      id="cta-final"
      className="section-padding border-y border-white/10 bg-dark-purple text-white"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          id="final-cta-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35 }}
          className="font-serif text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl"
        >
          {content.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-lilac px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {content.ctaQuote}
          </a>
          <a
            href="tel:+905530568939"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/35 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-soft-lavender hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {content.ctaContact}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
