/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type ReadyToUseITProductPageDataProps } from "@/utils/types/ready-to-use-it-product";

import { ReadyToUseITProductPageService } from "./handler";

export const useReadyToUseITProductPage =
  (): UseQueryResult<ReadyToUseITProductPageDataProps> => {
    return useQuery({
      queryKey: ["ready-to-use-it-product-page"],
      queryFn: async () => {
        const { data } = await ReadyToUseITProductPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };