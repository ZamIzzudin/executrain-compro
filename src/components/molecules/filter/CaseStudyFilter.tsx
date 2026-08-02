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

const SORT: { label: string; value?: string }[] = [
  { label: "Newest First" },
  { label: "Oldest First", value: "DESC" },
];

export interface CaseStudyFilterProps {
  searchValue: string;
  categoryValue?: string;
  sortValue?: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSortChange: (value: string | undefined) => void;
}

export default function CaseStudyFilter({
  searchValue,
  categoryValue,
  sortValue,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: Readonly<CaseStudyFilterProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center w-full max-w-4xl">
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search for case study..."
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
        value={sortValue}
        onChange={onSortChange}
        options={SORT}
        placeholder="Newest First"
        variant="primary"
        className="catalog-filter-select w-full md:w-52"
      />
    </div>
  );
}
