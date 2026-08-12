import CustomHero from "@/components/organisms/hero/CustomHero";
import { CheckCircleIcon } from "lucide-react";
import { LordIcons } from "@/components/atoms";

import CTA from "@/components/organisms/CTA";
import FreeTrialList from "@/components/organisms/FreeTrialList";

import PSA from "@/assets/v2/psa.png";

export default function FreeTrial() {
  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Skill Accelerator "
        subtitle="Skill Accelerator"
        description="An intensive, outcome-focused program designed to rapidly build or upgrade a specific set of competencies."
        path="/skill-accelerator"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-gradient-to-b from-white to-neutral-100 rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-start items-start">
            <div
              id="psa-card"
              className="w-full p-6 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-6 transition-all duration-300 cursor-pointer group"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-1.5 shrink-0 transition-colors duration-300">
                  <LordIcons
                    src="https://cdn.lordicon.com/lvmykwmd.json"
                    trigger="hover"
                    target="#psa-card"
                    state="hover-pinch"
                    colors="primary:#3a3347,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#3080e8,quinary:#121331"
                    size={44}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-2 overflow-hidden">
                  <span className="self-stretch text-zinc-500 text-sm font-normal">
                    ABOUT PSA
                  </span>
                  <h3 className="self-stretch text-neutral-800 group-hover:text-rose-700 text-2xl font-semibold transition-colors duration-300">
                    What is Professional Skill Accelerator Program?
                  </h3>
                </div>
              </div>

              <p className="self-stretch text-zinc-500 text-sm font-normal leading-relaxed">
                Skill Accelerator provide a fast, practical learning experience that
                enables organizations and professional to assess skill relevance,
                engage employees, and support performance improvement prior to
                broader capability development initiatives
              </p>

              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {[
                  "90 minutes of focused, practical learning.",
                  "Demonstrations of real workplace tools and frameworks.",
                  "Hands-on demonstrations and applied discussion.",
                  "Suitable for busy proffessional and teams.",
                ].map((item, index, arr) => (
                  <div key={item} className="self-stretch flex flex-col gap-3">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <CheckCircleIcon className="text-rose-700 shrink-0" size={16} />
                      <span className="justify-start text-neutral-800 text-sm font-medium">
                        {item}
                      </span>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center w-full">
            <div className="w-96 h-60 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-[19.59px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-gray-200 overflow-hidden group">
              <img
                alt="Skill Accelerator PSA"
                src={PSA}
                className="w-full h-full object-cover rounded-[19.59px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      <FreeTrialList />
      <CTA />
    </section>
  );
}
