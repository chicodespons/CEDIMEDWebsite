import React from "react";
import RichTextRenderer from "./RichTextRenderer";

async function fetchPijler(locale: string, slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pijlers?filters[link][$eq]=${slug}&locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    return data.data?.[0] || null;
  } catch (error) {
    console.log("data not fetched correctly: ", error);
  }
  return null;
}

const PijlerText = async ({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) => {
  const pijler = await fetchPijler(locale, slug);

  console.dir(pijler, { depth: null });

  if (!pijler) {
    return <p>No data found for the provided locale and slug.</p>;
  }

  return (
    <section className="py-14 bg-white mt-2">
      <div className="container mx-auto">
        <div className="bg-gray-100 p-4 mx-4 lg:mx-32 rounded text-justify">
          {/* Center the h2 */}
          <div className="text-center py-4">
            <h2 className="text-3xl lg:text-3xl text-center font-bold px-4 py-2 uppercase tracking-wider">
              {pijler.TextTitle}
            </h2>
          </div>

          <RichTextRenderer content={pijler.text} />
        </div>
      </div>
    </section>
  );
};

export default PijlerText;
