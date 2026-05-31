"use client";

import { motion } from "framer-motion";

const industryIcons = [
  // Automotive
  <svg key="auto" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M5 17H3a1 1 0 01-1-1v-5l2.5-5h13L20 11v5a1 1 0 01-1 1h-2"/>
    <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
    <path d="M5 11h14" strokeLinecap="round"/>
  </svg>,
  // Food
  <svg key="food" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M12 2a5 5 0 015 5H7a5 5 0 015-5z"/><path d="M7 7v1a5 5 0 0010 0V7"/><path d="M12 13v9"/><path d="M9 22h6" strokeLinecap="round"/>
  </svg>,
  // Factory
  <svg key="factory" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M2 22V10l6-4v4l6-4v4l6-4v12H2z" strokeLinejoin="round"/>
    <rect x="9" y="16" width="6" height="6" rx="0.5"/>
  </svg>,
  // Machine
  <svg key="machine" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>,
];

export type UseCasesContent = {
  title: string;
  cards: readonly { title: string; description: string }[];
};

export function HomeUseCasesSection({ content }: { content: UseCasesContent }) {
  return (
    <section
      id="use-cases"
      className="section-padding bg-white text-dark"
      aria-labelledby="use-cases-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
        >
          Kullanım Alanları
        </motion.p>
        <motion.h2
          id="use-cases-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
        >
          {content.title}
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="card-hover group relative overflow-hidden rounded-2xl border border-dark/8 bg-background p-6 shadow-sm"
            >
              {/* Number watermark */}
              <span className="absolute -right-2 -top-2 font-serif text-[72px] font-bold leading-none text-dark/4 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent ring-1 ring-accent/15">
                  {industryIcons[i]}
                </div>
                <h3 className="font-serif text-base font-semibold text-dark">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/60">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
