/** @format */

import { Select, ConfigProvider } from "antd";

const PRIMARY = "#BE0F34";

export type FilterDropdownVariant = "default" | "primary";

export interface FilterDropdownOption {
  label: string;
  value?: string;
}

export interface FilterDropdownProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  options: FilterDropdownOption[];
  placeholder?: string;
  variant?: FilterDropdownVariant;
  className?: string;
}

const VARIANT_CLASS: Record<FilterDropdownVariant, string> = {
  default: "filter-dropdown-default",
  primary: "filter-dropdown-primary",
};

const POPUP_CLASS = "filter-dropdown-popup";

const primaryTheme = {
  token: { colorPrimary: PRIMARY, borderRadius: 9999 },
  components: {
    Select: {
      colorBgContainer: PRIMARY,
      colorText: "#ffffff",
      colorTextPlaceholder: "#ffffff",
      colorIcon: "#ffffff",
      colorIconHover: "#ffffff",
      borderRadius: 9999,
      controlOutline: `${PRIMARY}33`,
      colorPrimary: PRIMARY,
    },
  },
};

export default function FilterDropdown({
  value,
  onChange,
  options,
  placeholder = "All",
  variant = "default",
  className = "",
}: Readonly<FilterDropdownProps>) {
  const select = (
    <Select
      size="large"
      value={value}
      onChange={(val: string | undefined) => onChange(val)}
      placeholder={placeholder}
      className={`${VARIANT_CLASS[variant]} rounded-full! ${className}`}
      popupClassName={POPUP_CLASS}
      options={options.map((opt) => ({
        label: opt.label,
        value: opt.value ?? "",
      }))}
      allowClear
      onClear={() => onChange(undefined)}
    />
  );

  if (variant === "primary") {
    return <ConfigProvider theme={primaryTheme}>{select}</ConfigProvider>;
  }
  return select;
}
