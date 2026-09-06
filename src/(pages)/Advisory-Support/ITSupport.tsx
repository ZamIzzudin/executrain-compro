import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/atoms/Motion";
import {
  MonitorIcon,
  PackageIcon,
  TargetIcon,
  WrenchIcon,
  ArrowRight,
} from "lucide-react";
import { handleImageError } from "@/utils/helper";

import { useImplementationSupportPage } from "@/services/implementation-support-page/hook";

const workflowIcons = [TargetIcon, WrenchIcon, PackageIcon, MonitorIcon];

const FALLBACK = {
  title_page: "Implementation & Support",
  description_page:
    "Vetted engineers, placed the way your project actually needs them — as a permanent hire or a dedicated resource for the length of the work.",
  workflow: {
    title: "Implementation Workflow",
    description:
      "The same team scopes it, builds it, and answers the phone after it ships — nothing gets handed off and lost.",
    steps: [
      {
        title: "Scope & Flow",
        description:
          "We turn the recommendation — yours or ours — into a concrete build plan with milestones you can hold us to.",
      },
      {
        title: "Build",
        description:
          "Implementation against the plan, with working software visible on a regular cadence, not a reveal at the end.",
      },
      {
        title: "Deploy",
        description:
          "A staged rollout with a rollback plan already written, not improvised at 2am.",
      },
      {
        title: "Support & Monitor",
        description:
          "We stay on the system after launch — monitoring, patching, and answering when something breaks.",
      },
    ],
  },
  support: {
    title: "Support you can pick up piece by piece",
    items: [
      {
        title: "Ongoing maintenance",
        description:
          "Routine upkeep so the system stays healthy between releases.",
        points: [
          "Dependency & security patching",
          "Bug triage and fixes",
          "Monthly health report",
        ],
        thumbnail: { url: "./statHero.jpg", public_id: "support-1" },
        link: "",
      },
      {
        title: "Incident response & on-call",
        description:
          "A team that answers when something goes down, not a ticket queue.",
        points: [
          "24/7 on-call rotation available",
          "Defined response-time targets",
          "Post-incident write-up, every time",
        ],
        thumbnail: { url: "./statHero.jpg", public_id: "support-2" },
        link: "",
      },
      {
        title: "Performance & scaling",
        description:
          "Support for the moment your traffic or data outgrows the original design.",
        points: [
          "Load testing & bottleneck diagnosis",
          "Infrastructure & query optimization",
          "Capacity planning ahead of growth",
        ],
        thumbnail: { url: "./statHero.jpg", public_id: "support-3" },
        link: "",
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

export default function ITSupport() {
  const { data: pageContent } = useImplementationSupportPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    workflow: { ...FALLBACK.workflow, ...(pageContent?.content?.workflow || {}) },
    support: { ...FALLBACK.support, ...(pageContent?.content?.support || {}) },
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const workflowSteps = content.workflow.steps;
  const supportItems = content.support.items;

  const handleItemLink = (link?: string) => {
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
        subtitle="Implementation & Support"
        description={content.description_page}
        path="/implementation-support"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-6">
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="justify-start text-zinc-500 text-sm font-normal">
              HOW WE WORK
            </div>
            <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
              {content.workflow.title}
            </div>
            <div className="self-stretch justify-start text-neutral-400 text-base font-normal">
              {content.workflow.description}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {workflowSteps.map((step: any, idx: number) => {
              const IconComp = workflowIcons[idx % workflowIcons.length];
              return (
                <div
                  key={step.title || idx}
                  className={`flex-1 self-stretch p-5 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer ${
                    idx === 0
                      ? "bg-gradient-to-b from-white to-pink-50 outline-rose-700"
                      : "bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 outline-gray-200 hover:outline-rose-700"
                  }`}
                >
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <div className="p-1.5 bg-stone-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center overflow-hidden">
                        <IconComp className="text-rose-700 shrink-0" size={16} />
                      </div>
                      <div
                        className={`flex-1 justify-start text-sm font-medium line-clamp-2 ${
                          idx === 0 ? "text-rose-700" : "text-neutral-800"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                    <div className="self-stretch justify-start text-zinc-600 text-xs font-normal">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <div className="self-stretch inline-flex justify-between items-center">
              <h2 className="flex-1 justify-start text-neutral-800 text-2xl font-semibold">
                {content.support.title}
              </h2>
            </div>
          </div>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            staggerDelay={0.1}
            delayChildren={0.2}
          >
            {supportItems.map((each: any, index: number) => (
              <StaggerItem key={each.title || index} direction="up" className="h-full">
                <div
                  onClick={() => handleItemLink(each.link)}
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
                      <div className="text-zinc-500 text-xs mb-1">
                        {each.description}
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
                          {each.link.startsWith("/") ? "View Detail" : "I Need This Support"}
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