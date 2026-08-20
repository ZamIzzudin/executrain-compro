import { useParams, Link } from "react-router-dom";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import {
  ChevronRight,
  ArrowRight,
  Compass,
  Users,
  Info,
  Clock,
  Shield,
} from "lucide-react";

import { useProductDetail } from "@/services/strategic-solution/hook";

import Carousel from "@/components/molecules/Carousel";

import CaraouselA from "@/assets/v2/caraousel-1.jpg";
import CaraouselB from "@/assets/v2/caraousel-2.jpg";
import { handleImageError } from "@/utils/helper";

export default function CustomAppDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail({ id: id! });

  if (isLoading || !product) {
    return <HeroProductDetailSkeleton />;
  }

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%] bg-[#FCFCFC]">
      {/* Breadcrumb */}
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link
          className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          to="/"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link
          className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          to="/app-development"
        >
          Custom App Development
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link
          className="text-rose-700 hover:opacity-80 transition-opacity duration-200"
          to={`/app-development/${product._id}`}
        >
          {product.product_name}
        </Link>
      </div>

      {/* Title */}
      <h1 className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
        {product.product_name}
      </h1>

      {/* Main Grid Layout */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Left Column Content */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Banner */}
          <div className="w-full h-80 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-3xl border-2 border-gray-200 overflow-hidden">
            {product.banner?.url ? (
              <img
                src={product.banner.url}
                alt={product.product_name}
                onError={handleImageError}
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
                <span className="text-pink-400 text-xs font-medium">
                  Power Apps
                </span>
              </div>
              <div className="px-2.5 py-1.5 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-blue-300 text-xs font-medium">
                  Power Automate
                </span>
              </div>
              <div className="px-2.5 py-1.5 bg-orange-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-orange-300 text-xs font-medium">
                  Power BI
                </span>
              </div>
              <div className="px-2.5 py-1.5 bg-lime-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                <span className="text-green-400 text-xs font-medium">
                  SharePoint
                </span>
              </div>
            </div>
          </div>

          {/* Challenge & Description */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-center items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                <Compass size={16} className="text-rose-700 shrink-0" />
                <span className="text-neutral-800 text-sm font-medium">
                  Challenge
                </span>
              </div>
              <span className="text-zinc-500 text-sm font-normal">
                Manual, spreadsheet-based dispatch causing delayed pickups and
                idle trucks.
              </span>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
            <p className="text-justify text-neutral-900 text-base font-normal leading-relaxed whitespace-pre-line">
              {product.product_description ||
                "A correspondence management system used to record, manage, and monitor the flow of incoming and outgoing letters within an organization. Users can assign responsible parties and track the status of letters in real-time."}
            </p>
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
                    title: "Feature A",
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
        </div>

        {/* Right Column Sticky Sidebar */}
        <div className="flex flex-col gap-8 lg:col-span-3 sticky top-28 self-start">
          {/* PROJECT DETAILS */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              PROJECT DETAILS
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-3">
                {/* Team Size */}
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Users size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Team Size
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">
                    2 engineers, 1 designer, 1 PM
                  </span>
                </div>

                {/* Timeline */}
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Clock size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Timeline
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm font-medium">
                    9 weeks{" "}
                    <span className="font-normal">· discovery to launch</span>
                  </span>
                </div>

                {/* Methodology */}
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Info size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Methodology
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">
                    Agile Development
                  </span>
                </div>
              </div>

              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

              {/* Security & Compliance */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                  <Shield size={16} className="text-rose-700 shrink-0" />
                  <span className="text-neutral-800 text-sm font-medium">
                    Security & Compliance
                  </span>
                </div>
                <p className="self-stretch text-zinc-500 text-sm font-normal">
                  Role-based dispatch access, encrypted location data in transit
                  and at rest, SOC 2-aligned infrastructure.
                </p>
              </div>
            </div>
          </div>

          {/* MORE */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">MORE</span>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <h3 className="self-stretch text-neutral-800 text-2xl font-semibold">
                Want something like this?
              </h3>
              <p className="self-stretch text-zinc-500 text-base font-normal">
                We'll scope a project like it for your team.
              </p>
            </div>
            <div className="inline-flex justify-start items-center gap-3 pt-2">
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
