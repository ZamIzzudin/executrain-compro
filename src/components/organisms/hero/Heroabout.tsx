/** @format */

"use client";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAssetContext } from "@/layouts/AssetProvider";

export default function HeroAbout() {
  const { getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");

  return (
    <div
      className="min-w-[99dvw] min-h-[70dvh] text-white flex items-center justify-start px-[5%] md:px-[7%] lg:px-[10%]"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('./aboutHero.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 items-start max-w-full">
        <div className="font-[500] flex gap-3">
          <Link className="opacity-50" to="/">
            Home
          </Link>
          <ChevronRight />
          <Link to="/contact">About</Link>
        </div>
        <div className="pb-10 border-b space-y-4">
          <h1 className="text-4xl font-semibold">About Us</h1>
          <p className="text-sm md:text-base max-w-2/3">
            Explore our journey, values, and the talented individuals who make
            it all happen. Join us as we strive to make a positive impact in the
            industry!
          </p>
        </div>
      </div>
    </div>
  );
}
