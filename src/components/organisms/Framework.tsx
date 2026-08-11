import FrameworkWheel from "../molecules/FrameworkWheel";

export default function FrameworkBanner() {
  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-6 bg-gradient-to-b from-white to-zinc-100 rounded-bl-[64px] rounded-br-[64px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05)] border-t border-gray-200">
      <FrameworkWheel />
    </div>
  );
}
