import ContactForm from "@/app/components/ContactForm";
import GoogleMapsComponent from "@/app/components/GoogleMapsComponent";

export default function Contact() {
  
  
    return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} />
        <ContactForm />
      </div>
    );
  }