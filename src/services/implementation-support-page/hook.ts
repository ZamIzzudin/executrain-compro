/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type ImplementationSupportPageDataProps } from "@/utils/types/implementation-support-page";

import { ImplementationSupportPageService } from "./handler";

export const useImplementationSupportPage =
  (): UseQueryResult<ImplementationSupportPageDataProps> => {
    return useQuery({
      queryKey: ["implementation-support-page"],
      queryFn: async () => {
        const { data } = await ImplementationSupportPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };