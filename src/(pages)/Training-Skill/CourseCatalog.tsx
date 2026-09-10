import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CourseCatalogList from "@/components/organisms/CourseCatalogList";
import CTA from "@/components/organisms/CTA";
import CatalogFilter from "@/components/molecules/filter/CatalogFilter";
import { useCatalogFilters } from "@/services/course-catalog/filters";
import { useCourseCatalogPage } from "@/services/course-catalog-page/hook";

const FALLBACK = {
  title_page: "Course Catalog",
  description_page:
    "Whether you want to master a new software, sharpen your leadership abilities, or earn an industry-recognized credential, your next breakthrough is right here.",
  cta: {
    title: "Ready to Train Your Team?",
    description:
      "Get the full proposal and training details by clicking the button below.",
    label: "Request Proposal",
    link: "",
  },
};

export default function CourseCatalog() {
  // URL adalah sumber kebenaran tunggal utk filter framework & category.
  // Dengan begini tidak ada state ganda yang bisa bertabrakan (stale closure).
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const framework = searchParams.get("framework") || undefined;
  const category = searchParams.get("category") || undefined;
  const { data: filterOpts } = useCatalogFilters();
  const { data: pageContent } = useCourseCatalogPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const handleSearchChange = (value: string) => setSearch(value);

  // Gunakan functional updater supaya dua perubahan berurutan dalam satu
  // event (CatalogFilter menelepon framework lalu category) tidak saling
  // menimpa hasil dari snapshot URL yang basi.
  const handleFrameworkChange = (value: string | undefined) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("framework", value);
      else next.delete("framework");
      // Ganti framework → kategori ikut direset.
      next.delete("category");
      return next;
    });
  };

  const handleCategoryChange = (value: string | undefined) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("category", value);
      else next.delete("category");
      return next;
    });
  };

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="Course Catalog"
        description={content.description_page}
        path="/course-catalog"
      />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] pt-12 pb-[5%] space-y-8">
        <CatalogFilter
          searchValue={search}
          categoryValue={category}
          frameworkValue={framework}
          categories={filterOpts?.categories}
          frameworks={filterOpts?.framework_types}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onFrameworkChange={handleFrameworkChange}
        />
        <CourseCatalogList
          search={search}
          category={category}
          framework={framework}
        />
      </section>

      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        link={content.cta.link}
      />
    </section>
  );
}