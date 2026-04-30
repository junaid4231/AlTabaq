"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dish } from "@/lib/sanityClient";
import { useCart } from "@/context/CartContext";


type PremiumDishCardProps = {
  dish: Dish;
  whatsappNumber: string;
  index?: number;
};

export default function PremiumDishCard({
  dish,
  whatsappNumber,
  index = 0,
}: PremiumDishCardProps) {
  const { addItem, setIsTrayOpen } = useCart();
  const orderText = encodeURIComponent(`Hi Al Tabaq! I'd like to order: ${dish.name} (Price: AED ${dish.price})`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl bg-brand-bg shadow-lg border border-brand-border/40 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-bg/60">
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full relative"
        >
          <Image
            src={
              dish.imageUrl ||
              "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=600&q=80"
            }
            alt={dish.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Overlay Badge */}
        {dish.isPopular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 right-3 bg-brand-cta text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            ⭐ Popular
          </motion.div>
        )}

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="text-white text-sm font-semibold"
          >
            Scroll to see details
          </motion.p>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
        {/* Name and Price Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-1 sm:gap-3">
          <h3 className="font-heading text-lg sm:text-xl leading-tight text-brand-text flex-1 group-hover:text-brand-cta transition">
            {dish.name}
          </h3>
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 rounded-lg bg-brand-cta/15 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-bold text-brand-cta whitespace-nowrap"
          >
            AED {dish.price}
          </motion.span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-[10px] sm:text-sm text-brand-muted leading-relaxed">
          {dish.description || "Premium quality Pakistani cuisine"}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (dish.variants && dish.variants.length > 0) return; 
              addItem({
                id: dish._id,
                name: dish.name,
                price: dish.price,
                imageUrl: dish.imageUrl
              });
              setIsTrayOpen(true);
            }}
            className="flex-1 text-center py-2.5 sm:py-3 px-4 bg-brand-cta text-white rounded-xl font-bold text-[10px] sm:text-sm transition shadow-md hover:shadow-lg hover:brightness-110"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Quick Order
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
