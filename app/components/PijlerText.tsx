import React from 'react'
import RichTextRenderer from './RichTextRenderer';

const shouldFetchData = false;


async function fetchPijler(locale: string, slug:string) {

  if (!shouldFetchData) {
    return null;
  }

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pijlers?filters[link][$eq]=${slug}&${locale}`);
    const data = await res.json();
    return data.data?.[0] || null;
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
          <h2 className="text-3xl font-bold mb-4">{pijler.title}</h2>
  
          <div className="text-lg text-justify leading-loose max-w-[800px] mx-auto">
            {/* Render the blocks using BlocksRenderer , we gaan nog moeten kjken om de verschillende types zoals heading, ... te implementeren*/}
            <RichTextRenderer content={pijler.text} />
          </div>
        </div>
      </section>
    );
  };
    

export default PijlerText
