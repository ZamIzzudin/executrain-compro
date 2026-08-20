import { useNavigate } from "react-router-dom";

import LordIcons from "../atoms/LordIcons";

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

import PSA from "@/assets/v2/psa.png";
import Award from "@/assets/v2/award.png";

export default function AboutSection() {
  return (
    <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-12 pt-0 bg-gradient-to-b from-white to-zinc-100 rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200">
      <div className="w-full flex flex-col justify-start items-start gap-6">
        <AboutCard />
        <ServiceCard />
      </div>
    </section>
  );
}

export function AboutDetailSection() {
  return (
    <section>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 px-[5%] md:px-[7%] lg:px-[10%] gap-8 py-12 bg-gradient-to-b from-white to-zinc-100 rounded-bl-[64px] rounded-br-[64px] items-center">
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <AboutDetailCard />
          <VisionCard />
        </div>
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center w-full">
          <div className="w-96 h-60 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-[19.59px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-gray-200 overflow-hidden group">
            <img
              alt="ExecuTrain PSA"
              src={PSA}
              className="w-full h-full object-cover rounded-[19.59px] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 px-[5%] md:px-[7%] lg:px-[10%] gap-8 py-12 bg-gradient-to-b from-white to-zinc-100 items-center">
        <div className="lg:col-span-6 flex flex-col justify-center items-start gap-2">
          <span className="text-neutral-400 text-sm font-normal">
            OUR AWARD
          </span>
          <div className="w-96 h-60 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-[19.59px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-gray-200 overflow-hidden group">
            <img
              alt="ExecuTrain Award"
              src={Award}
              className="w-full h-full object-cover rounded-[19.59px] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col justify-start items-start gap-3 w-full">
          <AwardCard />
        </div>
      </div>
    </section>
  );
}

export function AboutSectionMini() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 px-[5%] md:px-[7%] lg:px-[10%] gap-10 py-[5%]">
      <TechList />
    </section>
  );
}

export function AboutSectionFlat() {
  return (
    <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] gap-10 py-[5%]">
      <TechList />
    </section>
  );
}

function AboutCard() {
  const navigate = useNavigate();
  return (
    <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <span className="text-zinc-500 text-sm font-normal">ABOUT</span>
        <h2 className="text-neutral-800 text-2xl font-semibold">
          We Transform Result Into Impact
        </h2>
      </div>
      <p className="text-zinc-500 text-sm font-normal">
        We believe technology only matters when it uplifts people. We walk
        alongside you to turn complex challenges into meaningful, lasting
        growth.
      </p>
      <button
        type="button"
        onClick={() => navigate("/about")}
        className="px-3 py-2.5 rounded-[48px] outline outline-2 outline-offset-[-2px] outline-rose-700 inline-flex justify-center items-center gap-2.5 text-rose-700 hover:bg-rose-50 transition-colors duration-300 cursor-pointer"
      >
        <span className="text-sm font-medium">Learn More</span>
        <ArrowRightIcon size={18} className="text-rose-700" />
      </button>
    </div>
  );
}

function AboutDetailCard() {
  return (
    <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-neutral-400 text-sm font-normal">
          ABOUT
        </div>
        <div className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
          We Transform Result Into Impact
        </div>
      </div>
      <div className="self-stretch text-justify justify-start text-zinc-500 text-sm font-normal leading-relaxed">
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
      </div>
    </div>
  );
}

