/** @format */

import { Input } from "antd";
import { SearchIcon } from "lucide-react";

export type SearchBarVariant = "default" | "glass" | "primary";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: SearchBarVariant;
  className?: string;
  label?: string;
}

const VARIANT_CLASS: Record<SearchBarVariant, string> = {
  default: "search-bar-default",
  glass: "search-bar-glass",
  primary: "search-bar-primary",
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  variant = "default",
  className = "",
  label,
}: Readonly<SearchBarProps>) {
  const renderInput = (inputClass: string) => (
    <Input
      allowClear
      size="large"
      placeholder={placeholder}
      suffix={<SearchIcon size={16} className="text-slate-400" />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${VARIANT_CLASS[variant]} rounded-full! ${inputClass}`}
    />
  );

  if (label) {
    return (
      <div className={className}>
        <label className="text-xs font-medium mb-1.5 block opacity-80">
          {label}
        </label>
        {renderInput("w-full")}
      </div>
    );
  }

  return renderInput(className);
}
