"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AxiosClient from "@/lib/axios";

export interface FilterOption {
  value: string;
  label: string;
}

export interface SkillAcceleratorFilterOptions {
  categories: FilterOption[];
  skill_levels: string[];
  languages: string[];
}

async function SkillAcceleratorFiltersService(): Promise<SkillAcceleratorFilterOptions> {
  try {
    const { data: response } = await AxiosClient.get(
      "/skill-accelerator/public/filters",
    );
    const { status, data } = response;
    if (status !== 200) throw new Error("Failed to fetch filters");
    return {
      categories: data?.categories ?? [],
      skill_levels: data?.skill_levels ?? [],
      languages: data?.languages ?? [],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useSkillAcceleratorFilters =
  (): UseQueryResult<SkillAcceleratorFilterOptions> => {
    return useQuery({
      queryKey: ["skill-accelerator-filters"],
      queryFn: SkillAcceleratorFiltersService,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    });
  };