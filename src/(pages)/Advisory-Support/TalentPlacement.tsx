import CustomHero from "@/components/organisms/hero/CustomHero";
import {
  FadeInUp,
  StaggerItem,
  StaggerContainer,
} from "@/components/atoms/Motion";
import CustomCard from "@/components/molecules/card/Custom";
import CTA from "@/components/organisms/CTA";

import AboutA from "@/assets/v2/about-1.png";
import HeroBG from "@/assets/banner.jpg";

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
            <h3 className="text-lg md:text-xl font-semibold">
              Our Placement Models
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="items-center grid grid-cols-6 gap-5">
                <img src={AboutA} alt="microsoft logo" />
                <div className="col-span-5">
                  <h2 className="font-semibold text-primary-500">On-Site</h2>
                  <h2 className="font-semibold">Basis</h2>
                </div>
              </div>
              <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                Full-tm on-site IT Support. Engineer (1st level) are deployed
                based on required location to ensure business running well.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="items-center grid grid-cols-6 gap-5">
                <img src={AboutA} alt="microsoft logo" />
                <div className="col-span-5">
                  <h2 className="font-semibold text-primary-500">On-Call</h2>
                  <h2 className="font-semibold">Basis</h2>
                </div>
              </div>
              <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                High workload and complex troubleshooting do not happen all the
                time. In order to optimize the IT support engineer utilization,
                higher expertise level can be called when needed.
              </p>
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
            <img src={HeroBG} alt="" />
          </div>
          <div className="space-y-5">
            <span className="text-xs text-gray-600 block">
              2ND LEVEL TALENT MATRIX
            </span>
            <img src={HeroBG} alt="" />
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
      <CTA />
    </section>
  );
}
