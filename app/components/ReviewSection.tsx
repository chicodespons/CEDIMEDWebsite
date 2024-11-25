'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';

interface ReviewItem {
    quote: string;
    author: string;
}

const ReviewsSection = () => {

  const t = useTranslations();

    const reviewItems: ReviewItem[] = [
        {
          quote: 'CEDIMED verleende uitzonderlijke zorg tijdens een kritieke periode. Hun team is professioneel en meelevend.',
          author: 'Dr. Sarah Williams',
        },
        {
          quote: 'De trainingsprogramma\'s bij CEDIMED zijn van topkwaliteit. Ik voel me beter voorbereid dan ooit om noodgevallen aan te pakken.',
          author: 'Nurse John Doe',
        },
        {
          quote: 'Hun onderzoeksinitiatieven zijn baanbrekend. CEDIMED is echt een leider op het gebied van spoedeisende geneeskunde.',
          author: 'Dr. Emily Brown',
        },
        {
          quote: 'De zorg die ik heb ontvangen van CEDIMED heeft mijn leven veranderd. Ik ben dankbaar voor hun toewijding aan patiënten.',
          author: 'Dr. Jane Doe',
        },
        {
          quote: 'CEDIMED is echt vooruitstrevend in het leveren van hoogwaardige zorg. Hun aanpak is inspirerend.',
          author: 'Prof. Dr. Hendrik Cuppens',
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
                    <h2 className="text-3xl font-bold text-center mb-10 ">{t('watMensenOverOnsZeggen')}</h2>
                    <Slider {...settings}>
                        {reviewItems.map((item, index) => (
                        <Link key={index} href="/">
                            <div className="px-4">
                                <div 
                                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between flex-grow mb-4 transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-uzGray"
                                >
                                    <p className="font-light text-black mb-4 line-clamp-2">{item.quote}</p>
                                    <p className="text-sm font-semibold text-black">- {item.author}</p>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </Slider>
                </div>
            </section>
        </div>
    );
};

export default ReviewsSection;
