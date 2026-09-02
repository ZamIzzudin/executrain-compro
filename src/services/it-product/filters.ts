"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AxiosClient from "@/lib/axios";
import type { ITProductFilterOptions } from "./types";

async function ITProductFiltersService(): Promise<ITProductFilterOptions> {
  try {
    const { data: response } = await AxiosClient.get("/it-product/public/filters");
    const { status, data } = response;
    if (status !== 200) throw new Error("Failed to fetch filters");
    return {
      tech_stacks: data?.tech_stacks ?? [],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useITProductFilters = (): UseQueryResult<ITProductFilterOptions> => {
  return useQuery({
    queryKey: ["it-product-filters"],
    queryFn: ITProductFiltersService,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
