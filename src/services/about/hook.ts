/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AboutPageDataProps } from "@/utils/types/about";

import { AboutPageService } from "./handler";

export const useAboutPage = (): UseQueryResult<AboutPageDataProps> => {
  return useQuery({
    queryKey: ["about-page"],
    queryFn: async () => {
      const { data } = await AboutPageService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
