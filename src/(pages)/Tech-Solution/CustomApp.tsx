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
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Custom App Development"
        subtitle="Custom App Development"
        description="We specialize in designing and building applications that are uniquely tailored to your organization's needs."
        path="/app-development"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-8">
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
            {/* Card 1: Active / Highlighted */}
            <div
              id="dev-card-1"
              className="w-full p-5 bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-rose-700 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
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
                <div className="self-stretch justify-start text-rose-700 group-hover:text-rose-700 text-base font-semibold">
                  Web Platforms
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Dashboards, portals and internal tools built for daily use.
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              id="dev-card-2"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
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
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                  Mobile Apps
                </div>
                <div className="self-stretch justify-start text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                  Native and cross-platform apps for iOS and Android.
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              id="dev-card-3"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
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
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                  System Integrations
                </div>
                <div className="self-stretch justify-start text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                  Connecting the tools you already run into one workflow.
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              id="dev-card-4"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
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
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                  Legacy Modernization
                </div>
                <div className="self-stretch justify-start text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                  Rebuilding aging systems without breaking what works.
                </div>
              </div>
            </div>
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
