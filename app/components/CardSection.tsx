import React from 'react'
import Card from './Card';
import { Pijler } from '../types/Pijler';

type CardSectionProps = {
  locale: string
}

async function fetchPijlers(locale: string) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pijlers?locale=${locale}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  });
  const data = await res.json();
  return data.data; 
}

const CardSection = async ({locale}: CardSectionProps) => {
 const pijlers: Pijler[] | null = await fetchPijlers(locale);

 if (pijlers) {
  pijlers.sort((a, b) => a.order - b.order);
} else {
  return <p>pijlers found for the provided locale.</p>;
}
 console.log("Pijlers: ", pijlers);
    const cards = [
        {
          imageUrl: '/images/Clinical.webp',
          imageAlt: 'Doctor attending to a patient in a hospital',
          hoverColor: 'hover:bg-vubBlue',
          focusColor: "focus:ring-vubBlue"
        },
        {
          imageUrl: '/images/Education.webp',
          imageAlt: 'Medical professionals in training',
          hoverColor: 'hover:bg-uzGray',
          focusColor: "focus:ring-uzGray"
        },
        {
          imageUrl: '/images/IMG_RESEARCH.webp',
          imageAlt: 'Researchers working in a laboratory',
          hoverColor: 'hover:bg-uzGreen',
          focusColor: "focus:ring-uzGreen"
        },
        {
          imageUrl: '/images/Innovation.webp',
          imageAlt: 'Medical professionals discussing innovation',
          hoverColor: 'hover:bg-vubOrange',
          focusColor: "focus:ring-vubOrange"
        },
      ];
    
      return (
        <section className="pt-8 pb-14 bg-grayBack">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pijlers.map((pijler, index) => (
                <Card
                  key={index}
                  title={pijler.title}
                  description={pijler.description}
                  imageUrl={cards[index].imageUrl}
                  imageAlt={cards[index].imageAlt}
                  link={`/${locale}/${pijler.link}`}
                  hoverColor={cards[index].hoverColor}
                  focusColor={cards[index].focusColor}
                />
              ))}
            </div>
          </div>
        </section>
      );
}

export default CardSection


