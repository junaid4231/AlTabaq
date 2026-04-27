"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Category, Dish } from "@/lib/sanityClient";
import CategoryTabs from "@/components/CategoryTabs";
import FeaturedDishCard from "@/components/FeaturedDishCard";
import PremiumDishCard from "@/components/PremiumDishCard";
import WaveSeparator from "@/components/WaveSeparator";

type MenuShowcaseProps = {
  dishes: Dish[];
  categories: Category[];
  whatsappNumber: string;
};

export default function MenuShowcase({
  dishes,
  categories,
  whatsappNumber,
}: MenuShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.name || "All",
  );

  // Get featured dish (first popular or first in category)
  const featuredDish = useMemo(() => {
    const popular = dishes.find((d) => d.isPopular && d.category === activeCategory);
    return popular || dishes.find((d) => d.category === activeCategory);
  }, [activeCategory, dishes]);

  // Get other dishes (excluding featured)
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((d) => d.category === activeCategory && d._id !== featuredDish?._id)
      .slice(0, 6);
  }, [activeCategory, dishes, featuredDish]);

  return (
    <>
      <WaveSeparator />
      <section className="bg-brand-bg/60 px-4 py-16 sm:px-8 sm:py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-xs font-bold tracking-[0.3em] text-brand-cta uppercase">
              ✦ Culinary Excellence ✦
            </p>
            <h2 className="mt-4 font-heading text-5xl md:text-6xl text-brand-text">
              Explore Our Menu
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-brand-muted leading-relaxed">
              Carefully curated dishes representing our commitment to authentic
              flavors, premium ingredients, and traditional Pakistani cooking
              mastery
            </p>
          </motion.div>

          {/* Category Navigation */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Featured Dish */}
          {featuredDish && (
            <FeaturedDishCard
              dish={featuredDish}
              whatsappNumber={whatsappNumber}
            />
          )}

          {/* Dishes Grid */}
          {filteredDishes.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold text-brand-text">
                  More from this category
                </h3>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredDishes.map((dish, index) => (
                  <PremiumDishCard
                    key={dish._id}
                    dish={dish}
                    whatsappNumber={whatsappNumber}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-brand-muted mb-4">Want to explore more?</p>
            <motion.a
              href="/menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-text px-10 py-4 text-base font-semibold text-brand-text transition hover:bg-brand-text hover:text-white shadow-md hover:shadow-lg"
            >
              View Full Menu
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
