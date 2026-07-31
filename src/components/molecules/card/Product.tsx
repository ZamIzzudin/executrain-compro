import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";

import HeroBG from "@/assets/banner.jpg";
import Button from "@/components/atoms/Button";
import { ArrowRightIcon } from "lucide-react";

export default function ProductCard({
  data,
  basePath = "/strategic-solution",
}: Readonly<{
  data: any;
  basePath?: string;
}>) {
  const navigate = useNavigate();

  return (
    <div className="rounded-4xl overflow-hidden shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] cursor-pointer">
      <div className="h-36 md:h-48 bg-slate-100 overflow-hidden rounded-4xl">
        <img
          src={data?.banner?.url || HeroBG}
          alt={data?.banner?.public_id || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-5 pt-5 pb-3 space-y-2">
        <div className="flex gap-3 text-xs">
          <span className="bg-red-200 text-primary-500 font-medium px-2 py-1 rounded-full">
            Free Class
          </span>
          <span className="bg-blue-200 text-blue-500 font-medium px-2 py-1 rounded-full">
            Programming
          </span>
        </div>
        <div className="flex justify-between items-start">
          <Tooltip placement="top" title={data?.product_name || "-"}>
            <h3 className="text-base font-medium text-left max-w-full truncate">
              {data?.product_name || "-"}
            </h3>
          </Tooltip>
        </div>
        <p className="text-sm line-clamp-2 text-gray-500">
          A correspondence management system used to record, manage, and monitor
          the flow of incoming and outgoing letters within an organization.
        </p>
        <div className="flex items-center justify-center">
          <Button
            label="View Project Detail"
            icon={<ArrowRightIcon />}
            onClick={() => navigate(basePath)}
          />
        </div>
      </div>
    </div>
  );
}
