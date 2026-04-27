"use client";

import { useMemo, useState } from "react";

import type { Category, Dish } from "@/lib/sanityClient";
import CategoryFilter from "./CategoryFilter";
import DishCard from "./DishCard";

type FeaturedDishesProps = {
  dishes: Dish[];
  categories: Category[];
  whatsappNumber: string;
};

export default function FeaturedDishes({
  dishes,
  categories,
  whatsappNumber,
}: FeaturedDishesProps) {
  const categoryNames = useMemo(
    () => ["All", ...categories.map((item) => item.name)],
    [categories],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDishes = useMemo(() => {
    if (activeCategory === "All") {
      return dishes;
    }

    return dishes.filter((dish) => dish.category === activeCategory);
  }, [activeCategory, dishes]);

  return (
    <section
      id="featured"
      className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="relative overflow-hidden rounded-4xl border border-brand-border/80 bg-brand-bg/80 p-5 shadow-[0_26px_65px_-42px_rgba(43,43,43,0.7)] backdrop-blur-sm sm:p-8">
        <div className="absolute -top-16 -right-12 h-52 w-52 rounded-full bg-brand-cta/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-accent/10 blur-3xl" />

        <div className="relative mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-brand-muted uppercase">
              Most Ordered
            </p>
            <h2 className="mt-2 font-heading text-3xl text-brand-text sm:text-4xl">
              Featured Dishes
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-brand-muted">
              Quick decisions, clear prices, and instant WhatsApp ordering for
              your top picks.
            </p>
          </div>
          <a
            href="/menu"
            className="inline-flex h-10 items-center justify-center rounded-full border border-brand-border bg-brand-bg px-4 text-sm font-semibold text-brand-text transition hover:bg-white"
          >
            Full Menu
          </a>
        </div>

        <div className="relative">
          <CategoryFilter
            categories={categoryNames}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="relative mt-6 grid gap-5 sm:mt-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish._id}
              dish={dish}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
