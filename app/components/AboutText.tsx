import React from "react";
import RichTextRenderer from "./RichTextRenderer";

async function fetchAbout(locale: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about?locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);
    return data.data || null;
  } catch (error) {
    console.log("data not fetched correctly: ", error);
  }
  return null;
}

const AboutText = async ({ locale }: { locale: string }) => {
  const about = await fetchAbout(locale);
  console.log(locale);
  console.dir(about, { depth: null });

  if (!about) {
    return <p>No data found for the provided locale.</p>;
  }

  return (
    <section className="py-14 bg-white mt-2">
      <div className="container mx-auto">
        <div className="bg-gray-100 p-4 mx-4 lg:mx-32 rounded text-justify">
          {/* This header section matches the style of the main content header */}
          <div className="text-center py-4">
            <h2 className="text-2xl lg:text-3xl text-left lg:text-center font-bold px-4 py-2 uppercase tracking-wider">
              {about.title}
            </h2>
          </div>

          {/* RichText content, styled similarly to your news component */}
          <RichTextRenderer content={about.text} />
        </div>
      </div>
    </section>
  );
};

export default AboutText;
