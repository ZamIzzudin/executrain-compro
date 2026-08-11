import CustomHero from "@/components/organisms/hero/CustomHero";
import {
  FadeInUp,
  StaggerItem,
  StaggerContainer,
  LordIcons,
} from "@/components/atoms";
import CustomCard from "@/components/molecules/card/Custom";
import CTA from "@/components/organisms/CTA";

import MatrixA from "@/assets/dummy/matrix-1.png";
import MatrixB from "@/assets/dummy/matrix-2.png";

export default function TalentPlacement() {
  const data = [
    {
      name: (
        <h3>
          1st Level <span className="text-primary-500">Technical Support</span>
        </h3>
      ),
      items: ["Helpdesk Support", "End User Support", "1st level Support"],
      cta: "I Need This Talent",
    },
    {
      name: (
        <h3>
          2nd Level <span className="text-primary-500">IT Specialist</span>
        </h3>
      ),
      items: [
        "Mastering on Specific Competency",
        "Server and network support",
        "As 2nd level support",
      ],
      cta: "I Need This Talent",
    },
    {
      name: <h3>IT Consultant / System Intgrator</h3>,
      items: [
        "Perform environment assesment, need and gap analysis",
        "Carry out consultation, design, solution and implementation",
      ],
      cta: "I Need This Talent",
    },
  ];

  return (
    <section>
      <CustomHero
        title="IT Talent Placement"
        subtitle="IT Talent Placement"
        description="Vetted engineers, placed the way your project actually needs them — as a permanent hire or a dedicated resource for the length of the work."
        path="/talent-placement"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%] items-center">
        <div className="space-y-5 rounded-xl drop-shadow-md">
          <div className="space-y-2">
            <h3 className="text-lg md:text-2xl font-semibold">
              Our Placement Models
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              id="placement-card-1"
              className="w-full px-4 pt-4 pb-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 inline-flex flex-col justify-start items-center gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-stone-50 rounded-xl outline outline-[0.25px] outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
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
              <div className="self-stretch h-0 outline outline-[0.25px] outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                Full-time on-site IT Support. Engineer (1st level) are deployed
                based on required location to ensure business running well.
              </div>
            </div>
            <div
              id="placement-card-2"
              className="w-full px-4 pt-4 pb-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 inline-flex flex-col justify-start items-center gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-stone-50 rounded-xl outline outline-[0.25px] outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
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
              <div className="self-stretch h-0 outline outline-[0.25px] outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                High workload and complex troubleshooting do not happen all the
                time. In order to optimize the IT support engineer utilization,
                higher expertise level can be called when needed.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] items-center space-y-5">
        <div>
          <h2 className="font-semibold text-2xl">Our IT Talent Matrix</h2>
          <span className="text-gray-400">
            Here’s a little details of what our IT talent can do
          </span>
        </div>
        <div className="bg-[#ECECEC] p-5 md:p-6 space-y-5 rounded-xl drop-shadow-md grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-5">
            <span className="text-xs text-gray-600 block">
              1ST LEVEL TALENT MATRIX
            </span>
            <img src={MatrixA} alt="" />
          </div>
          <div className="space-y-5">
            <span className="text-xs text-gray-600 block">
              2ND LEVEL TALENT MATRIX
            </span>
            <img src={MatrixB} alt="" />
          </div>
        </div>
      </section>
      <section className="px-[5%] md:px-[7%] lg:px-[10%] w-full pb-[5%]">
        <FadeInUp
          delay={0.1}
          duration={0.5}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5"
        >
          <h2 className="font-semibold text-2xl capitalize">
            Available Talent Roles
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
      <CTA title="Need These Kind Of Services?" cta="Consult Now!" />
    </section>
  );
}
