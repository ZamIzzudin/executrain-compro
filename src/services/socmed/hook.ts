/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type SocmedDataProps } from "@/utils/types/socmed";

import { SocmedListService } from "./handler";

export const useSocmed = (): UseQueryResult<SocmedDataProps[]> => {
  return useQuery({
    queryKey: ["socmed-list"],
    queryFn: async () => {
      const { data } = await SocmedListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
