"use client";

import type { ReactNode } from "react";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function CustomHero({
  title,
  subtitle,
  description,
  path,
  banner = "./trainingHero.jpg",
  children,
}: Readonly<{
  title: string;
  subtitle: string;
  description: string;
  path: string;
  banner?: string;
  children?: ReactNode;
}>) {
  return (
    <div
      className="w-full min-h-[55dvh] md:min-h-[70dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%] py-20 md:py-0"
      style={{
        backgroundImage: `linear-gradient(#242424CC, #242424CC), url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 md:gap-5 items-start max-w-full w-full">
        <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap">
          <Link className="opacity-50" to="/">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={path}>{subtitle}</Link>
        </div>
        <div className="pb-6 md:pb-10 border-b space-y-3 md:space-y-4 w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            {title}
          </h1>
          <p className="text-sm md:text-base max-w-2xl">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
