import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/atoms/Motion";
import CustomCard from "@/components/molecules/card/Custom";

import { MonitorIcon, PackageIcon, TargetIcon, WrenchIcon } from "lucide-react";

export default function ITSupport() {
  const data = [
    {
      name: "Ongoing maintenance",
      desc: "Routine upkeep so the system stays healthy between releases.",
      items: [
        "Dependency & security patching",
        "Bug triage and fixes",
        "Monthly health report",
      ],
      cta: "I Need This Support",
    },
    {
      name: "Incident response & on-call",
      desc: "A team that answers when something goes down, not a ticket queue.",
      items: [
        "24/7 on-call rotation available",
        "Defined response-time targets",
        "Post-incident write-up, every time",
      ],
      cta: "I Need This Support",
    },
    {
      name: "Performance & scaling",
      desc: "Support for the moment your traffic or data outgrows the original design.",
      items: [
        "Load testing & bottleneck diagnosis",
        "Infrastructure & query optimization",
        "Capacity planning ahead of growth",
      ],
      cta: "I Need This Support",
    },
  ];

  return (
    <section>
      <CustomHero
        title="Implementation & Support"
        subtitle="Implementation & Support"
        description="Vetted engineers, placed the way your project actually needs them — as a permanent hire or a dedicated resource for the length of the work."
        path="/implementation-support"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%] items-center">
        <div className="bg-[#ECECEC] p-5 md:p-6 space-y-5 rounded-xl drop-shadow-md ">
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-semibold">
              Development Capabilities{" "}
            </h3>
            <p className="text-base text-gray-600 block">
              The same team scopes it, builds it, and answers the phone after it
              ships — nothing gets handed off and lost.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3 text-primary-500">
                <TargetIcon />
                <h2 className="font-semibold text-sm">Scope & Flow</h2>
              </div>
              <p className="text-xs text-gray-500">
                We turn the recommendation — yours or ours — into a concrete
                build plan with milestones you can hold us to.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3 text-primary-500">
                <WrenchIcon />
                <h2 className="font-semibold text-sm">Build</h2>
              </div>
              <p className="text-xs text-gray-500">
                Implementation against the plan, with working software visible
                on a regular cadence, not a reveal at the end.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3 text-primary-500">
                <PackageIcon />
                <h2 className="font-semibold text-sm">Deploy</h2>
              </div>
              <p className="text-xs text-gray-500">
                A staged rollout with a rollback plan already written, not
                improvised at 2am.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3 text-primary-500">
                <MonitorIcon />
                <h2 className="font-semibold text-sm">Support & Monitor</h2>
              </div>
              <p className="text-xs text-gray-500">
                We stay on the system after launch — monitoring, patching, and
                answering when something breaks.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-[5%]">
        <FadeInUp
          delay={0.1}
          duration={0.5}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5"
        >
          <h2 className="font-semibold text-2xl capitalize">
            Support you can pick up piece by piece
          </h2>
        </FadeInUp>
        {/* Product Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full my-5"
          staggerDelay={0.1}
          delayChildren={0.2}
        >
          {data.map((each: any) => (
            <StaggerItem key={each.name} direction="up">
              <CustomCard data={each} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
      <CTA />
    </section>
  );
}
