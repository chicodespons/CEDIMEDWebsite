import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, imageAlt, link }) => {
  return (
    <Link href={link}>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-uzGray h-full">
        {/* Text Section */}
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-black">{description}</p>
      </div>
      {/* Image Section */}
      <div className="relative m-6 h-48">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className='object-cover object-center rounded-lg'
          quality={100}
        />
      </div>
    </div>
    </Link>
    
  )
}

export default Card
