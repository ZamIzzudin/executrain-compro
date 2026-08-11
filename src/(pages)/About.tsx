import {
  AboutDetailSection,
  TechSlider,
} from "@/components/organisms/AboutSection";
import StatSection from "@/components/organisms/Stats";
import Step from "@/components/organisms/Step";
import ServiceList from "@/components/organisms/Service";
import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";
import GallerySlider from "@/components/organisms/GallerySlider";

import { useGallery } from "@/services/gallery/hook";

export default function About() {
  const { data: gallery = [], isLoading: galleryLoading } = useGallery();

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
      <GallerySlider data={gallery} isLoading={galleryLoading} />
      <StatSection />
      <Step />
      <ServiceList />
      <TechSlider />
      <CTA
        title="Ready to Work With Us?"
        description="Chat our sales for detailed information"
      />
    </section>
  );
}
