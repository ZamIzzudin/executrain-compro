"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CTA from "@/components/organisms/CTA";
import { ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";
import { useLearningPathPublicList } from "@/services/learning-path/hook";
import { FRAMEWORK_SCOPES } from "@/lib/frameworkScopes";
import type {
  LearningPathItem,
  LearningPathStage,
  LearningPathCourse,
} from "@/services/learning-path/types";

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
              isHoveredFamily
                ? "text-rose-700 font-semibold"
                : "text-neutral-800 group-hover:text-rose-700"
            }`}
          >
            {course.title}
          </h4>
        </div>
        {course.code && (
          <span className="text-xs font-normal text-neutral-400">
            {course.code}
          </span>
        )}      </div>

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
              isHoveredFamily
                ? "text-rose-700 font-medium"
                : "text-neutral-800 group-hover:text-rose-700"
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
  options,
  value,
  onChange,
}: {
  options: string[];
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
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {options.map((option) => (
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
  items,
  activeIndex,
  onChange,
}: {
  items: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 z-20">
      {items.map((label, i) => (
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeFramework, setActiveFramework] = useState<string | undefined>(
    undefined,
  );
  const [activeCapsule, setActiveCapsule] = useState(0);
  const [hoveredTarget, setHoveredTarget] = useState<{
    familyId?: string;
    title: string;
    continuationText?: string;
  } | null>(null);

  const { data: lpResponse, isLoading } = useLearningPathPublicList();
  const allPaths: LearningPathItem[] = lpResponse?.data ?? [];

  // Dropdown framework: selalu menampilkan 9 scope.
  const dropdownOptions = useMemo(
    () => FRAMEWORK_SCOPES.map((s) => s.label),
    [],
  );

  // Pilih framework pertama otomatis bila belum ada pilihan.
  useEffect(() => {
    if (activeFramework === undefined && dropdownOptions.length > 0) {
      setActiveFramework(FRAMEWORK_SCOPES[0]?.id);
    }
  }, [activeFramework, dropdownOptions]);

  const activeFilter = useMemo(() => {
    if (!activeFramework) return "";
    return (
      FRAMEWORK_SCOPES.find((s) => s.id === activeFramework)?.label ?? activeFramework
    );
  }, [activeFramework]);

  // Learning path milik framework terpilih → dijadikan pill capsule.
  const capsuleItems = useMemo(
    () =>
      allPaths
        .filter((p) => p.framework === activeFramework)
        .map((p) => p.title),
    [allPaths, activeFramework],
  );

  const selectedPath = useMemo(
    () =>
      allPaths.filter((p) => p.framework === activeFramework)[activeCapsule] ??
      null,
    [allPaths, activeFramework, activeCapsule],
  ) as LearningPathItem | null;

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (option: string) => {
    const scope = FRAMEWORK_SCOPES.find((s) => s.label === option);
    setActiveFramework(scope?.id);
    setActiveCapsule(0);
    setExpanded({});
  };

  const handleCapsuleChange = (index: number) => {
    setActiveCapsule(index);
    setExpanded({});
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
        <div className="self-stretch flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-40">
          <h2 className="text-neutral-800 text-2xl font-semibold">
            Learning Path According To Framework
          </h2>
          <FilterDropdown
            options={dropdownOptions}
            value={activeFilter}
            onChange={handleFilterChange}
          />
        </div>

        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-zinc-200" />

        {/* Capsule Pill Filters */}
        <CapsuleFilters
          items={capsuleItems}
          activeIndex={activeCapsule}
          onChange={handleCapsuleChange}
        />

        {/* Sections */}
        <div className="self-stretch flex flex-col gap-6 relative">
          {isLoading && (
            <div className="self-stretch text-center text-neutral-400 text-sm py-10">
              Memuat learning path…
            </div>
          )}

          {!isLoading && !activeFilter && (
            <div className="self-stretch text-center text-neutral-400 text-sm py-10">
              Learning path belum tersedia.
            </div>
          )}

          {!isLoading && activeFilter && capsuleItems.length === 0 && (
            <div className="self-stretch text-center text-neutral-400 text-sm py-10">
              Learning path belum tersedia untuk framework ini.
            </div>
          )}

          {!isLoading && selectedPath &&
            selectedPath.stages.map((stage: LearningPathStage, idx: number) => {
              const key = stage.id || String(idx);
              const isOpen = expanded[key] ?? idx === 0;
              const courses: CourseItem[] = (stage.courses || []).map(
                (c: LearningPathCourse) => ({
                  title: c.title,
                  code: c.code ?? "",
                  familyId: c.family_id,
                  variant: c.continuation_title ? "continuation" : "normal",
                  continuationText: c.continuation_title,
                }),
              );

              return (
                <div
                  key={key}
                  className={`self-stretch px-6 py-5 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] flex flex-col justify-start items-center gap-6 overflow-hidden transition-all duration-300 relative z-20 bg-stone-50 outline outline-1 outline-offset-[-1px] outline-gray-200`}
                >
                  {/* Section Header */}
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="self-stretch inline-flex justify-between items-center cursor-pointer text-left"
                  >
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-neutral-800 text-2xl font-semibold">
                        {stage.name || "Scope"}
                      </h3>
                      {stage.description && (
                        <span className="text-neutral-400 text-base font-normal">
                          {stage.description}
                        </span>
                      )}
                    </div>
                    <div className="p-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg flex justify-center items-center transition-colors duration-300">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content Grid */}
                  <div
                    className={`w-full grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
                          {courses.map((course, i) => {
                            const isHoveredFamily = Boolean(
                              hoveredTarget &&
                              ((hoveredTarget?.familyId &&
                                course.familyId === hoveredTarget.familyId) ||
                                (hoveredTarget?.continuationText &&
                                  course.title
                                    .toLowerCase()
                                    .includes(
                                      hoveredTarget.continuationText.toLowerCase(),
                                    )) ||
                                (course.continuationText &&
                                  hoveredTarget?.title
                                    .toLowerCase()
                                    .includes(
                                      course.continuationText.toLowerCase(),
                                    ))),
                            );

                            return (
                              <CourseCard
                                key={`${key}-${i}`}
                                course={course}
                                isHoveredFamily={isHoveredFamily}
                                onMouseEnter={() =>
                                  setHoveredTarget({
                                    familyId: course.familyId,
                                    title: course.title,
                                    continuationText: course.continuationText,
                                  })
                                }
                                onMouseLeave={() => setHoveredTarget(null)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <CTA />
    </section>
  );
}