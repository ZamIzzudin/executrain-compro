import CountUp from "../atoms/countup";

import { useAssetContext } from "@/layouts/AssetProvider";

export default function StatSection() {
  const { getStaticAsset } = useAssetContext();

  const bannerPlain = getStaticAsset("banner_plain");
  return (
    <div
      className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-5 grid grid-cols-1 lg:grid-cols-5"
      style={{
        backgroundImage: `url('${bannerPlain}'), url('./statHero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-white col-span-2">
        <span className="text-base">MORE</span>
        <h4 className="text-3xl font-semibold">Why Choose Us?</h4>
      </div>
      <div className="h-full flex items-end w-full col-span-3">
        <div className="text-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 w-full">
          <div className="flex flex-col items-left justify-start">
            <span className="text-3xl font-semibold">
              <CountUp
                from={0}
                to={10}
                separator=","
                direction="up"
                duration={2}
              />
              +
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[14px]">
              Years Experience
            </span>
          </div>
          <div className="flex flex-col items-left justify-start">
            <span className="text-3xl font-semibold">
              <CountUp
                from={0}
                to={4}
                separator=","
                direction="up"
                duration={2}
              />
              K+
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[14px]">
              Training Completed
            </span>
          </div>
          <div className="flex flex-col items-left justify-start">
            <span className="text-3xl font-semibold">
              <CountUp
                from={0}
                to={500}
                separator=","
                direction="up"
                duration={2}
              />
              +
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[14px]">
              Training Topics
            </span>
          </div>
          <div className="flex flex-col items-left justify-start">
            <span className="text-3xl font-semibold">
              <CountUp
                from={0}
                to={15}
                separator=","
                direction="up"
                duration={2}
              />
              +
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[14px]">
              Project Completed
            </span>
          </div>
          <div className="flex flex-col items-left justify-start col-span-2">
            <span className="text-3xl font-semibold">
              <CountUp
                from={0}
                to={200}
                separator=","
                direction="up"
                duration={2}
              />
              +
            </span>
            <span className="text-[12px] md:text-[14px] lg:text-[14px]">
              Advisory Support Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
