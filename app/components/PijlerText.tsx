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

const PijlerText = async ({locale,slug,titleBgColor}: {locale: string, slug:string, titleBgColor:string }) => {
    const pijler = await fetchPijler(locale, slug);

    console.dir(pijler, { depth: null });


    if (!pijler) {
      return <p>No data found for the provided locale and slug.</p>;
    }
  
    return (
      <section className="py-14 bg-white mt-2">
  <div className="container mx-auto px-6 text-justify hyphens-auto lg:text-left lg:hyphens-none">
    <div className="max-w-[1200px] mx-auto bg-gray-100 p-4 rounded">
      {/* Center the h2 */}
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold text-center px-4 py-2">
        {pijler.TextTitle}
        </h2>
      </div>

      <RichTextRenderer content={pijler.text} titleBgColor={titleBgColor} />
    </div>
  </div>
</section>
    );
  };
    

export default PijlerText