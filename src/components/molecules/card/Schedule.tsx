/** @format */

"use client";

import { useNavigate } from "react-router-dom";
import { CalendarDays, ArrowRight, Award } from "lucide-react";

import type { PublicScheduleProgram } from "@/services/schedule/handler";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Des",
];

function titleCase(value?: string): string {
  if (!value) return "-";
  return value
    .replaceAll("_", " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (upper === "IT" || upper === "AI") return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export default function ScheduleCard({
  data,
  onRequest,
}: Readonly<{
  data: PublicScheduleProgram;
  onRequest: (program: PublicScheduleProgram) => void;
}>) {
  const navigate = useNavigate();
  const basePath =
    data.entity_type === "COURSE" ? "/course-catalog" : "/skill-accelerator";
  const detailUrl = `${basePath}/${data.entity_id}`;

  const monthly = data.monthly_ranges ?? new Array(12).fill("");
  const duration = data.duration ?? 0;

  return (
    <div
      onClick={() => navigate(detailUrl)}
      className="rounded-[20px] bg-white border border-gray-200 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] hover:border-rose-200 transition-all duration-300 p-4 flex gap-4 items-center cursor-pointer"
    >
      {/* MAIN */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-500 font-medium px-3 py-1 rounded-full">
                ● {data.category_label || titleCase(data.category)}
              </span>
              <span className="inline-flex items-center gap-1 text-neutral-600 font-medium">
                <Award size={12} className="text-rose-700" />
                {titleCase(data.skill_level)}
              </span>
              <span className="inline-flex items-center gap-1 text-neutral-600 font-medium">
                <CalendarDays size={12} className="text-rose-700" />
                {duration} Day{duration !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-left text-base sm:text-[17px] font-semibold text-neutral-900 leading-snug truncate">
              {data.program_name || "-"}
            </h3>
          </div>

          {/* RIGHT — actions */}
          <div className="shrink-0 flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRequest(data);
              }}
              className="h-8 px-4 bg-rose-700 hover:bg-rose-800 text-white rounded-full text-[11px] sm:text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              Book Class
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* MONTHLY ACTIVITY — rentang tanggal tiap bulan */}
        <div className="mt-auto pt-2 flex items-start gap-1">
          {MONTHS.map((month, i) => {
            const value = monthly[i] || "-";
            const hasSchedule = Boolean(monthly[i]);
            return (
              <div
                key={month}
                className="flex-1 min-w-0 flex flex-col items-center gap-2 border-r border-gray-100 last:border-r-0"
              >
                <span className="text-[10px] sm:text-[11px] text-gray-400">
                  {month}
                </span>
                <span
                  title={hasSchedule ? `${month}: ${value}` : undefined}
                  className={`text-[10px] sm:text-[11px] font-semibold text-center leading-tight ${
                    hasSchedule ? "text-rose-700" : "text-gray-300"
                  }`}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
