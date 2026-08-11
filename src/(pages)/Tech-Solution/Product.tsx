import { useState } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import ProductFilter from "@/components/molecules/filter/ProductFilter";
import CTA from "@/components/organisms/CTA";
import ProductList from "@/components/organisms/ProductList";
import { LordIcons } from "@/components/atoms";

export default function Product() {
  const [tech, setTech] = useState<string | undefined>(undefined);
  const [deployment, setDeployment] = useState<string | undefined>(undefined);

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Ready-to-use IT Products"
        subtitle="Ready-to-use IT Products"
        description="These software solutions streamline operations, enhance productivity, and equip your team with the tools they need to thrive in a competitive landscape."
        path="/product"
      >
        <ProductFilter
          techValue={tech}
          deployValue={deployment}
          onTechChange={setTech}
          onDeployChange={setDeployment}
        />
      </CustomHero>

      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%] items-center">
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
              DELIVERABLES
            </div>
            <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
              Our Project Deliverable
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div
              id="deliverable-card-1"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/lldhrpsv.json"
                  trigger="hover"
                  target="#deliverable-card-1"
                  state="hover-pinch"
                  colors="primary:#ebe6ef,secondary:#bf1e40,tertiary:#3a3347,quaternary:#be1e40"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Business Process Digitalization
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Automated digital workflows replacing manual operations.
                </div>
              </div>
            </div>

            <div
              id="deliverable-card-2"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/cnbqxixv.json"
                  trigger="hover"
                  target="#deliverable-card-2"
                  state="hover-pinch"
                  colors="primary:#be1e40,secondary:#2ca58d,tertiary:#3080e8,quaternary:#3a3347,quinary:#ebe6ef,senary:#ffc738"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Data Analytics and Dashboard
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Real-time interactive dashboards for tracking.
                </div>
              </div>
            </div>

            <div
              id="deliverable-card-3"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/ndbacbli.json"
                  trigger="hover"
                  target="#deliverable-card-3"
                  state="hover-pinch"
                  colors="primary:#b26836,secondary:#ffc738,tertiary:#3a3347,quaternary:#be1e40"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Business Intelligence
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  A structured reporting suite for strategic insights.
                </div>
              </div>
            </div>

            <div
              id="deliverable-card-4"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                <LordIcons
                  src="https://cdn.lordicon.com/nxmhrpbr.json"
                  trigger="hover"
                  target="#deliverable-card-4"
                  state="hover-pinch"
                  colors="primary:#f9c9c0,secondary:#be1e40,tertiary:#3a3347"
                  size={40}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold">
                  Artificial Intelligence Support
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Integrated AI modules for predictive recommendations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[5%]">
        <ProductList
          name="Our Ready-to-use IT Product Catalog"
          type={"it_training"}
        />
      </section>
      <CTA />
    </section>
  );
}
