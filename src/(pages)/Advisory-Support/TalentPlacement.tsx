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

export default function TalentPlacement() {
  const data = [
    {
      title: "1st Level Technical Support",
      name: (
        <span>
          1st Level <span className="text-rose-700">Technical Support</span>
        </span>
      ),
      items: ["Helpdesk Support", "End User Support", "1st level Support"],
      cta: "I Need This Talent",
      image: "./statHero.jpg",
    },
    {
      title: "2nd Level IT Specialist",
      name: (
        <span>
          2nd Level <span className="text-rose-700">IT Specialist</span>
        </span>
      ),
      items: [
        "Mastering on Specific Competency",
        "Server and network support",
        "As 2nd level support",
      ],
      cta: "I Need This Talent",
      image: "./statHero.jpg",
    },
    {
      title: "IT Consultant / System Integrator",
      name: <span>IT Consultant / System Integrator</span>,
      items: [
        "Perform environment assessment, need and gap analysis",
        "Carry out consultation, design, solution and implementation",
      ],
      cta: "I Need This Talent",
      image: "./statHero.jpg",
    },
  ];

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="IT Talent Placement"
        subtitle="IT Talent Placement"
        description="Vetted engineers, placed the way your project actually needs them — as a permanent hire or a dedicated resource for the length of the work."
        path="/talent-placement"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch flex flex-col justify-center items-center gap-3">
          <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
            Our Placement Models
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div
              id="placement-card-1"
              className="w-full px-4 pt-4 pb-5 bg-stone-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/byicyhmi.json"
                    trigger="hover"
                    target="#placement-card-1"
                    state="hover-pinch"
                    colors="primary:#646e78,secondary:#f9c9c0,tertiary:#ebe6ef,quaternary:#b26836,quinary:#4bb3fd"
                    size={40}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                  <div className="self-stretch justify-start">
                    <span className="text-rose-700 text-base font-medium">
                      On-Site{" "}
                    </span>
                    <span className="text-neutral-800 text-base font-medium">
                      Basis
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                Full-time on-site IT Support. Engineer (1st level) are deployed
                based on required location to ensure business running well.
              </div>
            </div>
            <div
              id="placement-card-2"
              className="w-full px-4 pt-4 pb-5 bg-stone-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/wqbswumt.json"
                    trigger="hover"
                    target="#placement-card-2"
                    state="hover-calling"
                    colors="primary:#ffc738,secondary:#be1e40,tertiary:#f9c9c0,quaternary:#be1e40"
                    size={40}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                  <div className="self-stretch justify-start">
                    <span className="text-rose-700 text-base font-medium">
                      On-Call{" "}
                    </span>
                    <span className="text-neutral-800 text-base font-medium">
                      Basis
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                High workload and complex troubleshooting do not happen all the
                time. In order to optimize the IT support engineer utilization,
                higher expertise level can be called when needed.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <h2 className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
            Our IT Talent Matrix
          </h2>
          <span className="self-stretch justify-start text-neutral-400 text-base font-normal">
            Here’s a little details of what our IT talent can do
          </span>
        </div>
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex-1 flex flex-col justify-start items-start gap-2">
            <span className="self-stretch justify-start text-neutral-400 text-sm font-normal">
              1ST LEVEL TALENT MATRIX
            </span>
            <img
              src={MatrixA}
              alt="1st level talent matrix"
              className="self-stretch w-full rounded-xl object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col justify-start items-start gap-2">
            <span className="self-stretch justify-start text-neutral-400 text-sm font-normal">
              2ND LEVEL TALENT MATRIX
            </span>
            <img
              src={MatrixB}
              alt="2nd level talent matrix"
              className="self-stretch w-full rounded-xl object-contain"
            />
          </div>
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
            {data.map((each: any) => (
              <StaggerItem key={each.title} direction="up" className="h-full">
                <div className="group w-full bg-white rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 flex flex-col justify-start items-start transition-all duration-300 cursor-pointer h-full">
                  <div className="self-stretch h-52 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/40 rounded-3xl border-2 border-gray-200 group-hover:border-rose-700 transition-colors duration-300 overflow-hidden">
                    <img
                      src={each.image}
                      alt={each.title}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                  <div className="self-stretch px-5 pt-4 pb-6 rounded-bl-[32px] rounded-br-[32px] flex flex-col justify-between items-center gap-4 overflow-hidden flex-1">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <div className="text-neutral-800 text-base font-medium">
                        {each.name}
                      </div>
                      <div className="self-stretch text-zinc-500 text-sm font-normal leading-relaxed">
                        {each.items.map((item: string, i: number) => (
                          <div key={i}>• {item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200 mt-auto"></div>
                    <div className="inline-flex justify-start items-center gap-2.5">
                      <span className="text-rose-700 text-base font-medium">
                        {each.cta}
                      </span>
                      <ArrowRight className="w-5 h-5 text-rose-700 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <CTA title="Need These Kind Of Services?" cta="Consult Now!" />
    </section>
  );
}
