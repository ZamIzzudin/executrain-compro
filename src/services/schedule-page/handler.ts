/** @format */

import AxiosClient from "@/lib/axios";
import { type SchedulePageDataProps } from "@/utils/types/schedule-page";

export async function SchedulePageService(): Promise<{
  status: number;
  message: string;
  data: SchedulePageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/schedule",
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
