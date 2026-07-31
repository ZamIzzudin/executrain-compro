/** @format */

"use client";

import FilterDropdown from "../../atoms/FilterDropdown";

const TECH: { label: string; value?: string }[] = [
  { label: "All Tech Stack" },
  { label: "Data Analytics", value: "DATA_ANALYTICS" },
  { label: "Automation", value: "AUTOMATION" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
  { label: "Emotional Intelligence", value: "EMOTIONAL_INTELLIGENCE" },
];

const DEPLOY: { label: string; value?: string }[] = [
  { label: "All Deployment" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Artificial Intelligence", value: "AI" },
  { label: "Project Management", value: "PROJECT_MANAGEMENT" },
];

export interface CatalogFilterProps {
  techValue?: string;
  deployValue?: string;
  onTechChange: (value: string | undefined) => void;
  onDeployChange: (value: string | undefined) => void;
}

export default function ProductFilter({
  techValue,
  deployValue,
  onTechChange,
  onDeployChange,
}: Readonly<CatalogFilterProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center max-w-4xl">
      <FilterDropdown
        value={techValue}
        onChange={onTechChange}
        options={TECH}
        placeholder="All Tech Stack"
        variant="primary"
        className="catalog-filter-select w-full md:w-52"
      />

      <FilterDropdown
        value={deployValue}
        onChange={onDeployChange}
        options={DEPLOY}
        placeholder="All Deployment"
        variant="primary"
        className="catalog-filter-select w-full md:w-52"
      />
    </div>
  );
}
