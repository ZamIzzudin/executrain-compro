/** @format */

"use client";

import React from "react";

import { GalleryLogoSkeleton } from "./Skeleton";
import { FadeInUp } from "../atoms/Motion";

import { type GalleryItem } from "@/utils/types/gallery";

interface GallerySliderProps {
  data?: GalleryItem[];
  isLoading?: boolean;
}

export default function GallerySlider({
  data = [],
  isLoading = false,
}: Readonly<GallerySliderProps>) {
  const duplicatedData = React.useMemo(() => {
    const minItems = 12;

    if (data.length === 0) {
      return [];
    }

    if (data.length < minItems) {
      const timesToDuplicate = Math.ceil(minItems / data.length);
      return Array.from({ length: timesToDuplicate }, () => data).flat();
    }

    return data;
  }, [data]);

  if (!isLoading && data.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full">
        <div className="overflow-hidden">
          {isLoading ? (
            <div className="flex gap-3 md:gap-5 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <GalleryLogoSkeleton key={i} />
              ))}
            </div>
          ) : (
            <FadeInUp delay={0.1} duration={0.5}>
              <div className="flex animate-infinite-scroll hover:pause-animation">
                {[...duplicatedData, ...duplicatedData, ...duplicatedData].map(
                  (item: GalleryItem, index: number) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex-shrink-0 relative w-[200px] h-[130px] md:w-[320px] md:h-[200px] lg:w-[380px] lg:h-[240px] overflow-hidden group"
                    >
                      <img
                        src={item.image.url}
                        alt={item.title || "Gallery image"}
                        className="transition-transform duration-300 group-hover:scale-105 min-h-full"
                      />
                    </div>
                  ),
                )}
              </div>
            </FadeInUp>
          )}
        </div>

        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
