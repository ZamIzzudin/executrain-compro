/** @format */

import AxiosClient from "@/lib/axios";
import { type TalentPlacementPageDataProps } from "@/utils/types/talent-placement-page";

export async function TalentPlacementPageService(): Promise<{
  status: number;
  message: string;
  data: TalentPlacementPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/talent-placement",
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