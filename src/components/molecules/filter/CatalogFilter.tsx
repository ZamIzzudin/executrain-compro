/** @format */

"use client";

import { useMemo } from "react";

import SearchBar from "../../atoms/SearchBar";
import FilterDropdown from "../../atoms/FilterDropdown";
import type { FilterOption } from "@/services/course-catalog/filters";

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

/**
 * Filter katalog: pilih Framework (scope) dulu, lalu Category (item FRAMEWORK_ITEM
 * di dalam scope tsb). Saat category dipilih tanpa framework, framework di-set
 * dari scope category tsb supaya konsisten.
 */
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
  // Category yang valid utk framework terpilih. Tanpa framework → belum bisa pilih category.
  const scopedCategories = useMemo(() => {
    const all = categories ?? [];
    if (!frameworkValue) return [];
    return all.filter((c) => !c.scope || c.scope === frameworkValue);
  }, [categories, frameworkValue]);

  const categoryOptions = toOptions(scopedCategories, "All Category");
  const frameworkOptions = toOptions(frameworks, "All Framework");

  const handleFrameworkChange = (value: string | undefined) => {
    // Reset category diserahkan ke parent (onFrameworkChange). Dipanggil sekali
    // saja supaya tidak ada dua setSearchParams sinkron yang saling menimpa
    // (React Router menghitung prev dari closure render lama).
    onFrameworkChange(value);
  };

  const handleCategoryChange = (value: string | undefined) => {
    onCategoryChange(value);
  };

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
          label="Framework"
          value={frameworkValue}
          onChange={handleFrameworkChange}
          options={frameworkOptions}
          placeholder="All Framework"
          variant="primary"
          className="w-full"
        />
      </div>

      <div className="w-full sm:w-44">
        <FilterDropdown
          label="Category"
          value={categoryValue}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder={frameworkValue ? "All Category" : "Select Framework First"}
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}
