import { useState } from "react";

import CustomHero from "@/components/organisms/hero/CustomHero";
import CTA from "@/components/organisms/CTA";
import SearchBar from "@/components/atoms/SearchBar";
import AppDevelopmentFilter from "@/components/molecules/filter/AppDevelopmentFilter";
import AppDevelopmentList from "@/components/organisms/AppDevelopmentList";

import { FadeInUp, LordIcons } from "@/components/atoms";

import Power from "@/assets/dummy/power.png";
import Azure from "@/assets/dummy/azure.png";
import ReactLogo from "@/assets/dummy/react.png";
import Next from "@/assets/dummy/next.png";
import Node from "@/assets/dummy/node.png";
import Mongo from "@/assets/dummy/mongo.png";

import { useAppDevelopmentFilters } from "@/services/app-development/filters";

import { useCustomAppDevelopmentPage } from "@/services/custom-app-development/hook";

const CAPABILITY_ICONS = [
  {
    src: "https://cdn.lordicon.com/pfzzikja.json",
    colors: "primary:#4bb3fd,secondary:#3a3347,tertiary:#ebe6ef",
  },
  {
    src: "https://cdn.lordicon.com/whjtorej.json",
    colors:
      "primary:#3a3347,secondary:#be1e40,tertiary:#4bb3fd,quaternary:#ebe6ef",
  },
  {
    src: "https://cdn.lordicon.com/gekxoxst.json",
    colors: "primary:#3a3347,secondary:#2ca58d,tertiary:#be1e40",
  },
  {
    src: "https://cdn.lordicon.com/vgadqplj.json",
    colors: "primary:#b4b4b4,secondary:#be1e40,tertiary:#66ee78",
  },
];

const FALLBACK = {
  title_page: "Custom App Development",
  description_page:
    "We specialize in designing and building applications that are uniquely tailored to your organization's needs.",
  capabilities: {
    title: "Development Capabilities",
    items: [
      {
        title: "Web Platforms",
        description: "Dashboards, portals and internal tools built for daily use.",
      },
      {
        title: "Mobile Apps",
        description: "Native and cross-platform apps for iOS and Android.",
      },
      {
        title: "System Integrations",
        description: "Connecting the tools you already run into one workflow.",
      },
      {
        title: "Legacy Modernization",
        description: "Rebuilding aging systems without breaking what works.",
      },
    ],
  },
  cta: {
    title: "Need These Kind Of Services?",
    description:
      "Get the full proposal and training details by clicking the button below.",
    label: "Consult Now!",
    wa_message: "",
  },
};

export default function CustomApp() {
  const [search, setSearch] = useState("");
  const [tech, setTech] = useState<string | undefined>(undefined);
  const [method, setMethod] = useState<string | undefined>(undefined);
  const { data: filterOpts } = useAppDevelopmentFilters();
  const { data: pageContent } = useCustomAppDevelopmentPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    capabilities: {
      ...FALLBACK.capabilities,
      ...(pageContent?.content?.capabilities || {}),
    },
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const capabilityItems = content.capabilities.items;

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="Custom App Development"
        description={content.description_page}
        path="/app-development"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-8">
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
              WHAT WE BUILD
            </div>
            <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
              {content.capabilities.title}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {capabilityItems.map((item: any, idx: number) => {
              const iconCfg = CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
              const active = idx === 0;
              return (
                <div
                  key={item.title || idx}
                  id={`dev-card-${idx + 1}`}
                  className={`w-full p-5 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group ${
                    active
                      ? "bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 outline-rose-700 hover:outline-rose-700"
                      : "bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 outline-gray-200 hover:outline-rose-700"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300 ${
                      active ? "bg-white" : "bg-stone-50 group-hover:bg-white"
                    }`}
                  >
                    <LordIcons
                      src={iconCfg.src}
                      trigger="hover"
                      target={`#dev-card-${idx + 1}`}
                      state="hover-pinch"
                      colors={iconCfg.colors}
                      size={40}
                    />
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div
                      className={`self-stretch justify-start text-base font-semibold transition-colors duration-300 ${
                        active
                          ? "text-rose-700 group-hover:text-rose-700"
                          : "text-neutral-800 group-hover:text-rose-700"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div
                      className={`self-stretch justify-start text-sm font-normal transition-colors duration-300 ${
                        active
                          ? "text-zinc-600"
                          : "text-neutral-400 group-hover:text-zinc-600"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Slider section */}
        <div className="self-stretch flex flex-col justify-start items-center gap-6 pt-4">
          <FadeInUp delay={0.2} duration={0.5} className="text-center">
            <h3 className="text-base text-black font-normal">
              Here are some{" "}
              <span className="text-rose-700 font-medium">tech stacks</span>{" "}
              we used to develop
            </h3>
          </FadeInUp>
          <div className="w-full flex flex-wrap justify-evenly gap-1">
            <div className="min-h-[100px] flex items-center">
              <img src={Power} alt="Power Platform" />
            </div>
            <div className="min-h-[100px] flex items-center">
              <img src={Azure} alt="Azure" />
            </div>
            <div className="min-h-[100px] flex items-center">
              <img src={ReactLogo} alt="React" />
            </div>
            <div className="min-h-[100px] flex items-center">
              <img src={Next} alt="Next.js" />
            </div>
            <div className="min-h-[100px] flex items-center">
              <img src={Node} alt="Node.js" />
            </div>
            <div className="min-h-[100px] flex items-center">
              <img src={Mongo} alt="MongoDB" />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-[5%] space-y-8">
        <div className="px-[5%] md:px-[7%] lg:px-[10%] flex flex-col gap-6">
          <div className="w-full max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search Custom App Development..."
            />
          </div>
          <AppDevelopmentFilter
            techValue={tech}
            methodValue={method}
            techOptions={filterOpts?.tech_stacks}
            methodOptions={filterOpts?.methodologies}
            onTechChange={setTech}
            onMethodChange={setMethod}
          />
        </div>
        <AppDevelopmentList
          search={search}
          tech={tech}
          method={method}
          techOptions={filterOpts?.tech_stacks}
          methodOptions={filterOpts?.methodologies}
        />
      </section>
      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        waMessage={content.cta.wa_message}
      />
    </section>
  );
}