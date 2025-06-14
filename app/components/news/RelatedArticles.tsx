"use client";

import { NewsType } from "@/app/enums/newsType";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useMemo } from "react";

interface ArticleData {
  id: number;
  title: string;
  slug: string;
  categories?: NewsCategory[];
  news_categories?: NewsCategory[];
}

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  type: NewsType;
}

interface RelatedArticleProps {
  relatedArticles: ArticleData[];
  locale: string;
}

const RelatedArticles: React.FC<RelatedArticleProps> = ({
  relatedArticles,
  locale,
}) => {
  const t = useTranslations();
  const [selectedNewsTypes, setSelectedNewsTypes] = useState<NewsType[]>([]);

  // Get all news types (always show all types)
  const allNewsTypes = Object.values(NewsType);

  // Helper function to get display label for news type
  const getNewsTypeLabel = (newsType: NewsType): string => {
    switch (newsType) {
      case NewsType.CLINICAL_CARE:
        return "Clinical Care";
      case NewsType.EDUCATION:
        return "Education";
      case NewsType.RESEARCH:
        return "Research";
      case NewsType.INNOVATION:
        return "Innovation";
      case NewsType.GENERAL:
        return "General";
      default:
        return newsType;
    }
  };

  // Filter articles based on selected news types
  const filteredArticles = useMemo(() => {
    if (selectedNewsTypes.length === 0) {
      return relatedArticles; // Show all if no filters selected
    }

    return relatedArticles.filter((article) => {
      // Check both possible field names from API
      const articleCategories =
        article.categories || article.news_categories || [];
      const articleNewsTypes = articleCategories.map(
        (category) => category.type
      );

      // Check if article has ALL selected news types (exact match)
      return selectedNewsTypes.every((selectedType) =>
        articleNewsTypes.includes(selectedType)
      );
    });
  }, [relatedArticles, selectedNewsTypes]);

  // Handle news type selection toggle
  const toggleNewsType = (newsType: NewsType) => {
    setSelectedNewsTypes((prev) => {
      if (prev.includes(newsType)) {
        // Remove if already selected
        return prev.filter((type) => type !== newsType);
      } else {
        // Add if not selected
        return [...prev, newsType];
      }
    });
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{t("articels")}</h2>

      {/* NewsType Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by News Type:
        </label>

        <div className="flex flex-wrap gap-2">
          {allNewsTypes.map((newsType) => {
            const isSelected = selectedNewsTypes.includes(newsType);
            return (
              <button
                key={newsType}
                onClick={() => toggleNewsType(newsType)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {getNewsTypeLabel(newsType)}
              </button>
            );
          })}
        </div>

        {/* Clear all button */}
        {selectedNewsTypes.length > 0 && (
          <button
            onClick={() => setSelectedNewsTypes([])}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Articles List */}
      <ul className="space-y-4 text-blue-600 visited:text-purple-600">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(
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
          )
        ) : (
          <li className="text-gray-500 italic">
            No articles found for the selected filter.
          </li>
        )}
      </ul>
    </section>
  );
};

export default RelatedArticles;
