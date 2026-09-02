/** @format */

import AxiosClient from "@/lib/axios";

export interface ContactSubmitPayload {
  name: string;
  email: string;
  message: string;
}

export async function ContactSubmitService(
  payload: ContactSubmitPayload,
): Promise<{ status: number; message: string }> {
  try {
    const { data: response } = await AxiosClient.post(
      "/contact/public/submit",
      payload,
    );

    const { status, message } = response;

    if (status !== 201) throw new Error(message);

    return { status, message };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
