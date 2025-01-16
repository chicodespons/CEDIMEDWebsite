import React from "react";
import DefaultImageComponent from "../defaultImageComponent";
import RichTextRenderer from "../RichTextRenderer";
import Link from "next/link";

interface StrapiImage {
  alternativeText: string;
  formats: {
    medium: {
      url: string;
      width: number;
      height: number;
    };
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface NieuwsItem {
  id: number;
  title: string;
  content: Array<any>;
  excerpt: string;
  slug: string;
  publicationDate: string;
  img: StrapiImage | null;
  author: string | null;
  bio: string | null;
  avatar: StrapiImage | null;
}

interface NewsComponentProps {
  newsItem: NieuwsItem;
  locale: string;
  t: (key: string) => string;
}

interface ArticleData {
  id: number;
  title: string;
  slug: string;
}

interface ArticlesResponse {
  data?: ArticleData[];
}

async function fetchRelatedArticles(locale: string): Promise<ArticleData[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?fields=title,slug&sort=publishedAt:desc&locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch related articles.");
    }

    const data: ArticlesResponse = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const NewsComponent: React.FC<NewsComponentProps> = async ({
  newsItem,
  locale,
  t,
}) => {
  const {
    id: currentArticleId,
    title,
    content,
    publicationDate,
    img,
    author,
    bio,
    avatar,
  } = newsItem;
  const date = new Date(publicationDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  const defaultAvatarImage = "/images/default_user.png";
  const avatarImageUrl = avatar
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${avatar.formats.thumbnail.url}`
    : defaultAvatarImage;

  const relatedArticles = (await fetchRelatedArticles(locale)).filter(
    (article) => {
      return article.id !== currentArticleId;
    }
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 mx-auto items-start">
      {/* MAIN CONTENT */}
      <main className="flex-1">
        <section className="py-14 bg-white mt-2">
          <div className="container mx-auto px-6 bg-gray-100 p-4 rounded text-justify">
            {/* This is the 'AboutText'-like wrapper */}
            <div className="text-center py-4">
              <h1 className="text-2xl lg:text-3xl text-left lg:text-center font-bold px-4 py-2 uppercase tracking-wider">
                {title}
              </h1>
              <p className="text-gray-600 mb-6 text-left px-4 lg:text-center">
                {`Published on ${formattedDate} by ${author}`}
              </p>
            </div>

            {/* Image */}
            {img && (
              <div className="flex justify-center mb-4">
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.formats.medium.url}`}
                  alt={img.alternativeText || "News Item Image"}
                  className="rounded max-w-full h-auto"
                />
              </div>
            )}

            {/* Rich text content */}
            <RichTextRenderer content={content} />
          </div>
        </section>
      </main>

      {/* SIDEBAR */}
      <aside className="w-full md:w-3/12 space-y-6 p-4">
        {/* Author Bio */}
        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-6 tracking-wider">
            {t("aboutTheAuthor")}
          </h2>
          <div className="flex flex-col items-start mb-6">
            <DefaultImageComponent
              image={avatarImageUrl}
              defaultImage={defaultAvatarImage}
              alt={author || "Author"}
              width={48}
              height={48}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-base font-semibold my-6">{author}</h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {bio}
              </p>
            </div>
          </div>
        </section>
        {/* Related Articles */}
        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">{t("articels")}</h2>
          <ul className="space-y-4 text-blue-600 visited:text-purple-600">
            {relatedArticles.map(
              ({ id, title, slug }) =>
                id &&
                title &&
                slug && (
                  <li key={id}>
                    <Link
                      href={`/${locale}/news/${slug}`}
                      className="hover:underline"
                    >
                      {title || ""}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </section>
      </aside>
    </div>
  );
};
