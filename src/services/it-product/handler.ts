/** @format */

import AxiosClient from "@/lib/axios";
import type {
  ITProductListResponse,
  ITProductListParams,
  ITProductProps,
} from "@/services/it-product/types";

/**
 * Mapping data modul ITProduct (api/v2/it-product) menjadi format
 * yang dipakai komponen UI compro (product_* / _id).
 */
export function mapITProductToProduct(item: any): ITProductProps {
  return {
    _id: item.id,
    product_name: item.title,
    product_description: item.description,
    banner:
      item.banner && item.banner.url
        ? { public_id: item.banner.public_id, url: item.banner.url }
        : { public_id: "", url: "" },
    tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack : [],
    link: item.link || undefined,
    problem: item.problem || undefined,
    feature: Array.isArray(item.feature) ? item.feature : [],
    compliance: item.compliance || undefined,
    highlight: Array.isArray(item.highlight)
      ? item.highlight.map((h: any) => ({
          image: h.image || "",
          title: h.title || "",
          description: h.description || "",
        }))
      : [],
  };
}

export async function ITProductListService(
  params?: ITProductListParams,
): Promise<ITProductListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/it-product/public", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 9,
        tech_stack: params?.tech_stack,
        search: params?.search,
      },
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: (data ?? []).map(mapITProductToProduct),
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ITProductDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: ITProductProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/it-product/public/${id}`,
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: mapITProductToProduct(data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
