"use client";

import { motion } from "framer-motion";

export type ProcessStep = { title: string; description: string };
export type ProcessContent = { title: string; steps: readonly ProcessStep[] };

export function HomeProcessSection({ content }: { content: ProcessContent }) {
  return (
    <section id="process" className="section-padding bg-background text-dark" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="process-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
        >
          {content.title}
        </motion.h2>

        <ol className="relative mt-12 space-y-0 sm:mt-16">
          <div className="absolute left-[19px] top-3 hidden h-[calc(100%-2rem)] w-px bg-lilac/25 sm:block" aria-hidden />
          {content.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: 0.07 * i }}
              className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8"
            >
              <div className="flex shrink-0 flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-lilac/40 bg-white text-sm font-semibold text-dark-purple shadow-sm">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-dark/8 bg-white p-6 shadow-sm sm:max-w-2xl">
                <h3 className="font-serif text-lg font-semibold text-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/70">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
