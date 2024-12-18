import ContactForm from "../../components/ContactForm";
import GoogleMapsComponent from "../../components/GoogleMapsComponent";


export default function Contact() {

  return (
      <div>
        <GoogleMapsComponent apiKey={"AIzaSyDfQcp5aVCnGNlJtr-Nxf2_yFy2elwBS-g"} />
        <ContactForm />
      </div>
  );
}