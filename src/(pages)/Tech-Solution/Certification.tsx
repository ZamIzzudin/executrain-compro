import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

import CustomHero from "@/components/organisms/hero/CustomHero";
import { FadeInUp } from "@/components/atoms/Motion";
import CertificationList from "@/components/organisms/CertificationList";
import CertificationFilter from "@/components/molecules/filter/CertificationFIlter";
import CTA from "@/components/organisms/CTA";

import { useAssetContext } from "@/layouts/AssetProvider";

import Tableu from "@/assets/dummy/tableu.png";
import Pearson from "@/assets/dummy/pearson.png";
import Microsoft from "@/assets/dummy/microsoft.png";
import Google from "@/assets/dummy/google.png";

export default function Certification() {
  const { getStaticAsset } = useAssetContext();
  const bannerPlain = getStaticAsset("banner_plain");

  const [tech, setTech] = useState<string | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How are renewals and price changes handled?",
      answer:
        "We provide perpetual, subscription, and volume licensing options from major vendors including Microsoft, Google, Tableu, and Pearson. Our team helps you choose the most cost-effective model for your organization.",
    },
    {
      question: "What compliance documentation is included? ",
      answer:
        "Yes, most licenses can be reassigned within your organization. Transfer policies vary by vendor and product, and our team will guide you through the specific terms for each license you purchase.",
    },
    {
      question: "Can we cancel or downgrade mid-term? ",
      answer:
        "Absolutely. Every license comes with setup assistance, and we offer ongoing support packages covering deployment, troubleshooting, and user training to ensure your team gets the most out of your investment.",
    },
  ];

  return (
    <section>
      <CustomHero
        title="Software & Licensing Service"
        subtitle="Software & Licensing Service"
        description="At our company, we offer top-notch software and licensing services, partnering with industry giants like Microsoft and Google."
        path="/certification"
      />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[5%] items-center">
        <FadeInUp delay={0.2} duration={0.5} className="text-center">
          <h3 className="text-base">
            Here are some{" "}
            <span className="text-primary-500 font-semibold">partner</span> we
            worked with
          </h3>
        </FadeInUp>
        <div className="flex flex-wrap justify-evenly gap-4">
          <div className="min-h-[100px] flex items-center">
            <img src={Microsoft} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Google} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Tableu} alt="microsoft logo" />
          </div>
          <div className="min-h-[100px] flex items-center">
            <img src={Pearson} alt="microsoft logo" />
          </div>
        </div>
      </section>

      <section className="pb-[5%]">
        <CertificationList
          name="Available Software & Licensing"
          type={"it_training"}
        >
          <CertificationFilter techValue={tech} onTechChange={setTech} />
        </CertificationList>
      </section>
      <div
        className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-5 grid grid-cols-1 lg:grid-cols-3 items-center"
        style={{
          backgroundImage: `url('${bannerPlain}'), url('./statHero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white mb-4 lg:mb-0">
          <span className="text-xs md:text-base">FAQ & COMPLIANCE GUIDE</span>
          <h4 className="text-xl md:text-3xl font-semibold">Before You Commit.</h4>
        </div>
        <div className="h-full flex items-end w-full col-span-2">
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
      <CTA />
    </section>
  );
}
