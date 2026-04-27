"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavbarProps = {
  restaurantName: string;
  whatsappNumber: string;
};

export default function Navbar({
  restaurantName,
  whatsappNumber,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const navClass = isScrolled
    ? "border-brand-border/90 bg-brand-bg/88 shadow-[0_20px_44px_-30px_rgba(43,43,43,0.75)] backdrop-blur-2xl"
    : "border-brand-border/50 bg-brand-bg/62 backdrop-blur-xl";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-[1.35rem] border px-4 transition-all duration-300 sm:px-6 ${navClass}`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-brand-text sm:text-base"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-cta text-white shadow-lg shadow-brand-cta/35">
            AT
          </span>
          <span className="line-clamp-1 max-w-35 sm:max-w-none">
            {restaurantName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-brand-border/80 bg-brand-bg/70 p-1 text-sm text-brand-muted md:flex">
          <a
            href="#featured"
            className="rounded-full px-4 py-1.5 transition-colors hover:bg-brand-text hover:text-white"
          >
            Menu
          </a>
          <a
            href="#contact"
            className="rounded-full px-4 py-1.5 transition-colors hover:bg-brand-text hover:text-white"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="rounded-full border border-brand-border bg-brand-bg/80 p-1 text-xs font-medium">
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1 transition ${
                language === "en"
                  ? "bg-brand-text text-white"
                  : "text-brand-muted"
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`rounded-full px-2.5 py-1 transition ${
                language === "ar"
                  ? "bg-brand-text text-white"
                  : "text-brand-muted"
              }`}
              aria-label="Switch language to Arabic"
            >
              AR
            </button>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-brand-cta px-4 text-sm font-semibold text-white shadow-lg shadow-brand-cta/30 transition hover:-translate-y-0.5 hover:bg-[#a67420]"
          >
            <span className="cta-shimmer absolute inset-0" />
            <span className="relative">Order Now</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
