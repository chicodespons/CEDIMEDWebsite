import React from 'react'
import Card from './Card';
import { Pijler } from '../types/Pijler';

type CardSectionProps = {
  t: (key: string) => string,
  locale: string
}

async function fetchPijlers(locale: string) {

  const res = await fetch(`http://localhost:1337/api/pijlers?locale=${locale}`);
  const data = await res.json();
  return data.data; 
}

const CardSection = async ({ t, locale}: CardSectionProps) => {
 let pijlers: Pijler[] = await fetchPijlers(locale);
 pijlers = pijlers.sort((a,b) => a.order - b.order);
 console.log("Pijlers: ", pijlers);
    const cards = [
        {
          imageUrl: '/images/card1-image.jpeg',
          imageAlt: 'Doctor attending to a patient in a hospital',
        },
        {
          imageUrl: '/images/card2-image.jpeg',
          imageAlt: 'Medical professionals in training',
        },
        {
          imageUrl: '/images/card3-image.jpeg',
          imageAlt: 'Researchers working in a laboratory',
        },
        {
          imageUrl: '/images/card4-image.jpeg',
          imageAlt: 'Medical professionals discussing innovation',
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


