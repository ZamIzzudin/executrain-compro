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

export interface PublicScheduleListParams {
  from?: string;
  to?: string;
  category?: string;
  type?: "COURSE" | "SKILL_ACCELERATOR";
  search?: string;
  page?: number;
  limit?: number;
}

export interface PublicScheduleProgram {
  entity_type: "COURSE" | "SKILL_ACCELERATOR";
  entity_id: string;
  program_name: string;
  category: string;
  category_label: string;
  skill_level: string;
  duration: number;
  banner: { url: string; public_id?: string } | null;
  next_date: string | null;
  dates: string[]; // "YYYY-MM-DD"
  ranges: {
    start_date: string;
    end_date: string;
    sessions: number;
  }[];
  total_sessions: number;
  year: number;
  monthly_ranges: string[]; // 12 entri (Jan–Des), mis. "", "10-15", "2, 4-5"
}

export interface PublicScheduleListPagination {
  current_page: number;
  total_pages: number;
  total_products: number;
  per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PublicScheduleListFilters {
  categories: { value: string; label: string }[];
  types: { value: string; label: string }[];
}

export interface PublicScheduleListResponse {
  status: number;
  message: string;
  data?: PublicScheduleProgram[];
  pagination?: PublicScheduleListPagination;
  filters?: PublicScheduleListFilters;
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

/**
 * Daftar program berjadwal (publik) utk halaman Schedule.
 * Satu item = satu program (Course / Skill Accelerator) beserta rentang tanggalnya.
 */
export async function PublicScheduleListService(
  params?: PublicScheduleListParams,
): Promise<PublicScheduleListResponse> {
  try {
    const { data: response } = await AxiosClient.get<PublicScheduleListResponse>(
      "/schedule/public/list",
      { params },
    );
    return response;
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Failed to fetch schedule list" };
  }
}
