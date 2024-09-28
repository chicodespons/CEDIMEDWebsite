'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';

interface NieuwsItem {
    quote: string;
    author: string;
}

const NieuwsSection = () => {

  const t = useTranslations();

    const nieuwsItems: NieuwsItem[] = [
        {
          quote:
          'CEDIMED opent nieuw onderzoekscentrum voor spoedeisende geneeskunde in Brussel. Dit centrum richt zich op innovatieve zorgoplossingen.',
          author: 'Dr. Sarah Williams',
        },
        {
          quote:
          'Nieuwe samenwerking tussen CEDIMED en het Rode Kruis voor verbetering van nooddiensten in landelijke gebieden.',
          author: 'Nurse John Doe',
        },
        {
          quote:
          'CEDIMED lanceert educatieve programma’s voor eerstehulpverlening, gericht op gemeenschappen met beperkte toegang tot medische zorg.',
          author: 'Dr. Emily Brown',
        },
        {
          quote:
          'Onderzoek door CEDIMED toont aan dat vroege interventie in spoedeisende situaties levens kan redden in 80% van de gevallen.',
          author: 'Dr. Jane Doe',
        },
        {
          quote:
          'CEDIMED viert 10 jaar toewijding aan medische innovatie met een serie workshops en lezingen.',
          author: 'prof. dr. Hendrik Cuppens',
        },
      ];
    
      const settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 items at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024, // Below 1024px, show 2 items
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640, // Below 640px, show 1 item
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
  return (
    <div className='bg-grayBack pb-14'>
 <section className="py-14 bg-white mx-6 rounded-lg">
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold text-center mb-10">{t('cedimedNieuws')}</h2>
      <Slider {...settings}>
        {nieuwsItems.map((item, index) => (
        <Link key={index} href="/">
          <div className="px-4">
          <div 
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between flex-grow mb-4 transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-uzGray"
          >
            <p className="font-light text-black mb-4 line-clamp-2">"{item.quote}"</p>
            <p className="text-sm font-semibold text-black">- {item.author}</p>
          </div>
        </div>
        </Link>
        ))}
      </Slider>
    </div>
  </section>
    </div>
   
  )
}

export default NieuwsSection
