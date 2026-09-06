import { useParams, Link } from "react-router-dom";
import { ChevronRight, Globe } from "lucide-react";
import "@fontsource-variable/inter";

import Sophos from "@/assets/dummy/sophos.png";
import Microsoft from "@/assets/dummy/microsoft3.png";
import { handleImageError } from "@/utils/helper";

import { useTechnologyCloudLicensingPage } from "@/services/technology-cloud-licensing/hook";
import { slugifyVendorName } from "@/utils/types/technology-cloud-licensing";

const FALLBACK_VENDORS = [
  {
    name: "Sophos",
    logo: { url: Sophos, public_id: "" },
    description:
      "Sophos is a worldwide leader and innovator of advanced cybersecurity solutions, including Managed Detection and Response (MDR) and incident response services and a broad portfolio of endpoint, network, email, and cloud security technologies that help organizations defeat cyberattacks.",
    website_url: "https://sophos.com/",
    facebook_url: "https://facebook.com/securitybysophos",
    linkedin_url: "http://www.linkedin.com/company/sophos",
    twitter_url: "https://twitter.com/Sophos",
    contact_link: "/contact",
  },
  {
    name: "Microsoft",
    logo: { url: Microsoft, public_id: "" },
    description:
      "Microsoft was founded in 1975. Our mission is to enable people and businesses throughout the world to realize their full potential by creating technology that transforms the way people work, play, and communicate. We develop and market software, services, and hardware devices that deliver new opportunities, greater convenience, and enhanced value to people's lives. We do business worldwide and have offices in more than 100 countries.",
    website_url: "https://www.microsoft.com/",
    facebook_url: "https://www.facebook.com/Microsoft/",
    linkedin_url: "https://www.linkedin.com/company/microsoft",
    twitter_url: "https://x.com/microsoft",
    contact_link: "/contact",
  },
];

type SocialIconProps = {
  className?: string;
};

const FacebookIcon = ({ className }: SocialIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ className }: SocialIconProps) => (
  <svg
    viewBox="0 0 14 14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M8.3319 5.92805L13.5437 5.92015e-07L12.3087 5.3803e-07L7.78326 5.14724L4.16883 1.82225e-07L0 0L5.46574 7.78354L-6.11959e-07 14L1.2351 14L6.01406 8.56434L9.83117 14L14 14L8.3316 5.92805L8.3319 5.92805ZM6.64026 7.85211L6.08647 7.07705L1.68013 0.909776L3.57717 0.909776L7.13314 5.88696L7.68693 6.66202L12.3093 13.1316L10.4122 13.1316L6.64026 7.85241L6.64026 7.85211Z" />
  </svg>
);

const LinkedinIcon = ({ className }: SocialIconProps) => (
  <svg
    viewBox="0 0 14 14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.68091 3.37787C0.752802 3.37787 -1.14048e-07 2.60911 -7.34773e-08 1.68097C-3.28969e-08 0.752594 0.752571 3.28959e-08 1.68091 7.34751e-08C2.60926 1.14054e-07 3.36183 0.752594 3.36183 1.68097C3.36183 2.60911 2.60871 3.37787 1.68091 3.37787ZM3.13293 13.9994L0.230468 13.9994L0.230469 4.65234L3.13293 4.65234L3.13293 13.9994ZM11.1018 13.9994L13.998 13.9994L14.0011 13.9994L14.0011 8.86492C14.0011 6.35238 13.4611 4.41797 10.5237 4.41797C9.11151 4.41797 8.16496 5.19298 7.77746 5.92737L7.73684 5.92737L7.73684 4.65235L4.95312 4.65235L4.95312 13.9994L7.85246 13.9994L7.85246 9.37118C7.85246 8.15241 8.08371 6.97426 9.59275 6.97426C11.0799 6.97426 11.1018 8.36491 11.1018 9.4493L11.1018 13.9994Z"
    />
  </svg>
);

