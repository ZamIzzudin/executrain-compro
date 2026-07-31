/** @format */

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const getPageRange = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const range: (number | "...")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  range.push(total);
  return range;
};

export interface PaginationProps {
  current: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  current,
  totalPages,
  onChange,
  className = "",
}: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null;

  const range = getPageRange(current, totalPages);
  const isPrevDisabled = current <= 1;
  const isNextDisabled = current >= totalPages;

  const btnClass = (disabled: boolean) =>
    `flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      disabled
        ? "text-slate-300 cursor-not-allowed"
        : "text-white bg-primary-500 hover:bg-primary-400 cursor-pointer"
    }`;

  return (
    <div
      className={`flex items-center justify-between w-full mt-10 ${className}`}
    >
      <button
        type="button"
        disabled={isPrevDisabled}
        onClick={() => onChange(current - 1)}
        className={btnClass(isPrevDisabled)}
      >
        <ArrowLeftIcon size={16} />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {range.map((p, idx) =>
          p === "..." ? (
            <span
              key={`ellipsis-${p}-${idx}`}
              className="px-3 py-2 text-sm font-medium text-slate-400 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`min-w-9 h-9 px-3 text-sm font-medium transition-colors cursor-pointer rounded-lg ${
                p === current
                  ? "bg-primary-500 text-white"
                  : "bg-transparent text-primary-500 hover:bg-primary-50"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        disabled={isNextDisabled}
        onClick={() => onChange(current + 1)}
        className={btnClass(isNextDisabled)}
      >
        <span>Next</span>
        <ArrowRightIcon size={16} />
      </button>
    </div>
  );
}
