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
    <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
      <div className="w-full sm:w-44">
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

      <div className="w-full sm:w-44">
        <FilterDropdown
          label="Deployment"
          value={deployValue}
          onChange={onDeployChange}
          options={DEPLOY}
          placeholder="All Deployment"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}
