/** @format */

"use client";

import { useNavigate } from "react-router-dom";
import { CornerRightUp, Users } from "lucide-react";
import { Tooltip } from "antd";

import Tag from "@/components/atoms/Tag";

import HeroBG from "@/assets/banner.jpg";

import { type ProductProps } from "@/utils/types/strategic-solution";

export default function ProductCard({
  data,
}: Readonly<{
  data: ProductProps;
}>) {
  const navigate = useNavigate();
  const isITTraining = data?.product_category?.toLowerCase() === "it_training";

  return (
    <div
      onClick={() => navigate(`/strategic-solution/${data._id}`)}
      className="rounded-xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] cursor-pointer"
    >
      <div className="h-36 md:h-48 bg-slate-100 overflow-hidden">
        <img
          src={data?.banner?.url || HeroBG}
          alt={data?.banner?.public_id || ""}
          className="w-full h-full object-cover"
          width={1000}
          height={0}
        />
      </div>

      <div className="p-[5%]">
        <div className="flex justify-between items-start pb-5 md:pb-8 border-b-2 border-[#BE0F34]">
          <Tooltip placement="top" title={data?.product_name || "-"}>
            <h3 className="text-[16px] md:text-[20px] lg:text-[24px] font-semibold text-left max-w-[65%] truncate">
              {data?.product_name || "-"}
            </h3>
          </Tooltip>

          <Tag label={data?.product_category?.replace("_", " ") || "UNSET"} />
        </div>
        <div className="flex justify-between pt-2 md:pt-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {Array.isArray(data?.instructor_list) && isITTraining && (
                <>
                  <span
                    className="w-[25px] h-[25px] rounded-full bg-slate-200 block"
                    style={{
                      backgroundImage: `url('${
                        data?.instructor_list[0]?.photo?.url || ""
                      }')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></span>
                  <span className="text-[12px]">
                    {data?.instructor_list[0]?.name || "Lara"}
                  </span>
                </>
              )}
            </div>
          </div>
          {isITTraining && (
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <CornerRightUp size={12} color="#BE0F34" />
                <span className="text-[12px] capitalize">
                  {data?.skill_level?.replace("_", " ").toLowerCase() || "-"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} color="#BE0F34" />
                <span className="text-[12px]">{data?.max_participant}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
