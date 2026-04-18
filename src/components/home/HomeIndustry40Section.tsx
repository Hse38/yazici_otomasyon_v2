"use client";

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

function Icon({ type }: { type: Industry40Card["icon"] }) {
  const common = "h-10 w-10 text-lilac";
  switch (type) {
    case "data":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M4 19V5M4 19h16M4 19l3-4 4 3 5-6 6 7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="10" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="11" cy="9" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "error":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 15l6-6M15 15L9 9" strokeLinecap="round" />
        </svg>
      );
    case "efficiency":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 3v9l4 2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "energy":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function HomeIndustry40Section({ content }: { content: Industry40Content }) {
  return (
    <section
      id="industry-40"
      className="section-padding bg-gradient-to-b from-background via-white to-background text-dark"
      aria-labelledby="i40-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="i40-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-3xl text-center font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
        >
          {content.title}
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: 0.06 * i }}
              className="flex flex-col rounded-2xl border border-dark/8 bg-white p-6 shadow-sm transition hover:border-lilac/25 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lilac/10">
                <Icon type={card.icon} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-dark">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/70">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
