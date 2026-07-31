/** @format */

"use client";

import { useState, type ReactNode } from "react";

import ProductCard from "../molecules/card/Product";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useProductFiltered } from "@/services/strategic-solution/hook";
import { type FreeTrialProductProps } from "@/utils/types/free-trial";

import Pagination from "../atoms/Pagination";

export default function CatalogList({
  type,
  name,
}: Readonly<{ type: string; name: string }>) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useProductFiltered({
    page,
    product_category: type,
    limit: 3,
  });

  const products: FreeTrialProductProps[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, i) => (
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
        <ProductCard data={each} basePath="/free-trial" />
      </StaggerItem>
    ));
  };

  return (
    <section className="px-[7%] lg:px-[10%] w-full">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-[28px] md:text-[36px] mb-5 capitalize">
          {name}
        </h2>
      </FadeInUp>

      {/* Product Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full my-5"
        staggerDelay={0.1}
        delayChildren={0.2}
      >
        {renderGridContent()}
      </StaggerContainer>

      {/* Pagination */}
      {!isLoading && products.length > 0 && pagination && (
        <Pagination
          current={pagination.current_page}
          totalPages={pagination.total_pages}
          onChange={(p) => setPage(p)}
        />
      )}
    </section>
  );
}
