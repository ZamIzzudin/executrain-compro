/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  LearningPathListParams,
  LearningPathListResponse,
  LearningPathItem,
} from "@/services/learning-path/types";
import {
  LearningPathListService,
  LearningPathDetailService,
} from "@/services/learning-path/handler";

export const useLearningPathPublicList = (
  params?: LearningPathListParams,
): UseQueryResult<LearningPathListResponse> => {
  return useQuery({
    queryKey: ["learning-path-public", params],
    queryFn: async () => {
      const response = await LearningPathListService(params);
      return response;
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useLearningPathPublicDetail = (
  id?: string,
): UseQueryResult<LearningPathItem> => {
  return useQuery({
    queryKey: ["learning-path-public-detail", id],
    queryFn: async () => {
      const { data } = await LearningPathDetailService(id!);
      return data;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};