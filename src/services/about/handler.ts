/** @format */

import AxiosClient from "@/lib/axios";
import { type AboutPageDataProps } from "@/utils/types/about";

export async function AboutPageService(): Promise<{
  status: number;
  message: string;
  data: AboutPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get("/page/public/detail/about");

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
