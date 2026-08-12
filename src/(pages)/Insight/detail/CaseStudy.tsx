import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Info,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import { useProductDetail } from "@/services/strategic-solution/hook";
import { formatDate } from "@/utils/helper";
import { LordIcons } from "@/components/atoms";

import OnPremise from "@/assets/v2/onpremise.png";
import Article from "@/assets/v2/article.jpg";

const CATEGORY_LABEL: Record<string, string> = {
  DATA_ANALYTICS: "Data Analytics",
  PROGRAMMING: "Programming",
  // tambahkan mapping kategori lain sesuai enum backend kamu
};

export default function CaseStudyDetail() {
  const now = Date.now();
  const { id } = useParams<{ id: string }>();
  const { data: study, isLoading } = useProductDetail({ id: id! });

  if (isLoading || !study) {
    return <HeroProductDetailSkeleton />;
  }

  const categoryLabel =
    CATEGORY_LABEL[study.product_category] ?? study.product_category;

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
          {study.product_name}
        </Link>
      </div>

      {/* Header Info */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 flex flex-col justify-start items-start gap-1">
        <h1 className="text-neutral-800 text-2xl md:text-3xl font-semibold">
          {study.product_name}
        </h1>
        <div className="inline-flex justify-start items-center gap-3">
          <div className="rounded-[64px] flex justify-center items-center gap-2">
            <Clock size={16} className="text-rose-700 shrink-0" />
            <span className="text-neutral-800 text-sm font-medium">
              {formatDate(now)}
            </span>
          </div>
          <div className="px-2.5 py-1.5 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
            <span className="text-blue-300 text-xs font-medium">
              {categoryLabel.replaceAll("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column Content */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Banner */}
          <div className="w-full h-80 md:h-96 relative bg-gradient-to-b from-neutral-800/0 to-neutral-800/60 rounded-3xl border-2 border-gray-200 overflow-hidden">
            {study.banner?.url ? (
              <img
                src={study.banner.url}
                alt={study.product_name}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>

          {/* RELATED INDUSTRY */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              RELATED INDUSTRY
            </span>
            <div className="self-stretch rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center gap-3">
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="px-2.5 py-1.5 bg-pink-400/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                  <span className="text-pink-400 text-xs font-medium">Food & Beverages</span>
                </div>
                <div className="px-2.5 py-1.5 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-2">
                  <span className="text-blue-300 text-xs font-medium">Manufacture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-justify text-neutral-900 text-base font-normal leading-relaxed whitespace-pre-line">
            {study.product_description ||
              "The ABCD App is an innovative platform designed to streamline your daily tasks and enhance productivity. With its user-friendly interface, you can easily manage your schedule, set reminders, and collaborate with others. Whether you're at home or on the go, the ABCD App keeps you organized and connected, making it an essential tool for anyone looking to optimize their time."}
          </p>

          {/* PROJECT DETAILS */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              PROJECT DETAILS
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              {/* Deployment Option */}
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
                    <span className="text-rose-700 text-base font-medium">On-Premise</span>
                    <span className="text-neutral-800 text-sm font-normal">Environment</span>
                  </div>
                </div>
                <p className="self-stretch text-zinc-500 text-sm font-normal">
                  Hosted locally on your internal servers for maximum data control and strict security compliance.
                </p>
              </div>

              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

              {/* Team Size, Timeline, Methodology */}
              <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-3">
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Users size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">Team Size</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">2 engineers, 1 designer, 1 PM</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Clock size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">Timeline</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-medium">
                    9 weeks <span className="font-normal">· discovery to launch</span>
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Info size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">Methodology</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">Agile Development</span>
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
                  Role-based dispatch access, encrypted location data in transit and at rest, SOC 2-aligned infrastructure.
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
              {/* Deliverable 1 */}
              <div
                id="cs-deliverable-1"
                className="flex-1 w-full self-stretch p-5 bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-rose-700 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-1.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
                  <LordIcons
                    src="https://cdn.lordicon.com/lldhrpsv.json"
                    trigger="hover"
                    target="#cs-deliverable-1"
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
                id="cs-deliverable-2"
                className="flex-1 w-full self-stretch p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-1.5 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-1.5 overflow-hidden transition-colors duration-300">
                  <LordIcons
                    src="https://cdn.lordicon.com/cnbqxixv.json"
                    trigger="hover"
                    target="#cs-deliverable-2"
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

          {/* HOW THIS APP HELPS THE CLIENT */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              HOW THIS APP HELPS THE CLIENT
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {[
                  "Problem A Fixed",
                  "Problem B Fixed",
                  "Problem C Fixed",
                  "Problem D Fixed",
                ].map((item, idx) => (
                  <div key={idx} className="self-stretch flex flex-col gap-3">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <CheckCircle size={16} className="text-rose-700 shrink-0" />
                      <span className="text-neutral-800 text-sm font-medium">{item}</span>
                    </div>
                    {idx < 3 && (
                      <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WHAT THE CLIENT SAID */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-neutral-400 text-sm font-normal">
              WHAT THE CLIENT SAID
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
              <p className="self-stretch text-neutral-800 text-sm font-normal leading-relaxed">
                "Penggunaan Aplikasi ABCD sangat memuaskan! Fitur-fitur yang ada membantu saya dalam mengelola data dengan lebih efisien. Saya juga terkesan dengan antarmuka yang user-friendly dan responsif."
              </p>
              <div className="self-stretch inline-flex justify-start items-center gap-3 pt-2">
                <div className="w-1 self-stretch bg-rose-700 rounded-full" />
                <div className="flex-1 flex flex-col justify-start items-start gap-0.5">
                  <span className="text-rose-700 text-sm font-medium">Mr A.</span>
                  <span className="text-neutral-400 text-sm font-normal">Perusahaan ABC</span>
                </div>
              </div>
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
              {[
                "Choosing the Right Training Program for Your Team",
                "Measuring the Impact of Professional Training",
                "How Continuous Learning Drives Career Growth",
              ].map((title, idx) => (
                <div
                  key={idx}
                  className="self-stretch p-3 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 inline-flex justify-start items-center gap-3 hover:outline-rose-700 transition-colors duration-300 cursor-pointer"
                >
                  <img
                    src={Article}
                    alt={title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border-2 border-gray-200"
                  />
                  <div className="flex-1 inline-flex flex-col justify-center items-start gap-1 overflow-hidden">
                    <div className="px-2.5 py-1 bg-blue-300/20 rounded-[64px] inline-flex justify-center items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                      <span className="text-blue-300 text-xs font-medium">
                        Custom App Development
                      </span>
                    </div>
                    <span className="text-black text-sm font-normal line-clamp-2">
                      {title}
                    </span>
                  </div>
                </div>
              ))}
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
              <Link
                to="/contact"
                className="h-10 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2 text-white text-sm font-medium cursor-pointer"
              >
                <span>Request Product</span>
                <ArrowRight size={18} className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
