/** @format */

"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

import TestimoniCard from "../molecules/card/Testimoni";
import { TestimonialCardSkeleton } from "./Skeleton";
import { FadeInUp } from "../atoms/Motion";

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
    <section className="py-12 w-full space-y-8 bg-[#fcfcfc]">
      <div className="text-black w-full">
        {/* Center-aligned Heading */}
        <h2 className="w-full font-semibold text-2xl md:text-3xl text-center text-neutral-800 mb-8">
          What They Say About Us
        </h2>

        {testimonialLoading ? (
          <div className="flex items-center justify-center">
            <TestimonialCardSkeleton />
          </div>
        ) : testimonial.length === 0 ? (
          <div className="flex flex-col items-center p-8 gap-4">
            <span className="font-normal text-slate-500 text-base">
              No Testimonial Found
            </span>
          </div>
        ) : (
          <div className="relative w-full">
            <div className="overflow-hidden">
              <div className="flex gap-4 animate-infinite-scroll hover:pause-animation py-3">
                {[...duplicatedData, ...duplicatedData, ...duplicatedData].map(
                  (item, index: number) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex-shrink-0 w-80 md:w-96"
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
          <button
            type="button"
            onClick={() => navigate("/course-catalog")}
            className="px-3 py-2.5 rounded-[48px] outline outline-2 outline-offset-[-2px] outline-rose-700 inline-flex justify-center items-center gap-2.5 text-rose-700 hover:bg-rose-50 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium">View User Case Studies</span>
            <ArrowRightIcon size={18} className="text-rose-700" />
          </button>
        </FadeInUp>
      </div>
    </section>
  );
}
