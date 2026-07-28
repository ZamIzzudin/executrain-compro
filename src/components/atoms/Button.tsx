/** @format */

"use client";

import { type ReactNode } from "react";

const bgColor = {
  primary: "bg-primary-500 border-2 border-primary-500",
  default: "bg-white border-2 border-white",
  disable: "bg-slate-300 border-2 border-slate-300",
  "outline-white": "bg-transparent border-2 border-white",
  "outline-primary": "bg-transparent border-2 border-primary-500",
};

const textColor = {
  primary: "text-white",
  default: "text-black",
  disable: "text-slate-500",
  "outline-white": "text-white",
  "outline-primary": "text-primary-500",
};

type ButtonProps = {
  label: string | ReactNode;
  rounded?: boolean;
  type?:
    | "primary"
    | "default"
    | "disable"
    | "outline-white"
    | "outline-primary";
  icon?: ReactNode;
  size?: "sm" | "md";
  onClick?: () => void;
};

export default function Button({
  label,
  rounded = false,
  type = "default",
  icon,
  size = "md",
  onClick = () => {},
}: Readonly<ButtonProps>) {
  return (
    <button
      onClick={() => onClick()}
      className={`${textColor[type]} ${
        bgColor[type]
      } px-3 md:px-5 py-2 font-semibold  ${
        rounded ? "rounded-full" : "rounded-md"
      } flex items-center gap-2 ${
        type === "disable" ? "cursor-not-allowed" : "cursor-pointer"
      } ${size === "sm" ? "text-xs" : "text-[12px] md:text-base"}`}
      type="button"
      disabled={type === "disable"}
    >
      {label}
      {icon && icon}
    </button>
  );
}
