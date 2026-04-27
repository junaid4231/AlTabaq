import CateringPage from "@/components/CateringPage";
import { getHomepageData, normalizePhoneForWa } from "@/lib/sanityClient";

export default async function Page() {
  const { settings } = await getHomepageData();
  const whatsappNumber = normalizePhoneForWa(settings.whatsapp);

  return <CateringPage settings={settings} whatsappNumber={whatsappNumber} />;
}
