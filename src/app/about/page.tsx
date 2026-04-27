import { getHomepageData } from "@/lib/sanityClient";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantFooter from "@/components/RestaurantFooter";
import { normalizePhoneForWa } from "@/lib/sanityClient";
import AboutContent from "@/components/AboutContent";

export default async function AboutPage() {
  const { settings } = await getHomepageData();
  const whatsappNumber = normalizePhoneForWa(settings.whatsapp || settings.phone);

  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      <RestaurantHeader settings={settings} whatsappNumber={whatsappNumber} />
      <main>
        <AboutContent settings={settings} />
      </main>
      <RestaurantFooter settings={settings} whatsappNumber={whatsappNumber} />
    </div>
  );
}
