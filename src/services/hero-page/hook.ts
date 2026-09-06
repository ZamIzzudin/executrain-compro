/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type HeroPageDataProps } from "@/utils/types/hero-page";

import { HeroPageService } from "./handler";

export const useHeroPage = (
  pageCode: string,
): UseQueryResult<HeroPageDataProps> => {
  return useQuery({
    queryKey: ["hero-page", pageCode],
    queryFn: async () => {
      const { data } = await HeroPageService(pageCode);
      return data;
    },
    refetchOnWindowFocus: false,
  });
};