import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';

const Hero = ({ t, locale }: { t: (key: string) => string, locale:string }) => {
  return (
    <div className="relative bg-grayBack h-[300px] sm:h-[500px] overflow-hidden mt-2">
      {/* Background Image with Border */}
      <div className="relative h-full w-full border-grayBack border-[16px] sm:border-[24px]">
        <Image
          src="/images/LuchtfotoUZB.webp"
          alt="Emergency and Disaster Medicine"
          fill
          className='object-cover object-center rounded-lg'
          quality={75}
          priority
        />
      </div>

      {/* Overlay for dark background and above text */}
      <div className="absolute top-[3rem] sm:top-[4.5rem] left-4 sm:left-6 right-4 sm:right-6 h-[70%] sm:h-[70%] bg-black opacity-50 z-20"></div> 

      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-4">
        {/* Title */}
        <h1 className="text-xl uppercase tracking-wider md:text-3xl lg:text-4xl font-bold text-white mt-4 px-4 sm:mt-0 sm:px-0">
          Centre on Emergency & Disaster Medicine Brussels       
        </h1>
        
        {/* Subtitle */}
        <p className="mt-4 text-xs md:text-xl text-white">
          {t("cedimedSlogan1")}
          <br/>
          {t("cedimedSlogan2")}
        </p>

        {/* Buttons */}
        <div className="mt-8 mb-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link
            href={`/${locale}/about`}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm sm:text-base text-center"
          >
            {t("overOns")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-block px-6 sm:px-8 py-2 sm:py-3 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm sm:text-base text-center"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
