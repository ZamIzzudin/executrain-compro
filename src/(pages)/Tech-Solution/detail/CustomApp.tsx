import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import {
  ChevronRight,
  ArrowRight,
  Users,
  Info,
  Clock,
  Shield,
  Compass,
  Boxes,
} from "lucide-react";

import { useAppDevelopmentDetail } from "@/services/app-development/hook";
import { useAppDevelopmentFilters } from "@/services/app-development/filters";

import Carousel from "@/components/molecules/Carousel";
import InquiryModal from "@/components/molecules/InquiryModal";

function optionLabel(options: any[], value?: string) {
  const found = options.find((o: any) => o.value === value);
  return found ? found.label : value?.replaceAll("_", " ");
}

export default function CustomAppDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: app, isLoading } = useAppDevelopmentDetail({ id: id! });
  const { data: filterOpts } = useAppDevelopmentFilters();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  if (isLoading || !app) {
    return <HeroProductDetailSkeleton />;
  }

  const teamSize = Array.isArray(app.team_size) ? app.team_size : [];
  const highlights = Array.isArray(app.highlights) ? app.highlights : [];
  const techStacks = Array.isArray(app.tech_stack) ? app.tech_stack : [];

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
          to={`/app-development/${app._id}`}
        >
          {app.title}
        </Link>
      </div>

      {/* Title */}
      <h1 className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
        {app.title}
      </h1>

      {/* Main Grid Layout */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Left Column Content */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Visual header */}
          <div className="w-full h-80 relative bg-gradient-to-br from-rose-700 to-rose-900 rounded-3xl border-2 border-gray-200 overflow-hidden flex items-center justify-center">
            {app.banner?.url ? (
              <img
                src={app.banner.url}
                alt={app.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Boxes className="w-24 h-24 text-white/70" />
            )}
            {app.methodology && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-[64px]">
                {optionLabel(filterOpts?.methodologies ?? [], app.methodology)}
              </span>
            )}
          </div>

          {/* TECH STACK */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              TECH STACK
            </span>
            <div className="self-stretch flex flex-wrap gap-3">
              {techStacks.length > 0 ? (
                techStacks.map((ts: string) => (
                  <div
                    key={ts}
                    className="px-2.5 py-1.5 bg-pink-400/20 rounded-[64px] inline-flex justify-center items-center gap-2"
                  >
                    <span className="text-pink-400 text-xs font-medium">
                      {optionLabel(filterOpts?.tech_stacks ?? [], ts)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-2.5 py-1.5 bg-pink-400/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                  <span className="text-pink-400 text-xs font-medium">
                    Tech Stack
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Challenge & Description */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            {app.challenge && (
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                  <Compass size={16} className="text-rose-700 shrink-0" />
                  <span className="text-neutral-800 text-sm font-medium">
                    Challenge
                  </span>
                </div>
                <span className="text-zinc-500 text-sm font-normal">
                  {app.challenge}
                </span>
                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
              </div>
            )}
            <p className="text-justify text-neutral-900 text-base font-normal leading-relaxed whitespace-pre-line">
              {app.description ||
                "A custom application tailored to your organization's needs."}
            </p>
          </div>

          {/* FEATURE HIGHLIGHT */}
          <div className="w-full flex flex-col justify-start items-start gap-1 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              FEATURE HIGHLIGHT
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              <Carousel
                slides={
                  highlights.length > 0
                    ? highlights.map((h: any) => ({
                        image: h.image,
                        title: h.title,
                        description: h.description,
                      }))
                    : [
                        {
                          image: "",
                          title: app.title,
                          description:
                            app.description ||
                            "Highlight information coming soon.",
                        },
                      ]
                }
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
            <div className="self-stretch p-6 bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center gap-4">
              {/* Timeline & Methodology */}
              <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Users size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Team Size
                    </span>
                  </div>
                  {teamSize.length > 0 ? (
                    <div className="self-stretch flex flex-wrap gap-2">
                      {teamSize.map((t: any, idx: number) => (
                        <span
                          key={idx}
                          className=" text-zinc-600 text-xs font-normal rounded-[64px]"
                        >
                          {t.quantity} {t.type}
                          {idx + 1 === teamSize.length ? "" : ","}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-zinc-500 text-sm font-normal">
                      Not specified
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Clock size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Timeline
                    </span>
                  </div>
                  <span className="text-zinc-500 text-xs font-medium">
                    {app.timeline} weeks{" "}
                    <span className="font-normal">· discovery to launch</span>
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Info size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Methodology
                    </span>
                  </div>
                  <span className="text-zinc-500 text-xs font-normal">
                    {optionLabel(
                      filterOpts?.methodologies ?? [],
                      app.methodology,
                    ) || "—"}
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
                <p className="self-stretch text-zinc-500 text-xs font-normal">
                  {app.compliance ||
                    "Enterprise-grade security, encrypted data in transit and at rest."}
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
              <button
                onClick={() => setInquiryOpen(true)}
                className="h-10 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2 text-white text-sm font-medium cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <InquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={app.title}
        productType="APP_DEVELOPMENT"
      />
    </section>
  );
}
