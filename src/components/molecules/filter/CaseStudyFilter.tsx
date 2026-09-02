/** @format */

"use client";

import SearchBar from "../../atoms/SearchBar";
import FilterDropdown from "../../atoms/FilterDropdown";

const SORT: { label: string; value?: string }[] = [
  { label: "Newest First" },
  { label: "Oldest First", value: "oldest" },
];

export interface CaseStudyFilterProps {
  searchValue: string;
  categoryValue?: string;
  sortValue?: string;
  categoryOptions?: { value: string; label: string }[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSortChange: (value: string | undefined) => void;
}

export default function CaseStudyFilter({
  searchValue,
  categoryValue,
  sortValue,
  categoryOptions,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: Readonly<CaseStudyFilterProps>) {
  const CATEGORIES: { label: string; value?: string }[] = [
    { label: "All Categories" },
    ...(categoryOptions ?? []).map((o) => ({
      label: o.label || o.value,
      value: o.value,
    })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
      <div className="w-full sm:w-[466px]">
        <SearchBar
          label="Search Case Study"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search for a case study"
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
          label="Sort By"
          value={sortValue}
          onChange={onSortChange}
          options={SORT}
          placeholder="Newest first"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}
