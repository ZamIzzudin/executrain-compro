/** @format */

"use client";

import { useState, useEffect, type ReactNode } from "react";

import ArticleCard from "../molecules/card/Article";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useArticleFiltered } from "@/services/article/hook";
import type { ArticleProps } from "@/services/article/types";

import Pagination from "../atoms/Pagination";

export default function ArticleList({
  name,
  basePath = "/article",
  search,
  category,
  sort,
  children,
}: Readonly<{
  name: string;
  basePath?: string;
  search?: string;
  category?: string;
  sort?: string;
  children?: ReactNode;
}>) {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search ?? "");
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [category, sort]);

  const { data, isLoading } = useArticleFiltered({
    page,
    category,
    search: debouncedSearch || undefined,
    sort,
    limit: 6,
  });

  const articles: ArticleProps[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }
    if (articles.length === 0) {
      return (
        <>
          <div></div>
          <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] gap-4 md:gap-5 w-full">
            <span className="font-normal text-slate-500 text-[16px] md:text-[18px]">
              No Article Found
            </span>
          </div>
          <div></div>
        </>
      );
    }
    return articles.slice(0, 6).map((each: ArticleProps) => (
      <StaggerItem key={each._id} direction="up">
        <ArticleCard data={each} basePath={basePath} />
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
        <h2 className="font-semibold text-2xl capitalize">{name}</h2>
        {children}
      </FadeInUp>
      {/* Article Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full my-5"
        staggerDelay={0.1}
        delayChildren={0.2}
      >
        {renderGridContent()}
      </StaggerContainer>

      {/* Pagination */}
      {!isLoading && articles.length > 0 && pagination && (
        <Pagination
          current={pagination.current_page}
          totalPages={pagination.total_pages}
          onChange={(p) => setPage(p)}
        />
      )}
    </section>
  );
}