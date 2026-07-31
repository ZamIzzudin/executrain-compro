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
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center w-full max-w-4xl">
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search course..."
        variant="glass"
        className="catalog-filter-input flex-1"
      />

      <FilterDropdown
        value={categoryValue}
        onChange={onCategoryChange}
        options={CATEGORIES}
        placeholder="All Categories"
        variant="primary"
        className="catalog-filter-select w-full md:w-52"
      />

      <FilterDropdown
        value={frameworkValue}
        onChange={onFrameworkChange}
        options={FRAMEWORKS}
        placeholder="All Frameworks"
        variant="primary"
        className="catalog-filter-select w-full md:w-52"
      />
    </div>
  );
}
