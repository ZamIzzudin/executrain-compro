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
  familyId?: string;
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

// Dummy courses with familyId for inheritance relation highlighting on hover
const dummyCourses: Record<SectionKey, CourseItem[]> = {
  fundamental: [
    { title: "Azure Data Fundamentals", code: "DP-900", familyId: "dp900", variant: "dashed" },
    { title: "Azure AI Fundamentals", code: "AI-900", familyId: "ai-family", variant: "dashed" },
    { title: "Azure Fundamentals", code: "AZ-900", familyId: "az-family", variant: "active" },
  ],
  roleBased: [
    {
      title: "Azure AI Cloud Developer Associate C...",
      code: "AI-908",
      familyId: "ai-family",
      variant: "normal",
    },
    {
      title: "Multi-Agent AI Solutions Expert Certi...",
      code: "AI-901",
      familyId: "ai-family",
      variant: "normal",
    },
    {
      title: "Azure Network Engineer Associate",
      code: "NE-900",
      familyId: "ne900",
      variant: "normal",
    },
    {
      title: "Azure AI Manager Associate",
      code: "AI-902",
      familyId: "ai-family",
      variant: "continuation",
      continuationText: "Azure AI Fundamentals",
    },
    {
      title: "Azure Administrator Associate",
      code: "AZ-902",
      familyId: "az-family",
      variant: "activeContinuation",
      continuationText: "Azure Fundamentals",
    },
    {
      title: "Azure Administrator Associate",
      code: "AZ-104",
      familyId: "az-family",
      variant: "normal",
    },
    {
      title: "Windows Server Administrator Associate",
      code: "AI-901",
      familyId: "win-family",
      variant: "normal",
    },
    {
      title: "Machine Learning Operations Engineer...",
      code: "AI-300",
      familyId: "ai-family",
      variant: "normal",
    },
    {
      title: "Azure Databricks Data Engineer",
      code: "DP-750",
      familyId: "dp900",
      variant: "normal",
    },
    { title: "SQL AI Developer Associate", code: "DA-206", familyId: "ai-family", variant: "normal" },
  ],
  speciality: [
    {
      title: "Azure Solutions Architect Expert",
      code: "AZ-305",
      familyId: "az-family",
      variant: "normal",
    },
    {
      title: "Azure Security Engineer Associate",
      code: "AZ-500",
      familyId: "az-family",
      variant: "normal",
    },
    {
      title: "Azure DevOps Engineer Expert",
      code: "AZ-400",
      familyId: "az-family",
      variant: "normal",
    },
  ],
  business: [
    { title: "AI Business Fundamentals", code: "AI-B01", familyId: "ai-family", variant: "dashed" },
    { title: "Power Platform Fundamentals", code: "PL-900", familyId: "power-family", variant: "normal" },
    { title: "Dynamics 365 Fundamentals", code: "MB-901", familyId: "dyn-family", variant: "normal" },
  ],
  outsidePath: [
    {
      title: "Azure Administrator Associate",
      code: "AZ-104",
      familyId: "az-family",
      variant: "normal",
    },
    {
      title: "Windows Server Administrator Associate",
      code: "AI-901",
      familyId: "win-family",
      variant: "normal",
    },
    {
      title: "Machine Learning Operations Engineer...",
      code: "AI-300",
      familyId: "ai-family",
      variant: "normal",
    },
    {
      title: "Azure Databricks Data Engineer",
      code: "DP-750",
      familyId: "dp900",
      variant: "normal",
    },
    { title: "SQL AI Developer Associate", code: "DA-206", familyId: "ai-family", variant: "normal" },
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

function CourseCard({
  course,
  isHoveredFamily,
  onMouseEnter,
  onMouseLeave,
}: {
  course: CourseItem;
  isHoveredFamily: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const isDashed = course.variant === "dashed";
  const hasContinuation = Boolean(course.continuationText);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-[20px] transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] z-20 h-fit self-start ${
        isHoveredFamily
          ? "bg-gradient-to-b from-white to-pink-50 outline outline-2 outline-offset-[-1px] outline-rose-700 scale-[1.02] shadow-xl"
          : isDashed
            ? "bg-white outline outline-1 outline-offset-[-1px] outline-neutral-300 hover:outline-rose-700 hover:bg-gradient-to-b hover:from-white hover:to-pink-50"
            : "bg-white outline outline-1 outline-offset-[-1px] outline-neutral-300 hover:outline-rose-700 hover:bg-gradient-to-b hover:from-white hover:to-pink-50"
      }`}
    >
      <div className="p-4 flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-between items-start gap-1">
          <h4
            className={`text-sm font-medium leading-snug line-clamp-2 transition-colors duration-300 ${
              isHoveredFamily ? "text-rose-700 font-semibold" : "text-neutral-800 group-hover:text-rose-700"
            }`}
          >
            {course.title}
          </h4>
        </div>
        <span className="text-xs font-normal text-neutral-400">
          {course.code}
        </span>
      </div>

      {hasContinuation && (
        <div
          className={`p-4 border-t transition-colors duration-300 ${
            isHoveredFamily
              ? "bg-white border-rose-700"
              : "bg-stone-50 border-neutral-300 group-hover:bg-white"
          }`}
        >
          <span className="block text-xs font-normal text-neutral-400">
            Continuation of class:
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-normal underline ${
              isHoveredFamily ? "text-rose-700 font-medium" : "text-neutral-800 group-hover:text-rose-700"
            }`}
          >
            <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
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
    <div className="relative z-30" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 bg-rose-700 text-white text-sm font-medium px-4 py-3 rounded-full hover:bg-rose-800 transition-colors cursor-pointer"
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
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 overflow-hidden"
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
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
                option === value
                  ? "text-rose-700 font-medium bg-pink-50"
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
    <div className="flex flex-wrap gap-2 z-20">
      {capsuleFilters.map((label, i) => (
        <button
          key={`${label}-${i}`}
          type="button"
          onClick={() => onChange(i)}
          className={`text-xs font-medium px-4 py-3 rounded-full border transition-colors cursor-pointer ${
            activeIndex === i
              ? "bg-rose-700 border-rose-700 text-white"
              : "bg-white border-rose-700 text-rose-700 hover:bg-pink-50"
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
  const [hoveredTarget, setHoveredTarget] = useState<{
    familyId?: string;
    title: string;
    continuationText?: string;
  } | null>(null);

  const toggle = (key: SectionKey) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-[#FCFCFC] relative">
      {/* Dimmed backdrop overlay when a family card is hovered */}
      <div
        className={`fixed inset-0 bg-black/40 z-10 transition-opacity duration-300 pointer-events-none ${
          hoveredTarget ? "opacity-100" : "opacity-0"
        }`}
      />

      <CustomHero
        title="Learning Paths"
        subtitle="Learning Paths"
        description="A structured, sequential sequence of courses, modules, and milestones designed to guide a learner from a beginner level to mastery in a specific role, subject, or domain."
        path="/learning-path"
      />

      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-tl-[48px] rounded-tr-[48px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05)] border-t border-gray-200 flex flex-col justify-center items-start gap-6 relative">
        {/* Header & Dropdown */}
        <div className="self-stretch flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-20">
          <h2 className="text-neutral-800 text-2xl font-semibold">
            Learning Path According To Framework
          </h2>
          <FilterDropdown value={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-zinc-200" />

        {/* Capsule Pill Filters */}
        <CapsuleFilters
          activeIndex={activeCapsule}
          onChange={setActiveCapsule}
        />

        {/* Sections */}
        <div className="self-stretch flex flex-col gap-6 relative">
          {sections.map(({ key, title, subtitle, dashed }) => (
            <div
              key={key}
              className={`self-stretch px-6 py-5 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] flex flex-col justify-start items-center gap-6 overflow-hidden transition-all duration-300 relative z-20 ${
                dashed
                  ? "bg-white outline outline-1 outline-offset-[-1px] outline-neutral-300"
                  : "bg-stone-50 outline outline-1 outline-offset-[-1px] outline-gray-200"
              }`}
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggle(key)}
                className="self-stretch inline-flex justify-between items-center cursor-pointer text-left"
              >
                <div className="flex flex-col justify-start items-start">
                  <h3 className="text-neutral-800 text-2xl font-semibold">
                    {title}
                  </h3>
                  {subtitle && (
                    <span className="text-neutral-400 text-base font-normal">
                      {subtitle}
                    </span>
                  )}
                </div>
                <div className="p-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg flex justify-center items-center transition-colors duration-300">
                  {expanded[key] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Accordion Content Grid */}
              <div
                className={`w-full grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  expanded[key] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="relative p-4 rounded-3xl bg-transparent">
                    {/* SVG container for clean 12px dashed border with long dashes */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="99.8%"
                        height="99.5%"
                        rx="24"
                        ry="24"
                        fill="none"
                        stroke="#D4D4D4"
                        strokeWidth="2"
                        strokeDasharray="14 8"
                      />
                    </svg>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full items-start relative z-20">
                      {dummyCourses[key].map((course, i) => {
                        const isHoveredFamily = Boolean(hoveredTarget) && (
                          (hoveredTarget?.familyId && course.familyId === hoveredTarget.familyId) ||
                          (hoveredTarget?.continuationText && course.title.toLowerCase().includes(hoveredTarget.continuationText.toLowerCase())) ||
                          (course.continuationText && hoveredTarget?.title.toLowerCase().includes(course.continuationText.toLowerCase()))
                        );

                        return (
                          <CourseCard
                            key={`${key}-${i}`}
                            course={course}
                            isHoveredFamily={isHoveredFamily}
                            onMouseEnter={() => setHoveredTarget({ familyId: course.familyId, title: course.title, continuationText: course.continuationText })}
                            onMouseLeave={() => setHoveredTarget(null)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </section>
  );
}
