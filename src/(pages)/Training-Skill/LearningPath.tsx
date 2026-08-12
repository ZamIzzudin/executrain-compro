"use client";

import { useState, useRef, useEffect } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CTA from "@/components/organisms/CTA";
import { FadeInUp } from "@/components/atoms";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

type SectionKey =
  | "fundamental"
  | "roleBased"
  | "speciality"
  | "business"
  | "outsidePath";

type CourseVariant =
  | "normal"
  | "dashed"
  | "active"
  | "continuation"
  | "activeContinuation";

type CourseItem = {
  title: string;
  code: string;
  variant: CourseVariant;
  continuationText?: string;
};

const sections: {
  key: SectionKey;
  title: string;
  subtitle?: string;
  dashed?: boolean;
}[] = [
  {
    key: "fundamental",
    title: "Fundamentals",
    subtitle: "Master the basics",
  },
  {
    key: "roleBased",
    title: "Role-Based",
    subtitle: "Expand your technical skill set",
  },
  {
    key: "speciality",
    title: "Speciality",
    subtitle: "Deepen your technical skills and manage industry solutions",
  },
  {
    key: "business",
    title: "Business",
    subtitle: "Expand your AI skills for business roles",
  },
  {
    key: "outsidePath",
    title: "Class Outside of Learning Path",
    dashed: true,
  },
];

// TODO: replace with real data from API/CMS
const dummyCourses: Record<SectionKey, CourseItem[]> = {
  fundamental: [
    { title: "Azure Data Fundamentals", code: "DP-900", variant: "dashed" },
    { title: "Azure AI Fundamentals", code: "AI-900", variant: "dashed" },
    { title: "Azure Fundamentals", code: "AZ-900", variant: "active" },
  ],
  roleBased: [
    {
      title: "Azure AI Cloud Developer Associate C...",
      code: "AI-908",
      variant: "normal",
    },
    {
      title: "Multi-Agent AI Solutions Expert Certi...",
      code: "AI-901",
      variant: "normal",
    },
    {
      title: "Azure Network Engineer Associate",
      code: "NE-900",
      variant: "normal",
    },
    {
      title: "Azure AI Manager Associate",
      code: "AI-902",
      variant: "continuation",
      continuationText: "Azure AI Fundamentals",
    },
    {
      title: "Azure Administrator Associate",
      code: "AZ-902",
      variant: "activeContinuation",
      continuationText: "Azure Fundamentals",
    },
    {
      title: "Azure Administrator Associate",
      code: "AZ-104",
      variant: "normal",
    },
    {
      title: "Windows Server Administrator Associate",
      code: "AI-901",
      variant: "normal",
    },
    {
      title: "Machine Learning Operations Engineer...",
      code: "AI-300",
      variant: "normal",
    },
    {
      title: "Azure Databricks Data Engineer",
      code: "DP-750",
      variant: "normal",
    },
    { title: "SQL AI Developer Associate", code: "DA-206", variant: "normal" },
  ],
  speciality: [
    {
      title: "Azure Solutions Architect Expert",
      code: "AZ-305",
      variant: "normal",
    },
    {
      title: "Azure Security Engineer Associate",
      code: "AZ-500",
      variant: "normal",
    },
    {
      title: "Azure DevOps Engineer Expert",
      code: "AZ-400",
      variant: "normal",
    },
  ],
  business: [
    { title: "AI Business Fundamentals", code: "AI-B01", variant: "dashed" },
    { title: "Power Platform Fundamentals", code: "PL-900", variant: "normal" },
    { title: "Dynamics 365 Fundamentals", code: "MB-901", variant: "normal" },
  ],
  outsidePath: [
    {
      title: "Azure Administrator Associate",
      code: "AZ-104",
      variant: "normal",
    },
    {
      title: "Windows Server Administrator Associate",
      code: "AI-901",
      variant: "normal",
    },
    {
      title: "Machine Learning Operations Engineer...",
      code: "AI-300",
      variant: "normal",
    },
    {
      title: "Azure Databricks Data Engineer",
      code: "DP-750",
      variant: "normal",
    },
    { title: "SQL AI Developer Associate", code: "DA-206", variant: "normal" },
  ],
};

// Dummy capsule filters — replace with real taxonomy from API/CMS
const capsuleFilters = ["Azure 2026 LP", "Azure 2026 LP", "Azure 2026 LP"];

