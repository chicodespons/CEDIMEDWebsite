import { Metadata } from "next";
import PijlerText from "../../components/PijlerText";
import { getTranslations, setRequestLocale } from "next-intl/server";
import NewsCardSliderComponent from "@/app/components/CardSliderComponent";
import { NewsType } from "@/app/enums/newsType";

type Params = Promise<{
  locale: string;
}>;

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

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  type: NewsType;
}

interface ApiAuthor {
  name: string;
  bio: string;
  avatar?: StrapiImage;
}

interface ApiNewsItem {
  id: number;
  title: string;
  content: Array<any>;
  excerpt: string;
  slug: string;
  author?: ApiAuthor;
  publishedAt: string;
  image?: StrapiImage;
  categories?: NewsCategory[];
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  author: string | null;
  publicationDate: string;
  img: StrapiImage | null;
  categories?: NewsCategory[];
}

const englishMetadata = {
  title: "Innovation, CEDIMED Brussels",
  description:
    "Innovation at CEDIMED Brussels: We develop innovative techniques and processes to make healthcare safer, better, and more affordable. Collaborating with researchers and industry, we aim for sustainable solutions to create future-ready healthcare.",
};
const frenchMetadata = {
  title: "Innovation, CEDIMED Brussels",
  description:
    "Innovation chez CEDIMED Brussels : Nous développons des techniques et des processus innovants pour rendre les soins de santé plus sûrs, meilleurs et abordables. En collaboration avec des chercheurs et l'industrie, nous visons des solutions durables pour un système de santé prêt pour l'avenir.",
};
const dutchMetadata = {
  title: "Innovatie, CEDIMED Brussels",
  description:
    "Innovatie bij CEDIMED Brussels: Wij ontwikkelen innovatieve technieken en processen om de zorg veiliger, beter en betaalbaar te maken. Samen met onderzoekers en industrie streven we naar duurzame oplossingen voor een toekomstgerichte gezondheidszorg.",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  switch (locale) {
    case "en":
      return englishMetadata;
    case "fr":
      return frenchMetadata;
    case "nl":
    default:
      return dutchMetadata;
  }
}

// Fetch news items function
async function fetchNewsItems(locale: string): Promise<NewsItem[]> {
  try {
    const query = `fields=title,slug,excerpt,publishedAt&populate[image][fields]=alternativeText,formats&populate[news_categories][fields]=name,slug,type&locale=${locale}&filters[news_categories][type][$eq]=${NewsType.INNOVATION}&sort=publishedAt:desc&pagination[limit]=10`;
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        cache: "force-cache",
      }
    );

    let data = await res.json();

    // Fallback to default locale if no data found
    if ((!data.data || data.data.length === 0) && locale !== "nl") {
      const fallbackQuery = `fields=title,slug,excerpt,publishedAt&populate[image][fields]=alternativeText,formats&populate[news_categories][fields]=name,slug,type&locale=nl&filters[news_categories][type][$eq]=${NewsType.INNOVATION}&sort=publishedAt:desc&pagination[limit]=10`;

      res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses?${fallbackQuery}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          cache: "force-cache",
        }
      );
      data = await res.json();
    }

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item: ApiNewsItem) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        slug: item.slug,
        author: item.author ? item.author.name : null,
        publicationDate: item.publishedAt,
        img: item.image?.formats?.medium ? item.image : null,
        categories: item["news-categories"] || [],
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching news items:", error);
    return [];
  }
}

export default async function Innovation({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(); // Fetch translations for the current locale

  const newsItems = await fetchNewsItems(locale);

  return (
    <div>
      <PijlerText locale={locale} slug={"innovation"} />

      <section className="py-14 bg-white mx-6 rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-10">
            {t("cedimedNieuws")}
          </h2>
          <NewsCardSliderComponent newsItems={newsItems} locale={locale} />
        </div>
      </section>
    </div>
  );
}
