/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type CustomAppDevelopmentPageDataProps } from "@/utils/types/custom-app-development";

import { CustomAppDevelopmentPageService } from "./handler";

export const useCustomAppDevelopmentPage =
  (): UseQueryResult<CustomAppDevelopmentPageDataProps> => {
    return useQuery({
      queryKey: ["custom-app-development-page"],
      queryFn: async () => {
        const { data } = await CustomAppDevelopmentPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };