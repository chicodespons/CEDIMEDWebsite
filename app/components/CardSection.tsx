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
          imageUrl: '/images/card1-image.jpeg',
          imageAlt: 'Doctor attending to a patient in a hospital',
          hoverColor: 'bg-vubBlue'
        },
        {
          imageUrl: '/images/card2-image.jpeg',
          imageAlt: 'Medical professionals in training',
          hoverColor: 'bg-uzGray'
        },
        {
          imageUrl: '/images/card3-image.jpeg',
          imageAlt: 'Researchers working in a laboratory',
          hoverColor: 'bg-uzGreen'
        },
        {
          imageUrl: '/images/card4-image.jpeg',
          imageAlt: 'Medical professionals discussing innovation',
          hoverColor: 'bg-vubOrange'
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
                />
              ))}
            </div>
          </div>
        </section>
      );
}

export default CardSection


