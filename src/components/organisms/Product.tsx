/** @format */

"use client";

import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ProductCard from "../molecules/card/Product";
import { ProductCardSkeleton } from "./Skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "../atoms/Motion";

import { ArrowRightIcon } from "lucide-react";

import { type ProductProps } from "@/utils/types/strategic-solution";

export default function ProductList({
  data = [],
  isLoading,
}: Readonly<{ data?: ProductProps[]; isLoading: boolean }>) {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center flex flex-col items-center px-[5%] md:px-0">
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 md:mt-8 gap-4 md:gap-5 mb-6 md:mb-8 w-full"
        staggerDelay={0.1}
        delayChildren={0.3}
      >
        {isLoading ? (
          [1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
        ) : data.length === 0 ? (
          <div className="col-span-full bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
            <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
              No Strategic Solution Found
            </span>
          </div>
        ) : (
          data.map((each: ProductProps, index: number) => (
            <StaggerItem key={index} direction="up">
              <ProductCard data={each} />
            </StaggerItem>
          ))
        )}
      </StaggerContainer>
      {!isLoading && data.length > 0 && (
        <FadeInUp delay={0.5} duration={0.5}>
          <Button
            label="View All Training"
            rounded
            size="sm"
            type="outline-primary"
            icon={<ArrowRightIcon size={18} />}
            onClick={() => navigate("/strategic-solution")}
          />
        </FadeInUp>
      )}
    </div>
  );
}
