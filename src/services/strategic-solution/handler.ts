/** @format */

import AxiosClient from "@/lib/axios";
import {
  type ProductProps,
  type ProductListResponse,
  type ProductListParams,
} from "@/utils/types/strategic-solution";

export async function ProductListService(
  params?: ProductListParams
): Promise<ProductListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/product/public/list", {
      params: {
        page: params?.page || 1,
        product_category: params?.product_category,
        sort_order: params?.sort_order || "desc",
        product_name: params?.product_name,
      },
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ProductListFilteredService(
  params?: ProductListParams & { page?: number }
): Promise<ProductListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/product/public/list", {
      params: {
        page: params?.page || 1,
        product_category: params?.product_category,
        sort_order: params?.sort_order || "desc",
        product_name: params?.product_name,
      },
    });

    const { status, message, data, pagination } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
      pagination,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ProductDetailService(id?: string): Promise<{
  status: number;
  message: string;
  data: ProductProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/product/public/detail/${id}`
    );

    const { status, message, data } = response;

    if (status !== 200) throw new Error(message);

    return {
      status,
      message,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
