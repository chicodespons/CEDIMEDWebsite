'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  apiKey: string;
};

const GoogleMapsComponent: React.FC<Props> = ({ apiKey}) => {

  const t = useTranslations();
  
  const mapContainerStyle = {
    width: '100%',
    height: '350px',
  };

  const destination = {
    lat: 50.888173, // Replace with the organization's latitude
    lng: 4.309494,  // Replace with the organization's longitude
  };

  const destinationAddress = 'Laarbeeklaan 101, 1090 Jette Belgium'; // Replace with your address
  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destinationAddress
  )}`;

  return (
    <div className="flex flex-col items-center justify-between md:flex-row w-full max-w-screen-lg mx-auto p-6">
      {/* Left: Google Map */}
      <div className="w-full md:w-1/2 p-6">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={destination} zoom={15}>
            <Marker position={destination} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Right: Contact Information */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center ">
        <h2 className="text-xl font-semibold">CEDIMED Brussels</h2>
        <p><strong>{t('adres2')}</strong> {t('laarbeeklaan')}</p>
        <p><strong>{t('tel')}</strong> +32 473 55 70</p>
        <p><strong>{t('openingsUren')}</strong> 09:00 - 17:00</p>
        <p><strong>{t('email')}</strong> <a href="mailto:info@cedimed.brussels" className="text-blue-600">info@cedimed.brussels</a></p>

        <Link
          href={googleMapsRouteUrl}
          className="inline-block uppercase max-w-72 mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm sm:text-base"
        >
          {t('getDirectionsOnGoogleMaps')}
        </Link>
      </div>
    </div>
  );
};

export default GoogleMapsComponent;
