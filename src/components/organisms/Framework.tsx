import FrameworkWheel from "../molecules/FrameworkWheel";

export default function FrameworkBanner() {
  return (
    <div className="px-[5%] md:px-[7%] lg:px-[10%] w-full space-y-6 md:space-y-6 min-h-[30dvh] md:min-h-[50dvh] py-[5%] bg-gradient-to-b from-white from-0% to-gray-200">
      <FrameworkWheel />
    </div>
  );
}
