import CustomHero from "@/components/organisms/hero/CustomHero";
import { CheckCircleIcon } from "lucide-react";

import FreeTriaIcon from "@/assets/v2/free-trial.gif";
import CTA from "@/components/organisms/CTA";
import FreeTrialList from "@/components/organisms/FreeTrialList";

export default function FreeTrial() {
  return (
    <section>
      <CustomHero
        title="Skill Accelerator (Free Trial)"
        subtitle="Skill Accelerator"
        description="An intensive, outcome-focused program designed to rapidly build or upgrade a specific set of competencies."
        path="/free-trial"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="bg-[#ECECEC] p-5 md:p-6 space-y-5 rounded-xl drop-shadow-md ">
          <div className="flex items-center gap-3">
            <img
              src={FreeTriaIcon}
              alt="free trial icon"
              className="aspect-square max-h-[50px]"
            />
            <div className="space-y-2">
              <span className="text-xs text-gray-600 block">ABOUT PSA</span>
              <h3 className="text-lg md:text-xl font-semibold">
                What is Professional Skill Accelerator Program?
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Skill Accelerator provide a fast, practical learning experience that
            enables organizations and professional to assess skill relevance,
            engage employees, and support performance improvement prior to
            broader capability development initiatives
          </p>
          <div className="space-y-2 text-xs md:text-sm font-semibold">
            {[
              "90 minutes of focused, practical learning.",
              "Demonstrations of real workplace tools and frameworks.",
              "Hands-on demonstrations and applied discussion.",
              "Suitable for busy proffessional and teams.",
            ].map((each: string) => (
              <div key={each} className="flex items-center gap-3">
                <CheckCircleIcon
                  className="text-primary-500 shrink-0"
                  size={14}
                />
                <span>{each}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:pl-15">
          <img
            alt="free trial"
            src="./statHero.jpg"
            className="rounded-xl w-full"
          />
        </div>
      </section>
      <FreeTrialList />
      <CTA />
    </section>
  );
}
