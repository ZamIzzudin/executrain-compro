"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  ITProductListResponse,
  ITProductListParams,
  ITProductProps,
} from "./types";
import { ITProductListService, ITProductDetailService } from "./handler";

export const useITProductFiltered = (
  params?: ITProductListParams,
): UseQueryResult<ITProductListResponse> => {
  return useQuery({
    queryKey: ["it-product-filtered", params],
    queryFn: async () => {
      const response = await ITProductListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useITProductDetail = (params: {
  id: string;
}): UseQueryResult<ITProductProps> => {
  return useQuery({
    queryKey: ["it-product-detail", params],
    queryFn: async () => {
      const { data } = await ITProductDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};
