import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";

import HeroBG from "@/assets/banner.jpg";
import Button from "@/components/atoms/Button";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { formatDate } from "@/utils/helper";

export default function ArticleCard({
  data,
  basePath = "/strategic-solution",
}: Readonly<{
  data: any;
  basePath?: string;
}>) {
  const navigate = useNavigate();

  const now = Date.now();

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
      <div className="px-5 pt-5 space-y-2">
        <div className="flex gap-3 text-xs">
          <span className="font-medium py-1 flex gap-2">
            <ClockIcon size={14} className="text-primary-500" />{" "}
            {formatDate(now)}
          </span>
          <span className="bg-blue-200 text-blue-500 font-medium px-2 py-1 rounded-full">
            ● Corporate Training
          </span>
        </div>
        <div className="flex justify-between items-start">
          <Tooltip placement="top" title={data?.product_name || "-"}>
            <h3 className="text-base font-medium text-left max-w-full truncate">
              {data?.product_name || "-"}
            </h3>
          </Tooltip>
        </div>
      </div>
      <div className="flex items-center justify-start pb-5">
        <Button
          label="Read More"
          icon={<ArrowRightIcon />}
          onClick={() => navigate(`${basePath}/${data._id}`)}
        />
      </div>
    </div>
  );
}
