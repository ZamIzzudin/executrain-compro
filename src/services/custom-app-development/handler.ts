/** @format */

import AxiosClient from "@/lib/axios";
import { type CustomAppDevelopmentPageDataProps } from "@/utils/types/custom-app-development";

export async function CustomAppDevelopmentPageService(): Promise<{
  status: number;
  message: string;
  data: CustomAppDevelopmentPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/custom-app-development",
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