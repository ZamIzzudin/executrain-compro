import { useState } from "react";

import CustomHero from "@/components/organisms/hero/CustomHero";
import CaseStudyFilter from "@/components/molecules/filter/CaseStudyFilter";
import CaseStudyList from "@/components/organisms/CaseStudyList";

import { useCaseStudyFilters } from "@/services/case-study/filters";

export default function CaseStudy() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const { data: filterOpts } = useCaseStudyFilters();

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Case Studies"
        subtitle="Case Studies"
        description="Dive in to see real-world applications of our technology and discover how we can help your organization thrive."
        path="/case-study"
      />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] pt-12 pb-[5%] space-y-8">
        <CaseStudyFilter
          searchValue={search}
          categoryValue={category}
          sortValue={sort}
          categoryOptions={filterOpts?.categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
        <CaseStudyList
          search={search}
          category={category}
          sort={sort}
          categoryOptions={filterOpts?.categories}
        />
      </section>
    </section>
  );
}
