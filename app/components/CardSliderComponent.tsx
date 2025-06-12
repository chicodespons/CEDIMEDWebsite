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

  return (
    <div className="py-8">
      <Slider {...settings}>
        {newsItems.map((newsItem) => (
          <div key={newsItem.id} className="px-4">
            <NewsCard newsItem={newsItem} locale={locale} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCardSliderComponent;
