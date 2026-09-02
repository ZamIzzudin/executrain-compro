/** @format */

"use client";

import FilterDropdown from "../../atoms/FilterDropdown";

/**
 * Deployment filter — HARDCODED (belum ada data di DB).
 * Nanti bisa diintegrasikan ke master data / kolom deployment.
 */
const DEPLOY: { label: string; value?: string }[] = [
  { label: "All Deployment" },
  { label: "On Cloud", value: "ON_CLOUD" },
  { label: "On Premise", value: "ON_PREMISE" },
];

export interface ProductFilterProps {
  techValue?: string;
  deployValue?: string;
  techOptions?: { value: string; label: string }[];
  onTechChange: (value: string | undefined) => void;
  onDeployChange: (value: string | undefined) => void;
}

export default function ProductFilter({
  techValue,
  deployValue,
  techOptions,
  onTechChange,
  onDeployChange,
}: Readonly<ProductFilterProps>) {
  const TECH: { label: string; value?: string }[] = [
    { label: "All Tech Stack" },
    ...(techOptions ?? []).map((o) => ({
      label: o.label || o.value,
      value: o.value,
    })),
  ];

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
