import React from "react";
import NewsCardSliderComponent from "@/app/components/CardSliderComponent";

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

interface ApiAuthor {
  name: string;
  bio: string;
  avatar?: StrapiImage;
}

interface ApiNewsItem {
  id: number;
  title: string;
  content: Array<any>;
  excerpt: string;
  slug: string;
  author?: ApiAuthor;
  publishedAt: string;
  image?: StrapiImage;
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

interface NieuwsSectionProps {
  t: (key: string) => string;
  locale: string;
}

// Fetch news items function
async function fetchNewsItems(locale: string): Promise<NewsItem[]> {
  try {
    const query = `fields=title,slug,excerpt,publishedAt&populate[image][fields]=alternativeText,formats&locale=${locale}&sort=publishedAt:desc&pagination[limit]=10`;
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        cache: "force-cache",
      }
    );

    let data = await res.json();

    // Fallback to default locale if no data found
    if ((!data.data || data.data.length === 0) && locale !== "nl") {
      const fallbackQuery = `fields=title,slug,excerpt,publishedAt&populate[image][fields]=alternativeText,formats&locale=nl&sort=publishedAt:desc&pagination[limit]=10`;

      res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?${fallbackQuery}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          cache: "force-cache",
        }
      );
      data = await res.json();
    }

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item: ApiNewsItem) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        slug: item.slug,
        author: item.author ? item.author.name : null,
        publicationDate: item.publishedAt,
        img: item.image?.formats?.medium ? item.image : null,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching news items:", error);
    return [];
  }
}

const NieuwsSection = async ({ t, locale }: NieuwsSectionProps) => {
  const nieuwsItems: NewsItem[] | null = await fetchNewsItems(locale);

  return (
    <div className="bg-grayBack pb-14">
      <section className="py-14 bg-white mx-6 rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-10">
            {t("cedimedNieuws")}
          </h2>
          <NewsCardSliderComponent newsItems={nieuwsItems} locale={locale} />
        </div>
      </section>
    </div>
  );
};

export default NieuwsSection;
