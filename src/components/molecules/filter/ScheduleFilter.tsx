/** @format */

"use client";

import SearchBar from "../../atoms/SearchBar";
import FilterDropdown from "../../atoms/FilterDropdown";

export interface ScheduleFilterProps {
  searchValue: string;
  dateValue: string; // "YYYY-MM"
  categoryValue?: string;
  typeValue?: string;
  categories?: { value: string; label: string }[];
  types?: { value: string; label: string }[];
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onTypeChange: (value: string | undefined) => void;
}

export default function ScheduleFilter({
  searchValue,
  dateValue,
  categoryValue,
  typeValue,
  categories,
  types,
  onSearchChange,
  onDateChange,
  onCategoryChange,
  onTypeChange,
}: Readonly<ScheduleFilterProps>) {
  const categoryOptions = [
    { label: "All Category" },
    ...(categories ?? []).map((o) => ({ label: o.label, value: o.value })),
  ];

  const typeOptions = [
    { label: "All Type" },
    ...(types ?? []).map((o) => ({ label: o.label, value: o.value })),
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-end w-full">
      <div className="w-full lg:w-[420px]">
        <SearchBar
          label="Search Program"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search for a course or class..."
          variant="default"
          className="w-full"
        />
      </div>

      <div className="w-full lg:w-52">
        <label
          className="text-xs font-medium mb-1.5 block opacity-80"
          htmlFor="schedule-date-filter"
        >
          Date
        </label>
        <input
          id="schedule-date-filter"
          type="month"
          value={dateValue}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full h-10 px-4 rounded-full bg-white outline outline-1 outline-offset-[-1px] outline-gray-300 text-sm font-normal text-neutral-800 focus:outline-rose-700 transition-colors"
        />
      </div>

      <div className="w-full lg:w-44">
        <FilterDropdown
          label="Category"
          value={categoryValue}
          onChange={onCategoryChange}
          options={categoryOptions}
          placeholder="All Category"
          variant="primary"
          className="w-full"
        />
      </div>

      <div className="w-full lg:w-44">
        <FilterDropdown
          label="Type"
          value={typeValue}
          onChange={onTypeChange}
          options={typeOptions}
          placeholder="All Type"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}
