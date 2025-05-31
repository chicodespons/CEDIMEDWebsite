import { Metadata } from "next";
import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = Promise<{
  locale: string;
}>;

const englishMetadata = {
  title: "Clinical Care UZ Brussel, CEDIMED Brussels",
  description:
    "Discover the comprehensive emergency and clinical care services at UZ Brussel. From personalized and efficient hospital emergency care to advanced prehospital and interhospital care, we’re here 24/7 for your medical emergencies. Explore our expertise in somatic and mental health care, crisis management, disaster medicine, and flexible, high-tech solutions designed to save lives and ensure optimal patient outcomes.",
};
const frenchMetadata = {
  title: "Soins Cliniques UZ Brussel, CEDIMED Brussels",
  description:
    "Découvrez les services complets de soins d'urgence et cliniques de l'UZ Brussel. Des soins hospitaliers personnalisés et efficaces aux services avancés de soins préhospitaliers et interhospitaliers, nous sommes là 24h/24 pour vos urgences médicales. Explorez notre expertise en santé somatique et mentale, gestion de crises, médecine de catastrophe et solutions flexibles et haute technologie conçues pour sauver des vies et garantir des soins optimaux aux patients.",
};
const dutchMetadata = {
  title: "Klinische Zorg UZ Brussel, CEDIMED Brussels",
  description:
    "Ontdek de uitgebreide spoed- en klinische zorgdiensten van UZ Brussel. Van persoonlijke en efficiënte ziekenhuiszorg tot geavanceerde prehospitaal- en interhospitaalzorg, wij staan 24/7 voor uw medische noodgevallen klaar. Ontdek onze expertise in somatische en mentale gezondheidszorg, crisismanagement, rampengeneeskunde en flexibele, hoogtechnologische oplossingen die levens redden en optimale patiëntenzorg garanderen.",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
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

export default async function ClinicalCare({ params }: { params: Params }) {
  const { locale } = await params; 
  setRequestLocale(locale);
  return (
    <div>
      <PijlerText locale={locale} slug={"clinical-care"} />
    </div>
  );
}
