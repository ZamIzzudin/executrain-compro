/** @format */

import AxiosClient from "@/lib/axios";
import type {
  AppDevelopmentListResponse,
  AppDevelopmentListParams,
  AppDevelopmentProps,
} from "@/services/app-development/types";

/**
 * Mapping data modul AppDevelopment (api/v2/app-development) menjadi
 * format yang dipakai komponen UI compro.
 */
export function mapAppDevelopmentToProps(item: any): AppDevelopmentProps {
  return {
    _id: item.id,
    title: item.title,
    banner: item.banner || null,
    tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack : [],
    description: item.description || "",
    challenge: item.challenge || undefined,
    team_size: Array.isArray(item.team_size)
      ? item.team_size.map((t: any) => ({
          quantity: t.quantity || 0,
          type: t.type || "",
        }))
      : [],
    timeline: item.timeline || 0,
    methodology: item.methodology || undefined,
    compliance: item.compliance || undefined,
    highlights: Array.isArray(item.highlights)
      ? item.highlights.map((h: any) => ({
          image: h.image || "",
          title: h.title || "",
          description: h.description || "",
        }))
      : [],
    created_at: item.created_at,
  };
}

export async function AppDevelopmentListService(
  params?: AppDevelopmentListParams,
): Promise<AppDevelopmentListResponse> {
  try {
    const { data: response } = await AxiosClient.get(
      "/app-development/public",
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 9,
          tech_stack: params?.tech_stack,
          methodology: params?.methodology,
          search: params?.search,
        },
      },
    );

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: (data ?? []).map(mapAppDevelopmentToProps),
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AppDevelopmentDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: AppDevelopmentProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/app-development/public/${id}`,
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: mapAppDevelopmentToProps(data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}