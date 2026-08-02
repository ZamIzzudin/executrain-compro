/** @format */

"use client";

import { useState, type ReactNode } from "react";

import ProductCard from "../molecules/card/Product";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useProductFiltered } from "@/services/strategic-solution/hook";
import { type FreeTrialProductProps } from "@/utils/types/free-trial";

import Pagination from "../atoms/Pagination";

export default function ProductList({
  type,
  name,
  basePath = "/product",
  children,
}: Readonly<{
  type: string;
  name: string;
  basePath?: string;
  children?: ReactNode;
}>) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useProductFiltered({
    page,
    product_category: type,
    limit: 6,
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
    return products.slice(0, 6).map((each: FreeTrialProductProps) => (
      <StaggerItem key={each._id} direction="up">
        <ProductCard data={each} basePath={basePath} />
      </StaggerItem>
    ));
  };

  return (
    <section className="px-[5%] md:px-[7%] lg:px-[10%] w-full">
      <FadeInUp
        delay={0.1}
        duration={0.5}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5"
      >
        <h2 className="font-semibold text-2xl capitalize">{name}</h2>
        {children}
      </FadeInUp>
      <span className="block w-full text-center my-3 text-sm text-gray-500">
        Showing All Available Products
      </span>
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
