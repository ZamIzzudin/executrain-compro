import { useState } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CourseCatalogList from "@/components/organisms/CourseCatalogList";
import CTA from "@/components/organisms/CTA";
import CatalogFilter from "@/components/molecules/filter/CatalogFilter";
import { useCatalogFilters } from "@/services/course-catalog/filters";

export default function CourseCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [framework, setFramework] = useState<string | undefined>(undefined);
  const { data: filterOpts } = useCatalogFilters();

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Course Catalog"
        subtitle="Course Catalog"
        description="Whether you want to master a new software, sharpen your leadership abilities, or earn an industry-recognized credential, your next breakthrough is right here."
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

      <CTA />
    </section>
  );
}