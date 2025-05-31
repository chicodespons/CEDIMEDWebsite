import { Metadata } from "next";
import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = Promise<{
  locale: string;
}>;

const englishMetadata = {
  title: "ReGEDiM - Research Center for Emergency and Disaster Medicine",
  description:
    "ReGEDiM - Research Center for Emergency and Disaster Medicine: Established in 2011, ReGEDiM focuses on research and innovation in emergency and disaster medicine. Initiatives like CrisisData© and SIMEDIS© enhance global healthcare in emergencies.",
};
const frenchMetadata = {
  title:
    "ReGEDiM - Centre de recherche en médecine d'urgence et de catastrophe.",
  description:
    "ReGEDiM - Centre de recherche en médecine d'urgence et de catastrophe : Fondé en 2011, ReGEDiM se consacre à la recherche et à l'innovation en médecine d'urgence et de catastrophe. Avec des projets comme CrisisData© et SIMEDIS©, nous améliorons les soins en situation d'urgence à l'échelle mondiale.",
};
const dutchMetadata = {
  title: "ReGEDiM - Onderzoekscentrum voor Urgentie- en Rampengeneeskunde",
  description:
    "ReGEDiM - Onderzoekscentrum voor Urgentie- en Rampengeneeskunde: Sinds 2011 richt ReGEDiM zich op onderzoek en innovatie in urgentie- en rampengeneeskunde. Met projecten zoals CrisisData© en SIMEDIS© verbeteren we de zorg bij noodsituaties wereldwijd.",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
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

export default async function Research({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <PijlerText locale={locale} slug={"research"} />
    </div>
  );
}
