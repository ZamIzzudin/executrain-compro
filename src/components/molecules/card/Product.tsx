import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";

import HeroBG from "@/assets/banner.jpg";
import { ArrowRightIcon } from "lucide-react";
import { handleImageError } from "@/utils/helper";

export default function ProductCard({
  data,
  basePath = "/it-product",
}: Readonly<{
  data: any;
  basePath?: string;
}>) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${basePath}/${data._id}`)}
      className="rounded-[32px] overflow-hidden shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-44 md:h-52 bg-slate-100 overflow-hidden rounded-[32px] border-2 border-gray-200 group-hover:border-rose-700 transition-colors duration-300">
          <img
            src={data?.banner?.url || HeroBG}
            alt={data?.banner?.public_id || ""}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-2 text-xs flex-wrap">
            <span className="px-2.5 py-1 bg-rose-700/20 text-rose-700 font-medium rounded-[64px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-rose-700 rounded-full shrink-0" />
              Power Apps
            </span>
            <span className="px-2.5 py-1 bg-blue-300/20 text-blue-400 font-medium rounded-[64px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-300 rounded-full shrink-0" />
              Custom App
            </span>
          </div>
          <Tooltip placement="top" title={data?.product_name || "-"}>
            <h3 className="text-base font-semibold text-neutral-800 group-hover:text-rose-700 transition-colors duration-300 text-left line-clamp-1">
              {data?.product_name || "Letter Correspondence App"}
            </h3>
          </Tooltip>
          <p className="text-sm line-clamp-2 text-zinc-500 text-left">
            A correspondence management system used to record, manage, and monitor the flow of incoming and outgoing letters within an organization.
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-1 flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`${basePath}/${data._id}`);
          }}
          className="inline-flex items-center gap-2 text-rose-700 text-sm font-medium hover:underline cursor-pointer"
        >
          <span>View Project Detail</span>
          <ArrowRightIcon size={16} className="text-rose-700 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
