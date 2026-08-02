/** @format */

"use client";

import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import Button from "@/components/atoms/Button";
import { Tooltip } from "antd";

import HeroBG from "@/assets/banner.jpg";

export default function CustomCard({
  data,
  basePath = "/strategic-solution",
}: Readonly<{
  data: any;
  basePath?: string;
}>) {
  const navigate = useNavigate();

  return (
    <div className="rounded-4xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] cursor-pointer h-full">
      <div className="h-36 md:h-48 bg-slate-100 overflow-hidden rounded-4xl">
        <img
          src={HeroBG}
          alt={data?.banner?.public_id || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 space-y-2">
        <div className="flex justify-between items-start">
          <Tooltip placement="top" title={data?.name || "-"}>
            <h3 className="text-base font-medium text-left max-w-full truncate">
              {data?.name || "-"}
            </h3>
          </Tooltip>
        </div>
        <div className="text-sm text-gray-500">
          <p>{data.desc}</p>
        </div>
        <ol className="text-sm text-gray-500 pb-3 border-b border-gray-200 list-disc pl-5!">
          {data.items.map((each: string) => (
            <li key={each}>{each}</li>
          ))}
        </ol>
        <div className="flex items-center justify-center">
          <Button
            label={data.cta}
            icon={<ArrowRightIcon />}
            onClick={() => navigate(basePath)}
          />
        </div>
      </div>
    </div>
  );
}
