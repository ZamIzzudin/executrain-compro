/** @format */

"use client";

import { type ReactNode } from "react";

import CourseCard from "../molecules/card/Course";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useCatalogFiltered } from "@/services/course-catalog/hook";
import { useSkillAcceleratorFiltered } from "@/services/skill-accelerator/hook";
import type { CatalogItemProps } from "@/services/course-catalog/types";
import type { SkillAcceleratorItemProps } from "@/services/skill-accelerator/types";

interface RelatedCatalogProps {
  source?: "course" | "skill-accelerator";
  name?: string;
  basePath?: string;
  category?: string;
}

/**
 * Related items list yang datanya diambil dari modul v2
 * (Course untuk /course-catalog, Skill Accelerator untuk /skill-accelerator).
 */
export default function RelatedCatalog({
  source = "course",
  name = "Related Courses",
  basePath = "/course-catalog",
  category,
}: Readonly<RelatedCatalogProps>) {
  const courseQuery = useCatalogFiltered({
    page: 1,
    limit: 3,
    category,
  });
  const skillQuery = useSkillAcceleratorFiltered({
    page: 1,
    limit: 3,
    category,
  });

  const isLoading =
    source === "course" ? courseQuery.isLoading : skillQuery.isLoading;
  const items: (CatalogItemProps | SkillAcceleratorItemProps)[] =
    source === "course" ? (courseQuery.data?.data ?? []) : (skillQuery.data?.data ?? []);

  const renderGridContent = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ));
    }
    if (items.length === 0) {
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
    return items.slice(0, 3).map((each) => (
      <StaggerItem key={each._id} direction="up">
        <CourseCard data={each as any} basePath={basePath} />
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