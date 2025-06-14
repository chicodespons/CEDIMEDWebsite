"use client";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";

interface NieuwsItem {
  id: number;
  excerpt: string;
  slug: string;
  author: string;
  publicationDate: Date;
}

interface SliderClientProps {
  nieuwsItems: NieuwsItem[] | null;
  locale: string;
}

const NewsSliderComponent: React.FC<SliderClientProps> = ({
  nieuwsItems,
  locale,
}) => {
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

  // Fill up to 3 items with dummy data if needed
  const displayItems = [...nieuwsItems];
  if (nieuwsItems.length < 3) {
    const placeholdersNeeded = 3 - nieuwsItems.length;
    for (let i = 0; i < placeholdersNeeded; i++) {
      displayItems.push({
        id: -i - 1,
        excerpt:
          locale === "nl"
            ? "Meer nieuws komt eraan. We werken aan nieuwe artikelen voor u."
            : locale === "fr"
            ? "Plus de nouvelles à venir. Nous travaillons sur de nouveaux articles pour vous."
            : "More news coming. We are working on new articles for you.",
        slug: "",
        author:
          locale === "nl"
            ? "Redactie"
            : locale === "fr"
            ? "Rédaction"
            : "Editorial",
        publicationDate: new Date(),
      });
    }
  }

  return (
    <Slider {...settings}>
      {displayItems.map((item) => (
        <Link key={item.id} href={`/${locale}/news/${item.slug}`}>
          <div className="px-4">
            <div className="group bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between flex-grow mb-4 transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-grayBack">
              <p className="font-semibold text-black text-xl mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-white">
                {item.excerpt}
              </p>
              <p className="text-sm font-light text-black transition-colors duration-300 group-hover:text-white">
                - {item.author}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </Slider>
  );
};

export default NewsSliderComponent;
