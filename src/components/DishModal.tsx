"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Dish, Deal } from "@/lib/sanityClient";
import { useCart } from "@/context/CartContext";


type DishModalProps = {
  dish: Dish | Deal | null;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
};

export default function DishModal({ dish, isOpen, onClose, whatsappNumber }: DishModalProps) {
  const { addItem, setIsTrayOpen } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    Promise.resolve().then(() => {
      setSelectedVariantIndex(0);
    });
  }, [dish]);

  if (!dish) return null;

  const variants = 'variants' in dish ? dish.variants : undefined;

  const currentPrice = ((variants && variants.length > 0)
    ? variants[selectedVariantIndex].price 
    : dish.price) || 0;
    
  const currentSize = (variants && variants.length > 0)
    ? ` (${variants[selectedVariantIndex].size})` 
    : "";

  const waMessage = encodeURIComponent(`Hi! I'd like to order "${dish.name}${currentSize}" for AED ${currentPrice}.`);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-[#f8f6f2] shadow-2xl scrollbar-hide"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-black backdrop-blur-md transition hover:bg-black/20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="relative h-56 w-full md:h-auto md:w-1/2">
                <Image
                  src={dish.imageUrl ?? "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80"}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col p-6 md:w-1/2 md:p-12">
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#d29a2f] uppercase">
                  {'category' in dish ? dish.category : "Special Deal"}
                </p>
                <h2 className="mt-4 font-heading text-4xl text-[#1f1b16]">{dish.name}</h2>
                <div className="mt-6 flex-1">
                  <h4 className="text-xs font-bold text-[#8a6a3f] uppercase tracking-wider">Description</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a4d40]">
                    {dish.description || "Freshly prepared with premium ingredients. Experience the authentic taste of Al Tabaq."}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-6 pt-6 border-t border-black/5">
                  {variants && variants.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold text-[#8a6a3f] uppercase tracking-[0.2em]">Select Size</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {variants.map((v, i) => (
                          <button
                            key={v.size}
                            onClick={() => setSelectedVariantIndex(i)}
                            className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-300 ${
                              selectedVariantIndex === i
                                ? "border-[#d29a2f] bg-[#d29a2f] text-white shadow-lg"
                                : "border-black/10 bg-white text-[#1f1b16] hover:border-[#d29a2f]"
                            }`}
                          >
                            {v.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between bg-[#fdfaf5] p-5 rounded-2xl border border-[#f0e8dc]">
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#8a6a3f] uppercase">Total Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#b98529]">AED</span>
                      <span className="font-heading text-4xl font-bold text-[#1f1b16]">
                        {currentPrice}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        addItem({
                          id: `${dish._id}-${selectedVariantIndex}`,
                          name: `${dish.name}${currentSize}`,
                          price: currentPrice,
                          imageUrl: dish.imageUrl
                        });
                        onClose();
                        setIsTrayOpen(true);
                      }}
                      className="flex items-center justify-center gap-3 rounded-2xl bg-[#1f1b16] px-8 py-4 text-[11px] font-bold tracking-widest text-white uppercase transition hover:bg-[#d29a2f] hover:shadow-xl active:scale-[0.98]"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      QUICK ORDER & CHECKOUT
                    </button>

                    <button
                      onClick={() => {
                        addItem({
                          id: `${dish._id}-${selectedVariantIndex}`,
                          name: `${dish.name}${currentSize}`,
                          price: currentPrice,
                          imageUrl: dish.imageUrl
                        });
                        onClose();
                      }}
                      className="flex items-center justify-center gap-3 rounded-2xl border-2 border-[#d29a2f] bg-transparent px-8 py-4 text-[11px] font-bold tracking-widest text-[#d29a2f] uppercase transition hover:bg-[#d29a2f] hover:text-white active:scale-[0.98]"
                    >
                      ADD TO TRAY ONLY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
