import { useState } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import SearchBar from "@/components/atoms/SearchBar";
import ProductFilter from "@/components/molecules/filter/ProductFilter";
import ITProductList from "@/components/organisms/ITProductList";
import CTA from "@/components/organisms/CTA";
import { LordIcons } from "@/components/atoms";
import { useITProductFilters } from "@/services/it-product/filters";

import { useReadyToUseITProductPage } from "@/services/ready-to-use-it-product/hook";

const DELIVERABLE_ICONS = [
  {
    src: "https://cdn.lordicon.com/lldhrpsv.json",
    colors:
      "primary:#ebe6ef,secondary:#bf1e40,tertiary:#3a3347,quaternary:#be1e40",
  },
  {
    src: "https://cdn.lordicon.com/cnbqxixv.json",
    colors:
      "primary:#be1e40,secondary:#2ca58d,tertiary:#3080e8,quaternary:#3a3347,quinary:#ebe6ef,senary:#ffc738",
  },
  {
    src: "https://cdn.lordicon.com/ndbacbli.json",
    colors: "primary:#b26836,secondary:#ffc738,tertiary:#3a3347,quaternary:#be1e40",
  },
  {
    src: "https://cdn.lordicon.com/nxmhrpbr.json",
    colors: "primary:#f9c9c0,secondary:#be1e40,tertiary:#3a3347",
  },
];

const FALLBACK = {
  title_page: "Ready-to-use IT Products",
  description_page:
    "These software solutions streamline operations, enhance productivity, and equip your team with the tools they need to thrive in a competitive landscape.",
  deliverables: {
    title: "Our Project Deliverable",
    items: [
      {
        title: "Business Process Digitalization",
        description: "Automated digital workflows replacing manual operations.",
      },
      {
        title: "Data Analytics and Dashboard",
        description: "Real-time interactive dashboards for metric tracking.",
      },
      {
        title: "Business Intelligence",
        description: "A structured reporting suite for strategic insights.",
      },
      {
        title: "Artificial Intelligence Support",
        description:
          "Integrated AI modules for predictive recommendations.",
      },
    ],
  },
  cta: {
    title: "Need These Kind Of Services?",
    description:
      "Get the full proposal and training details by clicking the button below.",
    label: "Consult Now!",
    link: "",
  },
};

export default function Product() {
  const [search, setSearch] = useState("");
  const [tech, setTech] = useState<string | undefined>(undefined);
  const [deployment, setDeployment] = useState<string | undefined>(undefined);
  const { data: filterOpts } = useITProductFilters();
  const { data: pageContent } = useReadyToUseITProductPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    deliverables: {
      ...FALLBACK.deliverables,
      ...(pageContent?.content?.deliverables || {}),
    },
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const deliverableItems = content.deliverables.items;

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="Ready-to-use IT Products"
        description={content.description_page}
        path="/it-product"
      />

      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-8">
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
              DELIVERABLES
            </div>
            <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
              {content.deliverables.title}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {deliverableItems.map((item: any, idx: number) => {
              const iconCfg =
                DELIVERABLE_ICONS[idx % DELIVERABLE_ICONS.length];
              const active = idx === 0;
              return (
                <div
                  key={item.title || idx}
                  id={`deliverable-card-${idx + 1}`}
                  className={`w-full p-5 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group ${
                    active
                      ? "bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 outline-rose-700 hover:outline-rose-700"
                      : "bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 outline-gray-200 hover:outline-rose-700"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300 ${
                      active
                        ? "bg-white"
                        : "bg-stone-50 group-hover:bg-white"
                    }`}
                  >
                    <LordIcons
                      src={iconCfg.src}
                      trigger="hover"
                      target={`#deliverable-card-${idx + 1}`}
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
      </section>

      <section className="pt-12 pb-[5%] space-y-8">
        <div className="px-[5%] md:px-[7%] lg:px-[10%] flex flex-col gap-6">
          <div className="w-full max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search IT Products..."
            />
          </div>
          <ProductFilter
            techValue={tech}
            deployValue={deployment}
            techOptions={filterOpts?.tech_stacks}
            onTechChange={setTech}
            onDeployChange={setDeployment}
          />
        </div>
        <ITProductList search={search} tech={tech} />
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