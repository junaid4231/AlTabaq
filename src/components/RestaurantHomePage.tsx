"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category, Dish, Settings, Deal } from "@/lib/sanityClient";
import RestaurantFooter from "@/components/RestaurantFooter";
import RestaurantHeader from "@/components/RestaurantHeader";
import Hero from "@/components/Hero";
import DishModal from "@/components/DishModal";
import CategoryTabs from "@/components/CategoryTabs";
import Contact from "@/components/Contact";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";


type RestaurantHomePageProps = {
  settings: Settings;
  dishes: Dish[];
  popularDishes: Dish[];
  categories: Category[];
  deals: Deal[];
  whatsappNumber: string;
  selectedCategory?: string;
};

import FounderSection from "./FounderSection";

export default function RestaurantHomePage({
  settings,
  dishes,
  popularDishes,
  categories,
  deals,
  whatsappNumber,
  selectedCategory,
}: RestaurantHomePageProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedDish, setSelectedDish] = useState<Dish | Deal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(selectedCategory || "");

  // Synchronize state with URL prop changes (back/forward buttons)
  useEffect(() => {
    // Synchronization in a microtask to avoid synchronous cascading render warning
    Promise.resolve().then(() => {
      setActiveTab(selectedCategory || "");
    });
  }, [selectedCategory]);

  const featured = popularDishes.length
    ? popularDishes.slice(0, 4)
    : dishes.slice(0, 4);

  // Always get exactly 5 showcase categories
  const featuredCategories = categories.filter(c => c.isFeatured && c.name !== "Special Deals").slice(0, 5);
  const otherCategories = categories.filter(c => !c.isFeatured && c.name !== "Special Deals");
  const finalShowcaseCategories = [...featuredCategories, ...otherCategories].slice(0, 5);

  const categoryShowcase = finalShowcaseCategories.map((cat) => {
    const match = dishes.find((dish) => dish.category === cat.name);
    return {
      category: cat,
      dish: match ?? featured[0],
    };
  });

  const matchesCategory = (dishCategory: string, categoryName: string) => {
    if (!dishCategory || !categoryName) return false;
    return dishCategory.trim().toLowerCase() === categoryName.trim().toLowerCase();
  };

  const homeMenuDishes = activeTab && activeTab !== "Special Deals"
    ? dishes.filter((dish) => matchesCategory(dish.category, activeTab))
    : featured;

  // Final fallback: if a category filter results in 0 dishes, show featured instead of an empty screen
  const visibleHomeMenuDishes = (homeMenuDishes.length > 0) ? homeMenuDishes.slice(0, 4) : featured;
  const buildHomeCategoryLink = (categoryName: string) =>
    `/menu?category=${encodeURIComponent(categoryName)}`;

  return (
    <div className="bg-[#f8f6f2] text-[#1f1b16]">
      <RestaurantHeader
        settings={settings}
        whatsappNumber={whatsappNumber}
      />

      <main>
        <Hero whatsappNumber={whatsappNumber} settings={settings} />

        <section className="relative bg-[#f6f2e9] pb-24 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
          >
            {/* Background Branding Text - Refined Size and Tracking */}
            <div className="relative flex flex-col items-center justify-center min-h-[140px]">
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-2xl tracking-[0.15em] text-[#c9bcab]/20 sm:text-7xl lg:text-8xl lg:text-[#c9bcab]/30">
                {settings.restaurantName.toUpperCase()}
              </p>
              
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-xl sm:text-2xl text-[#1f1b16] font-serif tracking-tight">
                  Where every bite carries the taste of
                </p>
                <p className="mt-6 font-heading text-5xl sm:text-6xl lg:text-7xl text-[#c08a29]">
                  دیسی ذائقے
                </p>
              </div>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
            >
              {categoryShowcase.map(({ category, dish }) => (
                <motion.div 
                  key={`${category.name}-${dish?._id ?? "fallback"}`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
                  }}
                >
                  <Link
                    href={buildHomeCategoryLink(category.name)}
                    className={`group relative flex flex-col justify-end overflow-hidden rounded-t-[5rem] sm:rounded-t-full h-52 sm:h-72 w-full transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(192,138,41,0.5)] border-2 border-[#c08a29]/40 shadow-[0_10px_30px_rgba(192,138,41,0.1)] ${
                      activeTab?.toLowerCase() === category.name.toLowerCase()
                        ? "ring-4 ring-[#c08a29] ring-offset-4 ring-offset-[#f6f2e9]"
                        : ""
                    }`}
                  >
                    <Image
                      src={
                        category.imageUrl ||
                        dish?.imageUrl ||
                        "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={category.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
                    
                    <motion.div 
                      className="relative z-10 px-2 pb-6 text-center transition-transform duration-500 group-hover:-translate-y-2"
                    >
                      <div className="mx-auto mb-2 inline-flex rounded-full bg-white/10 backdrop-blur-md px-3 py-1 border border-white/20">
                        <p className="text-[10px] sm:text-[11px] font-heading font-bold tracking-[0.2em] text-white uppercase drop-shadow-md">
                          {category.name}
                        </p>
                      </div>
                      <div className="mx-auto h-0.5 w-0 bg-[#d29a2f] transition-all duration-500 group-hover:w-12" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <Link
              href="/menu"
              className="mt-10 inline-flex rounded-full border-2 border-[#c08a29]/60 px-10 py-4 text-xs font-bold tracking-[0.2em] text-[#2d261e] transition-all duration-300 hover:bg-[#c08a29] hover:text-white hover:border-[#c08a29] hover:shadow-[0_15px_30px_-5px_rgba(192,138,41,0.3)] uppercase"
            >
              FULL MENU
            </Link>
          </motion.div>
        </section>
        <div className="section-divider" />

        {/* Premium Value Deals Section */}
        {deals && deals.length > 0 && (
          <section className="relative overflow-hidden bg-[#1f1b16] py-20 text-white">
            {/* Artistic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#d29a2f]/10 blur-[120px]" />
              <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#d29a2f]/10 blur-[120px]" />
            </div>
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-xs font-bold tracking-[0.4em] uppercase text-[#d29a2f]"
                  >
                    Limited Availability
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-4 font-heading text-5xl md:text-6xl text-white"
                  >
                    Value <span className="text-[#d29a2f]">Deals</span>
                  </motion.h2>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="hidden lg:block h-[1px] flex-1 mx-12 bg-gradient-to-r from-[#d29a2f]/40 to-transparent" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {deals.map((deal, idx) => (
                  <motion.div
                    key={deal._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    onClick={() => {
                      setSelectedDish(deal);
                      setIsModalOpen(true);
                    }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-[#1a1614] border-2 border-[#c08a29]/30 cursor-pointer transition-all duration-500 hover:border-[#c08a29]"
                  >
                    {/* Compact Image Header */}
                    <div className="relative h-32 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={deal.imageUrl ?? "https://images.unsplash.com/photo-1666288264742-51fd8f465d4f?auto=format&fit=crop&w=800&q=80"}
                        alt={deal.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a241c] via-transparent to-transparent" />
                      
                      {deal.isLimitedTime && (
                        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-4 py-1.5 border border-white/10">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d29a2f] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d29a2f]"></span>
                          </span>
                          <span className="text-[10px] font-bold tracking-widest text-white uppercase">Exclusive</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative flex flex-1 flex-col p-4 sm:p-8">
                      <h3 className="font-heading text-lg sm:text-3xl text-white group-hover:text-[#d29a2f] transition-colors">{deal.name}</h3>
                      
                      <p className="mt-4 flex-1 text-sm leading-7 text-gray-400 line-clamp-2">
                        {deal.description}
                      </p>
                      
                      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                        <div className="text-left">
                          {deal.originalPrice && (
                            <span className="block text-xs text-gray-500 line-through">AED {deal.originalPrice}</span>
                          )}
                          <span className="font-heading text-xl sm:text-3xl text-[#d29a2f]">
                            <span className="text-[10px] sm:text-sm font-sans text-white/40 mr-1">AED</span>{deal.price}
                          </span>
                        </div>
                        
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in the ${deal.name} deal!`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="relative flex items-center justify-center rounded-full bg-[#d29a2f] px-4 py-2 sm:px-6 sm:py-3 text-[9px] sm:text-[10px] font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(210,154,47,0.3)]"
                        >
                          Claim
                          <svg className="hidden sm:block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="section-divider" />

        <section id="menu" className="bg-[linear-gradient(180deg,#f8f4ec_0%,#f2ebdf_100%)] py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] text-[#8a6a3f] uppercase">
                  Signature Menu
                </p>
                <h2 className="mt-3 font-heading text-4xl leading-tight text-[#1f1b16] sm:text-5xl">
                  From Our Kitchen To Your Table
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#574a3d]">
                  {settings.menuDescription || "Curated desi specialties with premium ingredients, handcrafted spice balance, and presentation that reflects the AlTabaq dining identity."}
                </p>
              </div>
              <Link
                href="/menu"
                className="rounded-full border border-[#1f1b16]/25 bg-brand-bg/70 px-6 py-2.5 text-sm font-semibold text-[#2c241d] transition hover:border-[#1f1b16]/50 hover:bg-white"
              >
                View Complete Menu
              </Link>
            </div>

            <div className="mt-10">
              <CategoryTabs 
                categories={categories}
                activeCategory={activeTab}
                onCategoryChange={(catName) => {
                  setActiveTab(catName);
                  const url = catName ? `/?category=${encodeURIComponent(catName)}#menu` : "/#menu";
                  router.push(url, { scroll: false });
                }}
                showAllOption={true}
              />
            </div>

            <motion.div 
              key={activeTab || "all"}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className={`grid gap-3 sm:gap-6 ${
                activeTab === "Special Deals" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {activeTab === "Special Deals" ? (
                deals.map((deal) => (
                  <motion.article
                    key={deal._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    onClick={() => {
                      setSelectedDish(deal);
                      setIsModalOpen(true);
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border-2 border-[#d29a2f]/30 bg-[#13110e] text-white cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:border-[#d29a2f] hover:shadow-[0_20px_50px_rgba(210,154,47,0.15)]"
                  >
                    <div className="relative h-40 sm:h-64 overflow-hidden">
                      <Image
                        src={deal.imageUrl ?? "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80"}
                        alt={deal.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-8">
                      <h3 className="font-heading text-lg sm:text-2xl text-[#f7d391]">
                        {deal.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-gray-300 line-clamp-2">
                        {deal.description}
                      </p>

                      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                        <span className="font-heading text-xl sm:text-3xl text-[#d29a2f]">
                          <span className="text-xs sm:text-sm font-sans text-[#8a6a3f]">AED</span> {deal.price}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to order the deal: ${deal.name} (Price: AED ${deal.price})`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center rounded-full bg-brand-bg px-6 py-3 text-[11px] font-bold tracking-widest text-[#1f1b16] uppercase transition duration-300 hover:bg-[#d29a2f] hover:text-white"
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
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-[#d29a2f] hover:border-[#d29a2f]"
                            title="Add to Tray"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                visibleHomeMenuDishes.map((dish) => (
                  <motion.article
                    key={dish._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    onClick={() => {
                      setSelectedDish(dish);
                      setIsModalOpen(true);
                    }}
                    className="group flex flex-col overflow-hidden cursor-pointer rounded-[3rem] border-2 border-[#c08a29]/30 bg-brand-bg transition-all duration-500 hover:-translate-y-3 hover:border-[#c08a29] hover:shadow-[0_30px_60px_-15px_rgba(192,138,41,0.1)]"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={dish.imageUrl ?? "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80"}
                        alt={dish.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#8a6a3f] uppercase">
                          {dish.category}
                        </span>
                      </div>
                      <h3 className="mt-2 sm:mt-3 font-heading text-lg sm:text-2xl text-[#1f1b16] group-hover:text-[#c08a29] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="mt-2 sm:mt-3 flex-1 text-[11px] sm:text-sm sm:leading-7 text-[#5c5043] line-clamp-1 sm:line-clamp-2">
                        {dish.description}
                      </p>

                      <div className="mt-4 sm:mt-8 flex items-center justify-between border-t border-[#f0e8dc] pt-4 sm:pt-6">
                        <div className="flex flex-col">
                          {dish.variants && dish.variants.length > 0 && (
                            <span className="mb-0.5 sm:mb-1 text-[8px] sm:text-[9px] font-black tracking-[0.2em] text-[#b98529] uppercase">From</span>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-[#8a6a3f]">AED</span>
                            <span className="font-heading text-xl sm:text-3xl font-bold text-[#1f1b16]">
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
                            className="rounded-full bg-[#1f1b16]/10 p-3 text-[#1f1b16] transition-colors hover:bg-[#d29a2f] hover:text-white"
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
              )}
            </motion.div>
          </div>
        </section>
        <div className="section-divider" />

        {/* Catering Teaser Section */}
        <section id="catering" className="py-24 bg-[#f6f2e9]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#1f1b16] shadow-2xl">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
                    alt="Al Tabaq Catering"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-16 text-white">
                  <p className="text-xs font-black tracking-[0.4em] uppercase text-[#d29a2f]">Bulk Food Services</p>
                  <h2 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl">Hosting a Party?</h2>
                  <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                    We provide large portions of our authentic Pakistani dishes for home parties, 
                    office lunches, and family gatherings. We focus on the food, so you can focus on the guests.
                  </p>
                  <div className="mt-10">
                    <Link
                      href="/catering"
                      className="inline-flex items-center justify-center rounded-full bg-[#d29a2f] px-10 py-5 text-xs font-bold tracking-widest uppercase transition hover:brightness-110"
                    >
                      View Catering Options
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <FounderSection />
        <div className="section-divider" />
        <Contact settings={settings} whatsappNumber={whatsappNumber} />

      </main>

      <RestaurantFooter
        settings={settings}
        whatsappNumber={whatsappNumber}
      />

      <DishModal
        dish={selectedDish}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </div>
  );
}
