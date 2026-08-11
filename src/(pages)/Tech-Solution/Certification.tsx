import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

import CustomHero from "@/components/organisms/hero/CustomHero";
import { FadeInUp } from "@/components/atoms/Motion";
import CTA from "@/components/organisms/CTA";

import IBM from "@/assets/dummy/ibm.png";
import HPE from "@/assets/dummy/hpe.png";
import Dell from "@/assets/dummy/dell.png";
import Sophos from "@/assets/dummy/sophos.png";
import Microsoft from "@/assets/dummy/microsoft2.png";
import { Link } from "react-router-dom";

export default function Certification() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How are renewals and price changes handled?",
      answer:
        "Renewals are managed proactively — we track every license expiry and send reminders well before the deadline so there's never a gap in coverage. Price changes follow each vendor's official rate card, and we'll always confirm any increase with you before you renew.",
    },
    {
      question: "What compliance documentation is included?",
      answer:
        "Every purchase includes the vendor's official documentation — license agreements, invoices, product keys, and proof of entitlement — so you stay fully compliant during audits and renewals.",
    },
    {
      question: "Can we cancel or downgrade mid-term?",
      answer:
        "Most licenses can be downgraded or reassigned within your organization, but cancellation and mid-term changes depend on each vendor's terms. Our team will walk you through the specific policy for each license before you commit.",
    },
  ];

  return (
    <section className="bg-[#FCFCFC]">
      <CustomHero
        title="Technology & Licensing Service"
        subtitle="Technology & Licensing Service"
        description="At our company, we offer top-notch software and licensing services, partnering with industry giants like Microsoft and Google."
        path="/certification"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] items-center">
        <FadeInUp delay={0.2} duration={0.5}>
          <h2 className="text-lg text-center font-semibold">
            Powered by Industry-Leading{" "}
            <span className="text-primary-500">Technologies</span>
          </h2>
        </FadeInUp>
        <div className="flex flex-wrap justify-evenly gap-4 mb-15 mt-5">
          <div className="min-h-[100px] max-w-[25%] flex items-center">
            <img src={Dell} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] max-w-[35%] flex items-center">
            <img src={HPE} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] max-w-[20%] flex items-center">
            <img src={IBM} alt="microsoft logo" />
          </div>
        </div>
        <div className="grid  grid-cols-1 lg:grid-cols-2 items-center gap-5">
          <FadeInUp delay={0.2} duration={0.5}>
            <h2 className="text-3xl font-semibold">Featured Vendor</h2>
            <span className="text-sm text-gray-400 block mx-auto mt-2">
              Genuine software licenses from{" "}
              <span className="font-medium text-primary-500">
                trusted vendors
              </span>{" "}
              to keep your business secure, compliant, and fully supported.
            </span>
          </FadeInUp>
          <div className="flex flex-wrap justify-evenly gap-4 mt-5">
            <Link
              to="/certification/sophos"
              className="min-h-[100px] flex items-center bg-[#ECECEC] rounded-xl shadow-md hover:bg-gray-300 duration-200 flex-1"
            >
              <img src={Sophos} alt="microsoft logo" />
            </Link>
            <Link
              to="/certification/microsoft"
              className="min-h-[100px] flex items-center bg-[#ECECEC] rounded-xl shadow-md hover:bg-gray-300 duration-200 flex-1"
            >
              <img src={Microsoft} alt="microsoft logo" />
            </Link>
          </div>
        </div>
      </section>
      <div
        className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-5 mb-10 grid grid-cols-1 lg:grid-cols-3 items-center"
        style={{
          backgroundImage: `linear-gradient(#242424CC, #242424CC), url('./statHero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white mb-4 lg:mb-0">
          <span className="text-xs md:text-base">FAQ & COMPLIANCE GUIDE</span>
          <h4 className="text-xl md:text-3xl font-semibold">
            Before You Commit.
          </h4>
        </div>
        <div className="h-full flex items-end w-full col-span-2">
          <div className="w-full flex flex-col gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
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
      <CTA />
    </section>
  );
}
