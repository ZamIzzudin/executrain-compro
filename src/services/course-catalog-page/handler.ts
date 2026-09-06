/** @format */

import AxiosClient from "@/lib/axios";
import { type CourseCatalogPageDataProps } from "@/utils/types/course-catalog-page";

export async function CourseCatalogPageService(): Promise<{
  status: number;
  message: string;
  data: CourseCatalogPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/course-catalog",
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