import React from 'react'
import RichTextRenderer from './RichTextRenderer';


async function fetchPijler(locale: string, slug:string) {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pijlers?filters[link][$eq]=${slug}&locale=${locale}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    const data = await res.json();
    console.log(JSON.stringify(data,null,2))
    return data.data?.[0] || null;

  } catch (error){
    console.log("data not fetched correctly: " ,error)
  }
    return null;    
  }

const PijlerText = async ({locale,slug}: {locale: string, slug:string }) => {
    const pijler = await fetchPijler(locale, slug);

    console.dir(pijler, { depth: null });


    if (!pijler) {
      return <p>No data found for the provided locale and slug.</p>;
    }
  
    return (
      <section className="py-14 bg-white mt-2">
        <div className="container mx-auto px-6 text-center">
          <div className="text-lg text-justify leading-loose max-w-[800px] mx-auto">
            {/* Render the blocks using BlocksRenderer , we gaan nog moeten kjken om de verschillende types zoals heading, ... te implementeren*/}
            <RichTextRenderer content={pijler.text} />
          </div>
        </div>
      </section>
    );
  };
    

export default PijlerText
