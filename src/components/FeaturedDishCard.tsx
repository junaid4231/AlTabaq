"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dish } from "@/lib/sanityClient";
import { useCart } from "@/context/CartContext";


type FeaturedDishCardProps = {
  dish: Dish;
  whatsappNumber: string;
  onOpenModal?: (dish: Dish) => void;
};

export default function FeaturedDishCard({
  dish,
  whatsappNumber,
  onOpenModal,
}: FeaturedDishCardProps) {
  const { addItem } = useCart();
  const orderText = encodeURIComponent(`Hi Al Tabaq! I'd like to order: ${dish.name} (Price: AED ${dish.price})`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16 overflow-hidden rounded-4xl bg-brand-bg shadow-2xl border border-brand-border/40"
    >
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-0">
        {/* Image Section */}
        <div className="relative overflow-hidden bg-brand-bg/60 h-80 lg:h-96">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full relative"
          >
            <Image
              src={
                dish.imageUrl ||
                "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80"
              }
              alt={dish.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Best Seller Badge */}
          {dish.isPopular && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 bg-brand-cta text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              ⭐ Best Seller
            </motion.div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs font-semibold tracking-widest text-brand-cta uppercase mb-3">
              Featured Dish
            </p>
            <h3 className="font-heading text-4xl lg:text-5xl text-brand-text mb-4">
              {dish.name}
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-brand-muted leading-relaxed mb-6 max-w-sm"
          >
            {dish.description || "Premium quality Pakistani cuisine prepared with traditional recipes and finest ingredients."}
          </motion.p>

          {/* Price Section */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-sm text-brand-muted mb-2">Price</p>
            <p className="font-heading text-5xl text-brand-cta font-bold">
              AED {dish.variants && dish.variants.length > 0 ? Math.min(...dish.variants.map(v => v.price)) : dish.price}
              {dish.variants && dish.variants.length > 0 && <span className="text-xs ml-2 font-sans font-normal text-brand-muted">Starting From</span>}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 inline-flex items-center justify-center w-full px-6 py-4 bg-brand-wa text-white rounded-xl font-bold text-base transition shadow-lg hover:shadow-xl hover:brightness-110"
            >
              Order Now
            </motion.a>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (dish.variants && dish.variants.length > 0) {
                  onOpenModal?.(dish);
                  return;
                }
                addItem({
                  id: dish._id,
                  name: dish.name,
                  price: dish.price,
                  imageUrl: dish.imageUrl
                });
              }}
              className="flex-1 inline-flex items-center justify-center w-full px-6 py-4 bg-brand-bg text-brand-cta border-2 border-brand-cta/20 rounded-xl font-bold text-base transition hover:bg-brand-cta hover:text-white"
            >
              {dish.variants && dish.variants.length > 0 ? (
                <>
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  View Options
                </>
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Tray
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
