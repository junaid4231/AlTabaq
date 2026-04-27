"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { Category, Dish, Settings, Deal } from "@/lib/sanityClient";
import RestaurantFooter from "@/components/RestaurantFooter";
import RestaurantHeader from "@/components/RestaurantHeader";
import DishModal from "@/components/DishModal";
import CategoryTabs from "@/components/CategoryTabs";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";


const getCategoryPlaceholder = (categoryName: string) => {
  const normalized = categoryName.toLowerCase();
  if (normalized.includes("bbq")) return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80";
  if (normalized.includes("karahi") || normalized.includes("handi")) return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80";
  if (normalized.includes("rice") || normalized.includes("biryani") || normalized.includes("pulao")) return "https://images.unsplash.com/photo-1563379091339-03b11adbbee1?auto=format&fit=crop&w=1200&q=80";
  if (normalized.includes("beverages") || normalized.includes("juice") || normalized.includes("shake")) return "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=1200&q=80";
  if (normalized.includes("dessert") || normalized.includes("sweet") || normalized.includes("kheer")) return "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80";
  if (normalized.includes("tandoor") || normalized.includes("paratha")) return "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1200&q=80";
  return "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80";
};

type RestaurantMenuPageProps = {
  settings: Settings;
  dishes: Dish[];
  categories: Category[];
  deals: Deal[];
  category?: string;
  whatsappNumber: string;
};

