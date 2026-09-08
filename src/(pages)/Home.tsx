import Hero from "@/components/organisms/hero/Hero";
import AboutSection, { TechSlider } from "@/components/organisms/AboutSection";
import FrameworkBanner from "@/components/organisms/Framework";
import TestimoniList from "@/components/organisms/Testimoni";
import PartnerList from "@/components/organisms/Partner";
import CTA from "@/components/organisms/CTA";

import { usePartner } from "@/services/partner/hook";
import { useHomePage } from "@/services/home-page/hook";
import { useFrameworkItems } from "@/services/master-data/hook";

const FALLBACK = {
  title_page:
    "The Strategic IT Partner Behind Today's Leading Enterprise",
  description_page:
    "Delivering world-class IT training, business skills, and technology solutions to help your organization stay ahead in a rapidly evolving digital landscape.",
  about: {
    title: "We Transform Result Into Impact",
    description:
      "We believe technology only matters when it uplifts people. We walk alongside you to turn complex challenges into meaningful, lasting growth.",
  },
  services: {
    items: [
      {
        title: "Building Real Skills",
        description:
          "Equipping people with practical skills to turn daily challenges into lasting impacts.",
      },
      {
        title: "Easing Everyday Work",
        description:
          "Shaping thoughtful technology that fits your rhythm and brings peace of mind to operations.",
      },
      {
        title: "Reliable IT Consulting",
        description:
          "Working as a trusted, steady partner to guide your technology journey with clarity.",
      },
    ],
  },
  cta: {
    title: "Ready to Train Your Team?",
    description:
      "Get the full proposal and training details by clicking the button below.",
    label: "Request Proposal",
    link: "",
  },
};

export default function Home() {
  const { data: partner = [], isLoading: partnerLoading } = usePartner();
  const { data: homePage } = useHomePage();
  const { data: frameworkItems = {} } = useFrameworkItems();

  const raw = homePage?.content || {};
  const content = {
    ...FALLBACK,
    ...raw,
    about: { ...FALLBACK.about, ...(raw.about || {}) },
    services: {
      items: (raw.services?.items || []).map((item: any, i: number) => ({
        ...(FALLBACK.services.items[i] || {}),
        ...item,
      })),
    },
    cta: { ...FALLBACK.cta, ...(raw.cta || {}) },
  };

  // Framework items datang dari Master Data (FRAMEWORK_ITEM, dikelompokkan per scope).
  // `raw.framework?.items` hanya fallback untuk data lama bila masih ada.
  const frameworkItemsMerged = {
    ...frameworkItems,
    ...(raw.framework?.items || {}),
  };

  return (
    <section className="bg-[#FCFCFC]">
      <Hero title={content.title_page} description={content.description_page} />
      <TechSlider />
      <AboutSection
        content={{
          about: content.about,
          services: content.services.items,
        }}
      />
      <FrameworkBanner items={frameworkItemsMerged} />
      <PartnerList data={partner} isLoading={partnerLoading} />
      <TestimoniList />
      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        link={content.cta.link}
      />
    </section>
  );
}
