import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CustomHero from "@/components/organisms/hero/CustomHero";
import ScheduleList from "@/components/organisms/ScheduleList";
import CTA from "@/components/organisms/CTA";
import ScheduleFilter from "@/components/molecules/filter/ScheduleFilter";
import { useSchedulePage } from "@/services/schedule-page/hook";
import type { PublicScheduleListFilters } from "@/services/schedule/handler";

const FALLBACK = {
  title_page: "Class Schedule",
  description_page:
    "Explore our upcoming training programs and pick the date that works best for your team. Can't find a suitable date? Request a custom schedule anytime.",
  cta: {
    title: "Can't Find a Suitable Date?",
    description:
      "Request a custom schedule and our team will arrange it for you.",
    label: "Request Schedule",
    wa_message: "",
  },
};

export default function Schedule() {
  // URL adalah sumber kebenaran tunggal utk filter date, category, dan type.
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filterOpts, setFilterOpts] =
    useState<PublicScheduleListFilters | null>(null);

  const month = searchParams.get("month") || "";
  const category = searchParams.get("category") || undefined;
  const type = searchParams.get("type") || undefined;

  const { data: pageContent } = useSchedulePage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const handleFilters = useCallback(
    (filters: PublicScheduleListFilters) => setFilterOpts(filters),
    [],
  );

  const patchParams = (patch: Record<string, string | undefined>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(patch).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      return next;
    });
  };

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="Schedule"
        description={content.description_page}
        path="/schedule"
      />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] pt-12 pb-[5%] space-y-8">
        <ScheduleFilter
          searchValue={search}
          dateValue={month}
          categoryValue={category}
          typeValue={type}
          categories={filterOpts?.categories}
          types={filterOpts?.types}
          onSearchChange={setSearch}
          onDateChange={(value) => patchParams({ month: value })}
          onCategoryChange={(value) => patchParams({ category: value })}
          onTypeChange={(value) => patchParams({ type: value })}
        />
        <ScheduleList
          search={search}
          month={month || undefined}
          category={category}
          type={type}
          onFilters={handleFilters}
        />
      </section>

      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        waMessage={content.cta.wa_message}
      />
    </section>
  );
}
