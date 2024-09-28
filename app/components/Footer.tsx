import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = ({ t }: { t: (key: string) => string }) => {
  return (
    <footer className="bg-vubBlue text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        
        {/* Contact Section */}
        <div className="space-y-4 md:pl-0">
          <h3 className="text-lg font-semibold">{t('contacteerOns')}</h3>
          <p >{t('email')} <Link href="mailto:info@cedimed.brussels" className="text-white">info@cedimed.brussels</Link></p>
          <p>{t('tel')} <Link href="tel:+3247355570" className="text-white">+32 473 55 70</Link></p>
          <p>{t('adres')}</p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('quickLinks')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/over-ons" className="hover:underline">{t('overOns')}</Link>
            <Link href="/klinische-zorg" className="hover:underline">{t('klinischeZorg')}</Link>
            <Link href="/onderwijs" className="hover:underline">{t('onderwijs')}</Link>
            <Link href="/onderzoek" className="hover:underline">{t('onderzoek')}</Link>
            <Link href="/innovatie" className="hover:underline">{t('innovatie')}</Link>
            <Link href="/contact" className="hover:underline">{t('contact')}</Link>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4 md:ml-[1.5rem] xl:ml-[8.9rem]">
          <h3 className="text-lg font-semibold">{t('volgOns')}</h3>
          <div className="flex space-x-6">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="text-2xl hover:text-blue-400" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-2xl hover:text-blue-400" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="text-2xl hover:text-blue-400" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
