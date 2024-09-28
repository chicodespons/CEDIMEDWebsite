import ContactForm from "@/app/components/ContactForm";
import GoogleMapsComponent from "@/app/components/GoogleMapsComponent";
import { getTranslations } from "next-intl/server";

export default async function Contact({ params: { locale}}: { params: { locale: string} }) {
    const t = await getTranslations(); // Fetch translations for the current locale
  
    return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} />
        <ContactForm />
      </div>
    );
  }