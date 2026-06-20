"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import type { GlobalGalleryImage } from "./GlobalGallery";
import { getServicePath } from "../lib/seo";

type HorizontalGalleryProps = {
  images: GlobalGalleryImage[];
  language?: "tr" | "en";
};

const DRAG_THRESHOLD = 3;
const SCROLL_STEP_RATIO = 0.75;

export function HorizontalGallery({
  images,
  language = "tr",
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // Show/hide arrows on hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setShowArrows(true);
    const handleMouseLeave = () => setShowArrows(false);

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      // Only intercept if scrolling vertically over the gallery
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        container.scrollBy({
          left: event.deltaY,
          behavior: "auto",
        });
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStartX.current = event.pageX;
    dragStartScroll.current = container.scrollLeft;
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const distance = event.pageX - dragStartX.current;
    if (Math.abs(distance) < DRAG_THRESHOLD) return;
    container.scrollLeft = dragStartScroll.current - distance;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  // Arrow navigation
  const scrollByStep = (direction: number) => {
    const container = containerRef.current;
    if (!container) return;
    const step = Math.round(container.clientWidth * SCROLL_STEP_RATIO);
    container.scrollBy({
      left: step * direction,
      behavior: "smooth",
    });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`hide-scrollbar flex gap-4 overflow-x-auto pb-4 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } snap-x snap-mandatory scroll-smooth`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="region"
        aria-label={
          language === "tr" ? "Etkinlik galerisi" : "Event gallery"
        }
        tabIndex={0}
      >
        {images.map((image, idx) => (
          <motion.div
            key={`${image.serviceId}-${idx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            className="snap-start flex-none"
          >
            <Link
              href={`${getServicePath(image.serviceId)}#gallery`}
              className="group relative block aspect-[4/3] w-[280px] sm:w-[320px] lg:w-[360px] overflow-hidden rounded-2xl"
              aria-label={
                language === "tr"
                  ? `${image.serviceTitle} galerisini görüntüle`
                  : `View ${image.serviceTitle} gallery`
              }
              onClick={(e) => {
                // Prevent navigation if user was dragging
                if (isDragging) {
                  e.preventDefault();
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
                loading={idx < 6 ? "eager" : "lazy"}
                quality={85}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Arrow Navigation Buttons */}
      <button
        type="button"
        onClick={() => scrollByStep(-1)}
        onMouseDown={(e) => e.preventDefault()}
        aria-label={language === "tr" ? "Galeriyi sola kaydır" : "Scroll gallery left"}
        className={`absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-dark/10 bg-white/90 text-dark/70 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-dark md:flex ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
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
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollByStep(1)}
        onMouseDown={(e) => e.preventDefault()}
        aria-label={language === "tr" ? "Galeriyi sağa kaydır" : "Scroll gallery right"}
        className={`absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-dark/10 bg-white/90 text-dark/70 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-dark md:flex ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
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
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
