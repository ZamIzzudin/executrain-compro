/** @format */

import AxiosClient from "@/lib/axios";
import type {
  CaseStudyListResponse,
  CaseStudyListParams,
  CaseStudyProps,
} from "@/services/case-study/types";

/**
 * Mapping data modul CaseStudy (api/v2/case-study) menjadi
 * format yang dipakai komponen UI compro.
 */
export function mapCaseStudyToProps(item: any): CaseStudyProps {
  return {
    _id: item.id,
    title: item.title,
    banner:
      item.banner && item.banner.url
        ? { url: item.banner.url, public_id: item.banner.public_id }
        : null,
    category: item.category || undefined,
    description: item.description || "",
    industries: Array.isArray(item.industries) ? item.industries : [],
    solutions: Array.isArray(item.solutions) ? item.solutions : [],
    deployment_type: item.deployment_type || undefined,
    timeline: item.timeline || 0,
    compliance: item.compliance || undefined,
    methodology: item.methodology || undefined,
    team_size: Array.isArray(item.team_size)
      ? item.team_size.map((t: any) => ({
          quantity: t.quantity || 0,
          type: t.type || "",
        }))
      : [],
    testimonial: {
      testimoni: item.testimonial?.testimoni || "",
      name: item.testimonial?.name || "",
      company: item.testimonial?.company || "",
    },
    link: item.link || undefined,
    created_at: item.created_at,
  };
}

export async function CaseStudyListService(
  params?: CaseStudyListParams,
): Promise<CaseStudyListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/case-study/public", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 9,
        category: params?.category,
        industry: params?.industry,
        solution: params?.solution,
        deployment_type: params?.deployment_type,
        methodology: params?.methodology,
        search: params?.search,
        sort: params?.sort,
      },
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: (data ?? []).map(mapCaseStudyToProps),
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function CaseStudyDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: CaseStudyProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/case-study/public/${id}`,
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: mapCaseStudyToProps(data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}