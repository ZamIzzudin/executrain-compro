/** @format */

import AxiosClient from "@/lib/axios";
import { type SkillAcceleratorPageDataProps } from "@/utils/types/skill-accelerator-page";

export async function SkillAcceleratorPageService(): Promise<{
  status: number;
  message: string;
  data: SkillAcceleratorPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/skill-accelerator",
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
