"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export type Industry40Card = {
  title: string;
  description: string;
  icon: "data" | "error" | "efficiency" | "energy";
};

export type Industry40Content = {
  title: string;
  cards: readonly Industry40Card[];
};

const icons: Record<Industry40Card["icon"], ReactNode> = {
  data: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 19V5M4 19h16M4 19l3-4 4 3 5-6 6 7" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="10" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="11" cy="9" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  error: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 15l6-6M15 15L9 9" strokeLinecap="round"/>
    </svg>
  ),
  efficiency: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3v9l4 2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="9"/>
    </svg>
  ),
  energy: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" strokeLinejoin="round"/>
    </svg>
  ),
};

export function HomeIndustry40Section({ content }: { content: Industry40Content }) {
  return (
    <section
      id="industry-40"
      className="section-padding relative overflow-hidden bg-navy text-white"
      aria-labelledby="i40-heading"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-60" aria-hidden />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent"
        >
          Endüstri 4.0
        </motion.p>

        <motion.h2
          id="i40-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto max-w-3xl text-center font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          {content.title}
        </motion.h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.07 * i }}
              className="card-hover group flex flex-col rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/20">
                {icons[card.icon]}
              </div>
              <h3 className="font-serif text-base font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
