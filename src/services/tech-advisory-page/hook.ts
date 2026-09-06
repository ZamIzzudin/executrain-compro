/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type TechAdvisoryPageDataProps } from "@/utils/types/tech-advisory-page";

import { TechAdvisoryPageService } from "./handler";

export const useTechAdvisoryPage =
  (): UseQueryResult<TechAdvisoryPageDataProps> => {
    return useQuery({
      queryKey: ["tech-advisory-page"],
      queryFn: async () => {
        const { data } = await TechAdvisoryPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };