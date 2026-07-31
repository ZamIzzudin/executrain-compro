import CustomHero from "@/components/organisms/hero/CustomHero";

export default function ArticleDetail() {
  return (
    <section>
      <CustomHero
        title="Article"
        subtitle="Our Article"
        description="Insights, tips, and practical knowledge to help you stay ahead in technology, business skills, and workplace productivity."
        path="/article"
      />
    </section>
  );
}
