import AboutText from "../../components/AboutText";
import TeamSection from "../../components/TeamSection";
import { setRequestLocale } from "next-intl/server";

type Params = {
  locale: string | string[];
};


export default function About({
  params,
}: {
  params: Params;
}) {
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);

  return (
    <div>
      <AboutText locale={locale} />
      <TeamSection locale={locale} />
    </div>
  );
}