function VisionCard() {
  return (
    <div
      id="vision-mission-card"
      className="w-full p-6 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-rose-700 text-sm font-normal">
          VISION
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-3">
          <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-1.5 shrink-0 transition-colors duration-300">
            <LordIcons
              src="https://cdn.lordicon.com/howkgief.json"
              trigger="hover"
              target="#vision-mission-card"
              state="hover-pinch"
              colors="primary:#545454,secondary:#e4e4e4,tertiary:#be1e40"
              size={52}
            />
          </div>
          <div className="flex-1 justify-start text-neutral-800 text-sm font-normal">
            Developing people skills and behaviors through quality training and
            providing technology services to empower your business.
          </div>
        </div>
      </div>
      <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200 my-1"></div>
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-rose-700 text-sm font-normal">
          MISSION
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-3">
          <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-1.5 shrink-0 transition-colors duration-300">
            <LordIcons
              src="https://cdn.lordicon.com/zdtwrwhv.json"
              trigger="hover"
              target="#vision-mission-card"
              state="hover-rise"
              colors="primary:#ffc738,secondary:#3a3347,tertiary:#be1e40"
              size={52}
            />
          </div>
          <div className="flex-1 justify-start text-neutral-800 text-sm font-normal">
            To increase productivity by providing the best and reliable quality
            service.
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardCard() {
  const awards = [
    "The Best Microsoft Authorized Training Center",
    "The Best Microsoft Certified Technical Education Center (CTEC)",
    "The Best Microsoft CPLS of the Year",
    "Allianz Top Training Provider Performer 2023",
    "Top IT Training 2016 at Top IT & Telco 2016 Award",
    "Top IT Training 2017",
  ];

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      {awards.map((title, index) => {
        const isFirst = index === 0;
        return (
          <div
            key={title}
            className={`self-stretch min-h-12 px-4 py-3 rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] inline-flex justify-start items-center gap-3 transition-all duration-300 cursor-pointer group ${
              isFirst
                ? "bg-gradient-to-b from-white to-pink-50 outline outline-1 outline-offset-[-1px] outline-rose-700"
                : "bg-white outline outline-1 outline-offset-[-1px] outline-gray-200 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 hover:outline-rose-700"
            }`}
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
              <AwardIcon
                size={18}
                className={`transition-colors duration-300 ${
                  isFirst
                    ? "text-rose-700"
                    : "text-rose-700 group-hover:text-rose-700"
                }`}
              />
            </div>
            <div
              className={`flex-1 justify-start text-sm font-medium transition-colors duration-300 ${
                isFirst
                  ? "text-rose-700"
                  : "text-neutral-800 group-hover:text-rose-700"
              }`}
            >
              {title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ServiceCard() {
  const navigate = useNavigate();

  const cards = [
    {
      id: "service-card-1",
      title: "Building Real Skills",
      desc: "Equipping people with practical skills to turn daily challenges into lasting impacts.",
      path: "/course-catalog",
      lordIcon: {
        src: "https://cdn.lordicon.com/mdgonzfn.json",
        trigger: "hover",
        state: "hover-pinch",
        colors:
          "primary:#f9c9c0,secondary:#bf1e40,tertiary:#545454,quaternary:#ebe6ef,quinary:#3a3347,senary:#b26836",
      },
    },
    {
      id: "service-card-2",
      title: "Easing Everyday Work",
      desc: "Shaping thoughtful technology that fits your rhythm and brings peace of mind to operations.",
      path: "/app-development",
      lordIcon: {
        src: "https://cdn.lordicon.com/apxgwajy.json",
        trigger: "hover",
        state: "hover-pinch",
        colors:
          "primary:#be1e40,secondary:#ffc738,tertiary:#3a3347,quaternary:#ebe6ef,quinary:#545454",
      },
    },
    {
      id: "service-card-3",
      title: "Reliable IT Consulting",
      desc: "Working as a trusted, steady partner to guide your technology journey with clarity.",
      path: "/tech-advisory",
      lordIcon: {
        src: "https://cdn.lordicon.com/byicyhmi.json",
        trigger: "hover",
        state: "hover-pinch",
        colors:
          "primary:#646e78,secondary:#f9c9c0,tertiary:#ebe6ef,quaternary:#b26836,quinary:#bf1e40",
      },
    },
  ];

  return (
    <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-neutral-400 text-sm font-normal">
          WHAT WE CAN DO
        </div>
      </div>
      <div className="self-stretch grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ id, title, desc, path, lordIcon }) => (
          <div
            key={id}
            id={id}
            onClick={() => navigate(path)}
            className="p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex justify-start items-center gap-3 transition-all duration-300 cursor-pointer group"
          >
            <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-1.5 shrink-0 transition-colors duration-300">
              <LordIcons
                src={lordIcon.src}
                trigger={lordIcon.trigger}
                target={`#${id}`}
                state={lordIcon.state}
                colors={lordIcon.colors}
                size={44}
              />
            </div>
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-base font-semibold text-neutral-800 group-hover:text-rose-700 transition-colors duration-300">
                {title}
              </div>
              <div className="self-stretch justify-start text-xs font-normal text-neutral-400 group-hover:text-zinc-600 transition-colors duration-300">
                {desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechSlider({
  bgColor = "bg-white",
}: Readonly<{ bgColor?: string }>) {
  const techLogos = [
    { src: Microsoft, alt: "Microsoft logo" },
    { src: Google, alt: "Google logo" },
    { src: Tableu, alt: "Tableau logo" },
    { src: Pearson, alt: "Pearson logo" },
    { src: Power, alt: "Power logo" },
    { src: Azure, alt: "Azure logo" },
    { src: ReactLogo, alt: "React logo" },
    { src: Next, alt: "Next.js logo" },
    { src: Node, alt: "Node.js logo" },
    { src: Mongo, alt: "MongoDB logo" },
  ];

  const fadeBgFrom =
    bgColor === "bg-[#FCFCFC]" ? "from-[#FCFCFC]" : "from-white";

  return (
    <div className={`space-y-3 pt-[5%] pb-10 ${bgColor}`}>
      <span className="text-xs text-gray-600 block text-center">
        TECHNOLOGY BEHIND US
      </span>
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-infinite-scroll hover:pause-animation">
            {[...techLogos, ...techLogos, ...techLogos].map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-[100px] h-[100px]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 w-20 h-full bg-gradient-to-r ${fadeBgFrom} to-transparent pointer-events-none z-10`}
        />
        <div
          className={`absolute top-0 right-0 w-20 h-full bg-gradient-to-l ${fadeBgFrom} to-transparent pointer-events-none z-10`}
        />
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
