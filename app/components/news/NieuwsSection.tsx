import React from 'react';
import NewsSliderComponent from './NewsSliderComponent';


interface NieuwsItem {
    id: number;
    excerpt: string;
    author: string;
    publicationDate: Date;
}

interface NieuwsSectionProps {
  t: (key: string) => string;
  locale: string;
}

async function fetchNieuwsItems(locale: string) : Promise<NieuwsItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?fields=excerpt&populate[author][fields]=name&locale=${locale}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  });

  const data = await res.json();

  // @ts-expect-error
  return data.data.map((item: any) => ({
    id: item.id,
    excerpt: item.excerpt,
    author: item.author.name,
    publicationDate: new Date(item.publicationDate),
  }));
}

const NieuwsSection = async ({t, locale} : NieuwsSectionProps) => {
  const nieuwsItems: NieuwsItem[] | null = await fetchNieuwsItems(locale)
  if (nieuwsItems) {
    nieuwsItems.sort((a,b) => b.publicationDate.getTime() - a.publicationDate.getTime());
  }

    // const nieuwsItems: NieuwsItem[] = [
    //     {
    //       id:1,
    //       excerpt:
    //       'CEDIMED opent nieuw onderzoekscentrum voor spoedeisende geneeskunde in Brussel. Dit centrum richt zich op innovatieve zorgoplossingen.',
    //       author: 'Dr. Sarah Williams',
    //     },
    //     {
    //       id:2,
    //       excerpt:
    //       'Nieuwe samenwerking tussen CEDIMED en het Rode Kruis voor verbetering van nooddiensten in landelijke gebieden.',
    //       author: 'Nurse John Doe',
    //     },
    //     {
    //       id:3,
    //       excerpt:
    //       'CEDIMED lanceert educatieve programma’s voor eerstehulpverlening, gericht op gemeenschappen met beperkte toegang tot medische zorg.',
    //       author: 'Dr. Emily Brown',
    //     },
    //     {
    //       id:4,
    //       excerpt:
    //       'Onderzoek door CEDIMED toont aan dat vroege interventie in spoedeisende situaties levens kan redden in 80% van de gevallen.',
    //       author: 'Dr. Jane Doe',
    //     },
    //     {
    //       id:5,
    //       excerpt:
    //       'CEDIMED viert 10 jaar toewijding aan medische innovatie met een serie workshops en lezingen.',
    //       author: 'prof. dr. Hendrik Cuppens',
    //     },
    //   ];
    
     
  return (
    <div className='bg-grayBack pb-14'>
 <section className="py-14 bg-white mx-6 rounded-lg">
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold text-center mb-10">{t('cedimedNieuws')}</h2>
      <NewsSliderComponent nieuwsItems={nieuwsItems}/>
    </div>
  </section>
    </div>
   
  )
}

export default NieuwsSection
