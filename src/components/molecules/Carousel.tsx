/** @format */

"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface CarouselSlide {
  image: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function Carousel({
  slides,
  autoPlay = true,
  interval = 5000,
  className = "",
}: Readonly<CarouselProps>) {
  const [current, setCurrent] = useState(0);

  const total = slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, total]);

  if (total === 0) return null;

  return (
    <div className={`relative w-full flex flex-col gap-4 ${className}`}>
      <div className="relative w-full overflow-hidden rounded-3xl border-2 border-gray-200">
        {/* Slides track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <div className="h-72 w-full bg-slate-100 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-rose-700/80 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-rose-700/80 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="inline-flex justify-start items-center gap-1.5 self-center">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 cursor-pointer ${
                current === index
                  ? "w-5 h-2 bg-rose-700 rounded-sm"
                  : "w-2 h-2 bg-rose-700/20 rounded-full"
              }`}
            />
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

      {/* Title & Description below slide */}
      <div className="self-stretch flex flex-col justify-center items-start gap-2">
        <h4 className="text-neutral-800 text-sm font-medium line-clamp-2">
          {slides[current]?.title || "Automated Letter Sending"}
        </h4>
        <p className="text-zinc-500 text-sm font-normal">
          {slides[current]?.description ||
            "Organizations often struggle with misplaced correspondence, delayed responses, and a lack of clear accountability when manually managing the flow of incoming and outgoing letters."}
        </p>
      </div>
    </div>
  );
}
