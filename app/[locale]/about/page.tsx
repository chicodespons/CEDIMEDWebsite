import { Metadata } from "next";
import AboutText from "../../components/AboutText";
import {setRequestLocale } from "next-intl/server";

type Params = {
  locale: string | string[];
};

const englishMetadata = {
  title: "About Us",
  description: "Over the organization CEDIMED Brussels",
};
const frenchMetadata = {
  title: "CEDIMED Bruxelles",
  description: "À propos de nous",
};
const dutchMetadata = {
  title: "Over Ons",
  description: "Over de organisatie CEDIMED Brussels",
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale =  Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl";
  switch (locale) {
    case "en":
      return englishMetadata;
    case "fr":
      return frenchMetadata;
    case "nl":
    default:
      return dutchMetadata;
  }
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
