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

export default function CustomAppDetail() {
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
          Technology & Licensing Service
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
            <div className="flex flex-wrap gap-2">
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
          <div>
            <h3 className="flex items-center gap-2 font-semibold mb-1">
              <Compass size={16} className="text-primary-500" />
              Challange
            </h3>
            <span className="text-sm text-gray-500">
              Manual, spreadsheet-based dispatch causing delayed pickups and
              idle trucks.
            </span>
            <p className="text-sm text-gray-600 pt-3 mt-3 border-t border-gray-300">
              A correspondence management system used to record, manage, and
              monitor the flow of incoming and outgoing letters within an
              organization. Users can assign responsible parties and track the
              status of letters in real-time.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-400">
              FEATURE HIGHLIGHT
            </p>
            <div className="border border-gray-400 rounded-3xl p-5 flex flex-col gap-3">
              <Carousel
                slides={[
                  {
                    image: CaraouselB,
                    title: "Automated Letter Sending",
                    description:
                      "Schedule and dispatch correspondence automatically with templates and tracking.",
                  },
                  {
                    image: CaraouselA,
                    title: "Smart Assignment",
                    description:
                      "Route incoming letters to the right person or department instantly.",
                  },
                  {
                    image: CaraouselB,
                    title: "Real-time Status Tracking",
                    description:
                      "Monitor the exact location and processing status of any letter at a glance.",
                  },
                ]}
              />
              <div className="space-y-1 pt-4 mt-3 border-t border-gray-300">
                <h3 className="text-sm font-semibold">Feature A</h3>
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
              PROJECT DETAILS
            </p>
            <div className="bg-white p-5 rounded-2xl space-y-3">
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
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">MORE</p>
            <p className="text-2xl font-semibold mb-1">
              Want something like this?
            </p>
            <p className="text-base text-gray-500 mb-4">
              We'll scope a project like it for your team.
            </p>
            <div className="space-x-2">
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
