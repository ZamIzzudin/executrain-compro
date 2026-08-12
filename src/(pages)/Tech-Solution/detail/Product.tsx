import { useParams, Link } from "react-router-dom";

import { ChevronRight, ArrowRight, Globe, Shield, Target } from "lucide-react";
import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import { useProductDetail } from "@/services/strategic-solution/hook";
import Carousel from "@/components/molecules/Carousel";
import { LordIcons } from "@/components/atoms";

import CaraouselA from "@/assets/v2/caraousel-1.jpg";
import CaraouselB from "@/assets/v2/caraousel-2.jpg";
import OnPremise from "@/assets/v2/onpremise.png";
import Cloud from "@/assets/v2/cloud.png";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail({ id: id! });

  if (isLoading || !product) {
    return <HeroProductDetailSkeleton />;
  }

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%] bg-[#FCFCFC]">
      {/* Breadcrumb */}
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/product">
          Ready-to-use IT Products
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-rose-700 hover:opacity-80 transition-opacity duration-200" to={`/product/${product._id}`}>
          {product.product_name}
        </Link>
      </div>

      {/* Title */}
      <h1 className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
        {product.product_name}
      </h1>

      {/* Main Grid Layout */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column Content */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Banner */}
          <div className="w-full h-80 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-3xl border-2 border-gray-200 overflow-hidden">
            {product.banner?.url ? (
              <img
                src={product.banner.url}
                alt={product.product_name}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>

          {/* TECH STACK */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              TECH STACK
            </span>
            <div className="self-stretch flex flex-wrap gap-3">
              <div className="px-2.5 py-1.5 bg-pink-400/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-pink-400 text-xs font-medium">Power Apps</span>
              </div>
              <div className="px-2.5 py-1.5 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-blue-300 text-xs font-medium">Power Automate</span>
              </div>
              <div className="px-2.5 py-1.5 bg-orange-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-orange-300 text-xs font-medium">Power BI</span>
              </div>
              <div className="px-2.5 py-1.5 bg-lime-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-green-400 text-xs font-medium">SharePoint</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-justify text-neutral-900 text-base font-normal leading-relaxed whitespace-pre-line">
            {product.product_description || "A correspondence management system used to record, manage, and monitor the flow of incoming and outgoing letters within an organization. Users can assign responsible parties and track the status of letters in real-time."}
          </p>

          {/* PROBLEM STATEMENT */}
          <div className="w-full flex flex-col justify-start items-start gap-1 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              PROBLEM STATEMENT
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              <p className="self-stretch text-zinc-500 text-sm font-normal">
                Organizations often struggle with misplaced correspondence, delayed responses, and a lack of clear accountability when manually managing the flow of incoming and outgoing letters.
              </p>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                  <Target size={16} className="text-rose-700 shrink-0" />
                  <span className="text-neutral-800 text-sm font-medium">
                    What This App Can Help?
                  </span>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                {[
                  "Easily record, organize, and manage all incoming and outgoing organizational correspondence in one secure platform.",
                  "Instantly assign specific letters to the responsible individuals or departments to ensure timely replies and clear accountability.",
                  "Monitor the exact location and processing status of any letter at a glance to prevent delays and bottlenecks.",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="self-stretch p-3 bg-stone-50 rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden"
                  >
                    <p className="self-stretch text-zinc-500 text-sm font-normal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                  <Shield size={16} className="text-rose-700 shrink-0" />
                  <span className="text-neutral-800 text-sm font-medium">
                    Security & Compliance
                  </span>
                </div>
                <p className="self-stretch text-zinc-500 text-sm font-normal">
                  Role-based dispatch access, encrypted location data in transit and at rest, SOC 2-aligned infrastructure.
                </p>
              </div>
            </div>
          </div>

          {/* FEATURE HIGHLIGHT */}
          <div className="w-full flex flex-col justify-start items-start gap-1 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              FEATURE HIGHLIGHT
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              <Carousel
                slides={[
                  {
                    image: CaraouselB,
                    title: "Automated Letter Sending",
                    description:
                      "Organizations often struggle with misplaced correspondence, delayed responses, and a lack of clear accountability when manually managing the flow of incoming and outgoing letters.",
                  },
                  {
                    image: CaraouselA,
                    title: "Smart Assignment",
                    description:
                      "Route incoming letters to the right person or department instantly with transparent audit logs.",
                  },
                  {
                    image: CaraouselB,
                    title: "Real-time Status Tracking",
                    description:
                      "Monitor the exact location and processing status of any letter at a glance to prevent bottlenecks.",
                  },
                ]}
              />
            </div>
          </div>

          {/* CLIENT DELIVERABLES */}
          <div className="w-full flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              CLIENT DELIVERABLES
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col sm:flex-row items-stretch gap-4">
              {/* Deliverable 1 */}
              <div
                id="client-deliverable-1"
                className="flex-1 w-full self-stretch p-5 bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-rose-700 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-1.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/lldhrpsv.json"
                    trigger="hover"
                    target="#client-deliverable-1"
                    state="hover-pinch"
                    colors="primary:#ebe6ef,secondary:#bf1e40,tertiary:#3a3347,quaternary:#be1e40"
                    size={40}
                  />
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <span className="self-stretch text-rose-700 group-hover:text-rose-700 text-base font-semibold">
                    Business Process Digitalization
                  </span>
                  <span className="self-stretch text-zinc-600 text-sm font-normal">
                    Automated digital workflows replacing manual operations.
                  </span>
                </div>
              </div>

              {/* Deliverable 2 */}
              <div
                id="client-deliverable-2"
                className="flex-1 w-full self-stretch p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
                  <LordIcons
                    src="https://cdn.lordicon.com/cnbqxixv.json"
                    trigger="hover"
                    target="#client-deliverable-2"
                    state="hover-pinch"
                    colors="primary:#be1e40,secondary:#2ca58d,tertiary:#3080e8,quaternary:#3a3347,quinary:#ebe6ef,senary:#ffc738"
                    size={40}
                  />
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <span className="self-stretch text-neutral-800 group-hover:text-rose-700 text-base font-semibold transition-colors duration-300">
                    Data Analytics and Dashboard
                  </span>
                  <span className="self-stretch text-neutral-400 group-hover:text-zinc-600 text-sm font-normal transition-colors duration-300">
                    Real-time interactive dashboards for metric tracking.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Sticky Sidebar */}
        <div className="flex flex-col gap-8 lg:col-span-2 sticky top-28 self-start">
          {/* DEPLOYMENT OPTIONS */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              DEPLOYMENT OPTIONS
            </span>
            <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-4">
              {/* On-Premise */}
              <div className="flex-1 px-4 pt-4 pb-5 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="p-1.5 bg-stone-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                    <img className="w-10 h-10 object-contain" src={OnPremise} alt="On-Premise" />
                  </div>
                  <div className="flex-1 flex flex-col justify-end items-start gap-0 overflow-hidden">
                    <span className="text-rose-700 text-base font-medium">On-Premise</span>
                    <span className="text-neutral-800 text-sm font-normal">Environment</span>
                  </div>
                </div>
                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                <p className="self-stretch text-zinc-500 text-xs font-normal leading-relaxed">
                  Hosted locally on your internal servers for maximum data control and strict security compliance.
                </p>
              </div>

              {/* Cloud */}
              <div className="flex-1 px-4 pt-4 pb-5 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="p-1.5 bg-stone-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-2.5 overflow-hidden">
                    <img className="w-10 h-10 object-contain" src={Cloud} alt="Cloud" />
                  </div>
                  <div className="flex-1 flex flex-col justify-end items-start gap-0 overflow-hidden">
                    <span className="text-rose-700 text-base font-medium">Cloud</span>
                    <span className="text-neutral-800 text-sm font-normal">Environment</span>
                  </div>
                </div>
                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                <p className="self-stretch text-zinc-500 text-xs font-normal leading-relaxed">
                  Hosted securely in the cloud for easy remote access, seamless scalability, and zero maintenance.
                </p>
              </div>
            </div>
          </div>

          {/* MORE */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              MORE
            </span>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <h3 className="self-stretch text-neutral-800 text-2xl font-semibold">
                Need this kind of Product?
              </h3>
              <p className="self-stretch text-zinc-500 text-base font-normal">
                Chat our sales for detailed information
              </p>
            </div>
            <div className="inline-flex justify-start items-center gap-3 flex-wrap pt-2">
              <a
                href={product.link || "#"}
                target={product.link ? "_blank" : undefined}
                rel={product.link ? "noreferrer" : undefined}
                className="h-10 px-4 py-2.5 rounded-[48px] outline outline-2 outline-offset-[-2px] outline-rose-700 hover:bg-pink-50 transition-colors duration-300 inline-flex justify-center items-center gap-2 text-rose-700 text-sm font-medium cursor-pointer"
              >
                <span>View Live Demo</span>
                <Globe size={18} className="text-rose-700" />
              </a>
              <a
                href={product.link || "#"}
                target={product.link ? "_blank" : undefined}
                rel={product.link ? "noreferrer" : undefined}
                className="h-10 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2 text-white text-sm font-medium cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
