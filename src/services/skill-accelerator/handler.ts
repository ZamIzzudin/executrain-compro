/** @format */

import AxiosClient from "@/lib/axios";
import type {
  SkillAcceleratorListResponse,
  SkillAcceleratorListParams,
  SkillAcceleratorItemProps,
} from "./types";

/**
 * Mapping data modul Skill Accelerator (api/v2/skill-accelerator) menjadi
 * format yang dipakai komponen UI compro (product_* / _id).
 */
export function mapSkillAcceleratorToProduct(
  item: any,
): SkillAcceleratorItemProps {
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
    card_type: "skill",
    banner:
      item.banner && item.banner.url
        ? { public_id: item.banner.public_id, url: item.banner.url }
        : { public_id: "", url: "" },
  };
}

export async function SkillAcceleratorListService(
  params?: SkillAcceleratorListParams,
): Promise<SkillAcceleratorListResponse> {
  try {
    const { data: response } = await AxiosClient.get(
      "/skill-accelerator/public",
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 9,
          category: params?.category,
          search: params?.search,
        },
      },
    );

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: (data ?? []).map(mapSkillAcceleratorToProduct),
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function SkillAcceleratorDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: SkillAcceleratorItemProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/skill-accelerator/public/${id}`,
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: mapSkillAcceleratorToProduct(data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}