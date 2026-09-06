/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type HomePageDataProps } from "@/utils/types/home-page";

import { HomePageService } from "./handler";

export const useHomePage = (): UseQueryResult<HomePageDataProps> => {
  return useQuery({
    queryKey: ["home-page"],
    queryFn: async () => {
      const { data } = await HomePageService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
