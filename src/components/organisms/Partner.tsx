/** @format */
"use client";

import React from "react";

import CountUp from "../atoms/Countup";
import { PartnerLogoSkeleton } from "./Skeleton";
import { FadeInUp, FadeInDown } from "../atoms/Motion";

import { type PartnerProps } from "@/utils/types/partner";

interface CompProps {
  data?: PartnerProps[];
  isLoading?: boolean;
}

export default function PartnerList({
  data = [],
  isLoading = false,
}: Readonly<CompProps>) {
  const duplicatedData = React.useMemo(() => {
    const minItems = 12;

    if (data.length === 0) {
      return [];
    }

    if (data.length < minItems) {
      const timesToDuplicate = Math.ceil(minItems / data.length);
      return Array.from({ length: timesToDuplicate }, () => data).flat();
    }

    return data;
  }, [data]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="w-full text-center pt-[5%] px-[5%] md:px-0 overflow-hidden">
      <FadeInUp delay={0.2} duration={0.5}>
        <h3 className="text-base">
          Over{" "}
          <span className="text-primary-500 font-semibold">
            <CountUp
              from={0}
              to={2000}
              separator=","
              direction="up"
              duration={2}
            />
            {"+ "}
            companies
          </span>{" "}
          grow their teams with{" "}
          <span className="text-primary-500 font-semibold">
            ExecuTrain of Jakarta
          </span>
        </h3>
      </FadeInUp>

      <FadeInDown delay={0.3} duration={0.6}>
        <div className="relative w-full">
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="flex gap-3 md:gap-5 justify-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PartnerLogoSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="flex gap-3 md:gap-5 animate-infinite-scroll hover:pause-animation">
                {[...duplicatedData, ...duplicatedData, ...duplicatedData].map(
                  (each: PartnerProps, index: number) => (
                    <div
                      key={`${each.partner_name}-${index}`}
                      className="flex-shrink-0 flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
                    >
                      <img
                        src={each.logo.url}
                        alt={each.partner_name}
                        width={100}
                        height={100}
                        className="object-contain w-[80%] h-[80%]"
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </FadeInDown>
    </div>
  );
}
