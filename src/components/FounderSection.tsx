"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
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
                  &quot;Al Tabaq is a sanctuary of homeland taste.&quot;
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
  );
}
