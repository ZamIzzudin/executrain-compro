"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  AppDevelopmentListResponse,
  AppDevelopmentListParams,
  AppDevelopmentProps,
} from "./types";
import {
  AppDevelopmentListService,
  AppDevelopmentDetailService,
} from "./handler";

export const useAppDevelopmentFiltered = (
  params?: AppDevelopmentListParams,
): UseQueryResult<AppDevelopmentListResponse> => {
  return useQuery({
    queryKey: ["app-development-filtered", params],
    queryFn: async () => {
      const response = await AppDevelopmentListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useAppDevelopmentDetail = (params: {
  id: string;
}): UseQueryResult<AppDevelopmentProps> => {
  return useQuery({
    queryKey: ["app-development-detail", params],
    queryFn: async () => {
      const { data } = await AppDevelopmentDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};
