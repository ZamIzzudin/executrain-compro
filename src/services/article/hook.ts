/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  ArticleListResponse,
  ArticleListParams,
  ArticleProps,
} from "./types";
import { ArticleListService, ArticleDetailService } from "./handler";

export const useArticleFiltered = (
  params?: ArticleListParams,
): UseQueryResult<ArticleListResponse> => {
  return useQuery({
    queryKey: ["article-filtered", params],
    queryFn: async () => {
      const response = await ArticleListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useArticleDetail = (params: {
  id: string;
}): UseQueryResult<ArticleProps> => {
  return useQuery({
    queryKey: ["article-detail", params],
    queryFn: async () => {
      const { data } = await ArticleDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};
