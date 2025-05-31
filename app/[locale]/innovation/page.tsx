import { Metadata } from "next";
import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = Promise<{
  locale: string;
}>;

const englishMetadata = {
  title: "Innovation, CEDIMED Brussels",
  description:
    "Innovation at CEDIMED Brussels: We develop innovative techniques and processes to make healthcare safer, better, and more affordable. Collaborating with researchers and industry, we aim for sustainable solutions to create future-ready healthcare.",
};
const frenchMetadata = {
  title: "Innovation, CEDIMED Brussels",
  description:
    "Innovation chez CEDIMED Brussels : Nous développons des techniques et des processus innovants pour rendre les soins de santé plus sûrs, meilleurs et abordables. En collaboration avec des chercheurs et l'industrie, nous visons des solutions durables pour un système de santé prêt pour l'avenir.",
};
const dutchMetadata = {
  title: "Innovatie, CEDIMED Brussels",
  description:
    "Innovatie bij CEDIMED Brussels: Wij ontwikkelen innovatieve technieken en processen om de zorg veiliger, beter en betaalbaar te maken. Samen met onderzoekers en industrie streven we naar duurzame oplossingen voor een toekomstgerichte gezondheidszorg.",
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

export default async function Innovation({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <PijlerText locale={locale} slug={"innovation"} />
    </div>
  );
}
