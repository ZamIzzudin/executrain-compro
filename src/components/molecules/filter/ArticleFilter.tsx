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

export interface ArticleFilterProps {
  searchValue: string;
  categoryValue?: string;
  sortValue?: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSortChange: (value: string | undefined) => void;
}

export default function ArticleFilter({
  searchValue,
  categoryValue,
  sortValue,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: Readonly<ArticleFilterProps>) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
      <div className="w-full sm:w-[466px]">
        <SearchBar
          label="Search Article"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search for an article"
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
