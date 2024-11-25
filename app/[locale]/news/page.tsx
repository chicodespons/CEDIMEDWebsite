import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface ApiAuthor {
    name: string;
    bio: string;
    avatar?: string;
  }
  
  interface ApiNewsItem {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    author?: ApiAuthor;
    publicationDate: string;
    img?: string; 
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
    img: string; 
    author: string | null
    bio: string | null;
    avatar: string | null;
}

async function fetchLatestNewsItem(locale:string): Promise<NieuwsItem| null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?sort[0]=publicationDate:desc&populate[author]=*&locale=${locale}`,
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
          publicationDate: newsItem.publicationDate,
          img: newsItem.img ?? null,
          author: newsItem.author ? newsItem.author.name : null,
          bio: newsItem.author ? newsItem.author.bio : null,
          avatar: newsItem.author && newsItem.author.avatar ? newsItem.author.avatar : null,
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