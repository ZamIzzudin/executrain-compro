/** @format */

import AxiosClient from "@/lib/axios";
import { type ImplementationSupportPageDataProps } from "@/utils/types/implementation-support-page";

export async function ImplementationSupportPageService(): Promise<{
  status: number;
  message: string;
  data: ImplementationSupportPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/implementation-support",
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