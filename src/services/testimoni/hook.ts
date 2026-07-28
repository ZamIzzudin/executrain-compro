/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type TestimoniProps } from "@/utils/types/testimoni";

import { TestimoniListService } from "./handler";

export const useTestimonial = (): UseQueryResult<TestimoniProps[]> => {
  return useQuery({
    queryKey: ["testimoni-list"],
    queryFn: async () => {
      const { data } = await TestimoniListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
