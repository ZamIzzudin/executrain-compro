/** @format */

import AxiosClient from "@/lib/axios";

export interface MasterDataItem {
  _id?: string;
  id: string;
  type: string;
  label: string;
  value: string;
  scope?: string | null;
  sort_order: number;
}

export interface MasterDataListResponse {
  status: number;
  message: string;
  data: MasterDataItem[];
}

/** Ambil semua item master data untuk satu tipe (public). */
export async function MasterDataByTypeService(
  type: string,
): Promise<MasterDataListResponse> {
  try {
    const { data: response } =
      await AxiosClient.get<MasterDataListResponse>(`/master-data/${type}`);
    return response;
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Failed to fetch master data", data: [] };
  }
}

/**
 * Bangun Record<scope, string[]> dari daftar FRAMEWORK_ITEM.
 * Item tanpa scope dikelompokkan ke key default.
 */
export function groupFrameworkItems(
  items: MasterDataItem[],
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const item of items) {
    const key = item.scope || "_";
    if (!result[key]) result[key] = [];
    result[key].push(item.value);
  }
  return result;
}
