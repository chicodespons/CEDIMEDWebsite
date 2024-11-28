import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
    params: {
      slug?: string;
      locale: string | string[]
    };
  };

  interface ApiAuthor {
    name: string;
    bio: string;
    avatar?: {
      formats: {
        thumbnail: {
          url: string
        }
      }
    };
  }
  
  interface ApiNewsItem {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    author?: ApiAuthor;
    publishedAt: string;
    image?: {
      formats: {
        medium : {
          url: string
        }
      }
    };
  }
  
  interface ApiResponse {
    data: ApiNewsItem;
  }

  interface NieuwsItem {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    publicationDate: string;
    imgUrl: string; 
    author: string | null
    bio: string | null;
    avatarUrl: string | null;
}

  async function fetchNewsItemViaSlug(slug: string, locale: string) : Promise<NieuwsItem | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate=image&locale=${locale}`, 
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        }
      );
    
      const data: ApiResponse = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const newsItem: ApiNewsItem = data.data[0];

        const mappedItem: NieuwsItem = {
          id: newsItem.id,
          title: newsItem.title,
          content: newsItem.content,
          excerpt: newsItem.excerpt,
          slug: newsItem.slug,
          publicationDate: newsItem.publishedAt,
          imgUrl: newsItem.image.formats.medium.url ?? null, 
          author: newsItem.author ? newsItem.author.name : null, 
          bio: newsItem.author ? newsItem.author.bio : null,   
          avatarUrl: newsItem.author && newsItem.author.avatar ? newsItem.author.avatar.formats.thumbnail.url : null, 
        };
  
        return mappedItem;
      }
  
      return null; // Return null if no valid news item is found
    
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    return null;
  }
  
 
  

  export default async function NewsPage({ params } : Props ) {
    const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
    setRequestLocale(locale);
    let newsItem : NieuwsItem = null;
    const t = await getTranslations();

   if (params.slug) {
    newsItem = await fetchNewsItemViaSlug(params.slug, locale);
   }

   if (newsItem != null) {
    return (
      <NewsComponent newsItem={newsItem} />  
  )
   } else {
    return <NoNewsComponent t={t} />
   }

    
  }



