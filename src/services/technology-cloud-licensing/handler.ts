/** @format */

import AxiosClient from "@/lib/axios";
import { type TechnologyCloudLicensingPageDataProps } from "@/utils/types/technology-cloud-licensing";

export async function TechnologyCloudLicensingPageService(): Promise<{
  status: number;
  message: string;
  data: TechnologyCloudLicensingPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      "/page/public/detail/technology-cloud-licensing",
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