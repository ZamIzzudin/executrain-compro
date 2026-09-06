import { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [framework, setFramework] = useState<string | undefined>(undefined);
  const { data: filterOpts } = useCatalogFilters();
  const { data: pageContent } = useCourseCatalogPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
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
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onFrameworkChange={setFramework}
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