import AboutText from "@/app/components/AboutText";
import TeamSection from "@/app/components/TeamSection";
import { getTranslations } from "next-intl/server";

export default async function About({ params: { locale}}: { params: { locale: string} }) {
    const t = await getTranslations(); // Fetch translations for the current locale
  
    return (
      <div>
        <AboutText locale={locale}/>
        <TeamSection locale={locale} />
      </div>
    );
  }