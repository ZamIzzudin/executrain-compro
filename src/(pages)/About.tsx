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
import { useAboutPage } from "@/services/about/hook";

const FALLBACK = {
  title_page: "About Us",
  description_page:
    "Explore our journey, values, and the talented individuals who make it all happen. Join us as we strive to make a positive impact in the industry!",
  title_about: "We Transform Result Into Impact",
  description_about:
    "We believe technology only matters when it uplifts people. We walk alongside you to turn complex challenges into meaningful, lasting growth.\n\nFounded on June 14, 1995, ExecuTrain of Jakarta is a worldwide corporate training provider and world leader in business education training. The privately held U.S. based company has franchise locations in 8 countries of 53 locations.\n\nExecuTrain provides design, development, and implementation of professional development solutions for companies worldwide",
  vision:
    "Developing people skills and behaviors through quality training and providing technology services to empower your business.",
  mission:
    "To increase productivity by providing the best and reliable quality service.",
  awards: [
    "The Best Microsoft Authorized Training Center",
    "The Best Microsoft Certified Technical Education Center (CTEC)",
    "The Best Microsoft CPLS of the Year",
    "Allianz Top Training Provider Performer 2023",
    "Top IT Training 2016 at Top IT & Telco 2016 Award",
    "Top IT Training 2017",
  ],
  cta: {
    title: "Ready to Work With Us?",
    description: "Chat our sales for detailed information",
    label: "Request Proposal",
    link: "",
  },
};

export default function About() {
  const { data: gallery = [], isLoading: galleryLoading } = useGallery();
  const { data: aboutPage } = useAboutPage();

  const content = {
    ...FALLBACK,
    ...(aboutPage?.content || {}),
    cta: { ...FALLBACK.cta, ...(aboutPage?.content?.cta || {}) },
  };

  const joinSteps = aboutPage?.content?.join_steps?.length
    ? aboutPage.content.join_steps
    : undefined;

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="About"
        description={content.description_page}
        path="/about"
        banner="./aboutHero.png"
      />
      <AboutDetailSection
        content={{
          title_about: content.title_about,
          description_about: content.description_about,
          vision: content.vision,
          mission: content.mission,
          awards: content.awards,
        }}
      />
      <GallerySlider data={gallery} isLoading={galleryLoading} />
      <StatSection />
      <Step steps={joinSteps} />
      <ServiceList />
      <TechSlider bgColor="bg-[#FCFCFC]" />
      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        link={content.cta.link}
      />
    </section>
  );
}
