/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type CourseCatalogPageDataProps } from "@/utils/types/course-catalog-page";

import { CourseCatalogPageService } from "./handler";

export const useCourseCatalogPage =
  (): UseQueryResult<CourseCatalogPageDataProps> => {
    return useQuery({
      queryKey: ["course-catalog-page"],
      queryFn: async () => {
        const { data } = await CourseCatalogPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };