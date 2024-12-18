import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";


export default function Contact() {

  return (
      <div>
        <GoogleMapsComponent apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} />
        <ContactForm />
      </div>
  );
}