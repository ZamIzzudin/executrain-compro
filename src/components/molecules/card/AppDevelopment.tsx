import { useNavigate } from "react-router-dom";
import { Clock, Users, ShieldCheck, Boxes, ArrowRightIcon } from "lucide-react";
import { Tooltip } from "antd";

import type { AppDevelopmentProps } from "@/services/app-development/types";

function methodLabel(value: string, options: any[]) {
  const found = options.find((o: any) => o.value === value);
  return found ? found.label : value?.replaceAll("_", " ");
}

function techLabel(value: string, options: any[]) {
  const found = options.find((o: any) => o.value === value);
  return found ? found.label : value?.replaceAll("_", " ");
}

export default function AppDevelopmentCard({
  data,
  basePath = "/app-development",
  techOptions = [],
  methodOptions = [],
}: Readonly<{
  data: AppDevelopmentProps;
  basePath?: string;
  techOptions?: { value: string; label: string }[];
  methodOptions?: { value: string; label: string }[];
}>) {
  const navigate = useNavigate();
  const totalTeam = (data.team_size ?? []).reduce(
    (sum, t) => sum + (t.quantity || 0),
    0,
  );

  return (
    <div
      onClick={() => navigate(`${basePath}/${data._id}`)}
      className="rounded-[32px] overflow-hidden shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Visual header */}
        <div className="h-44 md:h-52 bg-gradient-to-br from-rose-700 to-rose-900 overflow-hidden rounded-[32px] border-2 border-gray-200 group-hover:border-rose-700 transition-colors duration-300 flex items-center justify-center relative">
          {data.banner?.url ? (
            <img
              src={data.banner.url}
              alt={data.title || "Custom Application"}
              className="w-full h-full object-cover"
            />
          ) : (
            <Boxes className="w-16 h-16 text-white/70 group-hover:scale-110 transition-transform duration-500" />
          )}
          {data.methodology && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/20 text-white text-xs font-medium rounded-[64px]">
              {methodLabel(data.methodology, methodOptions)}
            </span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <div className="flex gap-2 text-xs flex-wrap">
            {data.tech_stack && data.tech_stack.length > 0 ? (
              data.tech_stack.slice(0, 3).map((ts: string) => (
                <span
                  key={ts}
                  className="px-2.5 py-1 bg-rose-700/20 text-rose-700 font-medium rounded-[64px] flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-rose-700 rounded-full shrink-0" />
                  {techLabel(ts, techOptions)}
                </span>
              ))
            ) : (
              <span className="px-2.5 py-1 bg-rose-700/20 text-rose-700 font-medium rounded-[64px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-rose-700 rounded-full shrink-0" />
                Custom App
              </span>
            )}
          </div>

          <Tooltip placement="top" title={data.title || "-"}>
            <h3 className="text-base font-semibold text-neutral-800 group-hover:text-rose-700 transition-colors duration-300 text-left line-clamp-1">
              {data.title || "Custom Application"}
            </h3>
          </Tooltip>

          <p className="text-sm line-clamp-2 text-zinc-500 text-left">
            {data.description ||
              "A custom application tailored to your organization's needs."}
          </p>

          {/* Meta: timeline, team, compliance */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rose-700" />
              {data.timeline} weeks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-700" />
              {totalTeam} people
            </span>
            {data.compliance && (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                {data.compliance}
              </span>
            )}
          </div>
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
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}