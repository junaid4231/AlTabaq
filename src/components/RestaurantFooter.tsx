"use client";

import Image from "next/image";
import Link from "next/link";


import type { Settings } from "@/lib/sanityClient";

type RestaurantFooterProps = {
  settings: Settings;
  whatsappNumber?: string;
};

export default function RestaurantFooter({
  settings,
  whatsappNumber,
}: RestaurantFooterProps) {
  const { restaurantName, phone, address, openingHours, facebookUrl, instagramUrl } = settings;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className="relative mt-20 overflow-hidden bg-[#13110e] text-white">
      {/* Concave Curved Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 translate-y-[-1px]">
        <svg viewBox="0 0 1440 120" className="relative block w-full h-12 sm:h-20" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" fill="#f8f6f2" />
        </svg>
      </div>

      {/* Decorative Brand Signature Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span className="font-heading text-[15vw] whitespace-nowrap select-none">
          {restaurantName.toUpperCase().replace("RESTAURANT", "").trim()}
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
              src="/logo.png"
              alt={`${restaurantName} logo`}
              width={220}
              height={88}
              className="h-24 w-auto object-contain transition duration-300 group-hover:opacity-80"
              priority
            />
            </Link>
            <p className="mt-8 max-w-md text-base leading-8 text-gray-400">
              Preserving the authentic flavors of Pakistan. We combine traditional techniques 
              with premium ingredients to bring you a dining experience that feels like home, 
              served in a contemporary luxury setting.
            </p>
            <div className="mt-10 flex gap-5">
              {[
                { id: 'fb', icon: facebookUrl, path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                { id: 'ig', icon: instagramUrl, path: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.4a4.4 4.4 0 110-8.8 4.4 4.4 0 010 8.8zm6.487-11.595a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z' }
              ].map((social) => social.icon && (
                <a key={social.id} href={social.icon} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:bg-[#c08a29] hover:border-[#c08a29] hover:scale-110">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-lg text-white uppercase tracking-widest">Navigation</h4>
            <ul className="mt-8 space-y-4">
              <li><Link href="/menu" className="text-gray-400 hover:text-[#c08a29] transition-colors">Full Menu</Link></li>
              <li><Link href="/catering" className="text-gray-400 hover:text-[#c08a29] transition-colors">Catering</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#c08a29] transition-colors">About Us</Link></li>
              <li><Link href="/#menu" className="text-gray-400 hover:text-[#c08a29] transition-colors">Signature Dishes</Link></li>
            </ul>
          </div>

          {/* Visit & Hours */}
          <div className="lg:col-span-5">
            <h4 className="font-heading text-lg text-white uppercase tracking-widest">Connect</h4>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c08a29]/10 text-[#c08a29]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <p className="text-sm leading-6 text-gray-400">{address}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c08a29]/10 text-[#c08a29]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <p className="text-sm leading-6 text-gray-400">{phone}</p>
                </div>
                <div className="pt-2">
                  <a 
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                  >
                    <span>Get Directions</span>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="space-y-4 border-l border-white/5 pl-8 sm:block hidden">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c08a29]/10 text-[#c08a29]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="text-sm leading-6 text-gray-400 whitespace-pre-line">
                    {openingHours}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#c08a29] px-10 py-5 text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-[#a67420] hover:shadow-[0_15px_30px_rgba(192,138,41,0.4)]"
              >
                <span className="relative z-10">Instant Order via WhatsApp</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="border-t border-white/5 bg-black/40 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 md:flex-row lg:px-8">
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            © {new Date().getFullYear()} {restaurantName}. Handcrafted for excellence.
          </p>
          <div className="mt-6 flex items-center gap-2 md:mt-0">
             <span className="text-[10px] text-gray-600 uppercase tracking-widest mr-4">Follow us for updates</span>
             <div className="h-[1px] w-12 bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
