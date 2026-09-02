/** @format */
import { type TestimoniProps } from "@/utils/types/testimoni";

interface CompProps {
  data: TestimoniProps;
}

export default function TestimoniCard({ data }: CompProps) {
  return (
    <div className="w-full h-44 p-6 bg-white hover:bg-gradient-to-b hover:from-white hover:to-pink-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 hover:outline-rose-700 flex flex-col justify-between items-start transition-all duration-300 cursor-pointer group">
      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <p className="self-stretch justify-start text-neutral-800 text-sm font-normal text-left line-clamp-3">
          &quot;{data?.testimonial}&quot;
        </p>
      </div>
      <div className="self-stretch inline-flex justify-start items-center gap-3">
        <div className="w-0 self-stretch outline outline-2 outline-offset-[-1px] outline-rose-700 shrink-0" />
        <div className="flex-1 flex flex-col justify-start items-start gap-0.5 overflow-hidden text-left">
          <span className="self-stretch justify-start text-rose-700 text-sm font-medium truncate">
            {data?.person_name}
          </span>
          <span className="self-stretch justify-start text-neutral-400 text-xs font-normal truncate">
            {data?.person_title}
          </span>
        </div>
      </div>
    </div>
  );
}
