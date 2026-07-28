/** @format */

import AxiosClient from "@/lib/axios";
import { type PartnerProps } from "@/utils/types/partner";

export async function PartnerListService(): Promise<{
  status: number;
  message: string;
  data: PartnerProps[];
}> {
  try {
    const { data: response } = await AxiosClient.get("/partner/public/list");

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
