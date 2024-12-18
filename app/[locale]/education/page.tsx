import { Metadata } from "next";
import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = {
  locale: string | string[];
};

const englishMetadata = {
  title: "Training and Development at CEDMIED Brussels",
  description: "Training and development at CEDIMED Brussels: We train healthcare professionals through internal courses, simulation training, and internationally certified programs like ALS and ETC. In collaboration with partners like VUB and PIVO, we ensure top-quality medical education.",
};
const frenchMetadata = {
  title: "Formation et développement au CEDIMED Brussels",
  description: "Formation et développement chez CEDIMED Brussels : Nous formons les professionnels de santé avec des formations internes, des entraînements par simulation et des programmes certifiés internationalement tels qu'ALS et ETC. En collaboration avec des partenaires comme la VUB et le PIVO, nous garantissons une éducation médicale de haute qualité.",
};
const dutchMetadata = {
  title: "Opleiding en Ontwikkeling bij CEDMED Brussels",
  description: "Opleiding en ontwikkeling bij CEDIMED Brussels: Wij leiden zorgverleners op met interne trainingen, simulatietrainingen en internationaal gecertificeerde opleidingen zoals ALS en ETC. Samen met partners zoals de VUB en PIVO bieden we topkwaliteit in medische educatie.",
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

export default async  function Education({
  params,
}: {
  params: Params;
}) {
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);
    return (
      <div>
        <PijlerText locale={locale} slug={"education"} />
      </div>
    );
  }