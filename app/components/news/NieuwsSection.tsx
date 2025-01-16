import React from 'react';
import NewsSliderComponent from './NewsSliderComponent';

interface ApiAuthor {
  name: string;
}

interface ApiNewsItem {
  id: number;
  excerpt: string;
  slug: string;
  author: ApiAuthor;
  publicationDate: string; // ISO string format
}

interface ApiResponse {
  data: ApiNewsItem[];
}


interface NieuwsItem {
    id: number;
    excerpt: string;
    slug: string;
    author: string;
    publicationDate: Date;
}

interface NieuwsSectionProps {
  t: (key: string) => string;
  locale: string;
}

async function fetchNieuwsItems(locale: string) : Promise<NieuwsItem[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?fields=excerpt,slug&populate[author][fields]=name&locale=${locale}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });
  
    const data: ApiResponse = await res.json();
    console.log(data, { depth: null })
  
    return data.data.map((item) => ({
      id: item.id,
      excerpt: item.excerpt,
      slug: item.slug,
      author: item.author.name,
      publicationDate: new Date(item.publicationDate),
    }));

  } catch (error) {
    console.log("data not fetched correctly: ", error)
  }
  return null;
 
}

const NieuwsSection = async ({t, locale} : NieuwsSectionProps) => {
  const nieuwsItems: NieuwsItem[] | null = await fetchNieuwsItems(locale)
  if (nieuwsItems) {
    nieuwsItems.sort((a,b) => b.publicationDate.getTime() - a.publicationDate.getTime());
  }
     
  return (
    <div className='bg-grayBack pb-14'>
 <section className="py-14 bg-white mx-6 rounded-lg">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-10">{t('cedimedNieuws')}</h2>
      <NewsSliderComponent nieuwsItems={nieuwsItems} locale={locale}/>
    </div>
  </section>
    </div>
   
  )
}

export default NieuwsSection
