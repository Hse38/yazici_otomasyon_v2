"use client";

import Link from "next/link";

type DesktopNavProps = {
  language: "tr" | "en";
  navItems: {
    services: string;
    whyUs: string;
    proof: string;
    contact: string;
  };
  textColor?: string;
  hoverColor?: string;
};

export function DesktopNav({
  language,
  navItems,
  textColor = "text-white/80",
  hoverColor = "hover:text-white",
}: DesktopNavProps) {
  return (
    <nav
      className={`hidden items-center gap-8 text-sm uppercase tracking-[0.2em] transition-colors md:flex ${textColor}`}
    >
      <Link href="#products" className={`transition ${hoverColor}`}>
        {navItems.services}
      </Link>
      <Link href="#why-us" className={`transition ${hoverColor}`}>
        {navItems.whyUs}
      </Link>
      <Link href="#proof" className={`transition ${hoverColor}`}>
        {navItems.proof}
      </Link>
      <Link href="#contact" className={`transition ${hoverColor}`}>
        {navItems.contact}
      </Link>
    </nav>
  );
}
