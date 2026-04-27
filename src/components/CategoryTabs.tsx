"use client";

import { useRef, useEffect, useState } from "react";
import type { Category } from "@/lib/sanityClient";

type CategoryTabsProps = {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showAllOption?: boolean;
};

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  showAllOption = false,
}: CategoryTabsProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainer.current;
    container?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      container?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-12">
      {/* Left Scroll Indicator */}
      {showLeftScroll && (
          <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center bg-gradient-to-r from-[#f8f6f2] to-transparent text-brand-text hover:text-brand-cta transition"
          aria-label="Scroll left"
        >
          ←
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollContainer}
        className="flex gap-2 sm:gap-5 overflow-x-auto scrollbar-hide px-2 sm:px-6 py-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {showAllOption && (
          <button
            onClick={() => onCategoryChange("")}
            className={`
              relative flex-shrink-0 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-500
              hover:scale-110 hover:-translate-y-1 active:scale-95
              ${
                activeCategory === ""
                  ? "bg-brand-text text-white shadow-[0_10px_20px_rgba(31,27,22,0.3)] scale-105"
                  : "bg-brand-bg border-2 border-[#e8dfd1] text-brand-text hover:border-brand-text hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              }
            `}
          >
            All Dishes
          </button>
        )}
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onCategoryChange(cat.name)}
            className={`
              relative flex-shrink-0 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-500
              hover:scale-110 hover:-translate-y-1 active:scale-95
              ${
                activeCategory === cat.name
                  ? "bg-brand-text text-white shadow-[0_10px_20px_rgba(31,27,22,0.3)] scale-105"
                  : "bg-brand-bg border-2 border-[#e8dfd1] text-brand-text hover:border-brand-text hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              }
            `}
          >
            {cat.name}
            {activeCategory === cat.name && (
              <span className="absolute inset-0 rounded-full animate-pulse border-2 border-brand-text opacity-25" />
            )}
          </button>
        ))}
      </div>

      {/* Right Scroll Indicator */}
      {showRightScroll && (
          <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center bg-gradient-to-l from-[#f8f6f2] to-transparent text-brand-text hover:text-brand-cta transition"
          aria-label="Scroll right"
        >
          →
        </button>
      )}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
