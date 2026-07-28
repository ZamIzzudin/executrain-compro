/** @format */

"use client";

import { Link } from "react-router-dom";

import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { useSocmed } from "@/services/socmed/hook";
import { useSocmedLogo } from "@/hooks/useSocmedLogo";

export default function Footer() {
  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();

  const socmedList = useSocmedLogo(socmedData);

  return (
    <footer className="bg-[#242424] ">
      <div className="min-w-[98dvw] max-w-[99dvw] text-white grid grid-cols-1 md:grid-cols-3 px-[7%] lg:px-[10%] py-[3%] gap-10">
        <div className="flex flex-col space-y-10 items-start md:items-start">
          <Link to="/">
            <img src="./logo.png" alt="logo" className="w-30 lg:w-50 h-auto" />
          </Link>
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-gray-500  text-xs">Get In Touch</span>
            <div className="flex items-center gap-4">
              <PhoneIcon />
              <span className="block">
                {socmedLoading
                  ? "..."
                  : `+ ${
                      socmedData?.find(
                        (each: any) => each.socmed_name === "WHATSAPP",
                      )?.socmed_link
                    }`}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <MailIcon />
              <Link
                to={`mailto:${
                  socmedData?.find((each: any) => each.socmed_name === "GMAIL")
                    ?.socmed_link || "sales@excelearn.co.id"
                }`}
              >
                {socmedData?.find((each: any) => each.socmed_name === "GMAIL")
                  ?.socmed_link || "sales@excelearn.co.id"}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <MapPinIcon />
              </div>
              <span className="block">
                {socmedData?.find(
                  (each: any) => each.socmed_name === "LOCATION",
                )?.socmed_link || "..."}
              </span>
            </div>
          </div>
        </div>
        <div className="flex md:col-span-2 flex-col gap-5 md:gap-8 items-center md:items-start w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 flex-1 w-full">
            <div className="space-y-2 md:space-y-3 text-sm">
              <span className="text-gray-500  text-xs block">
                Training & Skills
              </span>
              <div className="flex flex-col gap-4">
                {[
                  "Skill Accelerator (Free Trial)",
                  "Training Calendar",
                  "Learning Paths",
                  "Course Catalog",
                ].map((service: string) => (
                  <span key={service}>
                    <Link to={`/tech-solutions?type=${service}`}>
                      {service}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:space-y-3 text-sm">
              <span className="text-gray-500  text-xs block">
                Tech Solutions
              </span>

              <div className="flex flex-col gap-4">
                {[
                  "Ready-to-Use IT Products",
                  "Custom App Development",
                  "Software & Cloud Licensing",
                ].map((service: string) => (
                  <span key={service}>
                    <Link to={`/tech-solutions?type=${service}`}>
                      {service}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:space-y-3 text-sm">
              <span className="text-gray-500  text-xs block">
                Advisory Support
              </span>

              <div className="flex flex-col gap-4">
                {[
                  "Support Advisory",
                  "Implementation & Support",
                  "IT Talent Placement",
                ].map((service: string) => (
                  <span key={service}>
                    <Link to={`/tech-solutions?type=${service}`}>
                      {service}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm flex flex-col justify-between gap-5">
              <div className="space-y-2 md:space-y-3">
                <span className="text-gray-500  text-xs block">Insight</span>

                <div className="flex flex-col gap-4">
                  {["Case Studies", "Articles"].map((service: string) => (
                    <span key={service}>
                      <Link to={`/tech-solutions?type=${service}`}>
                        {service}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2 md:space-y-3 flex-1">
                <span className="text-gray-500  text-xs block">
                  Social Media
                </span>
                <div>
                  {socmedLoading ? (
                    <div className="flex items-center justify-between flex-wrap mb-5 md:mb-0 w-[90%] ">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 bg-white/20 rounded-full animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-start gap-7 flex-wrap mb-5 md:mb-0 w-full">
                      {socmedList.length > 0 ? (
                        socmedList.map((each: any, index: number) => (
                          <Link
                            key={index + 1}
                            to={each.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-5"
                          >
                            <img
                              src={each.icon}
                              alt={each.name || `socmed ${index}`}
                            />
                          </Link>
                        ))
                      ) : (
                        <span className="text-white/70">
                          No social media available
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="text-gray-500 block text-center text-xs py-2 border-t mx-[3%] pt-5 pb-10">
        Copyright © 2026 - by ExecuTrain of Jakarta
      </span>
    </footer>
  );
}
