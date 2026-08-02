import { useParams, Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";
import Accordion from "@/components/molecules/Accordion";

import { useProductDetail } from "@/services/strategic-solution/hook";

const FAQ_ITEMS = [
  {
    question: "How are renewals and price changes handled?",
    answer:
      "We provide perpetual, subscription, and volume licensing options from major vendors. Our team helps you choose the most cost-effective model and notifies you well in advance of any renewals or price adjustments.",
  },
  {
    question: "What compliance documentation is included?",
    answer:
      "Every license comes with full compliance documentation, including vendor agreements, audit trails, and transfer policies. Our team will guide you through the specific terms for each license you purchase.",
  },
  {
    question: "Can we cancel or downgrade mid-term?",
    answer:
      "Most licenses can be reassigned within your organization. Cancellation and downgrade policies vary by vendor and product, and we will help you navigate the specific terms for each license.",
  },
];

export default function CertificationDetail() {
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
          Software & Licensing Service
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-primary-500" to={`/free-trial/${product._id}`}>
          {product.product_name}
        </Link>
      </div>
      <h1 className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
        {product.product_name}
      </h1>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className=" flex flex-col gap-6">
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
          <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
            {product.product_description}
          </p>
          <ol className="list-disc pl-8! text-gray-600">
            {[
              "Publish and share Power BI reports",
              "Included in Microsoft 365 E5 and Office 365 E5",
              "Available to buy now with a credit card",
            ].map((each: string, index) => (
              <li key={index + 1}>{each}</li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-6">
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-3">
              FAQ AND COMPLIANCE GUIDE
            </p>
            <Accordion items={FAQ_ITEMS} />
          </div>
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">MORE</p>
            <p className="text-2xl font-semibold mb-1">Want This Licensing?</p>
            <p className="text-base text-gray-500 mb-4">
              Chat our sales for detailed information
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
