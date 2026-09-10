/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AxiosClient from "@/lib/axios";
import type { ArticleFilterOptions } from "./types";

/** Fallback bila master data belum terisi. */
const FALLBACK_CATEGORIES = [
  { value: "INDUSTRY_INSIGHTS", label: "Industry Insights" },
  { value: "TECHNOLOGY_TRENDS", label: "Technology Trends" },
  { value: "TRAINING_TIPS", label: "Training Tips" },
  { value: "CAREER_GUIDE", label: "Career Guide" },
  { value: "COMPANY_NEWS", label: "Company News" },
];

async function ArticleFiltersService(): Promise<ArticleFilterOptions> {
  try {
    const { data: response } = await AxiosClient.get(
      "/article/public/filters",
    );
    const { status, data } = response;
    if (status !== 200) throw new Error("Failed to fetch filters");
    const categories = data?.categories ?? [];
    return {
      categories:
        categories.length > 0 ? categories : FALLBACK_CATEGORIES,
    };
  } catch (error) {
    console.log(error);
    return { categories: FALLBACK_CATEGORIES };
  }
}

export const useArticleFilters = (): UseQueryResult<ArticleFilterOptions> => {
  return useQuery({
    queryKey: ["article-filters"],
    queryFn: ArticleFiltersService,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
