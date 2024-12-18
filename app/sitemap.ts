import { MetadataRoute } from 'next';

type NewsItem = {
  slug: string;
};

const locales = ['en', 'nl', 'fr'];
const staticPaths = [
  '/about',
  '/clinical-care',
  '/contact',
  '/education',
  '/innovation',
  '/news',
  '/research',
];

async function fetchNewsSlugs(): Promise<string[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newses`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch news slugs');
    return [];
  }

  const data: { data: NewsItem[] } = await response.json();
  return data.data.map((newsItem) => newsItem.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const newsSlugs = await fetchNewsSlugs();

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString(),
    });

    staticPaths.forEach((path) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date().toISOString(),
      });
    });

    newsSlugs.forEach((slug) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/news/${slug}`,
        lastModified: new Date().toISOString(),
      });
    });
  }

  return sitemap;
}
