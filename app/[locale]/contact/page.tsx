import { getTranslations } from "next-intl/server";
import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";

export default async function Contact() {
  const t = await getTranslations();
  
    return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} t={t} />
        <ContactForm />
      </div>
    );
  }