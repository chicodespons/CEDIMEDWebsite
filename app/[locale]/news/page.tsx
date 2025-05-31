import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

async function fetchLatestNewsItem(locale: string): Promise<NieuwsItem | null> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?sort[0]=publishedAt:desc&populate[author][populate]=avatar&populate=image&locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch news for locale ${locale}. Status: ${res.status}`
      );
      return null;
    }

    let data: ApiResponse = await res.json();

    if (
      (!data?.data || !Array.isArray(data.data) || data.data.length === 0) &&
      locale !== "nl"
    ) {
      // Fallback to default locale (nl)
      res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?sort[0]=publishedAt:desc&populate[author][populate]=avatar&populate=image&locale=nl`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        }
      );
      data = await res.json();
    }

    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      const newsItem = data.data[0];
      return {
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
    }

    return null;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const newsItem: NieuwsItem | null = await fetchLatestNewsItem(locale);
  let imgUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph-image.png`;

  if (newsItem?.img?.formats?.medium?.url) {
    imgUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${newsItem.img.formats.medium.url}`;
  }

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

export default async function NewsBasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  let newsItem: NieuwsItem | null = null;

  try {
    newsItem = await fetchLatestNewsItem(locale);
  } catch (error) {
    console.error("Failed to fetch news item:", error);
  }

  if (newsItem) {
    return <NewsComponent newsItem={newsItem} locale={locale} t={t} />;
  } else {
    return <NoNewsComponent t={t} />;
  }
}
