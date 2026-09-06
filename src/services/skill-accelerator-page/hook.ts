/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type SkillAcceleratorPageDataProps } from "@/utils/types/skill-accelerator-page";

import { SkillAcceleratorPageService } from "./handler";

export const useSkillAcceleratorPage =
  (): UseQueryResult<SkillAcceleratorPageDataProps> => {
    return useQuery({
      queryKey: ["skill-accelerator-page"],
      queryFn: async () => {
        const { data } = await SkillAcceleratorPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };