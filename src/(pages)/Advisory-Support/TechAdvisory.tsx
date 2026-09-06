import { useState } from "react";

import CTA from "@/components/organisms/CTA";
import CustomHero from "@/components/organisms/hero/CustomHero";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircleIcon } from "lucide-react";

import Advisory from "@/assets/v2/advisory.png";
import PSA from "@/assets/v2/psa.png";
import { LordIcons } from "@/components/atoms";

import { useTechAdvisoryPage } from "@/services/tech-advisory-page/hook";

const WORK_ICONS = [
  {
    src: "https://cdn.lordicon.com/zuitvaic.json",
    target: "advisory-card-1",
    colors: "primary:#bf1e40,secondary:#ffc738,tertiary:#3a3347",
  },
  {
    src: "https://cdn.lordicon.com/uujuddgu.json",
    target: "advisory-card-2",
    colors:
      "primary:#ebe6ef,secondary:#ffc738,tertiary:#e37048,quaternary:#be1e40,quinary:#47c4e4",
  },
  {
    src: "https://cdn.lordicon.com/jzspergk.json",
    target: "advisory-card-3",
    colors:
      "primary:#47c4e4,secondary:#f9c9c0,tertiary:#be1e40,quaternary:#ebe6ef",
  },
];

const FALLBACK = {
  title_page: "Tech Advisory",
  description_page:
    "Independent technical guidance for teams choosing an architecture, evaluating a vendor, or deciding what to build next — before the budget and timeline are locked in.",
  advisory_work: {
    title: "How The Advisory Work",
    items: [
      {
        title: "What framework do we use?",
        description:
          "Every decision is weighed against three lenses: total cost of ownership, your team's real capability, and time-to-value. No framework gets applied blindly — we adapt it to what your team can actually maintain after we leave.",
      },
      {
        title: "How about the advisory Method?",
        description:
          "A discovery call, a technical audit of your current stack or proposal, a written recommendation with the trade-offs spelled out, and a follow-up session to walk through it with your team.",
      },
      {
        title: "What would you expect on this services?",
        description:
          "A clear, documented recommendation — not a slide deck. You'll know what to build, what to buy, and what to avoid, in language your whole team can act on immediately.",
      },
    ],
  },
  advisory_support: {
    title: "Where this Advisory Helps Most",
    points: [
      "Choosing between build vs. buy",
      "Evaluating a vendor or platform before signing",
      "Getting a second opinion on an existing architecture",
      "Planning a migration or major refactor",
    ],
  },
  faq: {
    title: "What this advisory is — and isn't",
    questions: [
      {
        question: "How long does an engagement take?",
        answer:
          "Most advisory engagements run two to three weeks from kickoff to final recommendation. Urgent decisions — like a vendor contract deadline — can be compressed to a few days.",
      },
      {
        question: "Do you work with our team or independently?",
        answer:
          "We work closely with your team. Discovery and the technical audit involve your stakeholders, and the final recommendation is walked through with your engineers and decision-makers. That said, our advice stays independent — we're not tied to any vendor, product, or outcome.",
      },
      {
        question: "Is this one time engagement or ongoing?",
        answer:
          "Either, depending on what you need. Most engagements are one-time, decision-focused projects, but we can also set up a retainer for ongoing architecture reviews, vendor evaluations, or quarterly check-ins as your roadmap evolves.",
      },
    ],
  },
  boundaries: {
    points: [
      "Writing or shipping production code",
      "Staffing your team with engineers or contractors",
      "Managing day-to-day implementation once a decision is made",
    ],
  },
  cta: {
    title: "Need Some Advisory?",
    description:
      "Get the full proposal and training details by clicking the button below.",
    label: "Contact Now!",
    link: "",
  },
};

