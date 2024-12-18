import { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";


type Params = {
  locale: string | string[];
};

const englishMetadata = {
  title: "Contact, CEDIMED Brussels",
  description: "Get in touch with CEDIMED Brussels. Use our contact form to send us an email or find us easily using the interactive map on this page. We’re here to assist you.",
};
const frenchMetadata = {
  title: "Contact, CEDIMED Brussels",
  description: "Contactez CEDIMED Bruxelles. Utilisez notre formulaire de contact pour nous envoyer un e-mail ou trouvez-nous facilement grâce à la carte interactive de cette page. Nous sommes à votre disposition.",
};
const dutchMetadata = {
  title: "Contact, CEDIMED Brussels",
  description: "Neem contact op met CEDIMED Brussel. Gebruik ons contactformulier om ons een e-mail te sturen of vind ons eenvoudig via de interactieve kaart op deze pagina. Wij staan voor u klaar.",
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


export default function Contact() {

  return (
      <div>
        <GoogleMapsComponent apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} />
        <ContactForm />
      </div>
  );
}