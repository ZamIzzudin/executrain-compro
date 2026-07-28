import HeroAbout from "@/components/organisms/hero/Heroabout";
import {
  AboutDetailSection,
  AboutSectionFlat,
} from "@/components/organisms/AboutSection";
import StatSection from "@/components/organisms/Stats";
import Step from "@/components/organisms/step";
import ServiceList from "@/components/organisms/Service";
import CTA from "@/components/organisms/CTA";

export default function About() {
  return (
    <section>
      <HeroAbout />
      <AboutDetailSection />
      <StatSection />
      <Step />
      <ServiceList />
      <AboutSectionFlat />
      <CTA />
    </section>
  );
}
