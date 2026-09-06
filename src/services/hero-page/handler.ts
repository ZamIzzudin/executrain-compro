/** @format */

import AxiosClient from "@/lib/axios";
import { type HeroPageDataProps } from "@/utils/types/hero-page";

/** Ambil jumbotron halaman (title + description) untuk sebuah page code. */
export async function HeroPageService(
  pageCode: string,
): Promise<{
  status: number;
  message: string;
  data: HeroPageDataProps;
}> {
  try {
    const { data: response } = await AxiosClient.get(
      `/page/public/detail/${pageCode}`,
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