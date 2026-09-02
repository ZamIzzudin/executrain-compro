/** @format */

"use client";

import FilterDropdown from "../../atoms/FilterDropdown";

export interface AppDevelopmentFilterProps {
  techValue?: string;
  methodValue?: string;
  techOptions?: { value: string; label: string }[];
  methodOptions?: { value: string; label: string }[];
  onTechChange: (value: string | undefined) => void;
  onMethodChange: (value: string | undefined) => void;
}

export default function AppDevelopmentFilter({
  techValue,
  methodValue,
  techOptions,
  methodOptions,
  onTechChange,
  onMethodChange,
}: Readonly<AppDevelopmentFilterProps>) {
  const TECH: { label: string; value?: string }[] = [
    { label: "All Tech Stack" },
    ...(techOptions ?? []).map((o) => ({
      label: o.label || o.value,
      value: o.value,
    })),
  ];

  const METHOD: { label: string; value?: string }[] = [
    { label: "All Methodology" },
    ...(methodOptions ?? []).map((o) => ({
      label: o.label || o.value,
      value: o.value,
    })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
      <div className="w-full sm:w-48">
        <FilterDropdown
          label="Tech Stack"
          value={techValue}
          onChange={onTechChange}
          options={TECH}
          placeholder="All Tech Stack"
          variant="primary"
          className="w-full"
        />
      </div>

      <div className="w-full sm:w-48">
        <FilterDropdown
          label="Methodology"
          value={methodValue}
          onChange={onMethodChange}
          options={METHOD}
          placeholder="All Methodology"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}