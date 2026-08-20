/** @format */

"use client";

import { useNavigate } from "react-router-dom";
import { AwardIcon, Users } from "lucide-react";
import { Tooltip } from "antd";

import HeroBG from "@/assets/banner.jpg";
import { handleImageError } from "@/utils/helper";

export interface ProductCardData {
  _id: string;
  product_name: string;
  product_category: string;
  skill_level: string;
  max_participant: number;
  banner?: {
    public_id: string;
    url: string;
  };
}

export default function CourseCard({
  data,
  basePath = "/course-catalog",
}: Readonly<{
  data: ProductCardData;
  basePath?: string;
}>) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${basePath}/${data._id}`)}
      className="rounded-[32px] overflow-hidden shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 transition-all duration-300 cursor-pointer group"
    >
      <div className="h-36 md:h-48 bg-slate-100 overflow-hidden rounded-[32px] border-2 border-gray-200 group-hover:border-rose-700 transition-colors duration-300">
        <img
          src={data?.banner?.url || HeroBG}
          alt={data?.banner?.public_id || ""}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 space-y-2">
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-1">
            <Users size={14} color="#BE0F34" />
            <span className="text-sm font-medium">{data?.max_participant}</span>
          </div>
          <div className="flex items-center gap-1">
            <AwardIcon size={14} color="#BE0F34" />
            <span className="text-sm capitalize font-medium">
              {data?.skill_level?.replace("_", " ").toLowerCase() || "-"}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <Tooltip placement="top" title={data?.product_name || "-"}>
            <h3 className="text-base font-medium text-left max-w-full truncate">
              {data?.product_name || "-"}
            </h3>
          </Tooltip>
        </div>
        <div className="flex gap-3 text-xs mt-3">
          <span className="bg-red-200 text-primary-500 font-medium px-2 py-1 rounded-full">
            ● Free Class
          </span>
          <span className="bg-blue-200 text-blue-500 font-medium px-2 py-1 rounded-full">
            ● Programming
          </span>
        </div>
      </div>
    </div>
  );
}
