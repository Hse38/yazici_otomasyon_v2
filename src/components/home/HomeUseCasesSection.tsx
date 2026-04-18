"use client";

import { motion } from "framer-motion";

export type UseCaseCard = { title: string; description: string };
export type UseCasesContent = { title: string; cards: readonly UseCaseCard[] };

export function HomeUseCasesSection({ content }: { content: UseCasesContent }) {
  return (
    <section id="use-cases" className="section-padding bg-white text-dark" aria-labelledby="use-cases-heading">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="use-cases-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
        >
          {content.title}
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {content.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="rounded-2xl border border-dark/8 bg-background p-8 transition hover:border-lilac/30"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-dark">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dark/70">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
