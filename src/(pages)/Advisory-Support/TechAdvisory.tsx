import { useState } from "react";

import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircleIcon } from "lucide-react";

import Advisory from "@/assets/v2/advisory.png";
import PSA from "@/assets/v2/psa.png";
import { LordIcons } from "@/components/atoms";


export default function TechAdvisory() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How long does an engagement take?",
      answer:
        "Most advisory engagements run two to three weeks from kickoff to final  recommendation. Urgent decisions — like a vendor contract deadline — can be compressed to a few days.",
    },
    {
      question: "Do you work with our team or independently?",
      answer:
        "Most advisory engagements run two to three weeks from kickoff to final  recommendation. Urgent decisions — like a vendor contract deadline — can be compressed to a few days.",
    },
    {
      question: "Is this one time engagement or ongoing?",
      answer:
        "Most advisory engagements run two to three weeks from kickoff to final  recommendation. Urgent decisions — like a vendor contract deadline — can be compressed to a few days.",
    },
  ];

  return (
    <section>
      <CustomHero
        title="Tech Advisory"
        subtitle="Tech Advisory Page"
        description="Independent technical guidance for teams choosing an architecture,  evaluating a vendor, or deciding what to build next — before the budget  and timeline are locked in."
        path="/tech-advisory "
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] items-center">
        <div className="space-y-5 rounded-xl drop-shadow-md">
          <div className="space-y-2">
            <h3 className="text-lg md:text-2xl font-semibold">
              How The Advisory Work
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            <div
              id="advisory-card-1"
              className="w-full px-4 pt-4 pb-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 inline-flex flex-col justify-start items-center gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-stone-50 rounded-xl outline outline-[0.25px] outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/zuitvaic.json"
                    trigger="hover"
                    target="#advisory-card-1"
                    state="hover-pinch"
                    colors="primary:#bf1e40,secondary:#ffc738,tertiary:#3a3347"
                    size={40}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                  <div className="self-stretch justify-start">
                    <span className="text-neutral-800 text-base font-medium ">
                      What{" "}
                    </span>
                    <span className="text-rose-700 text-base font-medium">
                      framework{" "}
                    </span>
                    <span className="text-neutral-800 text-base font-medium ">
                      do we use?
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.25px] outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                Every decision is weighed against three lenses: total cost of
                ownership, your team's real capability, and time-to-value. No
                framework gets applied blindly — we adapt it to what your team
                can actually maintain after we leave.
              </div>
            </div>
            <div
              id="advisory-card-2"
              className="w-full px-4 pt-4 pb-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 inline-flex flex-col justify-start items-center gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-stone-50 rounded-xl outline outline-[0.25px] outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/uujuddgu.json"
                    trigger="hover"
                    target="#advisory-card-2"
                    state="hover-pinch"
                    colors="primary:#ebe6ef,secondary:#ffc738,tertiary:#e37048,quaternary:#be1e40,quinary:#47c4e4"
                    size={40}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                  <div className="self-stretch justify-start">
                    <span className="text-neutral-800 text-base font-medium">
                      How about the{" "}
                    </span>
                    <span className="text-rose-700 text-base font-medium">
                      advisory{" "}
                    </span>
                    <span className="text-neutral-800 text-base font-medium">
                      Method?
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.25px] outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                A discovery call, a technical audit of your current stack or
                proposal, a written recommendation with the trade-offs spelled
                out, and a follow-up session to walk through it with your team.
              </div>
            </div>
            <div
              id="advisory-card-3"
              className="w-full px-4 pt-4 pb-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 inline-flex flex-col justify-start items-center gap-3 transition-all duration-300 cursor-pointer"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="p-1 bg-stone-50 rounded-xl outline outline-[0.25px] outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/jzspergk.json"
                    trigger="hover"
                    target="#advisory-card-3"
                    state="hover-pinch"
                    colors="primary:#47c4e4,secondary:#f9c9c0,tertiary:#be1e40,quaternary:#ebe6ef"
                    size={40}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                  <div className="self-stretch justify-start">
                    <span className="text-neutral-800 text-base font-medium">
                      What would you{" "}
                    </span>
                    <span className="text-rose-700 text-base font-medium">
                      expect{" "}
                    </span>
                    <span className="text-neutral-800 text-base font-medium">
                      on this services?
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.25px] outline-offset-[-0.50px] outline-gray-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                A clear, documented recommendation — not a slide deck. You'll
                know what to build, what to buy, and what to avoid, in language
                your whole team can act on immediately.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="md:pr-15">
          <img alt="free trial" src={Advisory} className="rounded-xl w-full" />
        </div>
        <div className="bg-white p-5 md:p-6 space-y-5 rounded-xl drop-shadow-md ">
          <div className="flex items-center gap-3">
            <div className="space-y-2">
              <span className="text-xs text-gray-600 block">
                ADVISORY SUPPORT
              </span>
              <h3 className="text-lg md:text-xl font-semibold">
                Where this Advisory Helps Most
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs md:text-sm font-semibold">
            {[
              "Choosing between build vs. buy",
              "Evaluating a vendor or platform before signing",
              "Getting a second opinion on an existing architecture",
              "Planning a migration or major refactor",
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
      </section>
      <div
        className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-5"
        style={{
          backgroundImage: `linear-gradient(#242424CC, #242424CC), url('./statHero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white mb-4 lg:mb-0">
          <span className="text-xs md:text-base">
            FREQUENTLY ASKED QUESTION
          </span>
          <h4 className="text-xl md:text-3xl font-semibold">
            What this advisory is — and isn't
          </h4>
        </div>
        <div className="h-full flex items-end w-full">
          <div className="w-full flex flex-col gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className={`border border-white/20 overflow-hidden bg-white/30 ${isOpen ? "rounded-3xl" : "rounded-full"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white hover:bg-white/10 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-medium">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-primary-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-white/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] grid grid-cols-1 md:grid-cols-5 items-center gap-6">
        <div className="bg-gradient-to-b from-white from-70% to-primary-50 p-5 md:p-6 space-y-5 rounded-2xl border border-primary-500 col-span-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 block">BOUNDARIES</span>
          </div>

          <div className="space-y-2 text-xs md:text-sm font-semibold">
            {[
              "Writing or shipping production code",
              "Staffing your team with engineers or contractors",
              "Managing day-to-day implementation once a decision is made",
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
        <div className="md:pl-15 col-span-2">
          <img alt="free trial" src={PSA} className="rounded-xl w-full" />
        </div>
      </section>
      <CTA title="Need Some Advisory?" cta="Contact Now!" />
    </section>
  );
}
