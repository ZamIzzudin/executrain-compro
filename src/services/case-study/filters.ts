"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AxiosClient from "@/lib/axios";
import type { CaseStudyFilterOptions } from "./types";

async function CaseStudyFiltersService(): Promise<CaseStudyFilterOptions> {
  try {
    const { data: response } = await AxiosClient.get(
      "/case-study/public/filters",
    );
    const { status, data } = response;
    if (status !== 200) throw new Error("Failed to fetch filters");
    return {
      categories: data?.categories ?? [],
      industries: data?.industries ?? [],
      solutions: data?.solutions ?? [],
      methodologies: data?.methodologies ?? [],
      deployments: data?.deployments ?? [],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useCaseStudyFilters = (): UseQueryResult<CaseStudyFilterOptions> => {
  return useQuery({
    queryKey: ["case-study-filters"],
    queryFn: CaseStudyFiltersService,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};