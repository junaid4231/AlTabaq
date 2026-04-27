import RestaurantHomePage from "@/components/RestaurantHomePage";
import { getHomepageData, normalizePhoneForWa } from "@/lib/sanityClient";

type HomePageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { settings, allDishes, popularDishes, categories, deals } = await getHomepageData();
  const { category } = await searchParams;
  const whatsappNumber = normalizePhoneForWa(settings.whatsapp);
  return (
    <RestaurantHomePage
      settings={settings}
      dishes={allDishes}
      popularDishes={popularDishes}
      categories={categories}
      deals={deals}
      whatsappNumber={whatsappNumber}
      selectedCategory={category}
    />
  );
}
