/** @format */

"use client";

import { useState, useEffect, type ReactNode } from "react";

import ProductCard from "../molecules/card/Product";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useDebounce } from "@/hooks/useDebounce";
import { useITProductFiltered } from "@/services/it-product/hook";
import type { ITProductProps } from "@/services/it-product/types";

import Pagination from "../atoms/Pagination";

export default function ITProductList({
  search,
  tech,
}: Readonly<{ search: string; tech?: string }>) {
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isFetching } = useITProductFiltered({
    page,
    limit: 9,
    tech_stack: tech,
    search: debouncedSearch || undefined,
  });

  const products: ITProductProps[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading || isFetching) {
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
              No IT Product Found
            </span>
          </div>
          <div></div>
        </>
      );
    }
    return products.map((each: ITProductProps) => (
      <StaggerItem key={each._id} direction="up">
        <ProductCard data={each} basePath="/it-product" />
      </StaggerItem>
    ));
  };

  return (
    <section className="px-[5%] md:px-[7%] lg:px-[10%] w-full">
      <FadeInUp
        delay={0.1}
        duration={0.5}
        className="flex flex-col items-start gap-4 mb-5"
      >
        <h2 className="font-semibold text-2xl capitalize">
          {tech ? tech.replaceAll("_", " ") : "All IT Products"}
        </h2>
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
      {!isLoading && !isFetching && products.length > 0 && pagination && (
        <Pagination
          current={pagination.current_page}
          totalPages={pagination.total_pages}
          onChange={(p) => setPage(p)}
        />
      )}
    </section>
  );
}
