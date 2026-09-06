/** @format */

"use client";

import { useQuery,type  UseQueryResult } from "@tanstack/react-query";
import {type AssetMap } from "@/utils/types/asset";
import { AssetsService } from "./handler";

const DEFAULT_ASSETS: AssetMap = {
  hero_background: {
    url: "https://storagewebsitetoj.blob.core.windows.net/image/assets/p17fxfbbbld4llzlz3ys.jpg",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  hero_video: {
    url: "",
    fallback_url: "",
    type: "video",
  },
  steps_background: {
    url: "/hero4.webp",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  services_image: {
    url: "/hero2.webp",
    fallback_url: "/hero2.webp",
    type: "image",
  },
  cta_schedule_image: {
    url: "https://storagewebsitetoj.blob.core.windows.net/image/assets/p17fxfbbbld4llzlz3ys.jpg",
    fallback_url: "/hero4.webp",
    type: "image",
  },
  contact_image: {
    url: "/contact-us.png",
    fallback_url: "/contact-us.png",
    type: "image",
  },
};

// Static assets - tidak diambil dari API
export const STATIC_ASSETS = {
  banner_plain: "https://storagewebsitetoj.blob.core.windows.net/image/assets/p17fxfbbbld4llzlz3ys.jpg",
  banner_overlay: "https://storagewebsitetoj.blob.core.windows.net/image/assets/p17fxfbbbld4llzlz3ys.jpg",
  footer_background: "https://storagewebsitetoj.blob.core.windows.net/image/assets/p17fxfbbbld4llzlz3ys.jpg",
  body_pattern: "https://storagewebsitetoj.blob.core.windows.net/image/assets/p17fxfbbbld4llzlz3ys.jpg",
};

export const useAssets = (): UseQueryResult<AssetMap> => {
  return useQuery({
    queryKey: ["assets-data"],
    queryFn: async () => {
      try {
        const { data } = await AssetsService();
        return data;
      } catch (error) {
        return DEFAULT_ASSETS;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
  });
};

export const getDefaultAssets = () => DEFAULT_ASSETS;
