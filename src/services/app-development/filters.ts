"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AxiosClient from "@/lib/axios";
import type { AppDevelopmentFilterOptions } from "./types";

async function AppDevelopmentFiltersService(): Promise<AppDevelopmentFilterOptions> {
  try {
    const { data: response } = await AxiosClient.get(
      "/app-development/public/filters",
    );
    const { status, data } = response;
    if (status !== 200) throw new Error("Failed to fetch filters");
    return {
      tech_stacks: data?.tech_stacks ?? [],
      methodologies: data?.methodologies ?? [],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useAppDevelopmentFilters = (): UseQueryResult<AppDevelopmentFilterOptions> => {
  return useQuery({
    queryKey: ["app-development-filters"],
    queryFn: AppDevelopmentFiltersService,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};