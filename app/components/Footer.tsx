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
    <footer className="bg-vubBlue text-white">
      <div className="py-10">
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
              <Link href="tel:+3224749543" className="text-white">
                +32 2 474 95 43
              </Link>
            </p>
            <p>{t("adres")}</p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold underline">
              {t("quickLinks")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href={`/${locale}/about`} className="hover:underline">
                {t("overOns")}
              </Link>
              <Link
                href={`/${locale}/clinical-care`}
                className="hover:underline"
              >
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
      </div>

      {/* Underscript Section */}
      {/* Underscript Section */}
      <div className="container mx-auto mt-16 mb-2 text-sm">
        <div className="flex flex-col md:flex-row items-center justify-center relative">
          {/* Center group */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-center">
            <Link
              href={`/${locale}/privacy-policy`}
              className="hover:underline"
            >
              {t("privacyPolicy")}
            </Link>
            <span>&copy; {new Date().getFullYear()} CEDIMED Brussels</span>
          </div>

          {/* Right group */}
          <div className="mt-2 md:mt-0 md:absolute md:right-4 md:text-right">
            <a
              href="https://www.dedycker.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-300 hover:text-white transition-colors hover:underline"
            >
              Made by De Dycker Development
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
