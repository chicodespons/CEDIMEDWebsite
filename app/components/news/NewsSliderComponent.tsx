'use client'
import React from 'react'
import Slider from 'react-slick';
import Link from 'next/link';

interface NieuwsItem {
    id: number;
    excerpt: string;
    author: string;
    publicationDate: Date;
  }
  
  interface SliderClientProps {
    nieuwsItems: NieuwsItem[] | null;
  }

const NewsSliderComponent: React.FC<SliderClientProps> = ({ nieuwsItems }) => {

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

      if (!nieuwsItems || nieuwsItems.length === 0) {
        return <p className="text-center">No news available at the moment.</p>;
      }
    

  return (
    <Slider {...settings}>
        {nieuwsItems.map((item) => (
        <Link key={item.id} href="/">
          <div className="px-4">
          <div 
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between flex-grow mb-4 transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-uzGray"
          >
            <p className="font-light text-black mb-4 line-clamp-2">{item.excerpt}</p>
            <p className="text-sm font-semibold text-black">- {item.author}</p>
          </div>
        </div>
        </Link>
        ))}
      </Slider>
  )
}

export default NewsSliderComponent
