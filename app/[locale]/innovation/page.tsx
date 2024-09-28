
import PijlerText from "@/app/components/PijlerText";
import { getTranslations } from "next-intl/server";

export default async function Innovation({ params: { locale}}: { params: { locale: string} }) {
    const t = await getTranslations(); // Fetch translations for the current locale
  
    return (
      <div>
        <PijlerText locale={locale} slug={"innovation"} />
      </div>
    );
  }