export default function RestaurantMenuPage({
  settings,
  dishes,
  categories,
  deals,
  category,
  whatsappNumber,
}: RestaurantMenuPageProps) {
  const [selectedDish, setSelectedDish] = useState<Dish | Deal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);

  const matchesCategory = (dishCategory: string, selectedCategory: string) => {
    return dishCategory === selectedCategory;
  };

  const filteredDishes = useMemo(() => {
    let result = dishes;
    if (category) {
      result = result.filter((dish) => matchesCategory(dish.category, category));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (dish) => 
          dish.name.toLowerCase().includes(q) || 
          dish.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [dishes, category, searchQuery]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f8f6f2] text-[#1f1b16]">
      <RestaurantHeader settings={settings} whatsappNumber={whatsappNumber} />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        
        {/* 1. CINEMATIC HERO SECTION */}
        <section className="relative mb-16 h-[50vh] min-h-[400px] overflow-hidden rounded-[3rem] shadow-2xl">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
              alt={`${settings.restaurantName} Menu`}
              fill
              className="object-cover brightness-50"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-xs font-bold tracking-[0.5em] uppercase text-[#d29a2f] mb-6"
            >
              Exquisite Pakistani Cuisine
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-heading text-7xl md:text-9xl leading-none"
            >
              The <span className="italic text-[#f6d79f]">Menu</span>
            </motion.h1>
          </div>
        </section>

        {/* 2. SEARCH & FILTER SECTION - Animated Entrance */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 mb-12 rounded-[3rem] border border-[#ded2c1] bg-brand-bg/80 p-10 shadow-xl overflow-hidden"
        >
          {/* Subtle Watermark */}
          <span className="absolute -right-10 -bottom-10 text-6xl sm:text-9xl font-heading text-black/[0.02] select-none pointer-events-none">
            FLAVORS
          </span>

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-heading text-5xl text-[#1f1b16]"
              >
                Discover the <br /> <span className="text-[#c08a29]">Golden Era</span> of Taste
              </motion.h2>
              <p className="mt-6 text-base leading-8 text-[#5a4d40] font-light">
                From our seasoned clay ovens to your table—every dish is a curated 
                masterpiece of heritage and passion.
              </p>
            </div>
            
            <div className="flex w-full max-w-sm flex-col gap-4">
              <div className="group relative w-full">
                <input
                  type="text"
                  placeholder="Search your favorite dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-[#d9cdbb] bg-[#f8f6f2] py-4 pl-14 pr-8 text-sm transition-all duration-300 focus:border-[#b98529] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#b98529]/5 shadow-inner"
                />
                <svg 
                  className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a6a3f] transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-[#b98529]" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <a 
                href="/Menu.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="group/btn flex items-center justify-center gap-3 rounded-full bg-[#1f1b16] py-4 text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-[#c08a29] hover:shadow-[0_10px_20px_rgba(192,138,41,0.2)] active:scale-95"
              >
                <svg className="h-4 w-4 text-[#c08a29] transition-colors group-hover/btn:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>See Brochure (PDF)</span>
              </a>
            </div>
          </div>

          <div className="mt-12">
            <CategoryTabs 
              categories={categories}
              activeCategory={category || ""}
              onCategoryChange={(catName) => {
                const url = catName ? `/menu?category=${encodeURIComponent(catName)}` : "/menu";
                router.push(url, { scroll: false });
              }}
              showAllOption={true}
            />
          </div>
        </motion.section>

        {/* 3. DISHES GRID - Reveal on Scroll */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={category || "all"}
              className={`grid gap-3 sm:gap-8 ${
                category === "Special Deals" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {category === "Special Deals" ? (
                deals.map((deal, index) => (
                  <motion.article
                    key={deal._id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    onClick={() => {
                      setSelectedDish(deal);
                      setIsModalOpen(true);
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border-2 border-[#c08a29]/30 bg-[#13110e] text-white cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:border-[#c08a29] hover:shadow-[0_20px_50px_rgba(192,138,41,0.15)]"
                  >
                    <div className="relative h-40 sm:h-56 overflow-hidden">
                      <Image
                        src={deal.imageUrl ?? "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80"}
                        alt={deal.name}
                        fill
                        className="object-cover transition duration-1000 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-transparent to-transparent" />
                      {deal.isLimitedTime && (
                        <div className="absolute left-6 top-6 rounded-full bg-[#d29a2f] px-4 py-1.5 text-[9px] font-black tracking-[0.3em] text-white uppercase shadow-lg">
                          Exclusive Offer
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-8 sm:pt-6">
                      <h3 className="font-heading text-xl sm:text-3xl text-[#f7d391] mb-2 sm:mb-4">
                        {deal.name}
                      </h3>
                      <p className="flex-1 text-sm leading-8 text-gray-400 font-light">
                        {deal.description}
                      </p>

                      <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-8">
                        <div className="flex flex-col">
                          {deal.originalPrice && (
                            <span className="text-xs text-gray-500 line-through tracking-wider">
                              AED {deal.originalPrice}
                            </span>
                          )}
                          <span className="font-heading text-xl sm:text-4xl text-[#d29a2f]">
                            <span className="text-xs font-sans font-bold text-[#8a6a3f] mr-1">AED</span>{deal.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to order the deal: ${deal.name} (Price: AED ${deal.price})`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center rounded-full bg-brand-bg px-4 py-2 sm:px-8 sm:py-4 text-[8px] sm:text-[10px] font-black tracking-[0.2em] text-[#1f1b16] uppercase transition-all duration-300 hover:bg-[#d29a2f] hover:text-white shadow-xl hover:shadow-[#d29a2f]/20"
                          >
                            Order
                          </a>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addItem({
                                id: deal._id,
                                name: deal.name,
                                price: deal.price,
                                imageUrl: deal.imageUrl
                              });
                            }}
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-[#d29a2f] hover:border-[#d29a2f]"
                            title="Add to Tray"
                          >
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : filteredDishes.length > 0 ? (
                filteredDishes.map((dish, index) => (
                  <motion.article
                    key={dish._id}
                    custom={index % 4} // Stagger in rows of 4
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    onClick={() => {
                      setSelectedDish(dish);
                      setIsModalOpen(true);
                    }}
                    className="group flex flex-col overflow-hidden cursor-pointer rounded-[3rem] border-2 border-[#c08a29]/30 bg-brand-bg transition-all duration-500 hover:-translate-y-3 hover:border-[#c08a29] hover:shadow-[0_30px_60px_-15px_rgba(192,138,41,0.1)]"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={dish.imageUrl ?? getCategoryPlaceholder(dish.category)}
                        alt={dish.name}
                        fill
                        className="object-cover transition duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-8">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#8a6a3f] uppercase">
                          {dish.category}
                        </span>
                      </div>
                      <h3 className="mt-2 sm:mt-4 font-heading text-lg sm:text-3xl text-[#1f1b16] group-hover:text-[#c08a29] transition-colors duration-300">
                        {dish.name}
                      </h3>
                      <p className="mt-2 sm:mt-4 flex-1 text-[11px] sm:text-sm leading-6 sm:leading-8 text-[#5c5043] font-light line-clamp-1 sm:line-clamp-2">
                        {dish.description}
                      </p>

                      <div className="mt-6 sm:mt-10 flex items-center justify-between border-t border-[#f0e8dc] pt-4 sm:pt-8">
                        <div className="flex flex-col">
                          {dish.variants && dish.variants.length > 0 && (
                            <span className="mb-0.5 sm:mb-2 text-[8px] font-black tracking-[0.3em] text-[#b98529] uppercase">From</span>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-[#8a6a3f]">AED</span>
                            <span className="font-heading text-2xl sm:text-4xl text-[#1f1b16]">
                              {dish.variants && dish.variants.length > 0 ? Math.min(...dish.variants.map(v => v.price)) : dish.price}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (dish.variants && dish.variants.length > 0) {
                                setSelectedDish(dish);
                                setIsModalOpen(true);
                                return;
                              }
                              addItem({
                                id: dish._id,
                                name: dish.name,
                                price: dish.price,
                                imageUrl: dish.imageUrl
                              });
                            }}
                            className="rounded-full bg-[#1f1b16]/10 p-3 sm:p-4 text-[#1f1b16] transition-all duration-300 hover:bg-[#d29a2f] hover:text-white"
                            title={dish.variants && dish.variants.length > 0 ? "Select Size" : "Add to Tray"}
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full bg-brand-bg border border-[#ded2c1] p-10 shadow-xl"
                  >
                    <svg className="h-20 w-20 text-[#cab89e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </motion.div>
                  <h3 className="mt-8 font-heading text-4xl text-[#1f1b16]">No results found</h3>
                  <p className="mt-4 text-[#5a4d40] text-lg font-light">Try searching for something else or exploring a different category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <RestaurantFooter settings={settings} whatsappNumber={whatsappNumber} />

      <DishModal
        dish={selectedDish}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </div>
  );
}
