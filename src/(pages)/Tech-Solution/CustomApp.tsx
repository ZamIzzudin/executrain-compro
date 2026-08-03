import { useState } from "react";

import ProductList from "@/components/organisms/ProductList";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CTA from "@/components/organisms/CTA";
import ProductFilter from "@/components/molecules/filter/ProductFilter";

import { FadeInUp } from "@/components/atoms/Motion";

import Dekstop from "@/assets/v2/dekstop.png";
import Mobile from "@/assets/v2/mobile.png";
import Integrate from "@/assets/v2/integrate.png";
import Database from "@/assets/v2/database.png";

import Power from "@/assets/dummy/power.png";
import Azure from "@/assets/dummy/azure.png";
import ReactLogo from "@/assets/dummy/react.png";
import Next from "@/assets/dummy/next.png";
import Node from "@/assets/dummy/node.png";
import Mongo from "@/assets/dummy/mongo.png";

export default function CustomApp() {
  const [tech, setTech] = useState<string | undefined>(undefined);
  const [deployment, setDeployment] = useState<string | undefined>(undefined);

  return (
    <section>
      <CustomHero
        title="Custom App Development"
        subtitle="Custom App Development"
        description="We specialize in designing and building applications that are uniquely tailored to your organization's needs."
        path="/app-development"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%] items-center">
        <div className="bg-[#ECECEC] p-5 md:p-6 space-y-5 rounded-xl drop-shadow-md ">
          <div className="space-y-2">
            <span className="text-xs text-gray-600 block">WHAT WE BUILD</span>
            <h3 className="text-lg md:text-xl font-semibold">
              Development Capabilities{" "}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 flex-col flex">
              <img src={Dekstop} alt="microsoft logo" className="w-[30%]" />
              <h2 className="font-semibold text-primary-500">Web Platforms</h2>
              <p className="text-xs text-gray-500">
                Dashboards, portals and internal tools built for daily use.
              </p>
            </div>
            <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 flex-col flex">
              <img src={Mobile} alt="microsoft logo" className="w-[30%]" />
              <h2 className="font-semibold text-primary-500">Mobile Apps</h2>
              <p className="text-xs text-gray-500">
                Native and cross-platform apps for iOS and Android.
              </p>
            </div>
            <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 flex-col flex">
              <img src={Integrate} alt="microsoft logo" className="w-[30%]" />
              <h2 className="font-semibold text-primary-500">
                System Integrations
              </h2>
              <p className="text-xs text-gray-500">
                Connecting the tools you already run into one workflow.
              </p>
            </div>
            <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 flex-col flex">
              <img src={Database} alt="microsoft logo" className="w-[30%]" />
              <h2 className="font-semibold text-primary-500">
                Legacy Modernization
              </h2>
              <p className="text-xs text-gray-500">
                Rebuilding aging systems without breaking what works.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] items-center">
        <FadeInUp delay={0.2} duration={0.5} className="text-center">
          <h3 className="text-base">
            Here are some{" "}
            <span className="text-primary-500 font-semibold">tech stacks</span>{" "}
            we used to develop
          </h3>
        </FadeInUp>
        <div className="flex flex-wrap justify-evenly gap-1">
          <div className="min-h-[100px] flex items-center">
            <img src={Power} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Azure} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={ReactLogo} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Next} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Node} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Mongo} alt="microsoft logo" />
          </div>
        </div>
      </section>

      <section className="pb-[5%]">
        <ProductList
          name="Our Finished Works Catalog"
          type={"it_training"}
          basePath="/app-development"
        >
          <ProductFilter
            techValue={tech}
            deployValue={deployment}
            onTechChange={setTech}
            onDeployChange={setDeployment}
          />
        </ProductList>
      </section>
      <CTA />
    </section>
  );
}
