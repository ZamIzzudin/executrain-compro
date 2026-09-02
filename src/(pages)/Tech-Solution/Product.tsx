import { useState } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import SearchBar from "@/components/atoms/SearchBar";
import ProductFilter from "@/components/molecules/filter/ProductFilter";
import ITProductList from "@/components/organisms/ITProductList";
import CTA from "@/components/organisms/CTA";
import { LordIcons } from "@/components/atoms";
import { useITProductFilters } from "@/services/it-product/filters";

export default function Product() {
  const [search, setSearch] = useState("");
  const [tech, setTech] = useState<string | undefined>(undefined);
  const [deployment, setDeployment] = useState<string | undefined>(undefined);
  const { data: filterOpts } = useITProductFilters();

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Ready-to-use IT Products"
        subtitle="Ready-to-use IT Products"
        description="These software solutions streamline operations, enhance productivity, and equip your team with the tools they need to thrive in a competitive landscape."
        path="/it-product"
      />

      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 flex flex-col justify-start items-center gap-8">
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
            {/* Card 1: Active / Highlighted */}
            <div
              id="deliverable-card-1"
              className="w-full p-5 bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-rose-700 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
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
                <div className="self-stretch justify-start text-rose-700 group-hover:text-rose-700 text-base font-semibold">
                  Business Process Digitalization
                </div>
                <div className="self-stretch justify-start text-zinc-600 text-sm font-normal">
                  Automated digital workflows replacing manual operations.
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              id="deliverable-card-2"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
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
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                  Data Analytics and Dashboard
                </div>
                <div className="self-stretch justify-start text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                  Real-time interactive dashboards for metric tracking.
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              id="deliverable-card-3"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
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
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                  Business Intelligence
                </div>
                <div className="self-stretch justify-start text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                  A structured reporting suite for strategic insights.
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              id="deliverable-card-4"
              className="w-full p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
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
                <div className="self-stretch justify-start text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                  Artificial Intelligence Support
                </div>
                <div className="self-stretch justify-start text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                  Integrated AI modules for predictive recommendations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-[5%] space-y-8">
        <div className="px-[5%] md:px-[7%] lg:px-[10%] flex flex-col gap-6">
          <div className="w-full max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search IT Products..."
            />
          </div>
          <ProductFilter
            techValue={tech}
            deployValue={deployment}
            techOptions={filterOpts?.tech_stacks}
            onTechChange={setTech}
            onDeployChange={setDeployment}
          />
        </div>
        <ITProductList search={search} tech={tech} />
      </section>
      <CTA />
    </section>
  );
}
