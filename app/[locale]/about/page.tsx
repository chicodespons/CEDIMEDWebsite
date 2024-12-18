import { Metadata } from "next";
import AboutText from "../../components/AboutText";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Params = {
  locale: string | string[];
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
  const t = await getTranslations(locale);

  return {
    title: t("overOns"), 
    description: t("overOnsDescription"),
  };
}


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
