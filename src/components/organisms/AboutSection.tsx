import { useNavigate } from "react-router-dom";

import Button from "../atoms/Button";

import { ArrowRightIcon, AwardIcon } from "lucide-react";

import Tableu from "@/assets/dummy/tableu.png";
import Pearson from "@/assets/dummy/pearson.png";
import Microsoft from "@/assets/dummy/microsoft.png";
import Google from "@/assets/dummy/google.png";

import Power from "@/assets/dummy/power.png";
import Azure from "@/assets/dummy/azure.png";
import ReactLogo from "@/assets/dummy/react.png";
import Next from "@/assets/dummy/next.png";
import Node from "@/assets/dummy/node.png";
import Mongo from "@/assets/dummy/mongo.png";

import AboutA from "@/assets/v2/about-3.png";
import AboutB from "@/assets/v2/about-1.png";
import AboutC from "@/assets/v2/about-2.png";

import Vision from "@/assets/v2/about-4.png";
import Mission from "@/assets/v2/about-5.png";

export default function AboutSection() {
  return (
    <section className="min-w-[98dvw] max-w-[99dvw] px-[7%] lg:px-[10%] gap-10 py-[5%] bg-gradient-to-b from-white from-70% to-primary-100 space-y-5">
      <ServiceCard />
      <AboutCard />
      <TechList />
    </section>
  );
}

export function AboutDetailSection() {
  return (
    <section className="min-w-[98dvw] max-w-[99dvw] grid grid-cols-1 md:grid-cols-2 px-[7%] lg:px-[10%] gap-10 py-[5%] items-center">
      <div className="space-y-5">
        <AboutDetailCard />
        <VisionCard />
      </div>
      <AwardCard />
    </section>
  );
}

export function AboutSectionMini() {
  return (
    <section className="min-w-[98dvw] max-w-[99dvw] grid grid-cols-1 md:grid-cols-2 px-[7%] lg:px-[10%] gap-10 py-[5%]">
      <TechList />
    </section>
  );
}

export function AboutSectionFlat() {
  return (
    <section className="min-w-[98dvw] max-w-[99dvw] px-[7%] lg:px-[10%] gap-10 py-[5%]">
      <TechList />
    </section>
  );
}

function AboutCard() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ECECEC] p-6 space-y-3 rounded-xl drop-shadow-md">
      <span className="text-xs text-gray-600 block">ABOUT</span>
      <h1 className="text-xl font-semibold">We Transform Result Into Impact</h1>
      <p className="text-xs text-gray-600 my-4">
        We believe technology only matters when it uplifts people. We walk
        alongside you to turn complex challenges into meaningful, lasting
        growth.
      </p>
      <Button
        label="Learn More"
        size="sm"
        rounded
        icon={<ArrowRightIcon size={14} />}
        type="outline-primary"
        onClick={() => navigate("/about")}
      />
    </div>
  );
}

function AboutDetailCard() {
  return (
    <div className="bg-[#ECECEC] p-6 space-y-3 rounded-xl drop-shadow-md">
      <span className="text-xs text-gray-600 block">ABOUT</span>
      <h1 className="text-xl font-semibold">We Transform Result Into Impact</h1>
      <p className="text-xs text-gray-600 my-4">
        We believe technology only matters when it uplifts people. We walk
        alongside you to turn complex challenges into meaningful, lasting
        growth.
        <br />
        <br />
        Founded on June 14, 1995, ExecuTrain of Jakarta is a worldwide corporate
        training provider and world leader in business education training. The
        privately held U.S. based company has franchise locations in 8 countries
        of 53 locations.
        <br />
        <br />
        ExecuTrain provides design, development, and implementation of
        professional development solutions for companies worldwide
      </p>
    </div>
  );
}

function VisionCard() {
  return (
    <div className="border-1 border-primary-500 p-6 space-y-3 rounded-xl">
      <span className="text-xs text-primary-500 block">VISION</span>
      <div className="flex items-center gap-4">
        <img src={Vision} alt="microsoft logo" />
        <p className="flex-1 text-sm">
          Developing people skills and behaviors through quality training and
          providing technology services to empower your business.
        </p>
      </div>
      <span className="text-xs text-primary-500 block">MISSION</span>
      <div className="flex items-center gap-4">
        <img src={Mission} alt="microsoft logo" />
        <p className="flex-1 text-sm">
          To increase productivity by providing the best and reliable quality
          service.
        </p>
      </div>
    </div>
  );
}

function AwardCard() {
  return (
    <div>
      <span className="text-xs text-gray-600 block">OUR AWARD</span>
      <div className="mt-5 space-y-3">
        {[
          "The Best Microsoft Authorized Training Center",
          "The Best Microsoft Certified Technical Education Center (CTEC)",
          "The Best Microsoft CPLS of the Year",
          "Allianz Top Training Provider Performer 2023",
          "Top IT Training 2016 at Top IT & Telco 2016 Award",
          "Top IT Training 2017",
        ].map((each: string) => (
          <div
            key={each}
            className="flex gap-3 text-primary-500 text-sm items-center shadow-lg border border-gray-200 px-4 py-3 rounded-full"
          >
            <AwardIcon size={20} />
            <p className="text-black">{each}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCard() {
  return (
    <div className="bg-[#ECECEC] p-6 space-y-3 rounded-xl drop-shadow-md">
      <span className="text-xs text-gray-600 block">WHAT WE CAN DO</span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 justify-center items-center flex">
          <img src={AboutA} alt="microsoft logo" className="w-[50%]" />
          <div className="space-y-2">
            <h2 className="font-semibold text-primary-500 max-w-[80%]">
              Building Real Skills
            </h2>
            <p className="text-xs text-gray-500">
              Equipping people with practical skills to turn daily challenges
              into lasting impacts.
            </p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 justify-center flex items-center">
          <img src={AboutB} alt="microsoft logo" className="w-[50%]" />
          <div className="space-y-2">
            <h2 className="font-semibold text-primary-500">
              Easing Everyday Work
            </h2>
            <p className="text-xs text-gray-500">
              Shaping thoughtful technology that fits your rhythm and brings
              peace of mind to operations.
            </p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 justify-center flex items-center">
          <img src={AboutC} alt="microsoft logo" className="w-[50%]" />
          <div className="space-y-2">
            <h2 className="font-semibold text-primary-500">
              Reliable IT Consulting
            </h2>
            <p className="text-xs text-gray-500">
              Working as a trusted, steady partner to guide your technology
              journey with clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechList() {
  return (
    <div className="space-y-3">
      <span className="text-xs text-gray-600 block">TECHNOLOGY BEHIND US</span>
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
      <div className="flex flex-wrap justify-evenly gap-1">
        <div className="min-h-[100px] flex items-center">
          <img src={Power} alt="microsoft logo" />
        </div>
        <div className="min-h-[100px] flex items-center">
          <img src={Azure} alt="microsoft logo" />
        </div>
        <div className="min-h-[100px] flex items-center">
          <img src={ReactLogo} alt="microsoft logo" />
        </div>
        <div className="min-h-[100px] flex items-center">
          <img src={Next} alt="microsoft logo" />
        </div>
        <div className="min-h-[100px] flex items-center">
          <img src={Node} alt="microsoft logo" />
        </div>
        <div className="min-h-[100px] flex items-center">
          <img src={Mongo} alt="microsoft logo" />
        </div>
      </div>
      <span className="text-xs text-gray-600 block text-center">
        And much more +
      </span>
    </div>
  );
}
