import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { NewsType } from "@/app/enums/newsType";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{
    slug?: string;
    locale: string;
  }>;
};

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
  caption: string;
}

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  type: NewsType;
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
  news_categories?: NewsCategory[];
}

interface ApiResponse {
  data: ApiNewsItem;
}

interface NieuwsItem {
  id: number;
  title: string;
  content: Array<any>;
  excerpt: string;
  slug: string;
  publicationDate: string;
  img: StrapiImage | null;
  author: string | null;
  bio: string | null;
  avatar: StrapiImage | null;
  categories?: NewsCategory[];
}

async function fetchNewsItemViaSlug(
  slug: string,
  locale: string
): Promise<NieuwsItem | null> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate=image&populate[news_categories][fields]=name,slug,type&locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        cache: "force-cache",
      }
    );

    let data: ApiResponse = await res.json();

    if (
      (!data.data || !Array.isArray(data.data) || data.data.length === 0) &&
      locale !== "nl"
    ) {
      // Fallback to the default locale (e.g., "nl")
      res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate=image&populate[news_categories][fields]=name,slug,type&locale=nl`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          cache: "force-cache",
        }
      );
      data = await res.json();
    }

    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      const newsItem: ApiNewsItem = data.data[0];

      const mappedItem: NieuwsItem = {
        id: newsItem.id,
        title: newsItem.title,
        content: newsItem.content,
        excerpt: newsItem.excerpt,
        slug: newsItem.slug,
        publicationDate: newsItem.publishedAt,
        img: newsItem.image?.formats?.medium ? newsItem.image : null,
        author: newsItem.author ? newsItem.author.name : null,
        bio: newsItem.author ? newsItem.author.bio : null,
        avatar: newsItem.author?.avatar?.formats?.thumbnail
          ? newsItem.author.avatar
          : null,
        categories: newsItem.news_categories || [],
      };

      return mappedItem;
    }

    return null; // Return null if no valid news item is found
  } catch (error) {
    console.error("Error fetching news:", error);
  }
  return null;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  let newsItem: NieuwsItem | null = null;

  if (slug) {
    try {
      newsItem = await fetchNewsItemViaSlug(slug, locale);
    } catch (error) {
      console.error("Error in generateMetadata fetchNewsItemViaSlug:", error);
    }
  }

  const imgUrl = newsItem?.img?.formats?.medium?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${newsItem.img.formats.medium.url}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph-image.png`;

  return {
    title: newsItem?.title || "CEDIMED Brussels News",
    description: newsItem?.excerpt || "CEDIMED Brussels latest news",
    openGraph: {
      images: [
        {
          url: imgUrl,
        },
      ],
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  let newsItem: NieuwsItem = null;
  const t = await getTranslations();

  if (slug) {
    newsItem = await fetchNewsItemViaSlug(slug, locale);
  }

  if (!newsItem && slug) {
    newsItem = await fetchNewsItemViaSlug(slug, "nl");
  }

  if (newsItem) {
    return <NewsComponent newsItem={newsItem} locale={locale} t={t} />;
  } else {
    return <NoNewsComponent t={t} />;
  }
}
