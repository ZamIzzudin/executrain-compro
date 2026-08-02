import { useParams, Link } from "react-router-dom";

import { ChevronRight, ArrowRight, Globe, Shield, Target } from "lucide-react";
import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import { useProductDetail } from "@/services/strategic-solution/hook";
import Carousel from "@/components/molecules/Carousel";

import HeroBG from "@/assets/banner.jpg";
import AboutA from "@/assets/v2/about-1.png";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail({ id: id! });

  if (isLoading || !product) {
    return <HeroProductDetailSkeleton />;
  }

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%]">
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50" to="/free-trial">
          Ready-to-use IT Products
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-primary-500" to={`/free-trial/${product._id}`}>
          {product.product_name}
        </Link>
      </div>
      <h1 className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
        {product.product_name}
      </h1>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className=" flex flex-col gap-6 lg:col-span-3">
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
          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">TECH STACK</p>
            <div className="space-x-3">
              <span className="inline-block text-xs font-medium bg-primary-50 text-primary-500 rounded-full px-3 py-1">
                Power Apps
              </span>
              <span className="inline-block text-xs font-medium bg-yellow-50 text-yellow-500 rounded-full px-3 py-1">
                Power Automate
              </span>
              <span className="inline-block text-xs font-medium bg-green-50 text-green-500 rounded-full px-3 py-1">
                Power BI
              </span>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
            {product.product_description}
          </p>

          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              PROBLEM STATEMENT
            </p>
            <div className="border border-gray-400 rounded-3xl p-5 flex flex-col gap-3">
              <p className="text-sm text-gray-600 pb-3 border-b border-gray-300">
                Organizations often struggle with misplaced correspondence,
                delayed responses, and a lack of clear accountability when
                manually managing the flow of incoming and outgoing letters.
              </p>
              <div className="pb-3 border-b border-gray-300 space-y-3">
                <h3 className="text-sm flex items-center gap-2 font-semibold">
                  <Target size={14} className="text-primary-500" />
                  What This App Can Help?
                </h3>
                {[
                  "Easily record, organize, and manage all incoming and outgoing organizational correspondence in one secure platform.",
                  "Instantly assign specific letters to the responsible individuals or departments to ensure timely replies and clear accountability.",
                  "Monitor the exact location and processing status of any letter at a glance to prevent delays and bottlenecks.",
                ].map((each: string, index) => (
                  <p
                    key={index + 1}
                    className="text-sm border text-gray-600 border-gray-300 bg-[#ECECEC] p-3 rounded-xl"
                  >
                    {each}
                  </p>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm flex items-center gap-2 font-semibold">
                  <Shield size={14} className="text-primary-500" />
                  Security & Compliance
                </h3>
                <p className="text-sm text-gray-600">
                  Role-based dispatch access, encrypted location data in transit
                  and at rest, SOC 2-aligned infrastructure.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              FEATURE HIGHLIGHT
            </p>
            <div className="border border-gray-400 rounded-3xl p-5 flex flex-col gap-3">
              <Carousel
                slides={[
                  {
                    image: HeroBG,
                    title: "Automated Letter Sending",
                    description:
                      "Schedule and dispatch correspondence automatically with templates and tracking.",
                  },
                  {
                    image: HeroBG,
                    title: "Smart Assignment",
                    description:
                      "Route incoming letters to the right person or department instantly.",
                  },
                  {
                    image: HeroBG,
                    title: "Real-time Status Tracking",
                    description:
                      "Monitor the exact location and processing status of any letter at a glance.",
                  },
                ]}
              />
              <div className="space-y-1 pt-4 mt-3 border-t border-gray-300">
                <h3 className="text-sm font-semibold">
                  Automated Letter Sending
                </h3>
                <p className="text-sm text-gray-600">
                  Organizations often struggle with misplaced correspondence,
                  delayed responses, and a lack of clear accountability when
                  manually managing the flow of incoming and outgoing letters.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">
              DEPLOYMENT OPTIONS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 flex-col flex">
                <div className="items-center flex gap-2">
                  <img src={AboutA} alt="microsoft logo" className="h-10" />
                  <div>
                    <h2 className="font-semibold text-primary-500 text-sm">
                      On-Premise
                    </h2>
                    <h2 className=" text-xs">Environtment</h2>
                  </div>
                </div>
                <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                  Hosted locally on your internal servers for maximum data
                  control and strict security compliance.
                </p>
              </div>
              <div className="bg-white p-3 rounded-2xl space-y-2 flex-1 flex-col flex">
                <div className="items-center flex gap-2">
                  <img src={AboutA} alt="microsoft logo" className="h-10" />
                  <div>
                    <h2 className="font-semibold text-primary-500 text-sm">
                      Cloud
                    </h2>
                    <h2 className="text-xs">Environtment</h2>
                  </div>
                </div>
                <p className="text-xs text-gray-500 border-t pt-4 border-gray-300">
                  Hosted securely in the cloud for easy remote access, seamless
                  scalability, and zero maintenance.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">MORE</p>
            <p className="text-2xl font-semibold mb-1">
              Need this kind of Product?
            </p>
            <p className="text-base text-gray-500 mb-4">
              Chat our sales for detailed information
            </p>
            <div className="space-x-2">
              <a
                href={product.link || "#"}
                target={product.link ? "_blank" : undefined}
                rel={product.link ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 border border-primary-500 text-primary-500 text-sm font-medium rounded-full px-3 py-2 hover:bg-primary-600 transition-colors"
              >
                View Live Demo
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={product.link || "#"}
                target={product.link ? "_blank" : undefined}
                rel={product.link ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 bg-primary-500 text-white text-sm font-medium rounded-full px-3 py-2 hover:bg-primary-600 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
