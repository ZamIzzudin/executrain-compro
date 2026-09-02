/** @format */

import AxiosClient from "@/lib/axios";

export interface ProductInquiryPayload {
  name: string;
  email: string;
  phone_number: string;
  company_name: string;
  product_name: string;
  product_type: "APP_DEVELOPMENT" | "IT_PRODUCT" | "CASE_STUDY";
  message: string;
}

export async function ProductInquirySubmitService(
  payload: ProductInquiryPayload,
): Promise<{ status: number; message: string }> {
  try {
    const { data: response } = await AxiosClient.post(
      "/product-inquiry/public/submit",
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
