/** @format */

"use client";

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetContext } from "@/layouts/AssetProvider";

import { FadeInUp } from "@/components/atoms/Motion";
import Button from "@/components/atoms/Button";

import { ArrowRightIcon } from "lucide-react";

export default function Hero({
  title,
  description,
}: Readonly<{ title?: string; description?: string }>) {
  const { getAssetUrl, isLoading } = useAssetContext();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);

  const heroBackground = getAssetUrl("hero_background");
  const heroVideo = getAssetUrl("hero_video");

  useEffect(() => {
    const video = videoRef.current;
    if (!heroVideo || !video) return;

    video.muted = true;
    video.load();

    const handleCanPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [heroVideo, heroBackground]);

  return (
    <div className="relative w-full min-h-[85dvh] md:min-h-[105dvh] text-white flex items-end justify-start py-[30%] md:py-[7%] lg:py-[10%] px-[5%] md:px-[7%] lg:px-[10%] overflow-hidden">
      {/* Video Background with poster for seamless load (no image flash) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={isLoading ? "" : heroVideo ? "" : heroBackground}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Optional: Overlay gelap tambahan untuk meningkatkan readability text */}
      <div className="absolute top-0 bottom-0 left-0 right-0 inset-0 bg-black/60" />

      {/* Content */}
      <div className="w-full flex items-center justify-center min-h-[60dvh] relative z-10 max-w-full gap-8 lg:gap-5">
        <FadeInUp delay={0.2} duration={0.6} className="md:w-[70%]">
          <div className="space-y-5 md:space-y-6 text-center">
            <h1 className="text-[32px] md:text-[45px] lg:text-[55px] font-semibold leading-10 md:leading-15">
              {title ||
                "The Strategic IT Partner Behind Today's Leading Enterprise"}
            </h1>
            <p className="">
              {description ||
                "Delivering world-class IT training, business skills, and technology solutions to help your organization stay ahead in a rapidly evolving digital landscape."}
            </p>
          </div>
          <div className="flex gap-4 items-center justify-center pt-8">
            <Button
              label="Contact Us"
              rounded
              type="primary"
              onClick={() => navigate("/contact")}
            />
            <Button
              label="Read More"
              rounded
              icon={<ArrowRightIcon />}
              type="outline-white"
              onClick={() => navigate("/about")}
            />
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
