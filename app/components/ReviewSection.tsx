"use client";
import { useTranslations } from "next-intl";
import React from "react";
import Slider from "react-slick";
import ReviewModal from "./ReviewModal";

interface ReviewItem {
  quote: string;
  author: string;
}

const ReviewsSection = () => {
  const t = useTranslations();

  const reviewItems: ReviewItem[] = [
    {
      quote:
        "Ik lig momenteel op spoed en wordt opgenomen.Het personeel is uiterst professioneel en heel behumpzaam. Ik zou mijn dank willen betuigen.",
      author: "Maddy Gielen",
    },
    {
      quote:
        "Venu en urgence pour une douleurs ... opéré le soir même mis en service abdominale. Personnel soignant au top. Très empathigque",
      author: "Hamza Mike",
    },
    {
      quote: `Extrêmement bien reçu aux urgences. L'attente est longue mais vu la quantité des malades c'est compréhensible.Les infirmières sont des vrais professionnels en pédiatrie, les médecins très doux avec les enfants.`,
      author: "Anna Szymaniak",
    },
    {
      quote: `Bonjour, Je voudrais remercier tout vos équipes d'urgence qui ont pris mon fils en charge directement. Tout le personnel pneumonie et service soins intensif. Merci beaucoup d'avoir soigner mon fils et surtout vous m'avez tous expliqué en français, vous m'avez soutenu et rassuré. Il est bien rentré à la maison. Prenez soin de vous. Merci encore.`,
      author: "Tulay Gultaslar",
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
    <div className="bg-grayBack pb-14">
      <section className="py-14 bg-white mx-6 rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-10">
            {t("watMensenOverOnsZeggen")}
          </h2>
          <Slider {...settings}>
            {reviewItems.map((item, index) => (
              <div key={index} className="px-4">
              {/* Pass the review data to the client component */}
              <ReviewModal review={item} />
          </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
