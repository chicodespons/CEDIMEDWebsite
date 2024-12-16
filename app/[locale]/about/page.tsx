import AboutText from "../../components/AboutText";
import { setRequestLocale } from "next-intl/server";

type Params = {
  locale: string | string[];
};


export default async function About({
  params,
}: {
  params: Params;
}) {
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);
  // const t = await getTranslations();

  return (
    <div>
      <AboutText locale={locale} />
      {/* <TeamSection t={t} locale={locale} /> */}
    </div>
  );
}
