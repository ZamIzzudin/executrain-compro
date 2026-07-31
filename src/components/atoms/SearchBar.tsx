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
}: Readonly<SearchBarProps>) {
  return (
    <Input
      allowClear
      size="large"
      placeholder={placeholder}
      prefix={<SearchIcon size={16} className="text-slate-400" />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${VARIANT_CLASS[variant]} rounded-full! ${className}`}
    />
  );
}
