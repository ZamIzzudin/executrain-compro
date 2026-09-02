import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";

import { ArrowRightIcon, ClockIcon, Boxes } from "lucide-react";
import { formatDate } from "@/utils/helper";

import type { CaseStudyProps } from "@/services/case-study/types";

function optionLabel(value: string, options: any[]) {
  const found = options.find((o: any) => o.value === value);
  return found ? found.label : value?.replaceAll("_", " ");
}

export default function CaseStudyCard({
  data,
  basePath = "/case-study",
  categoryOptions = [],
}: Readonly<{
  data: CaseStudyProps;
  basePath?: string;
  categoryOptions?: { value: string; label: string }[];
}>) {
  const navigate = useNavigate();
  const now = Date.now();

  return (
    <div
      onClick={() => navigate(`${basePath}/${data._id}`)}
      className="rounded-[32px] overflow-hidden shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 transition-all duration-300 cursor-pointer group flex flex-col justify-start items-start"
    >
      <div className="w-full h-52 bg-slate-100 overflow-hidden rounded-[32px] border-2 border-gray-200 group-hover:border-rose-700 transition-colors duration-300 relative">
        {data.category ? (
          <div className="w-full h-full bg-gradient-to-br from-rose-700 to-rose-900 flex items-center justify-center">
            <Boxes className="w-14 h-14 text-white/70 group-hover:scale-110 transition-transform duration-500" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="w-full p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex items-center gap-1.5 text-neutral-800 text-sm font-medium">
              <ClockIcon size={16} className="text-rose-700 shrink-0" />
              <span>
                {data.created_at
                  ? formatDate(new Date(data.created_at).getTime())
                  : formatDate(now)}
              </span>
            </div>
            {data.category && (
              <div className="px-2.5 py-1 bg-orange-400/20 rounded-[64px] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0" />
                <span className="text-orange-400 text-xs font-medium">
                  {optionLabel(data.category, categoryOptions)}
                </span>
              </div>
            )}
          </div>
          <Tooltip placement="top" title={data.title || "-"}>
            <h3 className="text-base font-medium text-left text-neutral-800 group-hover:text-rose-700 transition-colors duration-300 line-clamp-2">
              {data.title || "Case Study"}
            </h3>
          </Tooltip>
        </div>
        <div className="inline-flex items-center gap-2 text-rose-700 font-medium text-base pt-2">
          <span>Read More</span>
          <ArrowRightIcon size={18} className="text-rose-700 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
