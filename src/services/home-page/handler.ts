/** @format */

import AxiosClient from "@/lib/axios";
import { type HomePageDataProps } from "@/utils/types/home-page";

export async function HomePageService(): Promise<{
  status: number;
  message: string;
  data: HomePageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/home-page",
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
