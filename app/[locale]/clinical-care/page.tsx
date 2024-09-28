
import PijlerText from "@/app/components/PijlerText";
import { getTranslations } from "next-intl/server";

export default async function ClinicalCare({ params: { locale}}: { params: { locale: string} }) {
    const t = await getTranslations(); // Fetch translations for the current locale
  
    return (
      <div>
        <PijlerText locale={locale} slug={"clinical-care"} />
      </div>
    );
  }