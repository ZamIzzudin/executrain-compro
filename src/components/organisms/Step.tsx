import { CalendarIcon, PhoneIcon, Share2Icon, StarIcon } from "lucide-react";

export default function Step() {
  return (
    <div className="px-[5%] md:px-[7%] lg:px-[10%] w-full py-[3%]">
      <div className="bg-[#ECECEC] p-6 space-y-3 rounded-xl drop-shadow-md w-full">
        <h2 className="font-semibold text-2xl">Join In 4 Easy Steps</h2>
        <p className="text-gray-500">
          We’ve simplified the process so you can focus on what matters:
          learning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-5 rounded-3xl shadow space-y-3 flex-1 justify-center flex flex-col ">
            <div className="text-primary-500 flex gap-2 items-center">
              <PhoneIcon size={14} />
              <h5 className="text-sm font-medium">Contact Sales</h5>
            </div>
            <p className="text-xs text-gray-600">
              Reach out to our sales team to get detailed information and
              initial consultation.
            </p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow space-y-3 flex-1 justify-center flex flex-col ">
            <div className="text-primary-500 flex gap-2 items-center">
              <Share2Icon size={14} />
              <h5 className="text-sm font-medium">Share Your Sales</h5>
            </div>
            <p className="text-xs text-gray-600">
              Explain your goals and requirements so we can tailor the training
              to you.
            </p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow space-y-3 flex-1 justify-center flex flex-col ">
            <div className="text-primary-500 flex gap-2 items-center">
              <CalendarIcon size={14} />
              <h5 className="text-sm font-medium">Set Your Schedule</h5>
            </div>
            <p className="text-xs text-gray-600">
              Work with us to arrange a training schedule that suits your
              availability.
            </p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow space-y-3 flex-1 justify-center flex flex-col ">
            <div className="text-primary-500 flex gap-2 items-center">
              <StarIcon size={14} />
              <h5 className="text-sm font-medium">Ready To Train</h5>
            </div>
            <p className="text-xs text-gray-600">
              Your program is prepared, and you are ready to begin your training
              journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
