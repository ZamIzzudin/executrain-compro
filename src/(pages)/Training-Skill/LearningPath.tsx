import CustomHero from "@/components/organisms/hero/CustomHero";
import CTA from "@/components/organisms/CTA";

export default function LearningPath() {
  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Learning Paths"
        subtitle="Learning Paths"
        description="A structured, sequential sequence of courses, modules, and milestones designed to guide a learner from a beginner level to mastery in a specific role, subject, or domain."
        path="/learning-path"
      />
      <section className="px-[5%] md:px-[7%] lg:px-[10%] py-[10%] w-full">
        <img
          alt="learning-path"
          src="https://res.cloudinary.com/dyn73qnjx/image/upload/v1773634138/d33aa2e5ec061c5fdd1051298d6e28e9005014fe_g67f9q.png"
          width={1000}
          height={1000}
          className="w-full h-auto"
        />
      </section>
      <CTA />
    </section>
  );
}
