import { useParams, Link } from "react-router-dom";
import { ChevronRight, Globe } from "lucide-react";
import "@fontsource-variable/inter";

import Sophos from "@/assets/dummy/sophos.png";
import Microsoft from "@/assets/dummy/microsoft3.png";

const data = [
  {
    id: "sophos",
    name: "Sophos",
    desc: "Sophos is a worldwide leader and innovator of advanced cybersecurity solutions, including Managed Detection and Response (MDR) and incident response services and a broad portfolio of endpoint, network, email, and cloud security technologies that help organizations defeat cyberattacks.",
    site: "https://sophos.com/",
    facebook: "https://facebook.com/securitybysophos",
    linkedin: "http://www.linkedin.com/company/sophos",
    twitter: "https://twitter.com/Sophos",
    logo: Sophos,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    desc: "Microsoft was founded in 1975. Our mission is to enable people and businesses throughout the world to realize their full potential by creating technology that transforms the way people work, play, and communicate. We develop and market software, services, and hardware devices that deliver new opportunities, greater convenience, and enhanced value to people's lives. We do business worldwide and have offices in more than 100 countries.",
    site: "https://www.microsoft.com/",
    facebook: "https://www.facebook.com/Microsoft/",
    linkedin: "https://www.linkedin.com/company/microsoft",
    twitter: "https://x.com/microsoft",
    logo: Microsoft,
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

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

const InfoItem = ({ icon, label, value, href }: InfoItemProps) => (
  <div className="flex items-start gap-2">
    <span className="w-5 h-5">{icon}</span>
    <div className="flex flex-col min-w-0">
      <span className="text-xs font-semibold">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-normal text-gray-400 break-words transition-all duration-200 ease-in-out hover:text-[#1D4ED8] hover:underline underline-offset-2 cursor-pointer"
        >
          {value}
        </a>
      ) : (
        <span className="text-xs font-normal text-gray-400 break-words">
          {value}
        </span>
      )}
    </div>
  </div>
);

export default function CertificationDetail() {
  const { id } = useParams<{ id: string }>();
  const selected = data.find((each) => each.id === id);

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
        <Link className="text-primary-500" to={`/certification/${id}`}>
          {selected?.name}
        </Link>
      </div>
      {/* DARI SINI */}
      {!selected ? (
        <div className="px-[5%] md:px-[7%] lg:px-[10%] py-10 text-center text-gray-500">
          Vendor not found.
        </div>
      ) : (
        <div className="px-[5%] md:px-[7%] lg:px-[10%] my-[5%]">
          <div
            className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-6 md:px-16 md:py-14"
            style={{
              fontFamily:
                "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-start gap-4 mb-10">
              {selected.logo && (
                <img
                  src={selected.logo}
                  alt={`${selected.name} logo`}
                  className="w-[100px] h-auto object-contain shrink-0"
                />
              )}
              <h1 className="font-semibold text-3xl">{selected.name}</h1>
            </div>
            <p className="text-sm text-gray-500 mb-10">{selected.desc}</p>

            <div className=" flex flex-wrap justify-between gap-3 mt-5 space-y-5">
              <InfoItem
                icon={<Globe className="w-5 h-5 text-primary-500" />}
                label="Company Website"
                value={selected.site}
                href={selected.site}
              />
              <InfoItem
                icon={<FacebookIcon className="w-5 h-5 text-primary-500" />}
                label="Facebook"
                value={selected.facebook}
                href={selected.facebook}
              />
              <InfoItem
                icon={<XIcon className="w-4 h-4 text-primary-500" />}
                label="X"
                value={selected.twitter}
                href={selected.twitter}
              />
              <InfoItem
                icon={<LinkedinIcon className="w-5 h-5 text-primary-500" />}
                label="LinkedIn"
                value={selected.linkedin}
                href={selected.linkedin}
              />
            </div>
          </div>
        </div>
      )}
      {/* HINGGA SINI */}
    </section>
  );
}
