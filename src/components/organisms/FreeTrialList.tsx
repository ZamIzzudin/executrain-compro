/** @format */

"use client";

import { useEffect, useState, type ReactNode } from "react";

import ProductCard from "../molecules/card/Course";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useFreeTrialFiltered } from "@/services/free-trial/hook";
import { type FreeTrialProductProps } from "@/utils/types/free-trial";

import Pagination from "../atoms/Pagination";
import SearchBar from "../atoms/SearchBar";
import FilterDropdown from "../atoms/FilterDropdown";

const FREE_TRIAL_CATEGORIES: { label: string; value?: string }[] = [
  { label: "All Categories" },
  { label: "Data Analytics", value: "DATA_ANALYTICS" },
  { label: "Automation", value: "AUTOMATION" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
  { label: "Emotional Intelligence", value: "EMOTIONAL_INTELLIGENCE" },
];

const PER_PAGE = 6;

export default function FreeTrialList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetching } = useFreeTrialFiltered({
    page,
    limit: PER_PAGE,
    product_category: category,
    product_name: debouncedSearch || undefined,
  });

  const products: FreeTrialProductProps[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading || isFetching) {
      return Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }
    if (products.length === 0) {
      return (
        <div className="col-span-full bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4">
          <span className="font-normal text-slate-500 text-[16px] md:text-[18px]">
            No Free Trial Found
          </span>
        </div>
      );
    }
    return products.map((each: FreeTrialProductProps) => (
      <StaggerItem key={each._id} direction="up">
        <ProductCard data={each} basePath="/free-trial" />
      </StaggerItem>
    ));
  };

  return (
    <section className="px-[7%] lg:px-[10%] py-[5%] w-full">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-2xl mb-5">Class Catalog</h2>
      </FadeInUp>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search class..."
          variant="default"
          className="w-full md:max-w-sm"
        />

        <FilterDropdown
          value={category}
          onChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          options={FREE_TRIAL_CATEGORIES}
          placeholder="All Categories"
          variant="primary"
          className="w-full md:w-56"
        />
      </div>
      <span className="block w-full text-center my-3 text-sm text-gray-500">
        Showing All Available Free Trial Class
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
