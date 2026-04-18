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
      className="section-padding border-b border-dark/5 bg-white text-dark"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            id="trust-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35 }}
            className="font-serif text-3xl font-semibold tracking-tight text-dark sm:text-4xl"
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-4 text-base text-dark/70 sm:text-lg"
          >
            {content.intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {content.logos.map((name) => (
            <div
              key={name}
              title={name}
              className="flex min-h-[72px] min-w-0 items-center justify-center overflow-hidden rounded-xl border border-dark/8 bg-background px-2 py-4 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-dark/45 sm:px-3 sm:text-[11px] sm:tracking-[0.1em]"
            >
              <span className="block max-w-full whitespace-nowrap text-ellipsis">{name}</span>
            </div>
          ))}
        </motion.div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-3">
          {content.bullets.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: 0.06 * i }}
              className="rounded-2xl border border-lilac/15 bg-gradient-to-b from-white to-background px-6 py-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-lg font-semibold text-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/70">{item.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
