/** @format */

import AxiosClient from "@/lib/axios";
import type {
  LearningPathListParams,
  LearningPathListResponse,
  LearningPathItem,
} from "@/services/learning-path/types";

export async function LearningPathListService(
  params?: LearningPathListParams,
): Promise<LearningPathListResponse> {
  try {
    const { data: response } = await AxiosClient.get("/learning-path/public", {
      params: {
        framework: params?.framework,
        category: params?.category,
        search: params?.search,
      },
    });

    const { status, message, data } = response;
    if (status !== 200) throw new Error(message);

    return { status, message, data: data ?? [] };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function LearningPathDetailService(
  id: string,
): Promise<{ status: number; message: string; data: LearningPathItem }> {
  try {
    const { data: response } = await AxiosClient.get(
      `/learning-path/public/${id}`,
    );
    const { status, message, data } = response;
    if (status !== 200) throw new Error(message);
    return { status, message, data };
  } catch (error) {
    console.log(error);
    throw error;
  }
}