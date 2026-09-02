/** @format */

"use client";

import SearchBar from "../../atoms/SearchBar";
import FilterDropdown from "../../atoms/FilterDropdown";
import type { FilterOption } from "@/services/course-catalog/filters";

const FALLBACK_CATEGORIES: FilterOption[] = [
  "DATA_ANALYTICS",
  "AUTOMATION",
  "CYBERSECURITY",
  "PROJECT_MANAGEMENT",
  "LEADERSHIP",
  "EMOTIONAL_INTELLIGENCE",
].map((v) => ({ value: v, label: v.replaceAll("_", " ") }));

function toOptions(
  values: FilterOption[] | undefined,
  allLabel: string,
): { label: string; value?: string }[] {
  return [
    { label: allLabel },
    ...(values ?? []).map((o) => ({
      label: o.label || o.value,
      value: o.value,
    })),
  ];
}

export interface CatalogFilterProps {
  searchValue: string;
  categoryValue?: string;
  frameworkValue?: string;
  categories?: FilterOption[];
  frameworks?: FilterOption[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onFrameworkChange: (value: string | undefined) => void;
}

export default function CatalogFilter({
  searchValue,
  categoryValue,
  frameworkValue,
  categories,
  frameworks,
  onSearchChange,
  onCategoryChange,
  onFrameworkChange,
}: Readonly<CatalogFilterProps>) {
  const categoryOptions = toOptions(categories ?? FALLBACK_CATEGORIES, "All Category");
  const frameworkOptions = toOptions(frameworks, "All Framework");
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
      <div className="w-full sm:w-[466px]">
        <SearchBar
          label="Search Course"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search for a course..."
          variant="default"
          className="w-full"
        />
      </div>

      <div className="w-full sm:w-44">
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

      <div className="w-full sm:w-44">
        <FilterDropdown
          label="Framework"
          value={frameworkValue}
          onChange={onFrameworkChange}
          options={frameworkOptions}
          placeholder="All Framework"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}
