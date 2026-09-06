/** @format */

import AxiosClient from "@/lib/axios";
import { type TechAdvisoryPageDataProps } from "@/utils/types/tech-advisory-page";

export async function TechAdvisoryPageService(): Promise<{
  status: number;
  message: string;
  data: TechAdvisoryPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/tech-advisory",
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