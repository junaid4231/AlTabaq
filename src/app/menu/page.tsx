import RestaurantMenuPage from "@/components/RestaurantMenuPage";
import { getMenuData, normalizePhoneForWa } from "@/lib/sanityClient";

type MenuPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { settings, dishes, categories, deals } = await getMenuData();
  const { category } = await searchParams;
  const whatsappNumber = normalizePhoneForWa(settings.whatsapp);
  return (
    <RestaurantMenuPage
      settings={settings}
      dishes={dishes}
      categories={categories}
      deals={deals}
      category={category}
      whatsappNumber={whatsappNumber}
    />
  );
}
