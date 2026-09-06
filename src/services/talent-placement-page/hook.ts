/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type TalentPlacementPageDataProps } from "@/utils/types/talent-placement-page";

import { TalentPlacementPageService } from "./handler";

export const useTalentPlacementPage =
  (): UseQueryResult<TalentPlacementPageDataProps> => {
    return useQuery({
      queryKey: ["talent-placement-page"],
      queryFn: async () => {
        const { data } = await TalentPlacementPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };