import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: {
    slug?: string;
    locale: string | string[];
  };
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
}

async function fetchNewsItemViaSlug(
  slug: string,
  locale: string
): Promise<NieuwsItem | null> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate=image&locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    let data: ApiResponse = await res.json();

    if (
      (!data.data || !Array.isArray(data.data) || data.data.length === 0) &&
      locale !== "nl"
    ) {
      // Fallback to the default locale (e.g., "nl")
      res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate=image&locale=nl`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
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
  const locale = Array.isArray(params?.locale)
    ? params.locale[0]
    : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);
  let newsItem: NieuwsItem | null = null;

  if (params.slug) {
    try {
      newsItem = await fetchNewsItemViaSlug(params.slug, locale);
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
  const locale = Array.isArray(params?.locale)
    ? params.locale[0]
    : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);
  let newsItem: NieuwsItem = null;
  const t = await getTranslations();

  if (params.slug) {
    newsItem = await fetchNewsItemViaSlug(params.slug, locale);
  }

  if (!newsItem && params.slug) {
    newsItem = await fetchNewsItemViaSlug(params.slug, "nl");
  }

  if (newsItem) {
    return <NewsComponent newsItem={newsItem} locale={locale} t={t} />;
  } else {
    return <NoNewsComponent t={t} />;
  }
}
