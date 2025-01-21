'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LanguageSwitcherProps {
  currentLocale: string;
}

const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  // List of supported locales
  const availableLocales = ['en', 'nl', 'fr'];
  
  // Get other locales excluding the current one
  const otherLocales = availableLocales.filter((locale) => locale !== currentLocale);

  const getLocalizedPath = (locale: string) => {
    return `/${locale}${pathname.replace(`/${currentLocale}`, '')}`;
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside of the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Current language displayed */}
      <button
        onClick={toggleDropdown}
        className="text-uzGray lg:text-base font-bold hover:text-black flex items-center"
      >
        {currentLocale.toUpperCase()}
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-full max-w-[60px] bg-white border border-gray-300 rounded shadow-lg z-50 
          ${isOpen ? 'block' : 'hidden'} md:right-0 md:w-20 `}
        >
          {otherLocales.map((locale) => (
            <Link key={locale} href={getLocalizedPath(locale)} locale={false}>
              <button
                className="block w-full px-4 py-2 text-sm text-left text-uzGray hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {locale.toUpperCase()}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
