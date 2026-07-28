import {
  AboutDetailSection,
  AboutSectionFlat,
} from "@/components/organisms/AboutSection";
import StatSection from "@/components/organisms/Stats";
import Step from "@/components/organisms/Step";
import ServiceList from "@/components/organisms/Service";
import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";

export default function About() {
  return (
    <section>
      <CustomHero
        title="About Us"
        subtitle="About"
        description="Explore our journey, values, and the talented individuals who make it all happen. Join us as we strive to make a positive impact in the industry!"
        path="/about"
        banner="./aboutHero.png"
      />
      <AboutDetailSection />
      <StatSection />
      <Step />
      <ServiceList />
      <AboutSectionFlat />
      <CTA />
    </section>
  );
}
