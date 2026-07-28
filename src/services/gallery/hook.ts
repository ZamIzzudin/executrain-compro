/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {type GalleryItem } from "@/utils/types/gallery";

import { GalleryListService } from "./handler";

export const useGallery = (): UseQueryResult<GalleryItem[]> => {
  return useQuery({
    queryKey: ["gallery-list"],
    queryFn: async () => {
      const { data } = await GalleryListService();
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
