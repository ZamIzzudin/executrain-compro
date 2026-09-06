import CustomHero from "@/components/organisms/hero/CustomHero";
import {
  StaggerItem,
  StaggerContainer,
  LordIcons,
} from "@/components/atoms";
import CTA from "@/components/organisms/CTA";
import { ArrowRight } from "lucide-react";

import MatrixA from "@/assets/dummy/matrix-1.png";
import MatrixB from "@/assets/dummy/matrix-2.png";
import { handleImageError } from "@/utils/helper";

import { useTalentPlacementPage } from "@/services/talent-placement-page/hook";

const MODEL_ICONS = [
  {
    src: "https://cdn.lordicon.com/byicyhmi.json",
    target: "placement-card-1",
    state: "hover-pinch",
    colors:
      "primary:#646e78,secondary:#f9c9c0,tertiary:#ebe6ef,quaternary:#b26836,quinary:#4bb3fd",
  },
  {
    src: "https://cdn.lordicon.com/wqbswumt.json",
    target: "placement-card-2",
    state: "hover-calling",
    colors: "primary:#ffc738,secondary:#be1e40,tertiary:#f9c9c0,quaternary:#be1e40",
  },
];

const FALLBACK = {
  title_page: "IT Talent Placement",
  description_page:
    "Vetted engineers, placed the way your project actually needs them — as a permanent hire or a dedicated resource for the length of the work.",
  models: [
    {
      title: "On-Site Basis",
      description:
        "Full-time on-site IT Support. Engineer (1st level) are deployed based on required location to ensure business running well.",
    },
    {
      title: "On-Call Basis",
      description:
        "High workload and complex troubleshooting do not happen all the time. In order to optimize the IT support engineer utilization, higher expertise level can be called when needed.",
    },
  ],
  matrix: {
    title: "Our IT Talent Matrix",
    description: "Here's a little details of what our IT talent can do",
    items: [
      {
        title: "1st Level Talent Matrix",
        image: { url: MatrixA, public_id: "matrix-1" },
      },
      {
        title: "2nd Level Talent Matrix",
        image: { url: MatrixB, public_id: "matrix-2" },
      },
    ],
  },
  roles: [
    {
      title: "1st Level Technical Support",
      points: [
        "Helpdesk Support",
        "End User Support",
        "1st level Support",
      ],
      thumbnail: { url: "./statHero.jpg", public_id: "role-1" },
      link: "",
    },
    {
      title: "2nd Level IT Specialist",
      points: [
        "Mastering on Specific Competency",
        "Server and network support",
        "As 2nd level support",
      ],
      thumbnail: { url: "./statHero.jpg", public_id: "role-2" },
      link: "",
    },
    {
      title: "IT Consultant / System Integrator",
      points: [
        "Perform environment assessment, need and gap analysis",
        "Carry out consultation, design, solution and implementation",
      ],
      thumbnail: { url: "./statHero.jpg", public_id: "role-3" },
      link: "",
    },
  ],
  cta: {
    title: "Need These Kind Of Services?",
    description:
      "Get the full proposal and training details by clicking the button below.",
    label: "Consult Now!",
    link: "",
  },
};

export default function TalentPlacement() {
  const { data: pageContent } = useTalentPlacementPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    matrix: { ...FALLBACK.matrix, ...(pageContent?.content?.matrix || {}) },
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const models = content.models;
  const matrixItems = content.matrix.items;
  const roles = content.roles;

  const handleRoleLink = (link?: string) => {
    const target = link?.trim();
    if (!target) return;
    if (/^(https?:|mailto:|tel:)/i.test(target)) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else if (target.startsWith("/")) {
      window.open(target, "_self", "noopener,noreferrer");
    }
  };

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="IT Talent Placement"
        description={content.description_page}
        path="/talent-placement"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-center gap-3">
          <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
            Our Placement Models
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {models.map((model, index) => (
              <div
                key={index}
                id={`placement-card-${index + 1}`}
                className="w-full px-4 pt-4 pb-5 bg-stone-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer"
              >
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="p-1 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                    <LordIcons
                      src={MODEL_ICONS[index % MODEL_ICONS.length].src}
                      trigger="hover"
                      target={`#placement-card-${index + 1}`}
                      state={MODEL_ICONS[index % MODEL_ICONS.length].state}
                      colors={MODEL_ICONS[index % MODEL_ICONS.length].colors}
                      size={40}
                    />
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                    <div className="self-stretch justify-start text-neutral-800 text-base font-medium">
                      {model.title}
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
                <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                  {model.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <h2 className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
            {content.matrix.title}
          </h2>
          <span className="self-stretch justify-start text-neutral-400 text-base font-normal">
            {content.matrix.description}
          </span>
        </div>
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          {matrixItems.map((item, index) => (
            <div
              key={item.title || index}
              className="flex-1 flex flex-col justify-start items-start gap-2"
            >
              <span className="self-stretch justify-start text-neutral-400 text-sm font-normal">
                {(item.title || "").toUpperCase()}
              </span>
              <img
                src={item.image?.url || MatrixA}
                alt={item.title}
                onError={handleImageError}
                className="self-stretch w-full rounded-xl object-contain"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <div className="self-stretch inline-flex justify-between items-center">
              <h2 className="flex-1 justify-start text-neutral-800 text-2xl font-semibold">
                Available Talent Roles
              </h2>
            </div>
          </div>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            staggerDelay={0.1}
            delayChildren={0.2}
          >
            {roles.map((each: any, index) => (
              <StaggerItem key={each.title || index} direction="up" className="h-full">
                <div
                  onClick={() => handleRoleLink(each.link)}
                  className={`group w-full bg-white rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 flex flex-col justify-start items-start transition-all duration-300 h-full ${each.link ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="self-stretch h-52 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/40 rounded-3xl border-2 border-gray-200 group-hover:border-rose-700 transition-colors duration-300 overflow-hidden">
                    <img
                      src={each.thumbnail?.url || each.image}
                      alt={each.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                  <div className="self-stretch px-5 pt-4 pb-6 rounded-bl-[32px] rounded-br-[32px] flex flex-col justify-between items-center gap-4 overflow-hidden flex-1">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="text-neutral-800 text-base font-medium">
                        {each.title}
                      </div>
                      <div className="self-stretch text-zinc-500 text-sm font-normal leading-relaxed">
                        {(each.points || []).map((item: string, i: number) => (
                          <div key={i}>• {item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200 mt-auto"></div>
                    {each.link ? (
                      <div className="inline-flex justify-start items-center gap-2.5">
                        <span className="text-rose-700 text-base font-medium">
                          {each.link.startsWith("/") ? "View Detail" : "I Need This Talent"}
                        </span>
                        <ArrowRight className="w-5 h-5 text-rose-700 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        link={content.cta.link}
      />
    </section>
  );
}