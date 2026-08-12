import { useParams, Link } from "react-router-dom";
import { ChevronRight, ClockIcon, ArrowRight } from "lucide-react";

import { HeroProductDetailSkeleton } from "@/components/organisms/Skeleton";

import { useProductDetail } from "@/services/strategic-solution/hook";
import { formatDate } from "@/utils/helper";

import Article from "@/assets/v2/article.jpg";

const CATEGORY_LABEL: Record<string, string> = {
  DATA_ANALYTICS: "Data Analytics",
  PROGRAMMING: "Programming",
  // tambahkan mapping kategori lain sesuai enum backend kamu
};

export default function ArticleDetail() {
  const now = Date.now();
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading } = useProductDetail({ id: id! });

  if (isLoading || !article) {
    return <HeroProductDetailSkeleton />;
  }

  const categoryLabel =
    CATEGORY_LABEL[article.product_category] ?? article.product_category;

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%] bg-[#FCFCFC]">
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/article">
          Article
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-rose-700 hover:opacity-80 transition-opacity duration-200" to={`/article/${article._id}`}>
          {article.product_name}
        </Link>
      </div>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-4 space-y-2">
        <h1 className=" text-xl md:text-2xl lg:text-3xl font-semibold">
          {article.product_name}
        </h1>
        <div className="flex gap-3 items-center">
          <span className="font-medium py-1 flex gap-2 items-center">
            <ClockIcon size={14} className="text-primary-500" />{" "}
            {formatDate(now)}
          </span>
          <span className="inline-block text-xs font-medium bg-primary-50 text-primary-500 rounded-full px-3 py-1">
            ● {categoryLabel.replaceAll("_", " ")}
          </span>
        </div>
      </div>
      <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className=" flex flex-col gap-6 lg:col-span-3">
          {article.banner?.url ? (
            <img
              src={article.banner.url}
              alt={article.product_name}
              className="w-full h-full object-cover rounded-4xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
          <div>
            <p>
              In today's rapidly evolving business environment, professional
              training has become far more than an optional employee benefit—it
              is a strategic investment that directly influences organizational
              success. Companies across industries are facing unprecedented
              changes driven by technological innovation, shifting customer
              expectations, global competition, and new workplace models. To
              remain competitive, organizations must ensure their workforce
              continuously develops the skills, knowledge, and mindset required
              to adapt.
            </p>
            <br />
            <p>
              Professional training provides structured opportunities for
              employees to enhance their capabilities while supporting broader
              business objectives. Rather than focusing solely on onboarding or
              compliance requirements, modern learning programs encompass
              technical expertise, leadership development, digital literacy,
              communication skills, project management, customer experience, and
              innovation practices.
            </p>
            <br />
            <h4 className="font-semibold text-xl">
              Why Professional Training Matters
            </h4>
            <br />
            <p>
              Organizations that prioritize learning create environments where
              employees feel empowered to improve. Continuous development
              increases confidence, strengthens problem-solving abilities, and
              enables teams to respond more effectively to changing business
              conditions. Employees who receive regular training are often
              better equipped to identify opportunities, solve operational
              challenges, and contribute innovative ideas.
            </p>
            <br />
            <p>
              From a business perspective, investing in employee development
              helps reduce costly mistakes, improve productivity, enhance
              service quality, and increase customer satisfaction. Well-trained
              teams are capable of delivering consistent results while
              maintaining high standards across departments.
            </p>
            <br />
            <h4 className="font-semibold text-xl">
              Adapting to Technological Change
            </h4>
            <br />
            <p>
              Technology continues to reshape industries at an unprecedented
              pace. Artificial intelligence, automation, cloud computing,
              cybersecurity, big data, and digital collaboration platforms have
              become essential components of modern organizations. As these
              technologies evolve, employees must continuously update their
              knowledge to remain effective in their roles.
            </p>
            <br />
            <p>
              Professional training enables organizations to introduce new
              systems more efficiently while minimizing resistance to change.
              Through structured workshops, simulations, and practical
              exercises, employees gain confidence using new tools before
              implementing them in real business scenarios.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* OUR RELATED PRODUCT */}
          <div className="w-full p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
            <span className="text-neutral-800 text-sm font-normal">
              OUR RELATED PRODUCT
            </span>
            <div className="self-stretch p-4 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 transition-all duration-300 flex flex-col justify-center items-center gap-3 group cursor-pointer">
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="w-20 h-20 relative bg-slate-100 rounded-3xl border-2 border-gray-200 overflow-hidden shrink-0">
                  <img
                    alt="Product banner"
                    src={Article}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-2 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 bg-pink-400/20 rounded-[64px] flex justify-center items-center">
                      <span className="text-pink-400 text-xs font-medium">
                        Power Apps
                      </span>
                    </div>
                    <div className="px-2.5 py-1 bg-zinc-500/20 rounded-[64px] flex justify-center items-center">
                      <span className="text-zinc-500 text-xs font-medium">
                        +3
                      </span>
                    </div>
                  </div>
                  <h3 className="self-stretch text-neutral-800 group-hover:text-rose-700 text-base font-medium line-clamp-2 transition-colors duration-300 text-left">
                    Letter Correspondence App
                  </h3>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
              <Link
                to="/custom-app"
                className="inline-flex justify-start items-center gap-2.5 text-rose-700 text-sm font-medium hover:underline"
              >
                <span>View Product Detail</span>
                <ArrowRight size={16} className="text-rose-700 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* OTHER RELATED ARTICLE */}
          <div className="w-full p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-4 overflow-hidden">
            <span className="text-neutral-800 text-sm font-normal">
              OTHER RELATED ARTICLE
            </span>
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              {[
                {
                  title: "Choosing the Right Training Program for Your Team",
                  category: "Corporate Training",
                  bgTag: "bg-fuchsia-400/20",
                  textTag: "text-fuchsia-400",
                  dotBg: "bg-fuchsia-400",
                },
                {
                  title: "Measuring the Impact of Professional Training",
                  category: "Development",
                  bgTag: "bg-green-500/20",
                  textTag: "text-green-500",
                  dotBg: "bg-green-500",
                },
                {
                  title: "How Continuous Learning Drives Career Growth",
                  category: "Career Development",
                  bgTag: "bg-blue-300/20",
                  textTag: "text-blue-300",
                  dotBg: "bg-blue-300",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="self-stretch p-3 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 hover:outline-rose-700 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 inline-flex justify-start items-center gap-3 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-20 h-20 relative bg-slate-100 rounded-3xl border-2 border-gray-200 overflow-hidden shrink-0">
                    <img
                      alt={item.title}
                      src={Article}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-start gap-2 overflow-hidden text-left">
                    <div className={`px-2.5 py-1 ${item.bgTag} rounded-[64px] inline-flex justify-center items-center gap-1.5`}>
                      <div className={`w-1.5 h-1.5 ${item.dotBg} rounded-full`} />
                      <span className={`${item.textTag} text-xs font-medium`}>
                        {item.category}
                      </span>
                    </div>
                    <h4 className="self-stretch text-neutral-800 group-hover:text-rose-700 text-sm font-medium line-clamp-2 transition-colors duration-300">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/article"
              className="self-stretch h-10 px-3 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2.5 text-white text-sm font-medium cursor-pointer"
            >
              <span>View All Related Article</span>
              <ArrowRight size={18} className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
