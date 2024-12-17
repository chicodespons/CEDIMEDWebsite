import React from 'react'
import RichTextRenderer from './RichTextRenderer';




async function fetchAbout(locale: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about?locale=${locale}`
      , {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });
    
    const data = await res.json();
    console.log(data);
    return data.data || null;
  } catch (error){
    console.log("data not fetched correctly: ", error)
  }
  return null;
  }

const AboutText = async ({locale}: {locale: string}) => {
    const about = await fetchAbout(locale);
    console.log(locale)
    console.dir(about, { depth: null });


    if (!about) {
      return <p>No data found for the provided locale.</p>;
    }
  
    return (
      <section className="py-14 bg-white mt-2">
  <div className="container mx-auto px-6 text-justify">
    <div className="max-w-[1200px] mx-auto bg-gray-100 p-4 rounded">
      {/* Center the h2 */}
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold text-center px-4 py-2 uppercase tracking-wider">
          {about.title}
        </h2>
      </div>

      <RichTextRenderer content={about.text} />
    </div>
  </div>
</section>
    );
  };
    

export default AboutText
