"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export type ProcessStep = { title: string; description: string };
export type ProcessContent = { title: string; steps: readonly ProcessStep[] };

export function HomeProcessSection({ content }: { content: ProcessContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="process"
      className="section-padding bg-background text-dark"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            Nasıl İşliyor
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
          >
            {content.title}
          </motion.h2>
        </div>

        <ol className="relative space-y-0">
          {/* Animated progress line */}
          <div className="absolute left-[19px] top-3 hidden h-[calc(100%-2rem)] w-px bg-dark/8 sm:block" aria-hidden />
          <motion.div
            className="absolute left-[19px] top-3 hidden w-px bg-accent sm:block"
            style={{ height: lineHeight }}
            aria-hidden
          />

          {content.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8"
            >
              <div className="flex shrink-0 flex-col items-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i + 0.1, type: "spring" }}
                  className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-accent/40 text-sm font-semibold text-navy shadow-md"
                >
                  {i + 1}
                </motion.span>
              </div>
              <div className="card-hover min-w-0 flex-1 rounded-2xl border border-dark/8 bg-white p-6 shadow-sm sm:max-w-2xl">
                <h3 className="font-serif text-lg font-semibold text-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/65">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
