/** @format */

"use client";

import { useState, useEffect, type ReactNode } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import CaseStudyCard from "../molecules/card/CaseStudy";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useCaseStudyFiltered } from "@/services/case-study/hook";
import type { CaseStudyProps } from "@/services/case-study/types";

import Pagination from "../atoms/Pagination";

export default function CaseStudyList({
  search,
  category,
  sort,
  categoryOptions = [],
}: Readonly<{
  search: string;
  category?: string;
  sort?: string;
  categoryOptions?: { value: string; label: string }[];
}>) {
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useCaseStudyFiltered({
    page,
    limit: 6,
    category,
    sort,
    search: debouncedSearch || undefined,
  });

  const items: CaseStudyProps[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading) {
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
              No Case Study Found
            </span>
          </div>
          <div></div>
        </>
      );
    }
    return items.map((each: CaseStudyProps) => (
      <StaggerItem key={each._id} direction="up">
        <CaseStudyCard
          data={each}
          basePath="/case-study"
          categoryOptions={categoryOptions}
        />
      </StaggerItem>
    ));
  };

  return (
    <section className="w-full">
      <FadeInUp
        delay={0.1}
        duration={0.5}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5"
      >
        <h2 className="font-semibold text-2xl capitalize">
          Showing Newest Case Studies
        </h2>
      </FadeInUp>
      {/* Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full my-5"
        staggerDelay={0.1}
        delayChildren={0.2}
      >
        {renderGridContent()}
      </StaggerContainer>

      {/* Pagination */}
      {!isLoading && items.length > 0 && pagination && (
        <Pagination
          current={pagination.current_page}
          totalPages={pagination.total_pages}
          onChange={(p) => setPage(p)}
        />
      )}
    </section>
  );
}
