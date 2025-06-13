/* eslint-disable @next/next/no-img-element */
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

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  author: string | null;
  publicationDate: string;
  img: StrapiImage | null;
}

const NewsCard: React.FC<{ newsItem: NewsItem; locale: string }> = ({
  newsItem,
  locale,
}) => {
  const { title, excerpt, slug, author, img } = newsItem;

  const imageUrl = img?.formats?.medium?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.formats.medium.url}`
    : "/images/Innovation.webp"; // fallback image

  const imageAlt = img?.alternativeText || `${title} news image`;

  return (
    <Link href={`/${locale}/news/${slug}`}>
      <div className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-grayBack h-full mb-6">
        {/* Image Section */}
        <div className="relative h-48 m-6">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
            alt={imageAlt || "News Item Image"}
            className="rounded max-w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-white line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-700 font-medium transition-colors duration-300 group-hover:text-white line-clamp-3 mb-4">
              {excerpt}
            </p>
          </div>
          {author && (
            <p className="text-sm font-light text-gray-600 transition-colors duration-300 group-hover:text-white">
              - {author}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
