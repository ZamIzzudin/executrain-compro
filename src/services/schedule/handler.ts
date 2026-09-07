/** @format */

import AxiosClient from "@/lib/axios";

export interface PublicScheduleData {
  entity_type: "COURSE" | "SKILL_ACCELERATOR";
  entity_id: string;
  program_name: string;
  category: string;
  schedule_dates: string[]; // "YYYY-MM-DD"
  ranges: {
    start_date: string;
    end_date: string;
    sessions: number;
  }[];
}

export interface PublicScheduleResponse {
  status: number;
  message: string;
  data?: PublicScheduleData;
}

/**
 * Ambil jadwal publik (tanpa auth) utk satu program.
 * type: COURSE | SKILL_ACCELERATOR
 * query opsional: from=YYYY-MM-DD, to=YYYY-MM-DD
 */
export async function PublicScheduleService(
  type: "COURSE" | "SKILL_ACCELERATOR",
  entityId: string,
  params?: { from?: string; to?: string },
): Promise<PublicScheduleResponse> {
  try {
    const { data: response } = await AxiosClient.get<PublicScheduleResponse>(
      `/schedule/public/${type}/${entityId}`,
      { params },
    );
    return response;
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Failed to fetch schedule" };
  }
}
