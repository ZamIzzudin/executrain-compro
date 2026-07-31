/** @format */

"use client";

import { useNavigate } from "react-router-dom";
import { AwardIcon, Users } from "lucide-react";
import { Tooltip } from "antd";

import HeroBG from "@/assets/banner.jpg";

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
  basePath = "/strategic-solution",
}: Readonly<{
  data: ProductCardData;
  basePath?: string;
}>) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${basePath}/${data._id}`)}
      className="rounded-4xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] cursor-pointer"
    >
      <div className="h-36 md:h-48 bg-slate-100 overflow-hidden rounded-4xl">
        <img
          src={data?.banner?.url || HeroBG}
          alt={data?.banner?.public_id || ""}
          className="w-full h-full object-cover"
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
