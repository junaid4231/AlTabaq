"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Settings } from "@/lib/sanityClient";

export default function AboutContent({ settings }: { settings: Settings }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#f8f6f2]">
      {/* 1. CINEMATIC PARALLAX HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/outside.png"
            alt={`${settings.restaurantName} Exterior`}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#c08a29] uppercase text-sm font-bold block mb-6"
          >
            Since 1998 — The Art of Taste
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-7xl sm:text-8xl md:text-[10rem] text-white leading-none"
          >
            Our Legacy
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 1, duration: 1 }}
            className="h-[2px] bg-[#c08a29] mx-auto mt-8"
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Discover More</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#c08a29] to-transparent" />
        </motion.div>
      </section>

      {/* 2. THE OVERLAPPING NARRATIVE - Editorial Layout */}
      <section className="relative py-12 sm:py-32 overflow-hidden">
        {/* Floating Decorative Years */}
        <span className="absolute -left-20 top-40 text-[20rem] font-heading text-black/[0.03] select-none pointer-events-none">
          1998
        </span>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-16 items-center">
            
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 rounded-tl-[3rem] sm:rounded-tl-[10rem] rounded-br-[3rem] sm:rounded-br-[10rem] overflow-hidden shadow-xl sm:shadow-2xl aspect-[4/5]"
              >
                <Image
                  src="/cusine.jpg"
                  alt="Al Tabaq Cuisine"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 variants={fadeInUp} className="font-heading text-sm sm:text-6xl text-[#1f1b16] leading-tight">
                  Born from <span className="text-[#c08a29] italic">Passion</span>, <br className="hidden sm:block" />
                  Rooted in Tradition.
                </motion.h2>
                <motion.div variants={fadeInUp} className="mt-2 sm:mt-10 space-y-2 sm:space-y-8 text-[10px] sm:text-lg text-gray-600 leading-relaxed font-light">
                  <p className="border-l-2 sm:border-l-4 border-[#c08a29] pl-2 sm:pl-6 italic text-xs sm:text-xl text-[#1f1b16]">
                    "We don't just cook food; we recreate memories."
                  </p>
                  <p className="line-clamp-4 sm:line-clamp-none">
                    {settings.restaurantName} was established to elevate Pakistani 
                    culinary arts to a global luxury experience. What started as 
                    a small tandoor has blossomed into Ajman's premier destination.
                  </p>
                  <p className="hidden sm:block">
                    We maintain our heritage through strict adherence to age-old methods—hand-pounding 
                    our masalas and using exclusively clay ovens that have been seasoned over years.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-4 sm:mt-12 flex items-center gap-4 sm:gap-10">
                   <div className="h-[1px] w-8 sm:w-20 bg-[#c08a29]" />
                   <span className="font-heading text-xs sm:text-2xl text-[#1f1b16]">The Al Tabaq Team</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CEO SECTION - Message from Leadership */}
      <section className="relative py-12 sm:py-32 overflow-hidden bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-16 items-center">
            <div className="lg:col-span-7 order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="text-[#c08a29] tracking-[0.4em] text-[8px] sm:text-xs font-bold uppercase mb-2 sm:mb-6 block">
                  Visionary Leadership
                </span>
                <h2 className="font-heading text-sm sm:text-6xl text-[#1f1b16] leading-tight mb-4 sm:mb-8">
                  A Vision for <br className="hidden sm:block" />
                  <span className="text-[#c08a29] italic">Authentic</span> Excellence
                </h2>
                <div className="space-y-2 sm:space-y-6 text-[10px] sm:text-lg text-gray-600 leading-relaxed font-light">
                  <p className="text-xs sm:text-xl text-[#1f1b16] font-medium italic border-l-2 sm:border-l-4 border-[#c08a29] pl-2 sm:pl-6 py-1 sm:py-2">
                    "Al Tabaq is a sanctuary of homeland taste."
                  </p>
                  <p className="line-clamp-3 sm:line-clamp-none">
                    Our journey began with a commitment: to treat every guest like family and every dish like a masterpiece. 
                  </p>
                  <p className="hidden sm:block">
                    Every day, we strive to elevate the standard of Pakistani hospitality in the UAE, ensuring that the legacy we build today becomes the tradition of tomorrow.
                  </p>
                </div>
                <div className="mt-4 sm:mt-10">
                  <p className="font-heading text-xs sm:text-3xl text-[#1f1b16]">Hafiz Habib ur Rehman</p>
                  <p className="text-[#c08a29] text-[8px] sm:text-sm font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Founder & CEO</p>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5 order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-square sm:aspect-[4/5] rounded-2xl sm:rounded-[4rem] overflow-hidden shadow-xl sm:shadow-2xl border border-[#c08a29]/20"
              >
                <Image
                  src="/ceo.png"
                  alt="CEO of Al Tabaq"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PILLARS - Dynamic Cards */}
      <section className="py-16 sm:py-32 bg-[#13110e] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center mb-10 sm:mb-20 gap-4 sm:gap-8">
            <div className="max-w-[60%]">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[#c08a29] tracking-[0.2em] text-[8px] sm:text-xs uppercase mb-1 sm:mb-4 block"
              >
                Our Foundations
              </motion.span>
              <h2 className="font-heading text-lg sm:text-6xl leading-tight">The Pillars of <br className="hidden sm:block" />Our Excellence</h2>
            </div>
            <p className="text-gray-400 max-w-[35%] text-[10px] sm:text-sm leading-relaxed border-l border-white/20 pl-4">
              Consistency is our currency. We never cut corners.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                title: "Rare Spices",
                label: "AUTHENTICITY",
                img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
                desc: "Sourced from Pakistan's markets."
              },
              {
                title: "Clay Mastery",
                label: "TRADITION",
                img: "/clay.jpg",
                desc: "Our clay ovens are the soul."
              },
              {
                title: "Hospitality",
                label: "HERITAGE",
                img: "/hospitality.jpg",
                desc: "Seats at our family table."
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`group relative h-[300px] sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${idx === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 border border-[#c08a29]/30 group-hover:border-[#c08a29] transition-all duration-500 m-2 sm:m-4 rounded-xl sm:rounded-2xl" />
                
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10">
                  <span className="text-[#d29a2f] text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-1 sm:mb-2 block">{item.label}</span>
                  <h3 className="font-heading text-sm sm:text-3xl mb-1 sm:mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">{item.title}</h3>
                  <p className="text-gray-400 text-[10px] sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-1 sm:line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE GRAND INVITATION */}
      <section className="py-20 sm:py-40 relative flex items-center justify-center text-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1440 120" className="relative block w-full h-20" preserveAspectRatio="none">
            <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" fill="#13110e" />
          </svg>
        </div>

        <div className="max-w-4xl px-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-4xl sm:text-8xl text-[#1f1b16] mb-6 sm:mb-12"
          >
            Taste the <br />
            <span className="text-[#c08a29]">Excellence.</span>
          </motion.h2>
          
          <div className="flex flex-row justify-center gap-4 sm:gap-8 mt-8 sm:mt-16">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/menu" 
              className="px-6 sm:px-12 py-4 sm:py-6 bg-[#c08a29] text-white rounded-full font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] uppercase shadow-2xl"
            >
              The Full Menu
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/#contact" 
              className="px-6 sm:px-12 py-4 sm:py-6 border border-[#1f1b16]/20 text-[#1f1b16] rounded-full font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] uppercase transition-colors hover:bg-[#1f1b16] hover:text-white"
            >
              Find Us In Ajman
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
