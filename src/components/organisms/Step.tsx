import { PhoneIcon, Share2Icon, CalendarIcon, StarIcon } from "lucide-react";

export default function Step() {
  const steps = [
    {
      icon: PhoneIcon,
      title: "Contact Sales",
      desc: "Reach out to our sales team to get detailed information and initial consultation.",
    },
    {
      icon: Share2Icon,
      title: "Share Your Sales",
      desc: "Explain your goals and requirements so we can tailor the training to you.",
    },
    {
      icon: CalendarIcon,
      title: "Set Your Schedule",
      desc: "Work with us to arrange a training schedule that suits your availability.",
    },
    {
      icon: StarIcon,
      title: "Ready To Train",
      desc: "Your program is prepared, and you are ready to begin your training journey.",
    },
  ];

  return (
    <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-12 bg-white rounded-bl-[64px] rounded-br-[64px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border-b border-gray-200 inline-flex flex-col justify-start items-center gap-6">
      <div className="self-stretch p-6 relative bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <h2 className="self-stretch text-neutral-800 text-2xl font-semibold">
            Join In 4 Easy Steps
          </h2>
          <p className="self-stretch text-neutral-400 text-base font-normal">
            We’ve simplified the process so you can focus on what matters: learning.
          </p>
        </div>
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map(({ icon: Icon, title, desc }, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            return (
              <div key={title} className="relative flex-1 flex flex-col">
                <div
                  className={`h-full p-5 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] flex flex-col justify-start items-start gap-3 transition-all duration-300 cursor-pointer group relative z-10 ${isFirst
                      ? "bg-gradient-to-b from-white to-pink-50 outline-1 outline-offset-[-1px] outline-rose-700"
                      : "bg-white  outline-1 outline-offset-[-1px] outline-gray-200 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 hover:outline-rose-700"
                    }`}
                >
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors duration-300 ${isFirst
                            ? "text-rose-700"
                            : "text-neutral-400 group-hover:text-rose-700"
                          }`}
                      />
                      <h3
                        className={`flex-1 justify-start text-sm font-medium line-clamp-2 transition-colors duration-300 ${isFirst
                            ? "text-rose-700"
                            : "text-neutral-800 group-hover:text-rose-700"
                          }`}
                      >
                        {title}
                      </h3>
                    </div>
                    <p
                      className={`self-stretch text-xs font-normal transition-colors duration-300 ${isFirst
                          ? "text-zinc-600"
                          : "text-neutral-400 group-hover:text-zinc-600"
                        }`}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
                {!isLast && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-[2px] bg-gray-300 z-20 -translate-y-1/2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

