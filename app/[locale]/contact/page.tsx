import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";


export default function Contact() {

  return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyAsiywReNSwy8qFOpnPeHAHnSN9TkHXy74"} />
        <ContactForm />
      </div>
  );
}