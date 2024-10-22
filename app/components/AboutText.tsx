import React from 'react'
import RichTextRenderer from './RichTextRenderer';

const shouldFetchData = false; // Set this to false to skip fetching


async function fetchAbout(locale: string) {

  if (!shouldFetchData) {
    return null; // Skip fetching and return null
  }

    const res = await fetch(`http://localhost:1337/api/about?locale=${locale}`);
    
    const data = await res.json();
    console.log(data);
    return data.data || null;
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
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{about.title}</h2>
  
          <div className="text-lg text-justify leading-loose max-w-[800px] mx-auto">
            {/* Render the blocks using BlocksRenderer , we gaan nog moeten kjken om de verschillende types zoals heading, ... te implementeren*/}
            <RichTextRenderer content={about.text} />
          </div>
        </div>
      </section>
    );
  };
    

export default AboutText
