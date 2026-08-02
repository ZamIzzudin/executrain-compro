import { useState } from "react";

import CustomHero from "@/components/organisms/hero/CustomHero";
import CaseStudyFilter from "@/components/molecules/filter/CaseStudyFilter";
import ArticleList from "@/components/organisms/ArticleList";

export default function CaseStudy() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);

  return (
    <section>
      <CustomHero
        title="Case Studies"
        subtitle="Case Studies"
        description="Dive in to see real-world applications of our technology and discover how we can help your organization thrive."
        path="/case-study"
      >
        <CaseStudyFilter
          searchValue={search}
          categoryValue={category}
          sortValue={sort}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
      </CustomHero>
      <section className="py-[5%]">
        <ArticleList name="Showing Newest Case Studies" type={"it_training"} basePath="/case-study" />
      </section>
    </section>
  );
}
