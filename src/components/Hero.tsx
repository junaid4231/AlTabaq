"use client";

import { motion } from "framer-motion";

import { isDeliveryActive } from "@/lib/deliveryUtils";
import type { Settings } from "@/lib/sanityClient";

type HeroProps = {
  whatsappNumber: string;
  settings: Settings;
};

export default function Hero({ whatsappNumber, settings }: HeroProps) {
  return (
    <section className="relative isolate min-h-[100dvh] flex flex-col">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          key={settings.heroVideoUrl || "default"}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={settings.heroVideoUrl || "/hero.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center px-4 pt-32 pb-32 sm:px-8 sm:pt-40 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-sm font-semibold tracking-widest text-[#c08a29] uppercase"
          >
            {settings.heroSubtitle || "Welcome to Al Tabaq"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-4 font-heading text-5xl leading-tight text-white md:text-7xl"
          >
            {settings.heroTitle || "Authentic Pakistani Cuisine"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-white/90"
          >
            {settings.heroDescription || "Crafted with tradition. Served with pride. Every dish celebrates generations of culinary excellence."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/10">
              <span className={`flex h-2 w-2 rounded-full ${
                isDeliveryActive(
                  settings.deliveryShift1Start,
                  settings.deliveryShift1End,
                  settings.deliveryShift2Start,
                  settings.deliveryShift2End
                ) ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {isDeliveryActive(
                  settings.deliveryShift1Start,
                  settings.deliveryShift1End,
                  settings.deliveryShift2Start,
                  settings.deliveryShift2End
                ) ? 'Accepting Orders' : 'Pre-orders Only'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-md border border-white/5">
              <svg className="h-3.5 w-3.5 text-[#c08a29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium text-white/90 uppercase tracking-widest">
                {settings.deliveryShift1Start || "12 PM"} - {settings.deliveryShift1End || "4 PM"} & {settings.deliveryShift2Start || "6 PM"} - {settings.deliveryShift2End || "11 PM"}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex flex-row items-center gap-3 sm:gap-6"
          >
            <a
              href="/menu"
              className="group relative flex-1 sm:flex-none inline-flex sm:min-w-[180px] items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border-2 border-white/30 bg-black/20 px-4 py-3 sm:px-8 sm:py-4 text-[13px] sm:text-base font-heading font-bold text-white backdrop-blur-md transition-all duration-500 hover:border-[#c08a29] hover:bg-[#c08a29]"
            >
              <span className="relative z-10 drop-shadow-sm">Explore Menu</span>
              <div className="absolute inset-0 z-0 h-full w-0 bg-[#c08a29] transition-all duration-500 group-hover:w-full" />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group relative flex-1 sm:flex-none inline-flex sm:min-w-[200px] items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#c08a29] px-4 py-3 sm:px-8 sm:py-4 text-[13px] sm:text-base font-heading font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(192,138,41,0.4)]"
            >
              <span className="relative z-10 drop-shadow-sm">Order Now</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-8 sm:mt-12 flex gap-6 sm:gap-8"
          >
            <div>
              <p className="font-heading text-3xl font-bold text-[#c08a29]">{settings.customerRating || "4.8★"}</p>
              <p className="text-sm text-white/80 uppercase tracking-wider mt-1">Customer Rating</p>
            </div>
            <div className="w-[1px] bg-white/20" />
            <div>
              <p className="font-heading text-3xl font-bold text-white">30 MIN</p>
              <p className="text-sm text-white/80 uppercase tracking-wider mt-1">Avg Delivery Time</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-24 sm:h-32"
          preserveAspectRatio="none"
        >
          <path
            fill="#f8f6f2"
            d="M0,100 C300,180 600,20 900,80 C1200,140 1440,60 1440,60 L1440,200 L0,200 Z"
          />
        </svg>
      </div>
    </section>
  );
}
