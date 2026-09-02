"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  SkillAcceleratorListResponse,
  SkillAcceleratorListParams,
  SkillAcceleratorItemProps,
} from "./types";
import {
  SkillAcceleratorListService,
  SkillAcceleratorDetailService,
} from "./handler";

export const useSkillAcceleratorFiltered = (
  params?: SkillAcceleratorListParams,
): UseQueryResult<SkillAcceleratorListResponse> => {
  return useQuery({
    queryKey: ["skill-accelerator-filtered", params],
    queryFn: async () => {
      const response = await SkillAcceleratorListService(params);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useSkillAcceleratorDetail = (params: {
  id: string;
}): UseQueryResult<SkillAcceleratorItemProps> => {
  return useQuery({
    queryKey: ["skill-accelerator-detail", params],
    queryFn: async () => {
      const { data } = await SkillAcceleratorDetailService(params.id);
      return data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};