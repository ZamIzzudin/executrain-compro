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
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      {/* Slides track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-primary-500/70 hover:bg-white text-white flex items-center justify-center shadow-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-primary-500/70 hover:bg-white text-white flex items-center justify-center shadow-md transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-6 bg-primary-500"
                  : "w-2 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
