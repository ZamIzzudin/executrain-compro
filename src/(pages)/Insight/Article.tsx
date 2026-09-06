import { useState } from "react";

import CustomHero from "@/components/organisms/hero/CustomHero";
import ArticleFilter from "@/components/molecules/filter/ArticleFilter";
import ArticleList from "@/components/organisms/ArticleList";

import { useHeroPage } from "@/services/hero-page/hook";

export default function Article() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const { data: heroPage } = useHeroPage("article-page");

  const hero = {
    title: "Our Article",
    description:
      "Insights, tips, and practical knowledge to help you stay ahead in technology, business skills, and workplace productivity.",
    ...(heroPage?.content || {}),
  };

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={hero.title_page || hero.title}
        subtitle="Article"
        description={hero.description_page || hero.description}
        path="/article"
      />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] pt-12 pb-[5%] space-y-8">
        <ArticleFilter
          searchValue={search}
          categoryValue={category}
          sortValue={sort}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
        <ArticleList name="Showing Newest Article" type={"it_training"} />
      </section>
    </section>
  );
}
