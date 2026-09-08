/** @format */

"use client";

import { useState, useEffect, type ReactNode } from "react";

import CourseCard from "../molecules/card/Course";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useCatalogFiltered } from "@/services/course-catalog/hook";
import type { CatalogItemProps } from "@/services/course-catalog/types";

import Pagination from "../atoms/Pagination";

export default function CourseCatalogList({
  search,
  category,
  framework,
}: Readonly<{ search: string; category?: string; framework?: string }>) {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [category, framework]);

  const { data, isLoading, isFetching } = useCatalogFiltered({
    page,
    limit: 9,
    category,
    search: debouncedSearch || undefined,
    framework_type: framework,
  });

  const products: CatalogItemProps[] = data?.data ?? [];
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
              No Course Found
            </span>
          </div>
          <div></div>
        </>
      );
    }
    return products.map((each: CatalogItemProps) => (
      <StaggerItem key={each._id} direction="up">
        <CourseCard data={each} basePath="/course-catalog" />
      </StaggerItem>
    ));
  };

  return (
    <section className="w-full">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-2xl mb-5 capitalize">
          {category ? category.replaceAll("_", " ") : "All Courses"}
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