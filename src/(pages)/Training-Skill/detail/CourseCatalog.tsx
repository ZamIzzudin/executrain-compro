import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Clock,
  CheckCircle2,
  MousePointer,
  PhoneCall,
  BookOpen,
  ArrowRight,
  Award,
  Flag,
  Info,
} from "lucide-react";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";
import RelatedCatalog from "@/components/organisms/RelatedCatalog";
import RegisterModal from "@/components/molecules/RegisterModal";
import { handleImageError } from "@/utils/helper";
import { useCatalogDetail } from "@/services/course-catalog/hook";

const CATEGORY_LABEL: Record<string, string> = {
  DATA_ANALYTICS: "Data Analytics",
  PROGRAMMING: "Programming",
  // tambahkan mapping kategori lain sesuai enum backend kamu
};

const SKILL_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export default function CourseCatalogDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useCatalogDetail({ id: id! });
  const [registerOpen, setRegisterOpen] = useState(false);

  if (isLoading || !product) {
    return <HeroProductDetailSkeleton />;
  }

  const categoryLabel =
    CATEGORY_LABEL[product.product_category] ?? product.product_category;
  const skillLabel = SKILL_LABEL[product.skill_level] ?? product.skill_level;

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%] bg-[#FCFCFC]">
      {/* Breadcrumb */}
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/course-catalog">
          Course Catalog
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link
          className="text-primary-500 hover:opacity-80 transition-opacity duration-200"
          to={`/course-catalog/${product._id}`}
        >
          {product.product_name}
        </Link>
      </div>

      {/* Title */}
      <h1 className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
        {product.product_name}
      </h1>

      {/* Main grid: content + sidebar */}
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left column */}
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

          {/* Description */}
          <p className="text-justify text-neutral-900 text-base font-normal leading-relaxed whitespace-pre-line">
            {product.product_description}
          </p>

          {/* WHAT YOU’LL LEARN */}
          <div className="w-full flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              WHAT YOU’LL LEARN
            </span>
            <div className="self-stretch p-6 bg-stone-50 rounded-3xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {(product.benefits?.length > 0
                  ? product.benefits
                  : [
                      "Building new data types.",
                      "Programming the user interface.",
                      "Performing operations asynchronously.",
                      "Encrypting and decrypting data.",
                    ]
                ).map((benefit: string, idx: number, arr: string[]) => (
                  <div key={idx} className="self-stretch flex flex-col gap-3">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                      <span className="justify-start text-neutral-800 text-sm font-medium line-clamp-2">
                        {benefit}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HOW TO JOIN */}
          <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 relative">
            <span className="text-neutral-400 text-sm font-normal">
              HOW TO JOIN
            </span>
            <div className="self-stretch flex flex-col sm:flex-row items-stretch gap-0 relative">
              {/* Step 1 */}
              <div className="flex-1 w-full self-stretch p-5 bg-gradient-to-b from-white to-pink-50 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-rose-700 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group z-10">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <MousePointer size={16} className="text-rose-700 shrink-0" />
                    <span className="flex-1 text-rose-700 group-hover:text-rose-700 text-sm font-medium">
                      Pick A Course
                    </span>
                  </div>
                  <p className="self-stretch text-zinc-600 text-xs font-normal">
                    Browse our catalog and select the training that fits your goals.
                  </p>
                </div>
              </div>

              {/* Connecting Line 1 */}
              <div className="hidden sm:block w-4 h-0 border-t-2 border-solid border-gray-200 shrink-0 z-0 self-center" />

              {/* Step 2 */}
              <div className="flex-1 w-full self-stretch p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group z-10">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <PhoneCall size={16} className="text-rose-700 shrink-0" />
                    <span className="flex-1 text-neutral-800 group-hover:text-rose-700 text-sm font-medium transition-colors duration-300">
                      Chat Our Sales
                    </span>
                  </div>
                  <p className="self-stretch text-neutral-400 group-hover:text-zinc-600 text-xs font-normal transition-colors duration-300">
                    Connect instantly with our team to check availability and confirm your schedule.
                  </p>
                </div>
              </div>

              {/* Connecting Line 2 */}
              <div className="hidden sm:block w-4 h-0 border-t-2 border-solid border-gray-200 shrink-0 z-0 self-center" />

              {/* Step 3 */}
              <div className="flex-1 w-full self-stretch p-5 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group z-10">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <BookOpen size={16} className="text-rose-700 shrink-0" />
                    <span className="flex-1 text-neutral-800 group-hover:text-rose-700 text-sm font-medium transition-colors duration-300">
                      Start Learning
                    </span>
                  </div>
                  <p className="self-stretch text-neutral-400 group-hover:text-zinc-600 text-xs font-normal transition-colors duration-300">
                    Secure your spot and jump straight into your class.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: sidebar */}
        <div className="flex flex-col gap-8 lg:col-span-2 sticky top-28 self-start">
          {/* COURSE FEATURE */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              COURSE FEATURE
            </span>
            <div className="self-stretch p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-center items-center gap-4">
              {/* Class Category */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                  <Info size={16} className="text-rose-700 shrink-0" />
                  <span className="text-neutral-800 text-sm font-medium">
                    Class Category
                  </span>
                </div>
                <div className="inline-flex justify-start items-center gap-2 flex-wrap">
                  <div className="px-2.5 py-1 bg-rose-700/20 rounded-[64px] flex justify-center items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-rose-700 rounded-full shrink-0" />
                    <span className="text-rose-700 text-xs font-medium">
                      Free Class
                    </span>
                  </div>
                  <div className="px-2.5 py-1 bg-blue-300/20 rounded-[64px] flex justify-center items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full shrink-0" />
                    <span className="text-blue-300 text-xs font-medium">
                      {categoryLabel.replaceAll("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

              {/* Students & Duration */}
              <div className="self-stretch inline-flex justify-start items-start gap-3">
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Users size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Students
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm">
                    <strong className="font-medium">{product.max_participant ?? 30}</strong> · People
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Clock size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Duration
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal">
                    {product.duration ?? 5} Day{product.duration > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

              {/* Skill Level & Language */}
              <div className="self-stretch inline-flex justify-start items-start gap-3">
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Award size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Skill Level
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal capitalize">
                    {skillLabel?.toLowerCase() ?? "beginner"}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                    <Flag size={16} className="text-rose-700 shrink-0" />
                    <span className="text-neutral-800 text-sm font-medium">
                      Language
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm font-normal capitalize">
                    {product.language?.toLowerCase() ?? "indonesia"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MORE */}
          <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-zinc-500 text-sm font-normal">
              MORE
            </span>
            <div className="self-stretch flex flex-col justify-start items-center gap-2">
              <h3 className="self-stretch text-neutral-800 text-2xl font-semibold">
                Interested On This Class?
              </h3>
              <p className="self-stretch text-zinc-500 text-base font-normal">
                Chat our sales for detailed information
              </p>
            </div>
            <div className="inline-flex justify-start items-start gap-3">
              <button
                onClick={() => setRegisterOpen(true)}
                className="h-10 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2.5 text-white text-sm font-medium cursor-pointer"
              >
                <span>Request Schedule</span>
                <ArrowRight size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <RelatedCatalog
        source="course"
        name="Related Courses"
        basePath="/course-catalog"
        category={product.product_category}
      />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        productName={product.product_name}
      />
    </section>
  );
}
