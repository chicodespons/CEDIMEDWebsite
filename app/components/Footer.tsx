import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = ({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) => {
  return (
    <footer className="bg-vubBlue text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Contact Section */}
        <div className="space-y-4 md:pl-0">
          <h3 className="text-lg font-semibold underline">
            {t("contacteerOns")}
          </h3>
          <p>
            {t("email")}{" "}
            <Link href="mailto:info@cedimed.brussels" className="text-white">
              info@cedimed.brussels
            </Link>
          </p>
          <p>
            {t("tel")}{" "}
            <Link href="tel:+3247355570" className="text-white">
              +32 473 55 70
            </Link>
          </p>
          <p>{t("adres")}</p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold underline">{t("quickLinks")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/${locale}/about`} className="hover:underline">
              {t("overOns")}
            </Link>
            <Link href={`/${locale}/clinical-care`} className="hover:underline">
              {t("klinischeZorg")}
            </Link>
            <Link href={`/${locale}/education`} className="hover:underline">
              {t("onderwijs")}
            </Link>
            <Link href={`/${locale}/research`} className="hover:underline">
              {t("onderzoek")}
            </Link>
            <Link href={`/${locale}/innovation`} className="hover:underline">
              {t("innovatie")}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:underline">
              {t("contact")}
            </Link>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4 md:ml-[1.5rem] xl:ml-[8.9rem]">
          <h3 className="text-lg font-semibold underline">{t("volgOns")}</h3>
          <div className="flex space-x-6">
            <Link
              href="https://www.facebook.com/cedimedbrussels"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-2xl hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.instagram.com/cedimedbrussels"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaInstagram className="text-2xl hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/cedimed-brussels"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-2xl hover:text-blue-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Underscript Section */}
      <div className="container mx-auto text-center mt-6 text-sm">
        <div className="flex justify-center space-x-4">
          <Link href={`/${locale}/privacy-policy`} className="hover:underline">
            {t("privacyPolicy")}
          </Link>
          <span>&copy; {new Date().getFullYear()} CEDIMED Brussels</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
