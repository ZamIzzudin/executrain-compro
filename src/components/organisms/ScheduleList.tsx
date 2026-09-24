/** @format */

"use client";

import { useState, useEffect, type ReactNode } from "react";

import ScheduleCard from "../molecules/card/Schedule";
import RegisterModal from "../molecules/RegisterModal";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";
import Pagination from "../atoms/Pagination";

import { useDebounce } from "@/hooks/useDebounce";
import { usePublicScheduleList } from "@/services/schedule/hook";
import type {
  PublicScheduleListFilters,
  PublicScheduleProgram,
} from "@/services/schedule/handler";

export default function ScheduleList({
  search,
  month,
  category,
  type,
  onFilters,
}: Readonly<{
  search: string;
  month?: string; // "YYYY-MM"
  category?: string;
  type?: string;
  onFilters?: (filters: PublicScheduleListFilters) => void;
}>) {
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const [requestProgram, setRequestProgram] =
    useState<PublicScheduleProgram | null>(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, month, category, type]);

  const from = month ? `${month}-01` : undefined;
  const to = month
    ? `${month}-${String(
        new Date(
          Number(month.slice(0, 4)),
          Number(month.slice(5, 7)),
          0,
        ).getDate(),
      ).padStart(2, "0")}`
    : undefined;

  const { data, isLoading, isFetching } = usePublicScheduleList({
    page,
    limit: 9,
    from,
    to,
    category,
    type: type as "COURSE" | "SKILL_ACCELERATOR" | undefined,
    search: debouncedSearch || undefined,
  });

  useEffect(() => {
    if (data?.filters) onFilters?.(data.filters);
  }, [data?.filters, onFilters]);

  const programs: PublicScheduleProgram[] = data?.data ?? [];
  const pagination = data?.pagination;

  const renderGridContent = (): ReactNode => {
    if (isLoading || isFetching) {
      return Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[20px] bg-white border border-gray-200 p-4 flex gap-4 animate-pulse"
        >
          <div className="w-[120px] sm:w-40 h-[100px] rounded-2xl bg-gray-200 shrink-0" />
          <div className="flex-1 min-w-0 space-y-3 pt-1">
            <div className="h-3 w-40 bg-gray-200 rounded-full" />
            <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-6 w-full bg-gray-100 rounded-lg mt-auto" />
          </div>
        </div>
      ));
    }
    if (programs.length === 0) {
      return (
        <div className="bg-slate-50 rounded-2xl flex flex-col items-center p-[8%] md:p-[5%] gap-4 md:gap-5 w-full">
          <span className="font-normal text-slate-500 text-[16px] md:text-[18px]">
            No Schedule Found
          </span>
        </div>
      );
    }
    return programs.map((each) => (
      <StaggerItem key={`${each.entity_type}-${each.entity_id}`} direction="up">
        <ScheduleCard data={each} onRequest={setRequestProgram} />
      </StaggerItem>
    ));
  };

  return (
    <section className="w-full">
      <FadeInUp delay={0.1} duration={0.5}>
        Available Class
      </FadeInUp>

      <StaggerContainer
        className="grid grid-cols-1 gap-4 w-full my-5"
        staggerDelay={0.1}
        delayChildren={0.2}
      >
        {renderGridContent()}
      </StaggerContainer>

      {!isLoading && !isFetching && programs.length > 0 && pagination && (
        <Pagination
          current={pagination.current_page}
          totalPages={pagination.total_pages}
          onChange={(p) => setPage(p)}
        />
      )}

      <RegisterModal
        open={!!requestProgram}
        onClose={() => setRequestProgram(null)}
        productName={requestProgram?.program_name ?? ""}
        scheduleType={requestProgram?.entity_type}
        availableDates={requestProgram?.dates}
      />
    </section>
  );
}
