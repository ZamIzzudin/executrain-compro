/** @format */

"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type TechnologyCloudLicensingPageDataProps } from "@/utils/types/technology-cloud-licensing";

import { TechnologyCloudLicensingPageService } from "./handler";

export const useTechnologyCloudLicensingPage =
  (): UseQueryResult<TechnologyCloudLicensingPageDataProps> => {
    return useQuery({
      queryKey: ["technology-cloud-licensing-page"],
      queryFn: async () => {
        const { data } = await TechnologyCloudLicensingPageService();
        return data;
      },
      refetchOnWindowFocus: false,
    });
  };