export default function CertificationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: pageContent } = useTechnologyCloudLicensingPage();

  const vendors =
    pageContent?.content?.vendors && pageContent.content.vendors.length > 0
      ? pageContent.content.vendors
      : FALLBACK_VENDORS;

  const selected = vendors.find(
    (v: any) => slugifyVendorName(v.name) === (id || ""),
  );

  return (
    <section className="pt-0 md:pt-[10%] pb-[8%] bg-[#FCFCFC]">
      {/* Breadcrumbs */}
      <div className="font-[500] flex gap-3 text-xs md:text-sm items-center flex-wrap px-[5%] md:px-[7%] lg:px-[10%]">
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="opacity-50 hover:opacity-100 transition-opacity duration-200" to="/licensing">
          Technology & Cloud Licensing
        </Link>
        <ChevronRight className="w-4 h-4 opacity-50" />
        <Link className="text-rose-700 hover:opacity-80 transition-opacity duration-200" to={`/licensing/${id}`}>
          {selected?.name || "Detail"}
        </Link>
      </div>

      {!selected ? (
        <div className="px-[5%] md:px-[7%] lg:px-[10%] py-10 text-center text-gray-500">
          Vendor not found.
        </div>
      ) : (
        <div className="px-[5%] md:px-[7%] lg:px-[10%] mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column Content */}
            <div className="flex flex-col gap-6 lg:col-span-3">
              {/* Card Container */}
              <div className="p-6 md:p-8 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-start items-start gap-6">
                {/* Header with Logo and Name */}
                <div className="flex items-center justify-start gap-4">
                  {selected.logo && (
                    <div className="p-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={selected.logo.url}
                        alt={`${selected.name} logo`}
                        onError={handleImageError}
                        className="h-12 w-auto object-contain shrink-0"
                      />
                    </div>
                  )}
                  <h1 className="text-neutral-800 text-2xl md:text-3xl font-semibold">
                    {selected.name}
                  </h1>
                </div>

                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

                {/* Description */}
                <p className="text-neutral-900 text-base font-normal leading-relaxed text-justify">
                  {selected.description}
                </p>

                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />

                {/* Social & Web Links as interactive Red-hover Buttons */}
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <span className="text-zinc-500 text-sm font-normal">
                    OFFICIAL CHANNELS & SOCIAL MEDIA
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {/* Website Button */}
                    <a
                      href={selected.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full p-4 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex items-center gap-3 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="p-2 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 transition-colors duration-300 text-neutral-800 group-hover:text-rose-700">
                        <Globe size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-zinc-500 font-normal">Website</span>
                        <span className="text-sm font-medium text-neutral-800 group-hover:text-rose-700 truncate transition-colors duration-300">
                          {selected.name} Official Site
                        </span>
                      </div>
                    </a>

                    {/* Facebook Button */}
                    <a
                      href={selected.facebook_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full p-4 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex items-center gap-3 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="p-2 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 transition-colors duration-300 text-neutral-800 group-hover:text-rose-700">
                        <FacebookIcon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-zinc-500 font-normal">Facebook</span>
                        <span className="text-sm font-medium text-neutral-800 group-hover:text-rose-700 truncate transition-colors duration-300">
                          {selected.name} Facebook
                        </span>
                      </div>
                    </a>

                    {/* X Button */}
                    <a
                      href={selected.twitter_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full p-4 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex items-center gap-3 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="p-2 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 transition-colors duration-300 text-neutral-800 group-hover:text-rose-700">
                        <XIcon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-zinc-500 font-normal">X (Twitter)</span>
                        <span className="text-sm font-medium text-neutral-800 group-hover:text-rose-700 truncate transition-colors duration-300">
                          {selected.name} X
                        </span>
                      </div>
                    </a>

                    {/* LinkedIn Button */}
                    <a
                      href={selected.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full p-4 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex items-center gap-3 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="p-2 bg-stone-50 group-hover:bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 transition-colors duration-300 text-neutral-800 group-hover:text-rose-700">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-zinc-500 font-normal">LinkedIn</span>
                        <span className="text-sm font-medium text-neutral-800 group-hover:text-rose-700 truncate transition-colors duration-300">
                          {selected.name} LinkedIn
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Sticky Sidebar */}
            <div className="flex flex-col gap-8 lg:col-span-2 sticky top-28 self-start">
              {/* MORE */}
              <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3 overflow-hidden">
                <span className="text-zinc-500 text-sm font-normal">
                  GET LICENSED
                </span>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <h3 className="self-stretch text-neutral-800 text-2xl font-semibold">
                    Need {selected.name} Licenses?
                  </h3>
                  <p className="self-stretch text-zinc-500 text-base font-normal">
                    Contact our sales & licensing specialists to get official pricing and compliance support for your enterprise.
                  </p>
                </div>
                <div className="inline-flex justify-start items-center gap-3 pt-2">
                  <Link
                    to={selected.contact_link || "/contact"}
                    className="h-10 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 transition-colors duration-300 rounded-[48px] inline-flex justify-center items-center gap-2 text-white text-sm font-medium cursor-pointer"
                  >
                    <span>Contact Licensing Team</span>
                    <ChevronRight size={18} className="text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}