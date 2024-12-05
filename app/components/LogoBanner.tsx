import React from 'react'
import Image from 'next/image'
import Logo from '../../app/assets/logo.svg';
import Link from 'next/link';

const LogoBanner = () => {
    return (
      <div className="bg-white py-4 ">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo 1 */}
          <div className="w-1/3 flex justify-center px-2">
          <Link href="https://www.vub.be" aria-label='Go to VUB'>
          <Image
              src="/images/UZ-Brussel-logo.png"
              alt="Vrije Universiteit Brussel"
              width={200}
              height={100}
              className='object-contain'
            />
          </Link>
            
          </div>
          {/* Logo 2 */}
          <div className="w-1/3 flex justify-center px-2">
          <Link href="/" aria-label="Go to homepage" className="h-auto w-auto">
            <figure className="h-auto w-full max-w-xs sm:h-auto sm:w-48 flex justify-center cursor-pointer">
              <Logo
                className="h-auto w-full max-h-16 sm:h-full sm:w-full object-contain"
                aria-label="CEDIMED Logo"
              />
              <figcaption className="sr-only">CEDIMED Logo</figcaption>
            </figure>
          </Link>
        </div>

          {/* Logo 3 */}
          <div className="w-1/3 flex justify-center px-2">
          <Link href="https://www.uzbrussel.be" aria-label="Go to UZ Brussel">
          <Image
              src="/images/Vrije_Universiteit_Brussel_logo.png"
              alt="Universitair Ziekenhuis Brussel"
              width={200}
              height={100}
              className='object-contain'
            />
          </Link>
            
          </div>
        </div>
      </div>
    );
  };
export default LogoBanner
