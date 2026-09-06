/** @format */

"use client";

import { useNavigate } from "react-router-dom";

import CourseCard from "../molecules/card/Course";
import { ProductCardSkeleton } from "./Skeleton";
import Button from "../atoms/Button";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { ArrowRightIcon } from "lucide-react";

import { useCatalogFiltered } from "@/services/course-catalog/hook";
import type { CatalogItemProps } from "@/services/course-catalog/types";

export default function ServiceList() {
  const navigate = useNavigate();
  const { data, isLoading } = useCatalogFiltered({ page: 1, limit: 3 });

  const courses: CatalogItemProps[] = data?.data ?? [];

  return (
    <div className="pt-[3%] text-center w-full min-h-[30dvh] md:min-h-[50dvh]">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-2xl md:text-[32px]">
          Our Business Solutions
        </h2>
      </FadeInUp>
      <FadeInUp delay={0.2} duration={0.5}>
        <h3 className="text-base text-gray-600">Our Latest Course Catalog</h3>
      </FadeInUp>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full px-[5%] md:px-[7%] lg:px-[10%] mt-6">
          {[1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5 mx-[5%] md:mx-[7%] lg:mx-[10%]">
          <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
            No Course Found
          </span>
        </div>
      ) : (
        <>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full px-[5%] md:px-[7%] lg:px-[10%] mt-5 md:mt-8"
            staggerDelay={0.1}
            delayChildren={0.2}
          >
            {courses.map((course: CatalogItemProps) => (
              <StaggerItem key={course._id} direction="up">
                <CourseCard data={course} basePath="/course-catalog" />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-6 items-center flex justify-center">
            <Button
              label="View All Training"
              rounded
              size="sm"
              type="outline-primary"
              icon={<ArrowRightIcon size={18} />}
              onClick={() => navigate("/course-catalog")}
            />
          </div>
        </>
      )}
    </div>
  );
}
