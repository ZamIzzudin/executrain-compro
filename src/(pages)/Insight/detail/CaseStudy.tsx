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
    <section className="pt-0 md:pt-[10%] pb-[8%]">
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50" to="/case-study">
          Case Studies
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-primary-500" to={`/case-study/${study._id}`}>
          {study.product_name}
        </Link>
      </div>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 space-y-2">
        <h1 className=" text-xl md:text-2xl lg:text-3xl font-semibold">
          {study.product_name}
        </h1>
        <div className="flex gap-3 items-center">
          <span className="font-medium py-1 flex gap-2 items-center">
            <Clock size={14} className="text-primary-500" /> {formatDate(now)}
          </span>
          <span className="inline-block text-xs font-medium bg-primary-50 text-primary-500 rounded-full px-3 py-1">
            ● {categoryLabel.replaceAll("_", " ")}
          </span>
        </div>
      </div>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className=" flex flex-col gap-6 lg:col-span-3">
          {study.banner?.url ? (
            <img
              src={study.banner.url}
              alt={study.product_name}
              className="w-full h-full object-cover rounded-4xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              RELATED INDUSTRY
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block text-xs font-medium bg-primary-50 text-primary-500 rounded-full px-3 py-1">
                Food & Beverages
              </span>
              <span className="inline-block text-xs font-medium bg-yellow-50 text-yellow-500 rounded-full px-3 py-1">
                Manufacture
              </span>
              <span className="inline-block text-xs font-medium bg-green-50 text-green-500 rounded-full px-3 py-1">
                Logistic
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
            {study.product_description}
          </p>

          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              PROJECT DETAILS
            </p>
            <div className="bg-white rounded-2xl space-y-3 p-5 border border-gray-300">
              <div className="items-center flex gap-2">
                <img src={OnPremise} alt="microsoft logo" className="h-10" />
                <div>
                  <h2 className="font-semibold text-primary-500 text-sm">
                    On-Premise
                  </h2>
                  <h2 className=" text-xs">Environtment</h2>
                </div>
              </div>
              <p className="text-xs text-gray-500 border-b pb-4 border-gray-200">
                Hosted locally on your internal servers for maximum data control
                and strict security compliance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-2">
                <div className="space-y-1 pb-3 border-b border-gray-200">
                  <div className="flex gap-2 items-center">
                    <Users className="text-primary-500" size={12} />
                    <p className="text-xs ">Team Size</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    2 engineers, 1 designer, 1 PM
                  </p>
                </div>
                <div className="space-y-1 pb-3 border-b border-gray-200">
                  <div className="flex gap-2 items-center">
                    <Clock className="text-primary-500" size={12} />
                    <p className="text-xs ">Timeline</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    <strong className="font-semibold">9 weeks</strong>
                    {" · "}
                    discovery to launch
                  </p>
                </div>
                <div className="space-y-1 pb-3 border-b border-gray-200">
                  <div className="flex gap-2 items-center">
                    <Info className="text-primary-500" size={12} />
                    <p className="text-xs ">Methodology</p>
                  </div>
                  <p className="text-xs text-gray-400">Agile Development</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex gap-2 items-center">
                  <Shield className="text-primary-500" size={12} />
                  <p className="text-xs ">Security & Compliance</p>
                </div>
                <p className="text-xs text-gray-400">
                  Role-based dispatch access, encrypted location data in transit
                  and at rest, SOC 2-aligned infrastructure.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              HOW THIS APP HELPS THE CLIENT
            </p>
            <div className="bg-white rounded-2xl space-y-3 p-5 border border-gray-300">
              {[
                "Problem A Fixed",
                "Problem B Fixed",
                "Problem C Fixed",
                "Problem D Fixed",
              ].map((each: string, index) => (
                <div
                  className="flex items-center gap-2 text-sm"
                  key={index + 1}
                >
                  <CheckCircle size={14} className="text-primary-500" />
                  {each}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              WHAT THE CLIENT SAID
            </p>
            <div className="bg-white rounded-2xl space-y-3 p-5 border border-gray-300">
              <p className="text-sm">
                "Penggunaan Aplikasi ABCD sangat memuaskan! Fitur-fitur yang ada
                membantu saya dalam mengelola data dengan lebih efisien. Saya
                juga terkesan dengan antarmuka yang user-friendly dan
                responsif."
              </p>
              <div className="border-l-3 border-primary-500 flex flex-col px-4">
                <span className="text-sm text-primary-500 font-medium">
                  Mr.A
                </span>
                <span className="text-sm text-gray-400">Perusahaan ABC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">
              OTHER RELATED ARTICLE
            </p>
            <div className="space-y-2 py-3">
              {[
                "Choosing the Right Training Program for Your Team",
                "Measuring the Impact of Professional Training",
                "How Continuous Learning Drives Career Growth",
              ].map((each: string, index) => (
                <div
                  key={index + 1}
                  className="p-3 bg-white rounded-2xl flex gap-2 items-center flex-col"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      alt=""
                      src={Article}
                      className="h-15 w-15 rounded-xl"
                    />
                    <div className="space-y-1">
                      <span className="inline-block text-xs bg-primary-50 text-primary-500 rounded-full px-3 py-1">
                        ● Corporate Training
                      </span>
                      <h3 className="font-medium">{each}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={study.link || "#"}
              target={study.link ? "_blank" : undefined}
              rel={study.link ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1 bg-primary-500 text-white text-sm font-medium rounded-full px-3 py-2 hover:bg-primary-600 transition-colors w-full justify-center"
            >
              View All Related Case
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">MORE</p>
            <p className="text-2xl font-semibold mb-1">
              Interested On This Case Studies?
            </p>
            <p className="text-base text-gray-500 mb-4">
              Chat our sales for detailed information
            </p>
            <div className="space-x-2">
              <a
                href={study.link || "#"}
                target={study.link ? "_blank" : undefined}
                rel={study.link ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 bg-primary-500 text-white text-sm font-medium rounded-full px-3 py-2 hover:bg-primary-600 transition-colors"
              >
                Request Product
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
