import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Info,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
  Boxes,
} from "lucide-react";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import { useCaseStudyDetail } from "@/services/case-study/hook";
import { useCaseStudyFilters } from "@/services/case-study/filters";
import { useCaseStudyFiltered } from "@/services/case-study/hook";
import { formatDate, handleImageError } from "@/utils/helper";
import { LordIcons } from "@/components/atoms";
import InquiryModal from "@/components/molecules/InquiryModal";

function optionLabel(options: any[], value?: string) {
  const found = options.find((o: any) => o.value === value);
  return found ? found.label : value?.replaceAll("_", " ");
}

const DELIVERABLE_ICONS = [
  "https://cdn.lordicon.com/lldhrpsv.json",
  "https://cdn.lordicon.com/cnbqxixv.json",
];
const DELIVERABLE_COLORS = [
  "primary:#ebe6ef,secondary:#bf1e40,tertiary:#3a3347,quaternary:#be1e40",
  "primary:#be1e40,secondary:#2ca58d,tertiary:#3080e8,quaternary:#3a3347,quinary:#ebe6ef,senary:#ffc738",
];

export default function CaseStudyDetail() {
  const now = Date.now();
  const { id } = useParams<{ id: string }>();
  const { data: study, isLoading } = useCaseStudyDetail({ id: id! });
  const { data: filterOpts } = useCaseStudyFilters();
  const { data: relatedData } = useCaseStudyFiltered({ page: 1, limit: 3 });
  const [inquiryOpen, setInquiryOpen] = useState(false);

  if (isLoading || !study) {
    return <HeroProductDetailSkeleton />;
  }

  const categories = filterOpts?.categories ?? [];
  const industries = filterOpts?.industries ?? [];
  const deployments = filterOpts?.deployments ?? [];
  const methodologies = filterOpts?.methodologies ?? [];

  const categoryLabel = optionLabel(categories, study.category);
  const deploymentLabel = optionLabel(deployments, study.deployment_type);

  const teamSize = Array.isArray(study.team_size) ? study.team_size : [];
  const teamSizeText =
    teamSize.length > 0
      ? teamSize
          .map((t) => `${t.quantity} ${t.type}`)
          .join(", ")
      : "Not specified";
  const totalTeam = teamSize.reduce((sum, t) => sum + (t.quantity || 0), 0);

  const deliverables = Array.isArray(study.solutions) ? study.solutions : [];
  const helps = [
    study.timeline
      ? `Delivered as a ${study.timeline}-week engagement from discovery to launch`
      : null,
    totalTeam
      ? `A dedicated team of ${totalTeam} professionals worked on this project`
      : null,
    deploymentLabel
      ? `Deployed ${deploymentLabel.toLowerCase()} for maximum performance and security`
      : null,
    study.compliance
      ? `Enterprise-grade compliance: ${study.compliance}`
      : null,
  ].filter(Boolean) as string[];

  const related =
    (relatedData?.data ?? []).filter((r) => r._id !== study._id).slice(0, 3) ??
    [];

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%] bg-[#FCFCFC]">
      {/* Breadcrumb */}
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/case-study">
          Case Studies
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-rose-700 hover:opacity-80 transition-opacity duration-200" to={`/case-study/${study._id}`}>
          {study.title}
        </Link>
      </div>

      {/* Header Info */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 flex flex-col justify-start items-start gap-1">
        <h1 className="text-neutral-800 text-2xl md:text-3xl font-semibold">
          {study.title}
        </h1>
        <div className="inline-flex justify-start items-center gap-3">
          <div className="rounded-[64px] flex justify-center items-center gap-2">
            <Clock size={16} className="text-rose-700 shrink-0" />
            <span className="text-neutral-800 text-sm font-medium">
              {study.created_at
                ? formatDate(new Date(study.created_at).getTime())
                : formatDate(now)}
            </span>
          </div>
          {categoryLabel && (
            <div className="px-2.5 py-1.5 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
              <span className="text-blue-300 text-xs font-medium">
                {categoryLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column Content */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Banner */}
          <div className="w-full h-80 md:h-96 relative bg-gradient-to-br from-rose-700 to-rose-900 rounded-3xl border-2 border-gray-200 overflow-hidden flex items-center justify-center">
            {study.banner?.url ? (
              <img
                src={study.banner.url}
                alt={study.title}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            ) : (
              <Boxes className="w-24 h-24 text-white/70" />
            )}
          </div>

          {/* RELATED INDUSTRY */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              RELATED INDUSTRY
            </span>
            <div className="self-stretch rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center gap-3">
              <div className="self-stretch inline-flex justify-start items-center gap-3 flex-wrap">
                {(study.industries ?? []).length > 0 ? (
                  study.industries.map((ind: string) => (
                    <div
                      key={ind}
                      className="px-2.5 py-1.5 bg-pink-400/20 rounded-[64px] inline-flex justify-center items-center gap-2"
                    >
                      <span className="text-pink-400 text-xs font-medium">
                        {optionLabel(industries, ind)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-2.5 py-1.5 bg-pink-400/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                    <span className="text-pink-400 text-xs font-medium">
                      Not specified
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-justify text-neutral-900 text-base font-normal leading-relaxed whitespace-pre-line">
            {study.description ||
              "A successful engagement delivered for our client."}
          </p>

          {/* PROJECT DETAILS */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              PROJECT DETAILS
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              {/* Deployment Option */}
              {study.deployment_type && deploymentLabel && (
                <>
                  <div
                    id="cs-env-card"
                    className="self-stretch flex flex-col justify-center items-start gap-2 group cursor-pointer"
                  >
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                      <div className="p-1 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center overflow-hidden transition-colors duration-300">
                        <LordIcons
                          src="https://cdn.lordicon.com/iavpsuhi.json"
                          trigger="hover"
                          target="#cs-env-card"
                          state="hover-pinch"
                          colors="primary:#ffc738,secondary:#bf1e40,tertiary:#bf1e40,quaternary:#3a3347,quinary:#ebe6ef,senary:#be1e40"
                          size={40}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-end items-start gap-0 overflow-hidden">
                        <span className="text-rose-700 text-base font-medium">
                          {deploymentLabel}
                        </span>
                        <span className="text-neutral-800 text-sm font-normal">
                          Environment
                        </span>
                      </div>
                    </div>
                    <p className="self-stretch text-zinc-500 text-sm font-normal">
                      {deploymentLabel.toLowerCase() === "on cloud"
                        ? "Hosted securely in the cloud for easy remote access, seamless scalability, and zero maintenance."
                        : "Hosted locally on your internal servers for maximum data control and strict security compliance."}
                    </p>
                  </div>
                  <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                </>
              )}

              {/* Team Size, Timeline, Methodology */}
              <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-3">
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Users size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">Team Size</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">{teamSizeText}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Clock size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">Timeline</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-medium">
                    {study.timeline} weeks <span className="font-normal">· discovery to launch</span>
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Info size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">Methodology</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">
                    {optionLabel(methodologies, study.methodology) || "—"}
                  </span>
                </div>
              </div>

              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

              {/* Security & Compliance */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                  <Shield size={16} className="text-rose-700 shrink-0" />
                  <span className="text-neutral-800 text-sm font-medium">Security & Compliance</span>
                </div>
                <p className="self-stretch text-zinc-500 text-sm font-normal">
                  {study.compliance ||
                    "Enterprise-grade security, encrypted data in transit and at rest."}
                </p>
              </div>
            </div>
          </div>

          {/* CLIENT DELIVERABLES */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              CLIENT DELIVERABLES
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col sm:flex-row items-stretch gap-4">
              {deliverables.length > 0 ? (
                deliverables.slice(0, 2).map((sol: string, idx: number) => (
                  <div
                    key={sol}
                    id={`cs-deliverable-${idx}`}
                    className={`flex-1 w-full self-stretch p-5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-rose-700 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group ${
                      idx === 0
                        ? "bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50"
                        : "bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 outline-gray-200 hover:outline-rose-700"
                    }`}
                  >
                    <div className="p-1.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                      <LordIcons
                        src={DELIVERABLE_ICONS[idx % DELIVERABLE_ICONS.length]}
                        trigger="hover"
                        target={`#cs-deliverable-${idx}`}
                        state="hover-pinch"
                        colors={DELIVERABLE_COLORS[idx % DELIVERABLE_COLORS.length]}
                        size={40}
                      />
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <span className="self-stretch text-rose-700 group-hover:text-rose-700 text-base font-semibold">
                        {optionLabel(deliverables, sol)}
                      </span>
                      <span className="self-stretch text-zinc-600 text-sm font-normal">
                        Delivered as part of this engagement.
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-zinc-400 text-sm font-normal">
                  No deliverables specified.
                </span>
              )}
            </div>
          </div>

          {/* HOW THIS APP HELPS THE CLIENT */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              HOW THIS APP HELPS THE CLIENT
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {helps.length > 0 ? (
                  helps.map((item, idx) => (
                    <div key={idx} className="self-stretch flex flex-col gap-3">
                      <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                        <CheckCircle size={16} className="text-rose-700 shrink-0" />
                        <span className="text-neutral-800 text-sm font-medium">{item}</span>
                      </div>
                      {idx < helps.length - 1 && (
                        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                      )}
                    </div>
                  ))
                ) : (
                  <span className="text-zinc-400 text-sm font-normal">
                    No highlights specified.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* WHAT THE CLIENT SAID */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-neutral-400 text-sm font-normal">
              WHAT THE CLIENT SAID
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
              {study.testimonial?.testimoni ? (
                <>
                  <p className="self-stretch text-neutral-800 text-sm font-normal leading-relaxed">
                    "{study.testimonial.testimoni}"
                  </p>
                  <div className="self-stretch inline-flex justify-start items-center gap-3 pt-2">
                    <div className="w-1 self-stretch bg-rose-700 rounded-full" />
                    <div className="flex-1 flex flex-col justify-start items-start gap-0.5">
                      <span className="text-rose-700 text-sm font-medium">
                        {study.testimonial.name}
                      </span>
                      <span className="text-neutral-400 text-sm font-normal">
                        {study.testimonial.company}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="self-stretch text-zinc-400 text-sm font-normal">
                  No testimonial available for this case study.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column Sticky Sidebar */}
        <div className="flex flex-col gap-8 lg:col-span-2 sticky top-28 self-start">
          {/* OTHER RELATED CASE STUDIES */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-4 overflow-hidden">
            <span className="text-neutral-400 text-sm font-normal">
              OTHER RELATED CASE STUDIES
            </span>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              {related.length > 0 ? (
                related.map((item) => (
                  <Link
                    key={item._id}
                    to={`/case-study/${item._id}`}
                    className="self-stretch p-3 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 inline-flex justify-start items-center gap-3 hover:outline-rose-700 transition-colors duration-300 cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-2xl object-cover shrink-0 border-2 border-gray-200 bg-gradient-to-br from-rose-700 to-rose-900 flex items-center justify-center">
                      <Boxes className="w-8 h-8 text-white/70" />
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-1 overflow-hidden">
                      {item.category && (
                        <div className="px-2.5 py-1 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                          <span className="text-blue-300 text-xs font-medium">
                            {optionLabel(categories, item.category)}
                          </span>
                        </div>
                      )}
                      <span className="text-black text-sm font-normal line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <span className="text-zinc-400 text-sm font-normal">
                  No related case studies yet.
                </span>
              )}
            </div>

            <Link
              to="/case-study"
              className="self-stretch h-10 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2 text-white text-sm font-medium cursor-pointer"
            >
              <span>View All Related Case Studies</span>
              <ArrowRight size={18} className="text-white" />
            </Link>
          </div>

          {/* MORE */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              MORE
            </span>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <h3 className="self-stretch text-neutral-800 text-2xl font-semibold">
                Interested On This Case Studies?
              </h3>
              <p className="self-stretch text-zinc-500 text-base font-normal">
                Chat our sales for detailed information
              </p>
            </div>
            <div className="inline-flex justify-start items-center gap-3 pt-2">
              <button
                onClick={() => setInquiryOpen(true)}
                className="h-10 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2 text-white text-sm font-medium cursor-pointer"
              >
                <span>Request Product</span>
                <ArrowRight size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <InquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={study.title}
        productType="CASE_STUDY"
      />
    </section>
  );
}
