import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    link: string;
    hoverColor: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, imageAlt, link, hoverColor }) => {
  return (
    <Link href={link}>
      {/* Add "group" class to enable hover effects on children */}
      <div className={`group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform ${hoverColor} active:bg-grayBack h-full`}>
        {/* Text Section */}
        <div className="p-6 flex-grow">
          {/* Apply hover styles for text */}
          <h3 className="text-2xl uppercase tracking-wider font-bold mb-2 transition-colors duration-300 group-hover:text-white">{title}</h3>
          <p className="text-black font-semibold transition-colors duration-300 group-hover:text-white">{description}</p>
        </div>
        {/* Image Section */}
        <div className="relative m-6 h-48">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="object-cover object-center rounded-lg"
            quality={100}
            layout="responsive"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
