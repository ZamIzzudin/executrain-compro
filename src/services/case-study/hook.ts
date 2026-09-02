"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  CaseStudyListResponse,
  CaseStudyListParams,
  CaseStudyProps,
} from "./types";
import { CaseStudyListService, CaseStudyDetailService } from "./handler";

export const useCaseStudyFiltered = (
  params?: CaseStudyListParams,
): UseQueryResult<CaseStudyListResponse> => {
  return useQuery({
    queryKey: ["case-study-filtered", params],
    queryFn: async () => {
      const response = await CaseStudyListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useCaseStudyDetail = (params: {
  id: string;
}): UseQueryResult<CaseStudyProps> => {
  return useQuery({
    queryKey: ["case-study-detail", params],
    queryFn: async () => {
      const { data } = await CaseStudyDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};
