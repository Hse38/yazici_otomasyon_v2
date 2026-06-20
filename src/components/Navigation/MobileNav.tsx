"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNav } from "../../contexts/NavContext";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getServicePath, PRODUCT_CATEGORY_LABELS } from "../../lib/seo";
import type { ServiceId } from "../../data/services";

type MobileNavProps = {
  language: "tr" | "en";
  onLanguageChange: (lang: "tr" | "en") => void;
  currentLang: "tr" | "en";
  navItems: {
    services: string;
    whyUs: string;
    proof: string;
    contact: string;
  };
  brand: string;
  ctaText: string;
  buttonColor?: "white" | "dark";
};

const products = {
  tr: (["product-1", "product-2", "product-3", "product-4", "product-5", "product-6"] as ServiceId[]).map(
    (id) => ({ id, title: PRODUCT_CATEGORY_LABELS[id].tr })
  ),
  en: (["product-1", "product-2", "product-3", "product-4", "product-5", "product-6"] as ServiceId[]).map(
    (id) => ({ id, title: PRODUCT_CATEGORY_LABELS[id].en })
  ),
} as const;

export function MobileNav({
  language,
  onLanguageChange,
  currentLang,
  navItems,
  brand,
  ctaText,
  buttonColor = "white",
}: MobileNavProps) {
  const {
    isMobileMenuOpen,
    isServicesSubMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    openServicesSubMenu,
    closeServicesSubMenu,
    closeAllMenus,
  } = useNav();

  const menuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Focus trap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isServicesSubMenuOpen) {
          closeServicesSubMenu();
        } else {
          closeAllMenus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscape);

    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen, isServicesSubMenuOpen, closeAllMenus, closeServicesSubMenu]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => {
          if (isMobileMenuOpen) {
            closeAllMenus();
          } else {
            openMobileMenu();
          }
        }}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label={language === "tr" ? "Menüyü aç" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <motion.span
          animate={
            isMobileMenuOpen
              ? { rotate: 45, y: 8 }
              : { rotate: 0, y: 0 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }
          className={`block h-[2px] w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
        <motion.span
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
          className={`block h-[2px] w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
        <motion.span
          animate={
            isMobileMenuOpen
              ? { rotate: -45, y: -8 }
              : { rotate: 0, y: 0 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }
          className={`block h-[2px] w-6 transition-colors ${
            buttonColor === "white" ? "bg-white" : "bg-dark"
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
              }
              onClick={closeAllMenus}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-md md:hidden"
            />

            {/* Main Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1], // ease-in-out
                    }
              }
              className="fixed right-0 top-0 z-[100] flex h-[100dvh] w-[min(100%,420px)] max-w-full flex-col bg-white shadow-2xl md:hidden rounded-l-2xl border-l border-lilac/10"
              role="dialog"
              aria-modal="true"
              aria-label={language === "tr" ? "Ana menü" : "Main menu"}
            >
              <div className="flex min-h-0 flex-1 flex-col">
                {/* Top bar: logo + lang + close */}
                <div className="shrink-0 border-b border-lilac/10 bg-white px-5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href="/"
                      onClick={closeAllMenus}
                      className="min-w-0 flex-1"
                    >
                      <Image
                        src="/img/yazici-logo-dark.png"
                        alt={brand}
                        width={260}
                        height={72}
                        className="h-10 w-auto max-w-[200px] object-contain object-left sm:h-11"
                        priority
                      />
                    </Link>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            onLanguageChange("tr");
                          }}
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                            currentLang === "tr"
                              ? "border-lilac/50 bg-lilac/12 text-dark"
                              : "border-dark/15 text-dark/60 hover:border-lilac/30 hover:text-dark"
                          }`}
                        >
                          TR
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onLanguageChange("en");
                          }}
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                            currentLang === "en"
                              ? "border-lilac/50 bg-lilac/12 text-dark"
                              : "border-dark/15 text-dark/60 hover:border-lilac/30 hover:text-dark"
                          }`}
                        >
                          EN
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={closeAllMenus}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-dark/55 transition hover:bg-lilac/8 hover:text-dark focus:outline-none focus:ring-2 focus:ring-lilac/40"
                        aria-label={language === "tr" ? "Menüyü kapat" : "Close menu"}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scrollable navigation */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  <AnimatePresence mode="wait">
                    {!isServicesSubMenuOpen ? (
                      <motion.nav
                        key="main-nav"
                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                        }
                        className="flex flex-col px-5 py-4"
                      >
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-dark-purple/80">
                          {language === "tr" ? "Menü" : "Menu"}
                        </p>
                        <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-white">
                          <Link
                            href="/"
                            onClick={closeAllMenus}
                            className="flex min-h-[48px] items-center px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-dark transition hover:bg-lilac/6 hover:text-lilac focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lilac/35"
                          >
                            {language === "tr" ? "Ana Sayfa" : "Home"}
                          </Link>

                          <button
                            type="button"
                            onClick={openServicesSubMenu}
                            className="flex min-h-[48px] w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.16em] text-dark transition hover:bg-lilac/6 hover:text-lilac focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lilac/35"
                          >
                            <span>{navItems.services}</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="shrink-0 text-dark/35"
                              aria-hidden
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>

                          <Link
                            href="/#why-us"
                            onClick={closeAllMenus}
                            className="flex min-h-[48px] items-center px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-dark transition hover:bg-lilac/6 hover:text-lilac focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lilac/35"
                          >
                            {navItems.whyUs}
                          </Link>

                          <Link
                            href="/#proof"
                            onClick={closeAllMenus}
                            className="flex min-h-[48px] items-center px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-dark transition hover:bg-lilac/6 hover:text-lilac focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lilac/35"
                          >
                            {navItems.proof}
                          </Link>

                          <Link
                            href="/#contact"
                            onClick={closeAllMenus}
                            className="flex min-h-[48px] items-center px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-dark transition hover:bg-lilac/6 hover:text-lilac focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lilac/35"
                          >
                            {navItems.contact}
                          </Link>
                        </div>
                      </motion.nav>
                    ) : (
                      <motion.nav
                        key="services-nav"
                        ref={servicesMenuRef}
                        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                        }
                        className="flex flex-col px-5 py-4"
                      >
                        <button
                          type="button"
                          onClick={closeServicesSubMenu}
                          className="mb-4 flex min-h-[44px] w-fit items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-dark/70 transition hover:bg-lilac/8 hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac/40"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                          <span>{language === "tr" ? "Geri" : "Back"}</span>
                        </button>

                        <h2 className="mb-1 font-serif text-lg font-semibold text-dark">
                          {navItems.services}
                        </h2>
                        <Link
                          href="/#products"
                          onClick={closeAllMenus}
                          className="mb-4 text-sm font-medium text-lilac underline-offset-4 hover:underline"
                        >
                          {language === "tr" ? "Tüm ürünler özetine git" : "View all products on homepage"}
                        </Link>

                        <div className="flex flex-col gap-2.5">
                          {products[language].map((item) => (
                            <Link
                              key={item.id}
                              href={getServicePath(item.id)}
                              onClick={closeAllMenus}
                              className="flex min-h-[52px] items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left transition hover:border-lilac/50 hover:bg-lilac/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac/40"
                            >
                              <span className="text-[15px] font-medium text-dark">{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sticky CTA inside drawer (above system bottom bars) */}
                <div className="shrink-0 border-t border-lilac/10 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4">
                  <Link
                    href="/#contact"
                    onClick={closeAllMenus}
                    className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-lilac px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-lilac/20 transition hover:bg-soft-lavender hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac/50 focus-visible:ring-offset-2"
                  >
                    {ctaText}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
