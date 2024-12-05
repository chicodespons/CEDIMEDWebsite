import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";

type Params = {
  locale: string | string[];
};

export default async function Contact({
  params,
}: {
  params: Params;
}) {
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);
  const t = await getTranslations();
  
    return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} t={t} />
        <ContactForm />
      </div>
    );
  }