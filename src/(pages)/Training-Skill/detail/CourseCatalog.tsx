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
import RelatedList from "@/components/organisms/Related";
import { useProductDetail } from "@/services/strategic-solution/hook";

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
  const { data: product, isLoading } = useProductDetail({ id: id! });

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
        <Link className="opacity-50" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50" to="/strategic-solution">
          Course Catalog
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link
          className="text-primary-500"
          to={`/strategic-solution/${product._id}`}
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
        <div className=" flex flex-col gap-6 lg:col-span-3">
          {/* Banner */}
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
            {product.banner?.url ? (
              <img
                src={product.banner.url}
                alt={product.product_name}
                className="w-full h-full object-cover rounded-4xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
            {product.product_description}
          </p>

          <p className="text-xs tracking-wide text-gray-400">
            WHAT YOU'LL LEARN
          </p>
          {/* What you'll learn */}
          {product.benefits?.length > 0 && (
            <div className="border border-gray-300 rounded-2xl p-5 bg-[#ECECEC]">
              <ul className="flex flex-col">
                {product.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 text-sm md:text-base py-3 ${idx === product.benefits?.length - 1 ? "" : " border-b border-gray-300"}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to join */}
          <div className="border border-gray-300 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-3">
              HOW TO JOIN
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-200 p-4 bg-white">
                <div className="flex text-primary-500 items-start gap-2">
                  <MousePointer size={14} />
                  <p className="text-sm font-semibold">Pick A Course</p>
                </div>
                <p className="text-xs text-gray-500">
                  Browse our catalog and select the training that fits your
                  goals.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4 bg-white">
                <div className="flex text-primary-500 items-center gap-2">
                  <PhoneCall size={14} />
                  <p className="text-sm font-semibold">Chat Our Sales</p>
                </div>
                <p className="text-xs text-gray-500">
                  Connect instantly with our team to check availability and
                  confirm your schedule.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4 bg-white">
                <div className="flex text-primary-500 items-center gap-2">
                  <BookOpen size={14} />
                  <p className="text-sm font-semibold">Start Learning</p>
                </div>
                <p className="text-xs text-gray-500">
                  Secure your spot and jump straight into your class.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: sidebar */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-3">
              COURSE FEATURE
            </p>

            <div className="bg-white p-5 rounded-2xl">
              <div className="pb-3 border-b border-gray-200">
                <p className="text-sm mb-1 flex gap-2 items-center">
                  <Info size={14} className="text-primary-500" />
                  Class Category
                </p>
                <span className="inline-block text-xs font-medium bg-primary-50 text-primary-500 rounded-full px-3 py-1">
                  ● {categoryLabel.replaceAll("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-4">
                <div className="space-y-1 pb-3 border-b border-gray-200">
                  <div className="flex gap-2 items-center">
                    <Users className="text-primary-500" size={12} />
                    <p className="text-xs ">Students</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    <strong className="font-semibold">
                      {product.max_participant}
                    </strong>{" "}
                    People
                  </p>
                </div>

                <div className="space-y-1 pb-3 border-b border-gray-200">
                  <div className="flex gap-2 items-center">
                    <Clock className="text-primary-500" size={12} />
                    <p className="text-xs ">Duration</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {product.duration} Day{product.duration > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex gap-2 items-center">
                    <Award className="text-primary-500" size={12} />
                    <p className="text-xs ">Skill Level</p>
                  </div>
                  <p className="text-xs text-gray-400">{skillLabel}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex gap-2 items-center">
                    <Flag className="text-primary-500" size={12} />
                    <p className="text-xs ">Language</p>
                  </div>
                  <p className="text-xs text-gray-400 capitalize">
                    {product.language.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">MORE</p>
            <p className="text-2xl font-semibold mb-1">
              Interested On This Class?
            </p>
            <p className="text-base text-gray-500 mb-4">
              Chat our sales for detailed information
            </p>
            <a
              href={product.link || "#"}
              target={product.link ? "_blank" : undefined}
              rel={product.link ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1 bg-primary-500 text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-primary-600 transition-colors"
            >
              Request Schedule
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <RelatedList
        type="it_training"
        name="Related Courses"
        basePath="/strategic-solution"
      />
    </section>
  );
}
