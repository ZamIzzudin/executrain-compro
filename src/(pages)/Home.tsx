import Hero from "@/components/organisms/hero/Hero";
import AboutSection, { TechSlider } from "@/components/organisms/AboutSection";
import FrameworkBanner from "@/components/organisms/Framework";
import TestimoniList from "@/components/organisms/Testimoni";
import PartnerList from "@/components/organisms/Partner";
import CTA from "@/components/organisms/CTA";

import { usePartner } from "@/services/partner/hook";

export default function Home() {
  const { data: partner = [], isLoading: partnerLoading } = usePartner();

  return (
    <section className="bg-[#FCFCFC]">
      <Hero />
      <TechSlider />
      <AboutSection />
      <FrameworkBanner />
      <PartnerList data={partner} isLoading={partnerLoading} />
      <TestimoniList />
      <CTA />
    </section>
  );
}
