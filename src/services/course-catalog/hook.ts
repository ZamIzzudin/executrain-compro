"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  CatalogListResponse,
  CatalogListParams,
  CatalogItemProps,
} from "./types";
import { CatalogListService, CatalogDetailService } from "./handler";

export const useCatalogFiltered = (
  params?: CatalogListParams,
): UseQueryResult<CatalogListResponse> => {
  return useQuery({
    queryKey: ["course-catalog-filtered", params],
    queryFn: async () => {
      const response = await CatalogListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useCatalogDetail = (params: {
  id: string;
}): UseQueryResult<CatalogItemProps> => {
  return useQuery({
    queryKey: ["course-catalog-detail", params],
    queryFn: async () => {
      const { data } = await CatalogDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};