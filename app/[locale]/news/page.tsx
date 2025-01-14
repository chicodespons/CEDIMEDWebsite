import { NewsComponent } from "@/app/components/news/NewsComponent";
import NoNewsComponent from "@/app/components/news/NoNewsComponent";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface StrapiImage {
  alternativeText: string;
  formats: {
    medium : {
      url: string;
      width: number;
      height: number;
    }
    thumbnail: {
      url: string;
      width: number;
      height: number;
    }
  }
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
    author: string | null
    bio: string | null;
    avatar: StrapiImage | null;
}

async function fetchLatestNewsItem(locale:string): Promise<NieuwsItem| null> {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?sort[0]=publishedAt:desc&populate[author][populate]=avatar&populate=image&locale=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        }
      );
  
      let data: ApiResponse = await res.json();

      if(!data.data || !Array.isArray(data.data) || data.data.length === 0) {
        //retry with nl as fallback

        res =  await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?sort[0]=publishedAt:desc&populate[author][populate]=avatar&populate=image&locale=nl`,
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
          img: newsItem.image ?? null,
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
  
// export async function generateMetadata({ params }: { params: { locale: string } }) {
//   const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl";
//   setRequestLocale(locale);

//   const newsItem: NieuwsItem | null = await fetchLatestNewsItem(locale);
//   let imgUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph-image.png`;

//   if (newsItem?.img?.formats?.medium?.url) {
//     imgUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${newsItem.img.formats.medium.url}`
//   }

//   return {
//     title: newsItem?.title || "CEDIMED Brussels News",
//     description: newsItem?.excerpt || "CEDIMED Brussels latest news",
//     openGraph: {
//       images: [
//         {
//           url: imgUrl
//         }
//       ]
//     }
//   }
// }

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