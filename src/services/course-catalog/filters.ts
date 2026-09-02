"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AxiosClient from "@/lib/axios";

export interface FilterOption {
  value: string;
  label: string;
}

export interface CatalogFilterOptions {
  categories: FilterOption[];
  skill_levels: string[];
  languages: string[];
  framework_types: FilterOption[];
}

async function CatalogFiltersService(): Promise<CatalogFilterOptions> {
  try {
    const { data: response } = await AxiosClient.get("/course/public/filters");
    const { status, data } = response;
    if (status !== 200) throw new Error("Failed to fetch filters");
    return {
      categories: data?.categories ?? [],
      skill_levels: data?.skill_levels ?? [],
      languages: data?.languages ?? [],
      framework_types: data?.framework_types ?? [],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useCatalogFilters = (): UseQueryResult<CatalogFilterOptions> => {
  return useQuery({
    queryKey: ["course-catalog-filters"],
    queryFn: CatalogFiltersService,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};