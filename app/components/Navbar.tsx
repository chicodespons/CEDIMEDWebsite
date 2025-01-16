'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '../../app/assets/logo.svg';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

type NavbarProps = {
  locale: string
};

const Navbar = ({ locale }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false); // State to track whether the menu is open
  const t = useTranslations();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-xl">
      <div className="container mx-auto flex justify-between items-center py-4 px-7">
        {/* Logo (left) */}
        <Link href="/" aria-label="Go to homepage" className="h-10 w-auto">
          <figure className="h-full w-auto cursor-pointer">
            <Logo className="h-full w-auto p-1" aria-label="CEDIMED Logo" />
            <figcaption className="sr-only">CEDIMED Logo</figcaption>
          </figure>
        </Link>

        {/* Navigation Links (center on larger screens) */}
        <div className="hidden xl:flex space-x-2 lg:space-x-6">
          <Link href={`/${locale}/about`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('overOns')}</Link>
          <Link href={`/${locale}/clinical-care`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('klinischeZorg')}</Link>
          <Link href={`/${locale}/education`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('onderwijs')}</Link>
          <Link href={`/${locale}/research`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('onderzoek')}</Link>
          <Link href={`/${locale}/innovation`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('innovatie')}</Link>
          <Link href={`/${locale}/contact`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('contact')}</Link>
          <Link href={`/${locale}/news`} className="text-uzGray lg:text-lg font-bold hover:text-black uppercase tracking-wider">{t('nieuws')}</Link>
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Hamburger Menu (right, visible on smaller screens) */}
        <div className="xl:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-black focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (shown when isOpen is true) */}
      {isOpen && (
        <div className="xl:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 px-7 py-4">
            <Link href={`/${locale}/about`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('overOns')}</Link>
            <Link href={`/${locale}/clinical-care`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('klinischeZorg')}</Link>
            <Link href={`/${locale}/education`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('onderwijs')}</Link>
            <Link href={`/${locale}/research`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('onderzoek')}</Link>
            <Link href={`/${locale}/innovation`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('innovatie')}</Link>
            <Link href={`/${locale}/contact`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('contact')}</Link>
            <Link href={`/${locale}/news`} className="text-uzGray font-bold hover:text-black uppercase tracking-wider" onClick={toggleMenu}>{t('nieuws')}</Link>
            <LanguageSwitcher currentLocale={locale} />
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