const dropdownOptions = [
  "Cloud & Platforms",
  "AI & Data",
  "Business Applications",
  "Security",
];

function CourseCard({ course }: { course: CourseItem }) {
  const isActive =
    course.variant === "active" || course.variant === "activeContinuation";
  const isDashed = course.variant === "dashed";
  const hasContinuation =
    course.variant === "continuation" ||
    course.variant === "activeContinuation";

  return (
    <div
      className={`relative rounded-3xl bg-white transition-colors h-fit ${
        isActive
          ? "border-2 border-primary-500"
          : isDashed
            ? "border-2 border-dashed border-gray-300"
            : "border border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2 px-4 pt-4 pb-1">
        <h4
          className={`text-sm font-semibold leading-snug line-clamp-2 ${
            isActive ? "text-primary-500" : "text-gray-800"
          }`}
        >
          {course.title}
        </h4>
        {isActive && (
          <ArrowRight className="w-4 h-4 shrink-0 text-primary-500 mt-0.5" />
        )}
      </div>
      <span className="block text-xs text-gray-400 px-4 pb-4">
        {course.code}
      </span>

      {hasContinuation && (
        <div className="border-t border-gray-300 px-4 py-4">
          <span className="block text-[11px] text-gray-400">
            Continuation of class
          </span>
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              isActive ? "text-primary-500" : "text-gray-500"
            }`}
          >
            <CornerDownRight className="w-3 h-3" />
            {course.continuationText}
          </span>
        </div>
      )}
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (option: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus first matching option when opening with keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      }
      // After opening, focus the first/last item
      requestAnimationFrame(() => {
        const items =
          listRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (items && items.length > 0) {
          if (e.key === "ArrowDown") items[0].focus();
          else items[items.length - 1].focus();
        }
      });
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 bg-primary-500 text-white text-sm font-medium px-4 py-3 rounded-full hover:bg-primary-600 transition-colors"
      >
        {value}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
        >
          {dropdownOptions.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              onClick={() => {
                onChange(option);
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                option === value
                  ? "text-primary-500 font-medium bg-primary-50"
                  : "text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CapsuleFilters({
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {capsuleFilters.map((label, i) => (
        <button
          key={`${label}-${i}`}
          type="button"
          onClick={() => onChange(i)}
          className={`text-xs font-medium px-4 py-3 rounded-full border transition-colors ${
            activeIndex === i
              ? "bg-primary-500 border-primary-500 text-white"
              : "bg-white border-primary-500 text-primary-500 hover:bg-primary-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function LearningPath() {
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
    fundamental: true,
    roleBased: true,
    speciality: false,
    business: false,
    outsidePath: true,
  });

  const [activeFilter, setActiveFilter] = useState(dropdownOptions[0]);
  const [activeCapsule, setActiveCapsule] = useState(0);

  const toggle = (key: SectionKey) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Learning Paths"
        subtitle="Learning Paths"
        description="A structured, sequential sequence of courses, modules, and milestones designed to guide a learner from a beginner level to mastery in a specific role, subject, or domain."
        path="/learning-path"
      />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] w-full space-y-5">
        <FadeInUp
          delay={0.1}
          duration={0.5}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-5 border-b border-gray-400"
        >
          <h2 className="font-semibold text-2xl capitalize">
            Learning Path According To Framework
          </h2>
          <FilterDropdown value={activeFilter} onChange={setActiveFilter} />
        </FadeInUp>

        <CapsuleFilters
          activeIndex={activeCapsule}
          onChange={setActiveCapsule}
        />

        {sections.map(({ key, title, subtitle, dashed }) => (
          <section
            key={key}
            className={`rounded-xl p-4 ${
              dashed
                ? "border-[#ECECEC] border-dashed border-4"
                : "bg-[#ECECEC]"
            }`}
          >
            {/* Header — always visible */}
            <button
              type="button"
              onClick={() => toggle(key)}
              className="w-full flex justify-between items-center gap-4 cursor-pointer"
            >
              <div className="text-left">
                <h3 className="text-2xl font-semibold">{title}</h3>
                {subtitle && (
                  <span className="text-base text-gray-400">{subtitle}</span>
                )}
              </div>
              <span className="shrink-0 block bg-primary-500 text-white p-2 rounded-lg">
                {expanded[key] ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                expanded[key] ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {dummyCourses[key].map((course, i) => (
                    <CourseCard key={`${key}-${i}`} course={course} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
      <CTA />
    </section>
  );
}
