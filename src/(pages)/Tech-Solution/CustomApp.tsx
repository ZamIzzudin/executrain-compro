import { useState } from "react";

import ProductList from "@/components/organisms/ProductList";
import CustomHero from "@/components/organisms/hero/CustomHero";
import CTA from "@/components/organisms/CTA";
import ProductFilter from "@/components/molecules/filter/ProductFilter";

import { FadeInUp, LordIcons } from "@/components/atoms";

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
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
              WHAT WE BUILD
            </div>
            <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
              Development Capabilities
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div
              id="dev-card-1"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/pfzzikja.json"
                  trigger="hover"
                  target="#dev-card-1"
                  state="hover-pinch"
                  colors="primary:#4bb3fd,secondary:#3a3347,tertiary:#ebe6ef"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Web Platforms
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Dashboards, portals and internal tools built for daily use.
                </div>
              </div>
            </div>

            <div
              id="dev-card-2"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/whjtorej.json"
                  trigger="hover"
                  target="#dev-card-2"
                  state="hover-pinch"
                  colors="primary:#3a3347,secondary:#be1e40,tertiary:#4bb3fd,quaternary:#ebe6ef"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Mobile Apps
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Native and cross-platform apps for iOS and Android.
                </div>
              </div>
            </div>

            <div
              id="dev-card-3"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/gekxoxst.json"
                  trigger="hover"
                  target="#dev-card-3"
                  state="hover-pinch"
                  colors="primary:#3a3347,secondary:#2ca58d,tertiary:#be1e40"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  System Integrations
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Connecting the tools you already run into one workflow.
                </div>
              </div>
            </div>

            <div
              id="dev-card-4"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/vgadqplj.json"
                  trigger="hover"
                  target="#dev-card-4"
                  state="hover-pinch"
                  colors="primary:#b4b4b4,secondary:#be1e40,tertiary:#66ee78"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Legacy Modernization
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Rebuilding aging systems without breaking what works.
                </div>
              </div>
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
