"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { PublicScheduleData } from "./handler";
import {
  PublicScheduleListService,
  PublicScheduleService,
  type PublicScheduleListParams,
  type PublicScheduleListResponse,
} from "./handler";

/** Jadwal publik utk satu program (diisi `enabled` ketika id tersedia). */
export const usePublicSchedule = (params: {
  type: "COURSE" | "SKILL_ACCELERATOR";
  id?: string;
}): UseQueryResult<PublicScheduleData | null> => {
  return useQuery({
    queryKey: ["public-schedule", params.type, params.id],
    queryFn: async () => {
      const response = await PublicScheduleService(params.type, params.id!);
      if (response.status !== 200 || !response.data) return null;
      return response.data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
};

/** Daftar program berjadwal utk halaman Schedule (hook/params menjadi query key). */
export const usePublicScheduleList = (
  params: PublicScheduleListParams,
): UseQueryResult<PublicScheduleListResponse> => {
  return useQuery({
    queryKey: ["public-schedule-list", params],
    queryFn: () => PublicScheduleListService(params),
    refetchOnWindowFocus: false,
  });
};
