/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type SchedulePageDataProps } from "@/utils/types/schedule-page";

import { SchedulePageService } from "./handler";

export const useSchedulePage = (): UseQueryResult<SchedulePageDataProps> => {
  return useQuery({
    queryKey: ["schedule-page"],
    queryFn: async () => {
      const { data } = await SchedulePageService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
