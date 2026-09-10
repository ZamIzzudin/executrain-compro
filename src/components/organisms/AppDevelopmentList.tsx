/** @format */

"use client";

import { useState, useEffect, type ReactNode } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import AppDevelopmentCard from "../molecules/card/AppDevelopment";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useAppDevelopmentFiltered } from "@/services/app-development/hook";
import type { AppDevelopmentProps } from "@/services/app-development/types";

import Pagination from "../atoms/Pagination";

export default function AppDevelopmentList({
  search,
  tech,
  method,
  techOptions = [],
  methodOptions = [],
}: Readonly<{
  search: string;
  tech?: string;
  method?: string;
  techOptions?: { value: string; label: string }[];
  methodOptions?: { value: string; label: string }[];
}>) {
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isFetching } = useAppDevelopmentFiltered({
    page,
    limit: 9,
    tech_stack: tech,
    methodology: method,
    search: debouncedSearch || undefined,
  });

  const items: AppDevelopmentProps[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading || isFetching) {
      return Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }
    if (items.length === 0) {
      return (
        <>
          <div></div>
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] gap-4 md:gap-5 w-full">
            <span className="font-normal text-slate-500 text-[16px] md:text-[18px]">
              No App Development Found
            </span>
          </div>
          <div></div>
        </>
      );
    }
    return items.map((each: AppDevelopmentProps) => (
      <StaggerItem key={each._id} direction="up">
        <AppDevelopmentCard
          data={each}
          basePath="/app-development"
          techOptions={techOptions}
          methodOptions={methodOptions}
        />
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
          {tech ? tech.replaceAll("_", " ") : "All Custom Applications"}
        </h2>
      </FadeInUp>
      <span className="block w-full text-center my-3 text-sm text-gray-500">
        Showing All Available Applications
      </span>
      {/* Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full my-5"
        staggerDelay={0.1}
        delayChildren={0.2}
      >
        {renderGridContent()}
      </StaggerContainer>

      {/* Pagination */}
      {!isLoading && !isFetching && items.length > 0 && pagination && (
        <Pagination
          current={pagination.current_page}
          totalPages={pagination.total_pages}
          onChange={(p) => setPage(p)}
        />
      )}
    </section>
  );
}