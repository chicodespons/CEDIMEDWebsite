"use client";
import React from "react";
import Slider from "react-slick";
import NewsCard from "./NewsCard";

interface StrapiImage {
  alternativeText: string;
  formats: {
    medium: {
      url: string;
      width: number;
      height: number;
    };
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  author: string | null;
  publicationDate: string;
  img: StrapiImage | null;
}

interface NewsCardSliderProps {
  newsItems: NewsItem[];
  locale: string;
}

const NewsCardSliderComponent: React.FC<NewsCardSliderProps> = ({
  newsItems,
  locale,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Below 1024px, show 2 cards
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Below 640px, show 1 card
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!newsItems || newsItems.length === 0) {
    return <p className="text-center">No news available at the moment.</p>;
  }

  // Fill up to 3 items with dummy data if needed
  const displayItems = [...newsItems];
  if (newsItems.length < 3) {
    const placeholdersNeeded = 3 - newsItems.length;
    for (let i = 0; i < placeholdersNeeded; i++) {
      displayItems.push({
        id: -i - 1,
        title:
          locale === "nl"
            ? "Meer nieuws komt eraan"
            : locale === "fr"
            ? "Plus de nouvelles à venir"
            : "More news coming",
        excerpt:
          locale === "nl"
            ? "We werken aan nieuwe artikelen voor u."
            : locale === "fr"
            ? "Nous travaillons sur de nouveaux articles pour vous."
            : "We are working on new articles for you.",
        slug: "",
        author: null,
        publicationDate: new Date().toISOString(),
        img: null,
      });
    }
  }

  return (
    <div className="py-8">
      <Slider {...settings}>
        {displayItems.map((newsItem) => (
          <div key={newsItem.id} className="px-4">
            <NewsCard newsItem={newsItem} locale={locale} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCardSliderComponent;
