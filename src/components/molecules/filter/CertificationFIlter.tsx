/** @format */

"use client";

import FilterDropdown from "../../atoms/FilterDropdown";

const TECH: { label: string; value?: string }[] = [
  { label: "All Category" },
  { label: "Data Analytics", value: "DATA_ANALYTICS" },
  { label: "Automation", value: "AUTOMATION" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
  { label: "Emotional Intelligence", value: "EMOTIONAL_INTELLIGENCE" },
];

export interface CatalogFilterProps {
  techValue?: string;
  onTechChange: (value: string | undefined) => void;
}

export default function CertificationFilter({
  techValue,
  onTechChange,
}: Readonly<CatalogFilterProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center max-w-4xl">
      <FilterDropdown
        value={techValue}
        onChange={onTechChange}
        options={TECH}
        placeholder="All Category"
        variant="primary"
        className="catalog-filter-select w-full md:w-52"
      />
    </div>
  );
}
