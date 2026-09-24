/** @format */

"use client";

import { Link } from "react-router-dom";
import { Tooltip } from "antd";

import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { useSocmed } from "@/services/socmed/hook";
import { useSocmedLogo } from "@/hooks/useSocmedLogo";
import { handleImageError } from "@/utils/helper";

const footerLinks: { title: string; items: { label: string; path: string }[] }[] = [
  {
    title: "Training & Skills",
    items: [
      { label: "Skill Accelerator ", path: "/skill-accelerator" },
      { label: "Learning Paths", path: "/learning-path" },
      { label: "Course Catalog", path: "/course-catalog" },
      { label: "Schedule", path: "/schedule" },
    ],
  },
  {
    title: "Tech Solutions",
    items: [
      { label: "Ready-to-Use IT Products", path: "/it-product" },
      { label: "Custom App Development", path: "/app-development" },
      { label: "Technology & Cloud Licensing", path: "/licensing" },
    ],
  },
  {
    title: "Advisory Support",
    items: [
      { label: "Tech Advisory", path: "/tech-advisory" },
      { label: "Implementation & Support", path: "/implementation-support" },
      { label: "IT Talent Placement", path: "/talent-placement" },
    ],
  },
];

const insightLinks: { label: string; path: string }[] = [
  { label: "Case Studies", path: "/case-study" },
  { label: "Articles", path: "/article" },
];

export default function Footer() {
  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();

  const socmedList = useSocmedLogo(socmedData);

  return (
    <footer className="bg-[#242424] ">
      <div className="w-full text-white grid grid-cols-1 md:grid-cols-3 px-[5%] md:px-[7%] lg:px-[10%] py-[3%] gap-10">
        <div className="flex flex-col space-y-10 items-start md:items-start">
          <Link to="/" className="hover:opacity-75 transition-opacity duration-200">
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
                    ?.socmed_link || "sales@executrain.co.id"
                }`}
                className="hover:opacity-75 transition-opacity duration-200"
              >
                {socmedData?.find((each: any) => each.socmed_name === "GMAIL")
                  ?.socmed_link || "sales@executrain.co.id"}
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
            {footerLinks.map((column) => (
              <div key={column.title} className="space-y-2 md:space-y-3 text-sm">
                <span className="text-gray-500 text-xs block">
                  {column.title}
                </span>
                <div className="flex flex-col gap-4">
                  {column.items.map((item) => (
                    <span key={item.label}>
                      <Link to={item.path} className="hover:opacity-75 transition-opacity duration-200">
                        {item.label}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-sm flex flex-col justify-between gap-5">
              <div className="space-y-2 md:space-y-3">
                <span className="text-gray-500 text-xs block">Insight</span>

                <div className="flex flex-col gap-4">
                  {insightLinks.map((item) => (
                    <span key={item.label}>
                      <Link to={item.path} className="hover:opacity-75 transition-opacity duration-200">
                        {item.label}
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
                            className="max-w-5 hover:opacity-75 transition-opacity duration-200"
                          >
                            <img
                              src={each.icon}
                              alt={each.name || `socmed ${index}`}
                              onError={handleImageError}
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
      <Tooltip
        placement="top"
        title="All product names, logos, brands, and trademarks mentioned within this website, brochure, or training materials are the sole property of their respective owners. These trademarks include all products by Microsoft (Microsoft Corporation), CAPM, PMP (Project Management Institute, Inc.), CompTIA, PeopleCert, and any other third-party brands taught in our courses. The use of these names and trademarks is strictly for nominative identification purposes to describe the training curriculum and topic coverage for our students."
      >
        <span className="text-gray-500 block text-center text-xs py-2 border-t mx-[3%] pt-5 pb-10 cursor-help">
          Copyright © {new Date().getFullYear()} - by ExecuTrain of Jakarta. All rights reserved. Microsoft®, CompTIA®, PMP® are trademarks of their respective owners.
        </span>
      </Tooltip>
    </footer>
  );
}
