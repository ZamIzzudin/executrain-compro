import { useState } from "react";

import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircleIcon } from "lucide-react";

import AdvisoryA from "@/assets/v2/advisory-1.png";
import AdvisoryB from "@/assets/v2/advisoty-2.png";
import AdvisoryC from "@/assets/v2/advisory-3.png";
import Advisory from "@/assets/v2/advisory.png";
import PSA from "@/assets/v2/psa.png";

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
            <h3 className="text-lg md:text-xl font-semibold">
              How The Advisory Work
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3">
                <img
                  src={AdvisoryA}
                  alt="microsoft logo"
                  className="max-w-[25%]"
                />
                <h2 className="font-semibold">
                  What <span className="text-primary-500">framework</span> do we
                  use?
                </h2>
              </div>
              <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                Every decision is weighed against three lenses: total cost of
                ownership, your team's real capability, and time-to-value. No
                framework gets applied blindly — we adapt it to what your team
                can actually maintain after we leave.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3">
                <img
                  src={AdvisoryB}
                  alt="microsoft logo"
                  className="max-w-[25%]"
                />
                <h2 className="font-semibold">
                  How about the{" "}
                  <span className="text-primary-500">advisory</span> Method?
                </h2>
              </div>
              <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                A discovery call, a technical audit of your current stack or
                proposal, a written recommendation with the trade-offs spelled
                out, and a follow-up session to walk through it with your team.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-2 flex-1 flex-col flex">
              <div className="flex items-center gap-3">
                <img
                  src={AdvisoryC}
                  alt="microsoft logo"
                  className="max-w-[25%]"
                />
                <h2 className="font-semibold">
                  What would you{" "}
                  <span className="text-primary-500">expect</span> on this
                  services?
                </h2>
              </div>
              <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                A clear, documented recommendation — not a slide deck. You'll
                know what to build, what to buy, and what to avoid, in language
                your whole team can act on immediately.
              </p>
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
                      className={`w-5 h-5 shrink-0 text-primary-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
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
