/** @format */

import AxiosClient from "@/lib/axios";
import { type GalleryItem } from "@/utils/types/gallery";

export async function GalleryListService(): Promise<{
  status: number;
  message: string;
  data: GalleryItem[];
}> {
  try {
    const { data: response } = await AxiosClient.get("/gallery/public/list");

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
