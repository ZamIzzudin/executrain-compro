/** @format */

"use client";

import { type ReactNode } from "react";

import CourseCard from "../molecules/card/Course";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useProductFiltered } from "@/services/strategic-solution/hook";
import { type FreeTrialProductProps } from "@/utils/types/free-trial";

export default function RelatedList({
  type,
  name,
  basePath = "/product",
}: Readonly<{ type: string; name: string; basePath?: string; children?: ReactNode }>) {
  const { data, isLoading } = useProductFiltered({
    page: 1,
    product_category: type,
    limit: 3,
  });

  const products: FreeTrialProductProps[] = data?.data ?? [];

  const renderGridContent = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }
    if (products.length === 0) {
      return (
        <>
          <div></div>
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] gap-4 md:gap-5 w-full">
            <span className="font-normal text-slate-500 text-[16px] md:text-[18px]">
              No Product Found
            </span>
          </div>
          <div></div>
        </>
      );
    }
    return products.slice(0, 3).map((each: FreeTrialProductProps) => (
      <StaggerItem key={each._id} direction="up">
        <CourseCard data={each} basePath={basePath} />
      </StaggerItem>
    ));
  };

  return (
    <section className="px-[5%] md:px-[7%] lg:px-[10%] pt-[5%] w-full">
      <FadeInUp
        delay={0.1}
        duration={0.5}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5"
      >
        <h2 className="font-semibold text-2xl capitalize">{name}</h2>
      </FadeInUp>
      {/* Product Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full my-5"
        staggerDelay={0.1}
        delayChildren={0.2}
      >
        {renderGridContent()}
      </StaggerContainer>
    </section>
  );
}
