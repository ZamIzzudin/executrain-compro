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
    <section className="pt-0 md:pt-[10%] pb-[8%]">
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50" to="/free-trial">
          Article
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-primary-500" to={`/free-trial/${article._id}`}>
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
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="border border-gray-200 rounded-2xl p-5 bg-[#ECECEC]">
            <p className="text-xs tracking-wide text-gray-400 mb-1">
              OUR RELATED PRODUCT
            </p>
            <div className="p-3 bg-white rounded-2xl flex gap-2 items-center flex-col">
              <div className="flex gap-3 items-center">
                <img alt="" src={Article} className="h-15 w-15 rounded-xl" />
                <div className="space-y-1">
                  <span className="inline-block text-xs bg-primary-50 text-primary-500 rounded-full px-3 py-1">
                    {categoryLabel.replaceAll("_", " ")}
                  </span>
                  <h3 className="font-medium">Letter Correspondence App</h3>
                </div>
              </div>
              <a
                href={article.link || "#"}
                target={article.link ? "_blank" : undefined}
                rel={article.link ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 text-primary-500 text-sm font-medium px-3 py-2 transition-colors w-full justify-center pt-3 border-t border-gray-300"
              >
                View Product Detail <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
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
                  className="p-3 bg-white rounded-2xl flex gap-3 items-center flex-col"
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
              href={article.link || "#"}
              target={article.link ? "_blank" : undefined}
              rel={article.link ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1 bg-primary-500 text-white text-sm font-medium rounded-full px-3 py-2 hover:bg-primary-600 transition-colors w-full justify-center"
            >
              View All Related Article
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
