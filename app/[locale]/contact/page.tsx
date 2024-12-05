import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";

type ContactPageProps = {
  params : {
    locale: string
  }
};


export default async function Contact({ params: { locale }}: ContactPageProps) {
  setRequestLocale(locale);
  const t = await getTranslations()

  return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} t={t} />
        <ContactForm />
      </div>
  );
}