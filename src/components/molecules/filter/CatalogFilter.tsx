/** @format */

"use client";

import SearchBar from "../../atoms/SearchBar";
import FilterDropdown from "../../atoms/FilterDropdown";

const CATEGORIES: { label: string; value?: string }[] = [
  { label: "All Categories" },
  { label: "Data Analytics", value: "DATA_ANALYTICS" },
  { label: "Automation", value: "AUTOMATION" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
  { label: "Emotional Intelligence", value: "EMOTIONAL_INTELLIGENCE" },
];

const FRAMEWORKS: { label: string; value?: string }[] = [
  { label: "All Frameworks" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Artificial Intelligence", value: "AI" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
];

export interface CatalogFilterProps {
  searchValue: string;
  categoryValue?: string;
  frameworkValue?: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onFrameworkChange: (value: string | undefined) => void;
}

export default function CatalogFilter({
  searchValue,
  categoryValue,
  frameworkValue,
  onSearchChange,
  onCategoryChange,
  onFrameworkChange,
}: Readonly<CatalogFilterProps>) {
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
          options={CATEGORIES}
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
          options={FRAMEWORKS}
          placeholder="All Framework"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}
