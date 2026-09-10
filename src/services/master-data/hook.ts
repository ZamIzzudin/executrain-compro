"use client";

import { useQuery } from "@tanstack/react-query";
import {
  MasterDataByTypeService,
  groupFrameworkItems,
  type MasterDataItem,
} from "./handler";

/** Ambil item FRAMEWORK_ITEM yang sudah dikelompokkan per scope. */
export const useFrameworkItems = () => {
  return useQuery({
    queryKey: ["master-data", "FRAMEWORK_ITEM"],
    queryFn: async () => {
      const response = await MasterDataByTypeService("FRAMEWORK_ITEM");
      if (response.status !== 200) return [] as MasterDataItem[];
      return response.data;
    },
    select: groupFrameworkItems,
    refetchOnWindowFocus: false,
  });
};
