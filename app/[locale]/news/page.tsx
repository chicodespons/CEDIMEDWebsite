import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
    } ;
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

async function fetchLatestNewsItem(locale:string): Promise<NieuwsItem| null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?sort[0]=publishedAt:desc&populate[author][populate]=avatar&populate=image&locale=${locale}`,
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
      console.error("Error fetching latest news:", error);
    }
    return null;
    }
  


export default async function NewsBasePage({ params }: { params: { locale: string } }) {
    const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl";
    setRequestLocale(locale);
    const t = await getTranslations();
  
    const newsItem = await fetchLatestNewsItem(locale);

    if (newsItem){
        return <NewsComponent newsItem={newsItem} />
    } else {
        return <NoNewsComponent t={t}/>
    }
  
    
  }