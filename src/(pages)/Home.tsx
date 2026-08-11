import Hero from "@/components/organisms/hero/Hero";
import GallerySlider from "@/components/organisms/GallerySlider";
import AboutSection, { TechSlider } from "@/components/organisms/AboutSection";
import FrameworkBanner from "@/components/organisms/Framework";
import TestimoniList from "@/components/organisms/Testimoni";
import ServiceList from "@/components/organisms/Service";
import PartnerList from "@/components/organisms/Partner";
import CTA from "@/components/organisms/CTA";

import { useGallery } from "@/services/gallery/hook";
import { usePartner } from "@/services/partner/hook";

export default function Home() {
  const { data: gallery = [], isLoading: galleryLoading } = useGallery();
  const { data: partner = [], isLoading: partnerLoading } = usePartner();

  return (
    <section>
      <Hero />
      <GallerySlider data={gallery} isLoading={galleryLoading} />
      <TechSlider />
      <AboutSection />
      <FrameworkBanner />
      <ServiceList />
      <PartnerList data={partner} isLoading={partnerLoading} />
      <TestimoniList />
      <CTA />
    </section>
  );
}
