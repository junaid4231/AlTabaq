"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import type { Settings } from "@/lib/sanityClient";

type RestaurantHeaderProps = {
  settings: Settings;
  whatsappNumber: string;
};

export default function RestaurantHeader({
  settings,
  whatsappNumber,
}: RestaurantHeaderProps) {
  const { restaurantName, logoUrl } = settings;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "MENU", href: "/menu" },
    { name: "CATERING", href: "/catering" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#e8dece]/50 bg-brand-bg/80 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto hidden h-20 w-full max-w-7xl grid-cols-3 items-center px-4 md:grid md:px-6 lg:px-8">
        <nav className="flex items-center gap-7 text-[13px] font-medium tracking-wide text-[#2b241b]">
          {navLinks.slice(0, 3).map((link) => (
            <Link key={link.name} href={link.href} className="relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c08a29] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link href="/" className="mx-auto flex items-center justify-center group">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Image
              src="/logo.png"
              alt={`${restaurantName} logo`}
              width={220}
              height={88}
              className="h-24 w-auto object-contain transition duration-300 group-hover:opacity-80"
              priority
            />
          </motion.div>
        </Link>

        <div className="ml-auto flex items-center gap-7 text-[13px] font-medium tracking-wide text-[#2b241b]">
          <Link href="/about" className="relative group">
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#d29a2f] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/#contact" className="relative group">
            CONTACT
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#d29a2f] transition-all duration-300 group-hover:w-full" />
          </Link>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#c08a29] px-5 py-2.5 text-xs font-semibold tracking-wider text-white transition hover:bg-[#a67420] shadow-[0_4px_14px_0_rgba(192,138,41,0.39)] hover:shadow-[0_6px_20px_rgba(192,138,41,0.23)]"
          >
            ORDER ON WHATSAPP
          </motion.a>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:hidden">
        <Link href="/">
          <Image
            src={logoUrl || "/logo.png"}
            alt={`${restaurantName} logo`}
            width={140}
            height={54}
            className="h-12 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#c08a29] px-4 py-2 text-[11px] font-semibold tracking-wider text-white shadow-md"
          >
            ORDER
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#2b241b]"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-brand-bg border-t border-[#e8dece]/50 md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-[#2b241b]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

