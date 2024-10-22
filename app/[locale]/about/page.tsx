import AboutText from "@/app/components/AboutText";
import TeamSection from "@/app/components/TeamSection";

export default async function About({ params: { locale}}: { params: { locale: string} }) {

    return (
      <div>
        <AboutText locale={locale}/>
        <TeamSection locale={locale} />
      </div>
    );
  }