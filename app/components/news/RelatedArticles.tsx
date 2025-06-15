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
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Get all news types (always show all types)
  const allNewsTypes = Object.values(NewsType);

  // Helper function to get display label for news type
  const getNewsTypeLabel = (newsType: NewsType): string => {
    switch (newsType) {
      case NewsType.CLINICAL_CARE:
        return t("klinischeZorg");
      case NewsType.EDUCATION:
        return t("onderwijs");
      case NewsType.RESEARCH:
        return t("onderzoek");
      case NewsType.INNOVATION:
        return t("innovatie");
      case NewsType.GENERAL:
        return t("general");
      default:
        return newsType;
    }
  };

  // Filter articles based on selected news types
  const filteredArticles = useMemo(() => {
    // Debug logging (remove in production)
    console.log("Total articles:", relatedArticles.length);
    console.log("Selected filters:", selectedNewsTypes);

    if (selectedNewsTypes.length === 0) {
      return relatedArticles; // Show all if no filters selected
    }

    const filtered = relatedArticles.filter((article) => {
      // Check both possible field names from API
      const articleCategories = article.news_categories;

      // If no categories exist, don't show this article when filtering
      if (!articleCategories || articleCategories.length === 0) {
        return false;
      }

      const articleNewsTypes = articleCategories.map(
        (category) => category.type
      );

      const matches = selectedNewsTypes.some((selectedType) =>
        articleNewsTypes.includes(selectedType)
      );

      return matches;
    });

    console.log("Filtered articles:", filtered.length);
    return filtered;
  }, [relatedArticles, selectedNewsTypes]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

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
    // Reset to first page when filter changes
    setCurrentPage(1);
  };

  // Handle page navigation
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedNewsTypes([]);
    setCurrentPage(1);
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{t("articels")}</h2>

      {/* NewsType Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("filterByNewsType")}
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
            onClick={clearAllFilters}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            {t("clearAllFilters")}
          </button>
        )}
      </div>

      {/* Articles List */}
      <div className="mb-4">
        <ul className="space-y-4 text-blue-600 visited:text-purple-600">
          {currentArticles.length > 0 ? (
            currentArticles.map(
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
              {t("noArticlesFoundFilter")}
            </li>
          )}
        </ul>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center space-x-2">
          <span className="text-sm text-gray-600">
            {t("page")} {currentPage} {t("of")} {totalPages}
          </span>

          {/* Previous button */}
          {currentPage > 1 && (
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              ← {t("previous")}
            </button>
          )}

          {/* Page numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next button */}
          {currentPage < totalPages && (
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              {t("next")} →
            </button>
          )}
        </div>
      )}

      {/* Results summary */}
      {filteredArticles.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 text-right">
          {t("showing")} {startIndex + 1}-
          {Math.min(endIndex, filteredArticles.length)} {t("of")}{" "}
          {filteredArticles.length} {t("articels")}
        </div>
      )}
    </section>
  );
};

export default RelatedArticles;
