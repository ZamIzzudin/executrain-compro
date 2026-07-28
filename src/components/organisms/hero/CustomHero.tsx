"use client";

import type { ReactNode } from "react";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/layouts/AssetProvider";

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
  const { getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");

  return (
    <div
      className="min-w-[99dvw] min-h-[70dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 items-start max-w-full w-full">
        <div className="font-[500] flex gap-3">
          <Link className="opacity-50" to="/">
            Home
          </Link>
          <ChevronRight />
          <Link to={path}>{subtitle}</Link>
        </div>
        <div className="pb-10 border-b space-y-4 w-full">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="text-sm md:text-base max-w-2/3">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
