import { useState } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CatalogList from "@/components/organisms/CatalogList";
import CTA from "@/components/organisms/CTA";
import CatalogFilter from "@/components/molecules/filter/CatalogFilter";

const FRAMEWORK_LIST = [
  "CyberSecurity Framework",
  "Artificial Intellegence Framework",
  "Project Management Framework",
];

export default function CourseCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [framework, setFramework] = useState<string | undefined>(undefined);

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Course Catalog"
        subtitle="Course Catalog"
        description="Whether you want to master a new software, sharpen your leadership abilities, or earn an industry-recognized credential, your next breakthrough is right here."
        path="/strategic-solution"
      >
        <CatalogFilter
          searchValue={search}
          categoryValue={category}
          frameworkValue={framework}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onFrameworkChange={setFramework}
        />
      </CustomHero>
      <section className="py-[5%] space-y-5">
        {FRAMEWORK_LIST.map((each) => (
          <CatalogList name={each} type={"it_training"} key={each} />
        ))}
      </section>

      <CTA />
    </section>
  );
}
