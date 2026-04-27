"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantFooter from "./RestaurantFooter";
import type { Settings } from "@/lib/sanityClient";

type CateringPageProps = {
  settings: Settings;
  whatsappNumber: string;
};

export default function CateringPage({ settings, whatsappNumber }: CateringPageProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  /* Animation variants moved or unused */

  return (
    <div ref={containerRef} className="bg-[#f8f6f2] text-[#1f1b16]">
      <RestaurantHeader settings={settings} whatsappNumber={whatsappNumber} />

      <main className="relative overflow-hidden pt-20">
        
        {/* 1. CINEMATIC CATERING HERO */}
        <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80"
              alt="Al Tabaq Catering Spread"
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
              className="text-[#d29a2f] uppercase text-sm font-bold block mb-6"
            >
              Exquisite Service — Grand Portions
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-heading text-7xl sm:text-8xl md:text-[10rem] text-white leading-[0.85] tracking-tighter"
            >
              Art of the <br /> <span className="text-[#d29a2f]">Feast</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mx-auto mt-12 max-w-2xl text-lg text-white/70 font-light leading-relaxed"
            >
              Elevate your home gatherings and corporate events with the same authentic 
              taste that made Al Tabaq a legend. 
            </motion.p>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#d29a2f] to-transparent" />
          </motion.div>
        </section>

        {/* 2. THE SERVICES - Image Based Navigation */}
        <section className="relative py-12 sm:py-32 overflow-hidden bg-brand-bg">
          {/* Background Branding */}
          <span className="absolute -right-10 sm:-right-20 top-10 sm:top-20 text-6xl sm:text-[20rem] font-heading text-black/[0.02] select-none pointer-events-none">
            EVENTS
          </span>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-between items-center mb-10 sm:mb-24 gap-4 sm:gap-16">
               <div className="max-w-[60%]">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[#d29a2f] tracking-[0.2em] sm:tracking-[0.4em] text-[8px] sm:text-xs font-bold uppercase mb-1 sm:mb-4 block"
                  >
                    Customized Solutions
                  </motion.span>
                  <h2 className="font-heading text-lg sm:text-7xl leading-tight">Catering for <br className="hidden sm:block" />Every Occasion</h2>
               </div>
               <div className="max-w-[35%]">
                  <p className="text-gray-500 border-l border-black/10 pl-4 sm:pl-8 leading-relaxed italic text-[10px] sm:text-base">
                    &quot;We deliver the soul of Pakistan to your venue.&quot;
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  title: "Private Dinners",
                  label: "INTIMATE",
                  img: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=800&q=80",
                  desc: "Chef-curated menus for your most cherished guests."
                },
                {
                  title: "Corporate Banquets",
                  label: "PROFESSIONAL",
                  img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                  desc: "Professional catering that leaves a lasting impression."
                },
                {
                  title: "Grand Weddings",
                  label: "TRADITIONAL",
                  img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
                  desc: "Feasts managed with precision and uncompromising quality."
                }
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  className={`group relative h-[300px] sm:h-[600px] rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-xl ${idx === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-10 right-6 sm:left-10">
                    <span className="text-[#d29a2f] text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-1 sm:mb-4 block">{service.label}</span>
                    <h3 className="font-heading text-sm sm:text-4xl text-white mb-2 sm:mb-6 transform transition duration-500 group-hover:-translate-y-2">{service.title}</h3>
                    <p className="text-gray-300 text-[10px] sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 leading-relaxed translate-y-4 group-hover:translate-y-0 line-clamp-1 sm:line-clamp-none">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE PROCESS - Numerical Storytelling */}
        <section className="py-12 sm:py-32 bg-[#13110e] text-white relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d29a2f]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="text-[#d29a2f] tracking-[0.2em] sm:tracking-[0.4em] text-[8px] sm:text-xs uppercase mb-2 sm:mb-6 block">Our Method</span>
                <h2 className="font-heading text-lg sm:text-6xl leading-tight">Effortless <br className="hidden sm:block" />Planning</h2>
                
                <div className="mt-6 sm:mt-16 space-y-4 sm:space-y-12">
                   {[
                     { step: "01", title: "Flavor", desc: "Share your vision. We help you balance." },
                     { step: "02", title: "Cooking", desc: "Prepared fresh on the day." },
                     { step: "03", title: "Setup", desc: "We deliver and set up your feast." }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-3 sm:gap-8 group">
                        <span className="font-heading text-xl sm:text-5xl text-white/10 group-hover:text-[#d29a2f] transition-colors duration-500">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-2xl font-bold mb-1 sm:mb-3">{item.title}</h3>
                          <p className="text-gray-400 leading-relaxed text-[8px] sm:text-base line-clamp-1 sm:line-clamp-none">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative h-[300px] sm:h-[700px] rounded-[2rem] sm:rounded-[4rem] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=1200&q=80"
                  alt="Large Scale Cooking"
                  fill
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 border-[10px] sm:border-[20px] border-white/5 m-4 sm:m-10 rounded-[1.5rem] sm:rounded-[3rem]" />
                <div className="absolute bottom-4 sm:bottom-16 left-4 sm:left-16 right-4 sm:right-16 p-4 sm:p-10 bg-brand-bg text-[#1f1b16] rounded-2xl sm:rounded-3xl shadow-2xl">
                   <p className="font-heading text-xs sm:text-3xl mb-0.5 sm:mb-2">24h Priority</p>
                   <p className="text-[6px] sm:text-sm text-gray-500 uppercase tracking-widest font-bold">Advance Booking</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. THE CALL TO ACTION */}
        <section className="py-20 sm:py-40 bg-brand-bg text-center relative flex items-center justify-center">
           <div className="max-w-4xl px-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-4xl sm:text-8xl mb-6 sm:mb-12"
              >
                Let Us Set <br />Your <span className="text-[#c08a29]">Table.</span>
              </motion.h2>
              <p className="text-gray-500 text-sm sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto">
                Ready to host an unforgettable feast? Connect with us for a personalized quote.
              </p>
              
              <div className="flex flex-row justify-center gap-4 sm:gap-6">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 sm:px-12 py-4 sm:py-6 bg-[#d29a2f] text-white rounded-full font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] uppercase shadow-2xl flex items-center gap-2"
                >
                  Book Now
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/menu" 
                  className="px-6 sm:px-12 py-4 sm:py-6 border border-black/10 rounded-full font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] uppercase transition hover:bg-black hover:text-white"
                >
                  View Menu
                </motion.a>
              </div>
           </div>
        </section>
      </main>

      <RestaurantFooter settings={settings} whatsappNumber={whatsappNumber} />
    </div>
  );
}
