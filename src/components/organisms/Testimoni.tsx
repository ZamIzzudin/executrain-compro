/** @format */

"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

import TestimoniCard from "../molecules/card/Testimoni";
import { TestimonialCardSkeleton } from "./Skeleton";
import { FadeInUp } from "../atoms/Motion";
import Button from "../atoms/Button";

import { useTestimonial } from "@/services/testimoni/hook";

import { ArrowRightIcon } from "lucide-react";

export default function TestimoniList() {
  const navigate = useNavigate();
  const { data: testimonial = [], isLoading: testimonialLoading } =
    useTestimonial();

  const duplicatedData = React.useMemo(() => {
    const minItems = 9;

    if (testimonial.length === 0) {
      return [];
    }

    if (testimonial.length < minItems) {
      const timesToReplicate = Math.ceil(minItems / testimonial.length);
      return Array.from({ length: timesToReplicate }, () => testimonial).flat();
    }

    return testimonial;
  }, [testimonial]);

  return (
    <section className="my-10 w-full space-y-10 pb-10">
      <div className="text-black w-full">
        {/* Center-aligned Heading */}
        <h2 className="w-full font-semibold text-4xl text-center text-[#111] mb-12 leading-8 md:leading-13">
          What They Say About Us
        </h2>

        {testimonialLoading ? (
          <div className="flex items-center justify-center">
            <TestimonialCardSkeleton />
          </div>
        ) : testimonial.length === 0 ? (
          <div className="flex flex-col items-center p-8 gap-4">
            <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
              No Testimonial Found
            </span>
          </div>
        ) : (
          <div className="relative w-full">
            <div className="overflow-hidden">
              <div className="flex gap-5 animate-infinite-scroll hover:pause-animation py-3">
                {[...duplicatedData, ...duplicatedData, ...duplicatedData].map(
                  (item, index: number) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex-shrink-0 w-[280px] md:w-[360px]"
                    >
                      <TestimoniCard data={item} />
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Edge fade overlays */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <FadeInUp delay={0.5} duration={0.5}>
          <Button
            label="View User Case Studies"
            rounded
            size="sm"
            type="outline-primary"
            icon={<ArrowRightIcon size={18} />}
            onClick={() => navigate("/strategic-solution")}
          />
        </FadeInUp>
      </div>
    </section>
  );
}