export default function TechAdvisory() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: pageContent } = useTechAdvisoryPage();

  const content = {
    ...FALLBACK,
    ...(pageContent?.content || {}),
    advisory_work: {
      ...FALLBACK.advisory_work,
      ...(pageContent?.content?.advisory_work || {}),
    },
    advisory_support: {
      ...FALLBACK.advisory_support,
      ...(pageContent?.content?.advisory_support || {}),
    },
    faq: { ...FALLBACK.faq, ...(pageContent?.content?.faq || {}) },
    boundaries: {
      ...FALLBACK.boundaries,
      ...(pageContent?.content?.boundaries || {}),
    },
    cta: { ...FALLBACK.cta, ...(pageContent?.content?.cta || {}) },
  };

  const workItems = content.advisory_work.items;
  const faqItems = content.faq.questions;

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title={content.title_page}
        subtitle="Tech Advisory"
        description={content.description_page}
        path="/tech-advisory"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-center items-center gap-3">
          <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
            {content.advisory_work.title}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {workItems.map((item, index) => (
              <div
                key={index}
                id={`advisory-card-${index + 1}`}
                className="w-full px-4 pt-4 pb-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer"
              >
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="p-1 bg-stone-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                    <LordIcons
                      src={WORK_ICONS[index % WORK_ICONS.length].src}
                      trigger="hover"
                      target={`#advisory-card-${index + 1}`}
                      state="hover-pinch"
                      colors={WORK_ICONS[index % WORK_ICONS.length].colors}
                      size={40}
                    />
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-end items-start gap-2 overflow-hidden">
                    <div className="self-stretch justify-start text-base font-medium text-neutral-800">
                      {item.title}
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
                <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-12 flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="w-full flex justify-start items-center">
            <div className="w-96 h-60 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-[19.59px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-gray-200 overflow-hidden group">
              <img
                alt="advisory support"
                src={Advisory}
                className="w-full h-full object-cover rounded-[19.59px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                    ADVISORY SUPPORT
                  </div>
                  <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
                    {content.advisory_support.title}
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {content.advisory_support.points.map((item, index, arr) => (
                  <div key={item} className="self-stretch flex flex-col gap-3">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <CheckCircleIcon
                        className="text-rose-700 shrink-0"
                        size={16}
                      />
                      <div className="justify-start text-neutral-800 text-sm font-medium">
                        {item}
                      </div>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="self-stretch h-0 outline outline-[0.25px] outline-offset-[-0.50px] outline-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-5"
        style={{
          backgroundImage: `linear-gradient(#242424CC, #242424CC), url('./statHero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-white mb-4 lg:mb-0">
          <span className="text-xs md:text-sm">FREQUENTLY ASKED QUESTION</span>
          <h4 className="text-xl md:text-3xl font-semibold">
            {content.faq.title}
          </h4>
        </div>
        <div className="h-full flex items-end w-full">
          <div className="w-full flex flex-col gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question || index}
                  className={`border border-white/20 overflow-hidden bg-white/30 cursor-pointer ${isOpen ? "rounded-3xl" : "rounded-full"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-medium">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-white cursor-pointer transition-transform duration-300 ${
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
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 flex flex-col justify-start items-center gap-2.5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="w-full">
            <div className="self-stretch p-6 bg-gradient-to-b from-white to-pink-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-rose-700 flex flex-col justify-start items-start gap-6">
              <div className="self-stretch justify-start text-zinc-500 text-sm font-normal">
                BOUNDARIES
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {content.boundaries.points.map((item, index, arr) => (
                  <div key={item} className="self-stretch flex flex-col gap-3">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <CheckCircleIcon
                        className="text-rose-700 shrink-0"
                        size={16}
                      />
                      <div className="justify-start text-neutral-800 text-sm font-medium">
                        {item}
                      </div>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center md:justify-end items-center">
            <div className="w-96 h-60 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-[19.59px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-gray-200 overflow-hidden group">
              <img
                alt="PSA"
                src={PSA}
                className="w-full h-full object-cover rounded-[19.59px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      <CTA
        title={content.cta.title}
        description={content.cta.description}
        cta={content.cta.label}
        link={content.cta.link}
        bgGradient="bg-gradient-to-b from-[#FCFCFC] to-[#E0E0E0]"
      />
    </section>
  );
}
