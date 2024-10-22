import ContactForm from "@/app/components/ContactForm";
import GoogleMapsComponent from "@/app/components/GoogleMapsComponent";

export default async function Contact({ params: { locale}}: { params: { locale: string} }) {
  
  
    return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} />
        <ContactForm />
      </div>
    );
  }