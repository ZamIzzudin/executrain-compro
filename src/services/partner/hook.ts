/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type PartnerProps } from "@/utils/types/partner";

import { PartnerListService } from "./handler";

export const usePartner = (): UseQueryResult<PartnerProps[]> => {
  return useQuery({
    queryKey: ["partner-list"],
    queryFn: async () => {
      const { data } = await PartnerListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
