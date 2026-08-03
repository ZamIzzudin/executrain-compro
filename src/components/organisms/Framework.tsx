import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { StaggerContainer, StaggerItem } from "../atoms/Motion";

import { useAssetContext } from "@/layouts/AssetProvider";
import FrameworkWheel from "../molecules/FrameworkWheel";

type Framework = { title: string; items: string[] };

function FrameworkColumn({
  frameworks,
}: Readonly<{ frameworks: Framework[] }>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex items-center">
      <StaggerContainer
        className="flex flex-col gap-3 flex-1"
        staggerDelay={0.15}
        delayChildren={0.2}
      >
        {frameworks.map((each, index: number) => {
          const isOpen = activeIndex === index;
          return (
            <StaggerItem key={index} direction="right">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                className={`flex gap-3 md:gap-5 bg-white backdrop-blur-md border border-white/20 rounded-xl p-3 items-stretch shadow-[0px_0px_50px_5px_rgba(0,0,0,0.11)] transition-all duration-300 cursor-pointer ${
                  isOpen ? "bg-white" : ""
                }`}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle(index);
                  }
                }}
              >
                <div className="flex-1 flex justify-center flex-col">
                  <div
                    className={`flex items-center justify-between gap-2 ${isOpen ? "pb-2 border-b border-gray-300" : ""}`}
                  >
                    <span className="text-left text-xs font-semibold block">
                      {each.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <ul
                    className={`text-left max-h-0 opacity-0 text-xs font-[400] text-gray-600 overflow-hidden transition-all duration-300 ${
                      isOpen ? "!max-h-[200px] !opacity-100 mt-2" : ""
                    }`}
                  >
                    {each.items?.map((item) => (
                      <li key={item}>󠁯•󠁏 {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}

const data = [
  {
    title: "Cybersecurity",
    items: [
      "CompTIA Security Analyst",
      "CompTIA Security+",
      "CompTIA A+ Cyber",
      "CompTIA Pentest+",
      "CompTIA Security Pro",
      "CompTIA Security X",
      "Nexus",
    ],
  },
  {
    title: "Artificial Intelligence",
    items: [
      "AI Business",
      "AI Executive",
      "AI Cloud",
      "AI Security",
      "AI Developers",
    ],
  },
  {
    title: "Data Management, Analytics & Engineering",
    items: [
      "Excel Data Management",
      "Excel Dashboard",
      "Power BI",
      "Python",
      "KNIME",
    ],
  },
  {
    title: "Automation",
    items: ["Power Automate", "Power Apps"],
  },
];

const data2 = [
  {
    title: "Governance Control, Risk Management",
    items: ["COBIT", "CGEIT", "CRISC", "CISA"],
  },
  {
    title: "Service Management",
    items: ["ITIL", "ITSM"],
  },
  {
    title: "Enterprise Architecture",
    items: ["TOGAF"],
  },
  {
    title: "Project Management",
    items: [
      "IT Project Management",
      "Certified Associated Project Manager",
      "Project Management Professional",
      "PRINCE2",
    ],
  },
];

export default function FrameworkBanner() {
  const { getAssetUrl } = useAssetContext();
  const frameworkBanner = getAssetUrl("framework_banner");
  return (
    <div className="px-[5%] md:px-[7%] lg:px-[10%] w-full space-y-6 md:space-y-6 min-h-[30dvh] md:min-h-[50dvh] py-[5%]">
      {/* <section className="w-full lg:grid lg:grid-cols-2 items-center">
        <img
          alt="framework"
          src={frameworkBanner || ""}
          width={1000}
          height={1000}
          className="w-full h-auto max-w-[80dvh]"
        />
        <div className="bg-[#ECECEC] space-y-3 rounded-xl drop-shadow-xl p-6 h-fit">
          <span className="text-xs text-gray-600 block ">OUR FRAMEWORK</span>
          <h2 className="font-semibold text-2xl mb-5">
            Perfomance Improvement Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
            <FrameworkColumn frameworks={data} />
            <FrameworkColumn frameworks={data2} />
          </div>
          <FrameworkWheel />
        </div>
      </section> */}
      <FrameworkWheel />
    </div>
  );
}
