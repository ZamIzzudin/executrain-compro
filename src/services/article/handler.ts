/** @format */

import AxiosClient from "@/lib/axios";
import type {
  ArticleListResponse,
  ArticleListParams,
  ArticleProps,
} from "./types";

/**
 * Mapping data modul Article (api/v2/article) menjadi
 * format yang dipakai komponen UI compro.
 */
export function mapArticleToProps(item: any): ArticleProps {
  return {
    _id: item.id,
    title: item.title,
    banner:
      item.banner && item.banner.url
        ? { url: item.banner.url, public_id: item.banner.public_id }
        : null,
    category: Array.isArray(item.category) ? item.category : [],
    content: item.content || "",
    created_at: item.created_at,
  };
}

export async function ArticleListService(
  params?: ArticleListParams,
): Promise<ArticleListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/article/public", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 9,
        category: params?.category,
        search: params?.search,
        sort: params?.sort,
      },
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: (data ?? []).map(mapArticleToProps),
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ArticleDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: ArticleProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(`/article/public/${id}`);

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data: mapArticleToProps(data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}