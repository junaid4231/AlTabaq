"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="relative py-12 sm:py-32 overflow-hidden bg-brand-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-16 items-center">
          <div className="lg:col-span-12 text-center mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[#c08a29] tracking-[0.4em] text-[10px] sm:text-xs font-bold uppercase mb-4 sm:mb-6 block">
                The Hands Behind the Taste
              </span>
              <h2 className="font-heading text-4xl sm:text-7xl text-[#1f1b16] leading-tight">
                Our <span className="text-[#c08a29] italic">Visionary</span> Founders
              </h2>
              <p className="mt-8 mx-auto max-w-2xl text-sm sm:text-lg text-gray-600 font-light leading-relaxed">
                Al Tabaq is more than just a restaurant; it is a legacy built on tradition, 
                excellence, and a shared passion for authentic Pakistani hospitality.
              </p>
            </motion.div>
          </div>
          <div className="lg:col-span-12 relative">
            {/* Decorative Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] pointer-events-none select-none hidden lg:block">
              <span className="font-heading text-[20rem] leading-none whitespace-nowrap">AL TABAQ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 relative z-10">
              {/* Founder 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="group relative"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <div className="relative w-48 sm:w-64 h-64 sm:h-80 shrink-0">
                    {/* Decorative Frame */}
                    <div className="absolute -inset-4 border border-[#c08a29]/20 rounded-[2rem] transition-transform duration-500 group-hover:scale-105" />
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/ceo.png"
                        alt="Qari Muhammad Habib"
                        fill
                        sizes="(max-width: 640px) 192px, 256px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left pt-4">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="h-[1px] w-8 bg-[#c08a29]/40" />
                      <span className="text-[#c08a29] tracking-[0.3em] text-[10px] font-bold uppercase">Visionary Founder</span>
                    </div>
                    <h3 className="font-heading text-3xl sm:text-5xl text-[#c08a29] mb-2 transition-transform duration-300 group-hover:translate-x-2">
                      Qari <br className="hidden sm:block" /> Muhammad Habib
                    </h3>
                    <div className="relative mt-6">
                      <svg className="absolute -left-2 -top-4 h-8 w-8 text-[#c08a29]/10" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c.313 0 .619-.019.92-.054C10.372 22.81 9 20.57 9 18c0-3.314 2.686-6 6-6 0-2.209-1.791-4-4-4zm12 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c.313 0 .619-.019.92-.054C22.372 22.81 21 20.57 21 18c0-3.314 2.686-6 6-6 0-2.209-1.791-4-4-4z" /></svg>
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light italic pl-6 border-l border-[#c08a29]/20">
                        &quot;Al Tabaq is a sanctuary where we serve memories and homeland flavors to every guest.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Founder 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="group relative"
              >
                <div className="flex flex-col sm:flex-row-reverse items-center sm:items-start gap-8">
                  <div className="relative w-48 sm:w-64 h-64 sm:h-80 shrink-0">
                    {/* Decorative Frame */}
                    <div className="absolute -inset-4 border border-[#c08a29]/20 rounded-[2rem] transition-transform duration-500 group-hover:scale-105" />
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/founder2.jpeg"
                        alt="Muhammad Usman"
                        fill
                        sizes="(max-width: 640px) 192px, 256px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-right pt-4">
                    <div className="inline-flex flex-row-reverse items-center gap-2 mb-4">
                      <div className="h-[1px] w-8 bg-[#c08a29]/40" />
                      <span className="text-[#c08a29] tracking-[0.3em] text-[10px] font-bold uppercase">Visionary Founder</span>
                    </div>
                    <h3 className="font-heading text-3xl sm:text-5xl text-[#c08a29] mb-2 transition-transform duration-300 group-hover:-translate-x-2">
                      Muhammad <br className="hidden sm:block" /> Usman
                    </h3>
                    <div className="relative mt-6">
                      <svg className="absolute -right-2 -top-4 h-8 w-8 text-[#c08a29]/10 rotate-180" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c.313 0 .619-.019.92-.054C10.372 22.81 9 20.57 9 18c0-3.314 2.686-6 6-6 0-2.209-1.791-4-4-4zm12 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c.313 0 .619-.019.92-.054C22.372 22.81 21 20.57 21 18c0-3.314 2.686-6 6-6 0-2.209-1.791-4-4-4z" /></svg>
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light italic pr-6 border-r border-[#c08a29]/20">
                        &quot;Driving the excellence of authentic Pakistani hospitality with passion and dedication.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
