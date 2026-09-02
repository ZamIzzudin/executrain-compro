/** @format */

import AxiosClient from "@/lib/axios";
import type {
  CatalogListResponse,
  CatalogListParams,
  CatalogItemProps,
} from "@/services/course-catalog/types";

/**
 * Mapping data modul Course (api/v2/course) menjadi format
 * yang dipakai komponen UI compro (product_* / _id).
 */
export function mapCourseToProduct(item: any): CatalogItemProps {
  return {
    _id: item.id,
    product_name: item.title,
    product_category: item.category,
    skill_level: item.skill_level,
    max_participant: item.student ?? 0,
    product_description: item.description,
    benefits: Array.isArray(item.feature) ? item.feature : [],
    language: item.language,
    duration: item.duration ?? 0,
    framework_type: item.framework_type ?? "Training",
    card_type: "course",
    banner:
      item.banner && item.banner.url
        ? { public_id: item.banner.public_id, url: item.banner.url }
        : { public_id: "", url: "" },
  };
}

export async function CatalogListService(
  params?: CatalogListParams,
): Promise<CatalogListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/course/public", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 9,
        category: params?.category,
        search: params?.search,
        framework_type: params?.framework_type,
      },
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: (data ?? []).map(mapCourseToProduct),
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function CatalogDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: CatalogItemProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(`/course/public/${id}`);

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: mapCourseToProduct(data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}