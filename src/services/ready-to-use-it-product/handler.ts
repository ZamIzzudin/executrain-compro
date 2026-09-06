/** @format */

import AxiosClient from "@/lib/axios";
import { type ReadyToUseITProductPageDataProps } from "@/utils/types/ready-to-use-it-product";

export async function ReadyToUseITProductPageService(): Promise<{
  status: number;
  message: string;
  data: ReadyToUseITProductPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/ready-to-use-it-product",
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