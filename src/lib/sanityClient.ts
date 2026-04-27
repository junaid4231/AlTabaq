import { groq } from "next-sanity";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export type Dish = {
  _id: string;
  name: string;
  price: number;
  image?: unknown;
  imageUrl?: string;
  category: string;
  isPopular?: boolean;
  description?: string;
  variants?: {
    size: string;
    price: number;
  }[];
};

export type Category = {
  _id: string;
  name: string;
  isFeatured?: boolean;
  image?: unknown;
  imageUrl?: string;
};

export type Settings = {
  restaurantName: string;
  phone: string;
  whatsapp: string;
  address: string;
  openingHours: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  customerRating?: string;
  averageDeliveryTime?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  eventsTitle?: string;
  eventsDescription?: string;
  cateringTitle?: string;
  cateringDescription?: string;
  menuDescription?: string;
  logoUrl?: string;
  heroVideoUrl?: string;
};

export type Deal = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: unknown;
  imageUrl?: string;
  isActive: boolean;
  isLimitedTime: boolean;
};

export type HomepageData = {
  settings: Settings;
  popularDishes: Dish[];
  allDishes: Dish[];
  categories: Category[];
  deals: Deal[];
};

const popularDishesQuery = groq`
  *[_type == "dish" && isPopular == true] | order(_createdAt desc)[0...9] {
    _id,
    name,
    price,
    image,
    "category": category->name,
    isPopular,
    description,
    variants
  }
`;

const allDishesQuery = groq`
  *[_type == "dish"] | order(category->name asc, name asc) {
    _id,
    name,
    price,
    image,
    "category": category->name,
    isPopular,
    description,
    variants
  }
`;

const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    isFeatured,
    image,
    "imageUrl": image.asset->url
  }
`;

const settingsQuery = groq`
  *[_type == "settings"][0] {
    restaurantName,
    phone,
    whatsapp,
    address,
    openingHours,
    heroTitle,
    heroSubtitle,
    heroDescription,
    customerRating,
    averageDeliveryTime,
    facebookUrl,
    instagramUrl,
    eventsTitle,
    eventsDescription,
    cateringTitle,
    cateringDescription,
    menuDescription,
    logo,
    "logoUrl": logo.asset->url,
    "heroVideoUrl": heroVideo.asset->url
  }
`;

const dealsQuery = groq`
  *[_type == "deal" && isActive != false] | order(_createdAt desc) {
    _id,
    name,
    description,
    price,
    originalPrice,
    image,
    isActive,
    isLimitedTime
  }
`;

const fallbackDishes: Dish[] = [
  {
    _id: "fallback-1",
    name: "Chicken Biryani",
    price: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1701579231349-d7459c89f00d?auto=format&fit=crop&w=1200&q=80",
    category: "Rice",
    isPopular: true,
    description: "Fragrant basmati rice with signature spice blend.",
  },
  {
    _id: "fallback-2",
    name: "Mutton Karahi",
    price: 44,
    imageUrl:
      "https://images.unsplash.com/photo-1683533566848-9935f0f67f27?auto=format&fit=crop&w=1200&q=80",
    category: "Karahi",
    isPopular: true,
    description: "Slow-cooked in tomato gravy with green chili kick.",
  },
  {
    _id: "fallback-3",
    name: "Seekh Kebab Platter",
    price: 36,
    imageUrl:
      "https://images.unsplash.com/photo-1701579231349-d7459c89f00d?auto=format&fit=crop&w=1200&q=80",
    category: "BBQ",
    isPopular: true,
    description: "Juicy grilled kebabs served with mint chutney.",
  },
  {
    _id: "fallback-4",
    name: "Family Deal Box",
    price: 99,
    imageUrl:
      "https://images.unsplash.com/photo-1666288264742-51fd8f465d4f?auto=format&fit=crop&w=1200&q=80",
    category: "Deals",
    isPopular: false,
    description: "Perfect combo for 4 with rice, curry and breads.",
  },
];

const fallbackCategories: Category[] = [
  { _id: "cat-bbq", name: "BBQ" },
  { _id: "cat-karahi", name: "Karahi" },
  { _id: "cat-rice", name: "Rice" },
  { _id: "cat-deals", name: "Deals" },
];

const fallbackSettings: Settings = {
  restaurantName: "Al Tabaq Restaurant",
  phone: "0526691763",
  whatsapp: "0526691763",
  address: "AL TABAQ RESTAURANT JURF2 OPP HAMRIYA FREE ZONE GATE 2 SALAAM CAMP AJMAN",
  openingHours: "Daily: 11:00 AM - 1:00 AM",
};

const attachImageUrl = <T extends { image?: unknown; imageUrl?: string }>(items: T[]): T[] => {
  return items.map((item) => ({
    ...item,
    imageUrl: item.image
      ? urlFor(item.image).width(900).height(700).url()
      : item.imageUrl,
  }));
};

export const normalizePhoneForWa = (phone?: string): string => {
  const cleaned = (phone || "").replace(/[^\d]/g, "");
  // If it starts with 05 and is 10 digits, it's a UAE mobile number
  if (cleaned.startsWith("05") && cleaned.length === 10) {
    return "971" + cleaned.substring(1);
  }
  return cleaned;
};

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const [settings, allDishes, categories, deals] = await Promise.all([
      client.fetch<Settings | null>(settingsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Dish[]>(allDishesQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Category[]>(categoriesQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Deal[]>(dealsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    const hydratedAll = attachImageUrl(
      allDishes.length ? allDishes : fallbackDishes,
    );
    
    const hydratedPopular = hydratedAll
      .filter((dish) => dish.isPopular)
      .slice(0, 9);

    // Ensure categories are consistent and include "Special Deals"
    const baseCategories = attachImageUrl(categories.length ? categories : fallbackCategories);
    const finalCategories = [
      ...baseCategories,
      { _id: "cat-special-deals", name: "Special Deals", isFeatured: false }
    ];

    return {
      settings: settings ?? fallbackSettings,
      popularDishes: hydratedPopular,
      allDishes: hydratedAll,
      categories: finalCategories,
      deals: attachImageUrl(deals || []),
    };
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return {
      settings: fallbackSettings,
      popularDishes: fallbackDishes.filter((dish) => dish.isPopular),
      allDishes: fallbackDishes,
      categories: fallbackCategories,
      deals: [],
    };
  }
}

export async function getMenuData() {
  try {
    const [settings, dishes, categories, deals] = await Promise.all([
      client.fetch<Settings | null>(settingsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Dish[]>(allDishesQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Category[]>(categoriesQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<Deal[]>(dealsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    // Ensure categories are consistent and include "Special Deals"
    const baseCategories = attachImageUrl(categories.length ? categories : fallbackCategories);
    const finalCategories = [
      ...baseCategories,
      { _id: "cat-special-deals", name: "Special Deals", isFeatured: false }
    ];

    return {
      settings: settings ?? fallbackSettings,
      dishes: attachImageUrl(dishes.length ? dishes : fallbackDishes),
      categories: finalCategories,
      deals: attachImageUrl(deals || []),
    };
  } catch {
    return {
      settings: fallbackSettings,
      dishes: fallbackDishes,
      categories: fallbackCategories,
      deals: [],
    };
  }
}
